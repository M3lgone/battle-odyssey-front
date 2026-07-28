// Datos mock con la forma del contrato API (API_CONTEXT.md).
// password y remember_token nunca se exponen, igual que en la API.
// En la fase de integración se sustituirá por GET /users.
const users = [
  {
    id: 1,
    name: "Ismael",
    email: "isma@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    name: "John",
    email: "john@example.com",
    role: "player",
  },
  {
    id: 3,
    name: "Anna",
    email: "anna@example.com",
    role: "player",
  },
];

export default users;
