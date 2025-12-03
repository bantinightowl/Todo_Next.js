// In-memory database for demo purposes
// In production, you would use a real database like PostgreSQL, MongoDB, etc.
import { generateUnvercelID } from "@/Utils/getUnvercelId";

let todos = [];


export async function getTodosByUserId(userId) {
  return todos.filter(todo => todo.userId === userId);
}

export async function createTodo(text, userId) {
  const newTodo = {
    id: generateUnvercelID(),
    text,
    userId
  };
  todos.push(newTodo);
  return newTodo;
}

export async function updateTodo(id, text, userId) {
  const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], text };
    return todos[todoIndex];
  }
  return null;
}

export async function deleteTodo(id, userId) {
  const todoIndex = todos.findIndex(todo => todo.id === id && todo.userId === userId);
  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    return deletedTodo;
  }
  return null;
}