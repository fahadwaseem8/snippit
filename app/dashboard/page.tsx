"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push("/login");
        return;
      }
      
      setUser({
        email: authUser.email || "",
        id: authUser.id,
      });
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        setLoggingOut(false);
      }
    } catch {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center p-6">
        <p className="text-foreground/60 font-mono">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen font-sans flex items-center justify-center p-6 relative">
      {/* Terminal-style background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)]"></div>
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 text-2xl font-semibold mb-8">
          <span className="text-3xl">🧷</span>
          <span>Snippit</span>
        </Link>

        {/* Terminal-style dashboard card */}
        <div className="border border-foreground/20 rounded-lg bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-foreground/[0.08] border-b border-foreground/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="font-mono text-xs text-foreground/60 ml-2">~/snippit/dashboard</span>
            </div>
            <span className="font-mono text-xs text-foreground/40">⌘ D</span>
          </div>

          {/* Dashboard content */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
              <div className="font-mono text-sm space-y-2">
                <p className="text-foreground/60">
                  <span className="text-blue-400">const</span> user = {"{"}
                </p>
                <p className="text-foreground/80 pl-4">
                  email: <span className="text-green-400">&quot;{user.email}&quot;</span>,
                </p>
                <p className="text-foreground/80 pl-4">
                  id: <span className="text-yellow-400">&quot;{user.id}&quot;</span>,
                </p>
                <p className="text-foreground/80 pl-4">
                  authenticated: <span className="text-purple-400">true</span>
                </p>
                <p className="text-foreground/60">{"}"};</p>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6 mt-6">
              <p className="text-sm text-foreground/60 mb-4">
                <span className="font-mono text-green-400">$</span> Welcome to your snippet workspace!
              </p>
              
              <div className="grid gap-3">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg font-medium hover:bg-red-500/30 transition font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loggingOut ? (
                    <>
                      <span className="text-yellow-400">⏳</span> auth.logout()...
                    </>
                  ) : (
                    <>
                      <span>←</span> auth.logout()
                    </>
                  )}
                </button>
                
                <Link
                  href="/"
                  className="block text-center border border-foreground/20 px-4 py-3 rounded-lg font-medium hover:bg-foreground/5 transition"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CLI-style hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-foreground/40 font-mono">
            Hi, <span className="text-green-400">{user.email}</span>! 👋
          </p>
        </div>
      </div>
    </div>
  );
}
