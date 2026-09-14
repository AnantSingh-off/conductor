# Conductor Project - Architecture and Development Guidelines

## Overview

This project is a production-oriented AI-assisted creative workflow orchestration platform for solo designers. Version 1.0 establishes the core primitives while maintaining a clean architecture for future growth.

## Architecture Principles

### 1. Domain-Driven Design
- Projects are the central domain aggregate
- Clear service boundaries between domains
- No arbitrary React component ownership of domain logic

### 2. AI Provider Abstraction
```
UI → Application Service → AI Provider Adapter → Model APIs
```

### 3. Database is Authoritative
- Persistent source of truth
- Structured relational memory (not chat transcripts)
- Row-level security for data isolation

### 4. Explicit Approval Checkpoints
- Non-negotiable workflow from generation to approval
- Every major decision stored as a domain event

### 5. Structured Memory
```json
{
  "project_id": "...",
  "memory_type": "direction",
  "content": {
    "tone": "punk rock",
    "primary_colors": ["red", "black"],
    "visual_motif": "painted textures"
  },
  "source": "ai_generated_direction",
  "created_at": "..."
}
```

### 6. Authorization Close to Data
- Server-side ownership validation
- Supabase Row Level Security as enforcement
- No hiding UI as security

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React hooks + Tanstack Query
- **Validation**: Zod

### Backend
- **Auth**: Supabase Auth (SSR)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage
- **AI**: Provider abstraction layer

### Development
- **Language**: TypeScript
- **Build**: Next.js
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

## Directory Structure

```
conductor/
├── app/                    # Next.js routes
│   ├── (auth)/            # Auth routes
│   ├── dashboard/         # Dashboard
│   ├── projects/          # Project routes
│   │   └── [projectId]/   # Project workspace
│   └── api/               # API routes
├── components/             # UI components
│   ├── ui/                # Base UI components
│   ├── projects/          # Project-specific components
│   ├── references/        # Reference components
│   └── creative-direction/ # Direction components
├── lib/                    # Libraries and utilities
│   ├── supabase/          # Supabase integration
│   ├── ai/                # AI service abstractions
│   ├── auth/              # Authentication
│   └── validation/        # Input validation
├── services/               # Domain services
│   ├── projects/          # Project management
│   ├── references/        # Reference handling
│   ├── memory/            # Project memory
│   ├── creative-direction/ # Creative direction
│   └── generation/        # Generation services
├── types/                  # Type definitions
├── db/                     # Database setup
│   └── migrations/        # Migration files
├── tests/                  # Test files
└── public/                 # Static assets
```

## Core Data Model

### User
- References authenticated user identity
- Owns projects through foreign key

### Project
- Central domain aggregate
- Owns all related data
- Tracks status through workflow states

### ProjectInput
- User-provided briefs and documents
- Preserved for debugging and memory

### Reference
- Project-scoped visual references
- Storage path for binary files
- Metadata and user notes

### CreativeDirection
- AI-generated structured output
- Reviewable before approval
- Version-controlled for history

### ProjectDecision
- Explicit user choices
- Approval, rejection, revision requests
- Forms part of project memory

### Generation
- Stateful generation requests
- Async workflow support
- Provider/model tracking

### GeneratedAsset
- Hero poster outputs
- Storage path
- Associated generation record

### ProjectMemory
- Structured contextual knowledge
- Multiple memory types
- Source tracking

## Development Milestones

### V1 Priority
1. Authentication + dashboard + project creation
2. Project workspace + brief persistence
3. File/reference upload
4. Creative direction generation
5. Approval flow
6. Hero generation
7. Project memory polish + error handling + observability

### Future Planning
- Team collaboration (V2/V3)
- Creative asset pipelines
- Deliverable templates
- Task orchestration
- Approvals workflow
- Multi-asset generation
- Retrieval/vector memory

## API Design

### Service Boundaries
```
ProjectService
├── createProject
├── getProject
├── listProjects
└── updateProject

InputService
├── createTextInput
├── processDocument
└── attachInput

ReferenceService
├── uploadReference
├── listReferences
└── deleteReference

CreativeDirectionService
├── generateDirection
├── reviseDirection
└── approveDirection

GenerationService
├── requestGeneration
├── getGenerationStatus
└── persistResult

MemoryService
├── recordMemory
├── getRelevantMemory
└── summarizeProjectState
```

