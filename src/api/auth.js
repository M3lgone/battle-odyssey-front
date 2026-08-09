import api from "./axios";

export const login = (email, password) =>
  api.post("/login", { email, password });

export const logout = () => api.post("/logout");

export const getMe = () => api.get("/me");

export const updateMe = (data) => api.put("/me", data);

export const deleteMe = () => api.delete("/me");

export const register = (name, email, password, passwordConfirmation) =>
  api.post("/register", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
