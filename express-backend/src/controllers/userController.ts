import { Express } from "express";
import { validate } from "class-validator";
import { Request, Response } from "express";
import multer from "multer";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

// GET /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userRepo.find();
  const safeUsers = users.map(({ password, ...u }) => u);
  res.json(safeUsers);
};

// GET /api/users/:id
export const getUser = async (req: Request, res: Response) => {
  const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...safeUser } = user;
  res.json(safeUser);
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, username, password, email } = req.body;

  const newUser = userRepo.create({
    firstName,
    lastName,
    username,
    password,
    email,
  });
  const errors = await validate(newUser);
  if (errors.length > 0) {
    const formattedErrors = errors.flatMap((e) =>
      e.constraints ? Object.values(e.constraints) : []
    );
    return res.status(400).json({ errors: formattedErrors });
  }

  const existing = await userRepo.findOneBy([{ username }, { email }]);
  if (existing) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  newUser.password = await bcrypt.hash(password, 10);
  const savedUser = await userRepo.save(newUser);
  const { password: _, ...safeUser } = savedUser;
  res.status(201).json(safeUser);
};

// PUT /api/users/:id
export const upload = multer().fields([
  { name: "user", maxCount: 1 }, // JSON field
  { name: "file", maxCount: 1 }, // optional file
]);

export const updateUser = async (
  req: Request & { files?: { file?: Express.Multer.File[] } },
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const existingUser = await userRepo.findOneBy({ id });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const userJson = req.body.user;
    if (!userJson)
      return res.status(400).json({ message: "Missing user data" });

    const parsed = JSON.parse(userJson);
    Object.assign(existingUser, parsed);

    const uploadedFile = req.files?.file?.[0];
    if (uploadedFile) {
      console.log("Uploaded file:", uploadedFile.originalname);
      // Save or process uploadedFile here
    }

    const errors = await validate(existingUser);
    if (errors.length > 0) {
      const formatted = errors.flatMap((e) =>
        e.constraints ? Object.values(e.constraints) : []
      );
      return res.status(400).json({ errors: formatted });
    }

    const updatedUser = await userRepo.save(existingUser);
    const { password, ...safeUser } = updatedUser;
    res.json(safeUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const result = await userRepo.delete(req.params.id);
  if (result.affected === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
};
