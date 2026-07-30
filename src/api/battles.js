import api from "./axios";

export const createBattle = (gameId) =>
  api.post("/battles", { game_id: gameId });

export const getBattle = (battleId) => api.get(`/battles/${battleId}`);

export const getBattles = (gameId) => api.get(`/games/${gameId}/battles`);
