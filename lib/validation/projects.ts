import { z } from 'zod';

/** Schema for creating a new project */
export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Project title is required')
    .max(100, 'Title must be 100 characters or less'),
  description: z
    .string()
    .trim()
    .max(500, 'Description must be 500 characters or less')
    .optional()
    .or(z.literal('')),
});

/** Schema for updating a project */
export const updateProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Project title is required')
    .max(100, 'Title must be 100 characters or less')
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, 'Description must be 500 characters or less')
    .optional()
    .or(z.literal('')),
  status: z
    .enum([
      'draft',
      'brief_in_progress',
      'references_ready',
      'direction_pending',
      'direction_review',
      'direction_approved',
      'generating',
      'completed',
    ])
    .optional(),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;
export type UpdateProjectForm = z.infer<typeof updateProjectSchema>;
