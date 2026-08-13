import api from "./axios";

export const getCharacters = () => api.get("/characters");

export const getCharacter = (id) => api.get(`/characters/${id}`);

export const createCharacter = (data) => api.post("/characters", data);
