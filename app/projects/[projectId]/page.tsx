import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getStatusLabel, getStatusColor, formatDate } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectWorkspacePage({ params }: ProjectPageProps) {
  const supabase = createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.projectId)
    .single();

  if (error || !project) {
    notFound();
  }

  const typedProject = project as Project;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="btn-ghost -ml-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Dashboard
              </Link>
              <div className="h-5 w-px bg-border/60" />
              <h1 className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">
                {typedProject.title}
              </h1>
            </div>

            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                typedProject.status
              )}`}
            >
              {getStatusLabel(typedProject.status)}
            </span>
          </div>
        </div>
      </nav>

      {/* Workspace Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Project Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            {typedProject.title}
          </h2>
          {typedProject.description && (
            <p className="text-muted-foreground text-lg max-w-2xl">
              {typedProject.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>Created {formatDate(typedProject.created_at)}</span>
          </div>
        </div>

        {/* Workflow Steps — Phase 2+ will fill these */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Creative Brief */}
          <div className="card gradient-border lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Creative Brief</h3>
                <p className="text-xs text-muted-foreground">
                  Describe your creative vision
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 border border-border/30 p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Brief input will be available in the next phase.
              </p>
            </div>
          </div>

          {/* References */}
          <div className="card gradient-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">References</h3>
                <p className="text-xs text-muted-foreground">
                  Upload inspiration
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 border border-border/30 p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Coming in Phase 3.
              </p>
            </div>
          </div>

          {/* Creative Direction */}
          <div className="card gradient-border lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Creative Direction</h3>
                <p className="text-xs text-muted-foreground">
                  AI-generated direction based on your brief
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 border border-border/30 p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Coming in Phase 4.
              </p>
            </div>
          </div>

          {/* Hero Generation */}
          <div className="card gradient-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-400"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Hero Generation</h3>
                <p className="text-xs text-muted-foreground">
                  Generate hero poster
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 border border-border/30 p-6 text-center">
              <p className="text-muted-foreground text-sm">
                Coming in Phase 6.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
