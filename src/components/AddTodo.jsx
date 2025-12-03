"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddTodo({ onAdd, todos }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    
    if (!text.trim()) return;
    if(todos.some((todo) => todo.text === text)) {
      alert("Todo already exists.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        alert("Failed to add todo.");
        return;
      }

      const newTodo = await res.json();
      onAdd(); // Refresh todos in parent
      setText("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className={`px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md ${
            isLoading || !text.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Todo"
          )}
        </button>
      </div>
    </form>
  );
}
