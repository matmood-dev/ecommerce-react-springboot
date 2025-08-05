import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

// CRUD Operations
export const getAllUsers = () => API.get("");
export const getUserById = (id: number) => API.get(`/${id}`);
export const createUser = (data: any) => API.post("/", data);
export const updateUser = (id: number, data: any) => API.put(`/${id}`, data);
export const deleteUser = (id: number) => API.delete(`/${id}`);
