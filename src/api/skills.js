import api from "./axios";

export const getSkills = () => api.get("/skills");
