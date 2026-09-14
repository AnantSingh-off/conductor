import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { timeAgo, getStatusLabel, getStatusColor } from '@/lib/utils';
import type { Project } from '@/types';

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  const projectList: Project[] = projects || [];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            {projectList.length === 0
              ? 'Create your first project to get started'
              : `${projectList.length} project${projectList.length === 1 ? '' : 's'}`}
          </p>
        </div>

        <Link href="/projects/new" className="btn-primary" id="new-project-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </Link>
      </div>

      {error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive mb-6">
          Failed to load projects. Please try again.
        </div>
      )}

      {/* Empty State */}
      {projectList.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-24 animate-slide-up">
          <div className="w-20 h-20 rounded-2xl gradient-accent-subtle border border-accent/20 flex items-center justify-center mb-6 animate-pulse-glow">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Create your first project and let Conductor help you transform your
            creative vision into structured direction and stunning visuals.
          </p>
          <Link href="/projects/new" className="btn-primary animate-pulse-glow" id="empty-state-cta">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Your First Project
          </Link>
        </div>
      )}

      {/* Project Grid */}
      {projectList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectList.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`card-interactive group stagger-${Math.min(index + 1, 6)} animate-slide-up`}
              id={`project-card-${project.id}`}
            >
              {/* Top accent line */}
              <div className="h-1 w-12 rounded-full gradient-accent mb-4 transition-all duration-300 group-hover:w-20" />

              {/* Status badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusLabel(project.status)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-1">
                {project.title}
              </h3>

              {/* Description */}
              {project.description && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                <span className="text-xs text-muted-foreground">
                  {timeAgo(project.updated_at)}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
