-- Create snippets table for storing code snippets
CREATE TABLE IF NOT EXISTS public.snippets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'plaintext',
  code TEXT NOT NULL,
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index on owner_id for faster user queries
CREATE INDEX IF NOT EXISTS idx_snippets_owner_id ON public.snippets(owner_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_snippets_created_at ON public.snippets(created_at DESC);

-- Create index on updated_at for recent updates
CREATE INDEX IF NOT EXISTS idx_snippets_updated_at ON public.snippets(updated_at DESC);

-- Create index on language for filtering
CREATE INDEX IF NOT EXISTS idx_snippets_language ON public.snippets(language);

-- Create index on is_favorite for quick favorites access
CREATE INDEX IF NOT EXISTS idx_snippets_is_favorite ON public.snippets(owner_id, is_favorite) WHERE is_favorite = true;

-- Create full-text search index on title and code
CREATE INDEX IF NOT EXISTS idx_snippets_search ON public.snippets USING GIN(
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(code, ''))
);

-- Enable Row Level Security
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own snippets
CREATE POLICY "Users can view own snippets" ON public.snippets
  FOR SELECT
  USING (auth.uid() = owner_id);

-- Policy: Users can insert their own snippets
CREATE POLICY "Users can insert own snippets" ON public.snippets
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Policy: Users can update their own snippets
CREATE POLICY "Users can update own snippets" ON public.snippets
  FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Policy: Users can delete their own snippets
CREATE POLICY "Users can delete own snippets" ON public.snippets
  FOR DELETE
  USING (auth.uid() = owner_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.snippets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add check constraint for language (popular languages)
ALTER TABLE public.snippets
ADD CONSTRAINT snippets_language_check
CHECK (language IN (
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'c',
  'go',
  'rust',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'scala',
  'dart',
  'r',
  'sql',
  'html',
  'css',
  'scss',
  'sass',
  'less',
  'json',
  'yaml',
  'xml',
  'markdown',
  'bash',
  'shell',
  'powershell',
  'dockerfile',
  'graphql',
  'lua',
  'perl',
  'elixir',
  'clojure',
  'haskell',
  'ocaml',
  'fsharp',
  'vim',
  'makefile',
  'toml',
  'ini',
  'plaintext',
  'other'
));

-- Add comment to table
COMMENT ON TABLE public.snippets IS 'Stores user code snippets with metadata';
COMMENT ON COLUMN public.snippets.id IS 'Unique identifier for the snippet';
COMMENT ON COLUMN public.snippets.title IS 'Title/name of the snippet';
COMMENT ON COLUMN public.snippets.language IS 'Programming language of the snippet';
COMMENT ON COLUMN public.snippets.code IS 'The actual code content';
COMMENT ON COLUMN public.snippets.is_favorite IS 'Whether the user marked this as favorite';
COMMENT ON COLUMN public.snippets.owner_id IS 'User ID who created this snippet';
COMMENT ON COLUMN public.snippets.created_at IS 'Timestamp when snippet was created';
COMMENT ON COLUMN public.snippets.updated_at IS 'Timestamp when snippet was last updated';
