//types.ts
export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER"; // Assuming roles are either ADMIN or USER
}
