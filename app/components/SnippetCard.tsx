"use client";

import { useState } from "react";

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onEdit: (snippet: Snippet) => void;
}

export default function SnippetCard({
  snippet,
  onDelete,
  onToggleFavorite,
  onEdit,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border border-foreground/20 rounded-lg bg-black/40 backdrop-blur-sm hover:border-foreground/30 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-foreground/[0.04]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleFavorite(snippet.id, !snippet.is_favorite)}
            className="text-xl hover:scale-110 transition-transform"
            title={snippet.is_favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {snippet.is_favorite ? "⭐" : "☆"}
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{snippet.title}</h3>
            <p className="text-xs text-foreground/50 font-mono">
              {snippet.language} • {formatDate(snippet.updated_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-mono border border-foreground/20 rounded hover:bg-foreground/5 transition"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
          <button
            onClick={() => onEdit(snippet)}
            className="px-3 py-1.5 text-xs font-mono border border-foreground/20 rounded hover:bg-foreground/5 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete "${snippet.title}"?`)) {
                onDelete(snippet.id);
              }
            }}
            className="px-3 py-1.5 text-xs font-mono border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Code preview */}
      <pre className="p-4 overflow-auto max-h-48 text-sm leading-relaxed bg-black/20">
        <code className="font-mono text-foreground/90">{snippet.code}</code>
      </pre>
    </div>
  );
}
