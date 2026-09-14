import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format } from 'date-fns';

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date as relative time (e.g. "3 days ago") */
export function timeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/** Format a date in a readable format */
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy');
}

/** Map project status to display label */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Draft',
    brief_in_progress: 'Brief in Progress',
    references_ready: 'References Ready',
    direction_pending: 'Direction Pending',
    direction_review: 'In Review',
    direction_approved: 'Approved',
    generating: 'Generating',
    completed: 'Completed',
  };
  return labels[status] || status;
}

/** Map project status to accent color class */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-muted text-muted-foreground',
    brief_in_progress: 'bg-amber-500/20 text-amber-400',
    references_ready: 'bg-blue-500/20 text-blue-400',
    direction_pending: 'bg-purple-500/20 text-purple-400',
    direction_review: 'bg-orange-500/20 text-orange-400',
    direction_approved: 'bg-emerald-500/20 text-emerald-400',
    generating: 'bg-violet-500/20 text-violet-400',
    completed: 'bg-green-500/20 text-green-400',
  };
  return colors[status] || 'bg-muted text-muted-foreground';
}
