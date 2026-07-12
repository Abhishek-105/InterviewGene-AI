import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewgene-ai-backend.onrender.com/api",
  withCredentials: true,
});

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/get-me");
  return response.data;
};