// Shared in-memory database for demo purposes
// In production, you would use a real database like PostgreSQL, MongoDB, etc.

// Initial users data
const initialUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "$2b$10$3dYCxu5pUwVpQ.HKqOeW3O0N58zH8vQZJzY3Xg5yYv1q4v8pL0O9W", // Hashed "password123"
  }
];

// Using a module-level variable to maintain state in development
// Note: This won't persist in production serverless environments
let users = [...initialUsers];

export const getUsers = () => users;
export const addUser = (user) => {
  users.push(user);
};
export const findUserByEmail = (email) => users.find(user => user.email === email);
export const findUserById = (id) => users.find(user => user.id === id);

// For development purposes - reset users to initial state if needed
export const resetUsers = () => {
  users = [...initialUsers];
};