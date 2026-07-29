import api from "./axios";

export const getCharacters = () => api.get("/characters");
