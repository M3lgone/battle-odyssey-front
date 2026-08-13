import api from "./axios";

export const getEnemies = () => api.get("/enemies");

export const getEnemy = (id) => api.get(`/enemies/${id}`);