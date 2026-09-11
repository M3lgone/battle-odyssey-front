import api from "./axios";

export const createGame = (characterId) =>
  api.post("/games", { character_id: characterId });

export const getActiveGame = () => api.get("/games");
