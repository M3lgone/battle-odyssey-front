import api from "./axios";

export const login = (email, password) =>
  api.post("/login", { email, password });

export const logout = () => api.post("/logout");

export const register = (name, email, password, passwordConfirmation) =>
  api.post("/register", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
