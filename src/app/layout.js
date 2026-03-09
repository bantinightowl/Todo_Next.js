import { auth } from "@/lib/auth";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App with Authentication",
  description: "A secure todo application with user authentication",
};

export const viewport = "width=device-width, initial-scale=1, maximum-scale=5";

export default async function RootLayout({ children }) {
  let session = null;
  let authError = null;
  
  try {
    session = await auth();
  } catch (error) {
    console.error('[Layout] Auth error:', error);
    authError = error.message;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider session={session}>
            <SocketProvider>
              {children}
              {authError && process.env.NODE_ENV === 'development' && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'red', color: 'white', padding: '10px', fontSize: '12px' }}>
                  Auth Error: {authError}
                </div>
              )}
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
