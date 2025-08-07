import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

export const login = (credentials: { username: string; password: string }) =>
  API.post("/login", credentials);
