import axios from "axios";
import type { User } from "../types";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CRUD functions
export const getAllUsers = () => API.get("/users");
export const getUserById = (id: number) => API.get(`/users/${id}`);

export const createUser = (data: Omit<User, "id">) =>
  API.post<User>("/users", data);

export const updateUser = (id: number, data: Omit<User, "id">) =>
  API.put(`/users/${id}`, data);

export const deleteUser = (id: number) => API.delete(`/users/${id}`);
