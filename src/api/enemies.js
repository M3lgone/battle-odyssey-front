import api from "./axios";

export const getEnemies = () => api.get("/enemies");

export const getEnemy = (id) => api.get(`/enemies/${id}`);

export const createEnemy = (data) => api.post("/enemies", data);

export const updateEnemy = (id, data) => api.put(`/enemies/${id}`, data);