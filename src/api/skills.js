import api from "./axios";

export const getSkills = () => api.get("/skills");

export const getSkill = (id) => api.get(`/skills/${id}`);

export const createSkill = (data) => api.post("/skills", data);

export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
