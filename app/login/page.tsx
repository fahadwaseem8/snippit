"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic with Supabase
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center p-6 relative">
      {/* Terminal-style background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)]"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 text-2xl font-semibold mb-8">
          <span className="text-3xl">🧷</span>
          <span>Snippit</span>
        </Link>

        {/* Terminal-style auth card */}
        <div className="border border-foreground/20 rounded-lg bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-foreground/[0.08] border-b border-foreground/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="font-mono text-xs text-foreground/60 ml-2">~/snippit/auth/login</span>
            </div>
            <span className="font-mono text-xs text-foreground/40">⌘ K</span>
          </div>

          {/* Form content */}
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
              <p className="text-sm text-foreground/60">
                <span className="font-mono text-green-400">$</span> Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-mono text-foreground/70">
                  <span className="text-blue-400">const</span> email = <span className="text-yellow-400">&quot;</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-foreground/20 rounded-lg focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition font-mono text-sm placeholder:text-foreground/30"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-mono text-foreground/70">
                  <span className="text-blue-400">const</span> password = <span className="text-yellow-400">&quot;</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-foreground/20 rounded-lg focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition font-mono text-sm placeholder:text-foreground/30"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:opacity-90 transition mt-2 font-mono"
              >
                <span className="text-green-400">→</span> auth.login()
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                {`// `}Don&apos;t have an account?{" "}
                <Link href="/register" className="text-foreground hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* CLI-style hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-foreground/40 font-mono">
            Press <kbd className="px-2 py-1 bg-foreground/10 rounded border border-foreground/20">Enter</kbd> to submit
          </p>
        </div>
      </div>
    </div>
  );
}
