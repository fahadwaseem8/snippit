-- =====================================================
-- Migration: Create request_logs table for API logging
-- =====================================================
-- This table stores all API request/response logs for monitoring and debugging.
-- 
-- IMPORTANT: RLS Policies
-- - Service role: Full access (for admin/backend operations)
-- - Anon role: Can INSERT logs (required for API logging from Vercel/production)
-- - Authenticated: Can READ logs (for dashboard/analytics)
-- 
-- Without the anon INSERT policy, API logging will fail silently in production!
-- =====================================================

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

-- Create policy to allow service role full access
CREATE POLICY "Service role has full access" ON public.request_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anon role to insert logs (for API logging)
-- This is required for the API logger to work from Vercel/production
CREATE POLICY "Anon can insert logs" ON public.request_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read logs
CREATE POLICY "Authenticated users can read logs" ON public.request_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create policy to allow public read access (comment out if not needed)
-- CREATE POLICY "Public read access" ON public.request_logs
--   FOR SELECT
--   TO public
--   USING (true);
