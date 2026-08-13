import api from "./axios";

export const getEnemies = () => api.get("/enemies");