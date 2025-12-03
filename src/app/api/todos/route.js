import { getTodosByUserId, createTodo, updateTodo, deleteTodo } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const todos = await getTodosByUserId(session.user.id);
    return Response.json(todos);
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { text } = await req.json();
    
    if (!text || text.trim() === "") {
      return Response.json({ error: "Todo text is required" }, { status: 400 });
    }
    
    const newTodo = await createTodo(text.trim(), session.user.id);
    return Response.json(newTodo);
  } catch (error) {
    return Response.json({ error: "Failed to create todo" }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, text } = await req.json();
    
    if (!text || text.trim() === "") {
      return Response.json({ error: "Todo text is required" }, { status: 400 });
    }
    
    const updatedTodo = await updateTodo(id, text.trim(), session.user.id);
    
    if (!updatedTodo) {
      return Response.json({ error: "Todo not found or unauthorized" }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"), 10);
    
    if (isNaN(id)) {
      return Response.json({ error: "Invalid todo ID" }, { status: 400 });
    }
    
    const deletedTodo = await deleteTodo(id, session.user.id);
    
    if (!deletedTodo) {
      return Response.json({ error: "Todo not found or unauthorized" }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
