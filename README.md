# Conductor

A project-based AI-assisted creative workflow orchestration platform for solo designers.

## Overview

Conductor helps solo designers transform unstructured creative ideas into structured creative projects with persistent memory. The platform guides users through a clear workflow from initial concept to approved creative direction and hero poster generation.

## Key Features

- **Project Management**: Create and manage creative projects
- **Context Capture**: Store briefs, documents, references, and creative decisions
- **AI-Assisted Direction**: Generate structured creative direction
- **Approval Workflows**: Review, approve, and revise creative direction
- **Hero Generation**: Generate hero posters with full context preservation
- **Persistent Memory**: Maintain project context for future work

## Project Structure

```
app/                    # Next.js routes
  ├── (auth)/          # Auth routes
  ├── dashboard/       # Dashboard
  ├── projects/        # Project routes
  │   └── [projectId]/ # Project workspace
  └── api/             # API routes
components/            # UI components
lib/                   # Libraries and utilities
  ├── supabase/        # Supabase integration
  ├── ai/              # AI service abstractions
  ├── auth/            # Authentication
  └── validation/      # Input validation
services/              # Domain services
  ├── projects/        # Project management
  ├── references/      # Reference handling
  ├── memory/          # Project memory
  ├── creative-direction/ # Creative direction
  └── generation/      # Generation services
t```

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Type Check

```bash
yarn type-check
```

## Architecture

### Technology Stack

- **Framework**: Next.js 14 (React 18)
- **Auth**: Supabase Auth (SSR)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS + shadcn/ui
- **Validation**: Zod

### Architecture Principles

1. **Domain-Driven Design**: Clear service boundaries
2. **AI Provider Abstraction**: Replaceable AI services
3. **Database Authoritative**: Persistent source of truth
4. **Explicit Approval**: Non-negotiable workflow checkpoints
5. **Structured Memory**: Project context in structured records
6. **Authorization Close to Data**: Row-level security

### Authentication Flow

```
User → Next.js UI → Supabase Auth → Server-side Validation → Domain Operations
```

### Project Architecture

A project is the central aggregate owning:
- Briefs (ProjectInput)
- References (Reference)
- Creative Directions
- Decisions (ProjectDecision)
- Generations
- Assets (GeneratedAsset)
- Memory (ProjectMemory)

### V1 Development Milestones

1. **Milestone 1**: Authentication + dashboard + project creation
2. **Milestone 2**: Project workspace + brief persistence
3. **Milestone 3**: File/reference upload
4. **Milestone 4**: Creative direction generation
5. **Milestone 5**: Approval flow
6. **Milestone 6**: Hero generation
7. **Milestone 7**: Project memory polish + error handling + observability

## API Routes

### Projects

- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project
- `PATCH /api/projects/:id` - Update project

### Inputs

- `POST /api/inputs` - Create project input
- `GET /api/inputs/:id` - Get input

### References

- `POST /api/references` - Upload reference
- `GET /api/references/:id` - Get reference
- `DELETE /api/references/:id` - Delete reference

### Creative Directions

- `POST /api/creative-directions` - Generate direction
- `PATCH /api/creative-directions/:id` - Update direction
- `POST /api/creative-directions/:id/approve` - Approve direction

### Generations

- `POST /api/generations` - Request generation
- `GET /api/generations/:id` - Get generation status
- `POST /api/generations/:id/persist` - Persist result

### Memory

- `GET /api/memory/:projectId` - Get project memory
- `POST /api/memory` - Record memory entry

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AI_PROVIDER_API_KEY=your_ai_api_key
```

## License

MIT