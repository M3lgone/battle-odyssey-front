import api from "./axios";

export const createBattle = (gameId, extra = {}) =>
  api.post("/battles", { game_id: gameId, ...extra });

export const getBattle = (battleId) => api.get(`/battles/${battleId}`);

export const getBattles = (gameId) => api.get(`/games/${gameId}/battles`);

export const updateBattle = (battleId, data) =>
  api.put(`/battles/${battleId}`, data);
