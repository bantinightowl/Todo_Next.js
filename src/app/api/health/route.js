// API Route to check server health and MongoDB connection
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: !!process.env.PORT,
      MONGODB_URI: !!process.env.MONGODB_URI,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    mongodb: {
      connected: false,
      error: null,
    },
  };

  // Test MongoDB connection
  try {
    await dbConnect();
    result.mongodb.connected = true;
  } catch (error) {
    result.mongodb.error = error.message;
    result.status = 'error';
  }

  return NextResponse.json(result, { status: result.status === 'ok' ? 200 : 500 });
}