## Security Requirements

### Authentication
- Secure user authentication
- Persistent authenticated sessions
- Token-based session management

### Authorization
- Row-level security for all tables
- Project ownership validation
- No client-side authorization

### Data Protection
- AI API keys in environment variables
- Private storage by default
- Input validation and sanitization
- File type/size validation

### Error Handling
- No silent failures
- Useful error messages for users
- Server-side logging
- Recoverable states where possible

## AI Integration

### Creative Direction Schema
```json
{
  "summary": "...",
  "concept": "...",
  "audience": "...",
  "tone": ["..."],
  "theme": "...",
  "visual_style": "...",
  "color_direction": ["..."],
  "typography_direction": "...",
  "visual_motifs": ["..."],
  "avoid": ["..."],
  "rationale": "..."
}
```

### Generation Strategy
```
Request → Validation → Record Creation → Queue → Process → Store → Complete
```

### Provider Abstraction
```
AIService
├── generateCreativeDirection()
├── summarizeProjectContext()
└── generateHeroPrompt()

ImageGenerationService
└── generateHeroAsset()
```

## Testing Strategy

### Unit Tests
- Service layer unit tests
- Validation functions
- Utility functions

### Integration Tests
- API route handlers
- Service integration
- Database operations

### E2E Tests
- Critical user workflows
- Authentication flows
- Project lifecycle

## Deployment

### Hosting
- Vercel for Next.js application
- Managed Supabase for backend

### Environment Management
- Development: .env.local
- Production: .env.production
- CI/CD pipeline configuration

### Observability
- Server errors tracking
- AI generation failures
- Request metrics
- Generation duration
- Provider/model metadata

## Development Workflow

### Coding Guidelines
1. **Read context first**: Always read relevant PRD, architecture
2. **Inspect existing repo**: Before changing architecture
3. **Prefer small changes**: Avoid rewriting working modules
4. **Explicit types**: TypeScript-first approach
5. **Validate inputs**: Zod validation for all external data
6. **Preserve migrations**: Database changes in migration files
7. **Explain decisions**: Document architectural choices
8. **Plan before building**: Identify all requirements

### Code Reviews
- Domain logic grouped coherently
- Clear separation of concerns
- AI providers behind service boundaries
- Approval events explicitly stored

## Current Scope (V1)

### In Scope
- Authentication (signup, signin, signout)
- Project management (create, view, edit metadata)
- Creative brief input (text, docs, references, voice)
- Reference gathering and storage
- Creative direction generation
- Approval checkpoints
- Hero poster generation
- Persistent project memory

### Explicitly Out of Scope for V1
- Team collaboration
- Role-based permissions
- Real-time collaboration
- Full campaign asset generation
- Mobile application
- Autonomous multi-agent pipelines

## Git Configuration

### Branch Strategy
- `main`: Production-ready
- Feature branches for implementation
- No merge queue (single maintainer)

### Commit Messages
- Use imperative mood
- Include scope where appropriate
- Reference issues in body

### Co-authored-by
Every commit should include:
```
Co-authored-by: Claude Code <noreply@anthropic.com>
```

## Troubleshooting

### Common Issues
1. **Supabase connection**: Check environment variables
2. **AI provider errors**: Verify API keys
3. **File uploads**: Check file size/type limits
4. **Authentication**: Ensure Next.js app router configuration

### Development Tips
1. Use `/dev/` for development
2. Incremental builds with `next dev`
3. Type checking with `tsc --noEmit`
4. Test critical workflows manually
5. Check Supabase dashboard for RLS policies

## Future Architecture Notes

### Team Collaboration
- Add team workspaces
- Implement role-based permissions
- Real-time collaboration features

### Advanced Features
- Creative asset pipelines
- Deliverable templates
- Multi-asset generation
- Social publishing

### Infrastructure
- Background workers
- Vector memory retrieval
- Multi-model AI routing
- Advanced observability

This architecture provides a solid foundation for a production-oriented creative workflow platform while maintaining the flexibility to evolve into a comprehensive creative collaboration suite.