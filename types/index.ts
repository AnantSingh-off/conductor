/* ──────────────────────────────────────────────────────────────────
   Project Status
   ────────────────────────────────────────────────────────────────── */

export type ProjectStatus =
  | 'draft'
  | 'brief_in_progress'
  | 'references_ready'
  | 'direction_pending'
  | 'direction_review'
  | 'direction_approved'
  | 'generating'
  | 'completed';

/* ──────────────────────────────────────────────────────────────────
   Profile
   ────────────────────────────────────────────────────────────────── */

export interface Profile {
  id: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Project
   ────────────────────────────────────────────────────────────────── */

export interface Project {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  description?: string;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  status?: ProjectStatus;
}

/* ──────────────────────────────────────────────────────────────────
   Project Input
   ────────────────────────────────────────────────────────────────── */

export type InputType = 'text' | 'document' | 'voice';

export interface ProjectInput {
  id: string;
  project_id: string;
  input_type: InputType;
  content: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Reference
   ────────────────────────────────────────────────────────────────── */

export type ReferenceType = 'image' | 'document' | 'url' | 'other';

export interface Reference {
  id: string;
  project_id: string;
  storage_path: string;
  reference_type: ReferenceType;
  note: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Creative Direction
   ────────────────────────────────────────────────────────────────── */

export type DirectionStatus = 'draft' | 'generated' | 'changes_requested' | 'approved';

export interface CreativeDirectionContent {
  summary: string;
  concept: string;
  audience: string;
  tone: string[];
  theme: string;
  visual_style: string;
  color_direction: string[];
  typography_direction: string;
  visual_motifs: string[];
  avoid: string[];
  rationale: string;
}

export interface CreativeDirection {
  id: string;
  project_id: string;
  version: number;
  status: DirectionStatus;
  content: CreativeDirectionContent;
  created_at: string;
  updated_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Project Decision
   ────────────────────────────────────────────────────────────────── */

export type DecisionType = 'approval' | 'rejection' | 'revision';

export interface ProjectDecision {
  id: string;
  project_id: string;
  decision_type: DecisionType;
  target_type: string;
  target_id: string;
  content: Record<string, unknown> | null;
  created_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Generation
   ────────────────────────────────────────────────────────────────── */

export type GenerationStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface Generation {
  id: string;
  project_id: string;
  generation_type: string;
  provider: string;
  model: string;
  input_snapshot: Record<string, unknown>;
  status: GenerationStatus;
  error: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

/* ──────────────────────────────────────────────────────────────────
   Generated Asset
   ────────────────────────────────────────────────────────────────── */

export interface GeneratedAsset {
  id: string;
  project_id: string;
  generation_id: string | null;
  storage_path: string;
  asset_type: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   Project Memory
   ────────────────────────────────────────────────────────────────── */

export type MemoryType =
  | 'input'
  | 'reference'
  | 'direction'
  | 'decision'
  | 'generation'
  | 'output'
  | 'note';

export interface ProjectMemory {
  id: string;
  project_id: string;
  memory_type: MemoryType;
  content: Record<string, unknown>;
  source: string;
  created_at: string;
}

/* ──────────────────────────────────────────────────────────────────
   API Response Helpers
   ────────────────────────────────────────────────────────────────── */

export interface ApiError {
  error: string;
  details?: string;
}

export interface ApiSuccess<T> {
  data: T;
}
