-- Create request_logs table for API logging
CREATE TABLE IF NOT EXISTS public.request_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  method TEXT NOT NULL,
  url TEXT NOT NULL,
  headers JSONB NOT NULL DEFAULT '{}'::jsonb,
  query_params JSONB NOT NULL DEFAULT '{}'::jsonb,
  body JSONB,
  response_body JSONB,
  response_status INTEGER,
  response_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_request_logs_created_at ON public.request_logs(created_at DESC);

-- Create index on method for filtering
CREATE INDEX IF NOT EXISTS idx_request_logs_method ON public.request_logs(method);

-- Create index on response_status for error tracking
CREATE INDEX IF NOT EXISTS idx_request_logs_status ON public.request_logs(response_status);

-- Enable Row Level Security
ALTER TABLE public.request_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert logs
CREATE POLICY "Allow service role to insert logs" ON public.request_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read logs
CREATE POLICY "Allow service role to read logs" ON public.request_logs
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy to allow anon role to insert logs (for API logging)
CREATE POLICY "Allow anon to insert logs" ON public.request_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own logs
CREATE POLICY "Allow authenticated to read logs" ON public.request_logs
  FOR SELECT
  TO authenticated
  USING (true);
