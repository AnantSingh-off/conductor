-- ============================================================
-- Migration 002: Create projects table
-- ============================================================
-- The central domain aggregate. All project-scoped data
-- references this table via project_id foreign key.
-- ============================================================

-- Create project status enum
CREATE TYPE public.project_status AS ENUM (
  'draft',
  'brief_in_progress',
  'references_ready',
  'direction_pending',
  'direction_review',
  'direction_approved',
  'generating',
  'completed'
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) >= 1 AND char_length(title) <= 100),
  description TEXT CHECK (description IS NULL OR char_length(description) <= 500),
  status public.project_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast owner lookups
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON public.projects(owner_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = owner_id);

-- Policy: Users can create projects (owner_id must match)
CREATE POLICY "Users can create own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Policy: Users can update their own projects
CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Policy: Users can delete their own projects
CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = owner_id);

-- Trigger: update projects.updated_at on change
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
