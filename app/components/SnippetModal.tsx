"use client";

import { useState, useEffect } from "react";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  is_favorite: boolean;
}

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (snippet: { title: string; language: string; code: string; is_favorite: boolean }) => void;
  editingSnippet?: Snippet | null;
}

const LANGUAGES = [
  "javascript", "typescript", "python", "java", "csharp", "cpp", "c", "go", "rust",
  "ruby", "php", "swift", "kotlin", "scala", "dart", "r", "sql", "html", "css",
  "scss", "sass", "less", "json", "yaml", "xml", "markdown", "bash", "shell",
  "powershell", "dockerfile", "graphql", "lua", "perl", "elixir", "clojure",
  "haskell", "ocaml", "fsharp", "vim", "makefile", "toml", "ini", "plaintext", "other"
];

export default function SnippetModal({ isOpen, onClose, onSave, editingSnippet }: SnippetModalProps) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setLanguage(editingSnippet.language);
      setCode(editingSnippet.code);
      setIsFavorite(editingSnippet.is_favorite);
    } else {
      setTitle("");
      setLanguage("javascript");
      setCode("");
      setIsFavorite(false);
    }
  }, [editingSnippet, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, language, code, is_favorite: isFavorite });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl border border-foreground/20 rounded-lg bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-foreground/[0.08] border-b border-foreground/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="font-mono text-xs text-foreground/60 ml-2">
              {editingSnippet ? "~/snippit/edit" : "~/snippit/new"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-mono text-foreground/70 mb-2">
              <span className="text-purple-400">const</span> title = <span className="text-yellow-400">&quot;</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My awesome snippet"
              required
              className="w-full px-4 py-3 bg-black/40 border border-foreground/20 rounded-lg focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition font-mono text-sm"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-mono text-foreground/70 mb-2">
              <span className="text-purple-400">const</span> language = <span className="text-yellow-400">&quot;</span>
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-foreground/20 rounded-lg focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition font-mono text-sm"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-mono text-foreground/70 mb-2">
              <span className="text-purple-400">const</span> code = <span className="text-yellow-400">`</span>
            </label>
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Your code here..."
              required
              rows={12}
              className="w-full px-4 py-3 bg-black/40 border border-foreground/20 rounded-lg focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition font-mono text-sm resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="favorite"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="favorite" className="text-sm font-mono text-foreground/70">
              ⭐ Mark as favorite
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:opacity-90 transition font-mono"
            >
              <span className="text-green-400">→</span> {editingSnippet ? "snippet.update()" : "snippet.create()"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:bg-foreground/5 transition font-mono"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
