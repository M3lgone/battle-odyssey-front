import api from "./axios";

export const getSkills = () => api.get("/skills");

export const getSkill = (id) => api.get(`/skills/${id}`);
