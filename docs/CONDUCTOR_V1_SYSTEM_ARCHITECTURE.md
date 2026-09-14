# CONDUCTOR — Version 1.0 System Architecture
## Solo Designer MVP

# 1. Architecture Goal

Build a production-minded monolithic web application with clear internal boundaries.

Do not begin with microservices.

The initial architecture should optimize for:

- Development speed
- Understandability
- Security
- Maintainability
- Future extensibility

---

# 2. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │       USER           │
                         │    Solo Designer     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      NEXT.JS APP     │
                         │                      │
                         │  - UI / React        │
                         │  - Server Logic      │
                         │  - API Boundaries    │
                         └──────────┬───────────┘
                                    │
                ┌───────────────────┼────────────────────┐
                │                   │                    │
                ▼                   ▼                    ▼
       ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
       │ PROJECT DOMAIN │  │  AI SERVICES   │  │ FILE SERVICES  │
       │                │  │                │  │                │
       │ Projects       │  │ Direction Gen  │  │ Upload          │
       │ References     │  │ Prompt Gen     │  │ Validation      │
       │ Memory         │  │ Image Gen      │  │ Retrieval       │
       │ Decisions      │  │                │  │                │
       └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
               │                   │                    │
               └───────────────┬───┴────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      SUPABASE       │
                    │                     │
                    │ Auth                │
                    │ PostgreSQL          │
                    │ Storage             │
                    │ Row Level Security  │
                    └─────────────────────┘
```

---

# 3. Client Layer

The browser is responsible for:

- Rendering UI
- Collecting user input
- Displaying project state
- Upload interaction
- Displaying generation progress
- Requesting actions from server-side application logic

The browser should not directly own:

- AI secrets
- Authorization decisions
- Sensitive database credentials
- Core business logic

---

# 4. Application Layer

The Next.js application acts as the initial application boundary.

Responsibilities:

- Route requests
- Authenticate sessions
- Validate user input
- Enforce ownership
- Call domain services
- Coordinate AI providers
- Persist results

The application should be organized around domains rather than becoming a single collection of route handlers.

Primary domains:

```text
Auth
Projects
Inputs
References
Creative Directions
Decisions
Generations
Assets
Project Memory
```

---

# 5. Authentication Architecture

Recommended flow:

```text
User
  │
  ▼
Next.js UI
  │
  ▼
Supabase Auth
  │
  ▼
Authenticated Session
  │
  ▼
Server-side request validates identity
  │
  ▼
Domain operation executes
```

The authenticated user identity is used to enforce project ownership.

---

# 6. Project Architecture

The Project is the central aggregate.

```text
Project
│
├── Inputs
├── References
├── Creative Directions
├── Decisions
├── Generations
├── Assets
└── Memory Entries
```

Conceptually:

```text
User
  │ 1
  │
  │ owns
  ▼ *
Project
  │
  ├────> Inputs
  ├────> References
  ├────> Creative Directions
  ├────> Decisions
  ├────> Generations
  ├────> Assets
  └────> Memory
```

---

# 7. Data Flow: Creative Kickoff

```text
Raw User Input
(text / file / image)
        │
        ▼
Input Validation
        │
        ▼
Persistent Project Input
        │
        ▼
Context Extraction / Processing
        │
        ▼
Structured Context
        │
        ▼
Project Memory
```

Important rule:

Raw input should not be discarded after AI processing.

Preserve original user-provided information where practical.

---

# 8. Reference Architecture

References are project-scoped.

```text
User Upload
    │
    ▼
Validate Type / Size
    │
    ▼
Private Storage
    │
    ▼
Create Reference Metadata Record
    │
    ▼
Associate with Project
    │
    ▼
Optional User Annotation
```

The database stores metadata.

Storage stores binary content.

Do not store large binary files directly in PostgreSQL unless there is a specific reason.

---

# 9. Creative Direction Architecture

Creative direction is an AI-assisted but user-controlled artifact.

```text
Project Context
+
References
+
Relevant Memory
        │
        ▼
Creative Direction Service
        │
        ▼
AI Provider
        │
        ▼
Structured Output
        │
        ▼
Schema Validation
        │
        ▼
Direction Draft
        │
        ▼
User Review
     ┌──┴──┐
     │     │
 Revise  Approve
     │     │
     └──┬──┘
        ▼
Approved Direction + Decision Memory
```

Never assume model output is valid application data.

Validate it.

---

# 10. Approval Architecture

Approval is a domain event.

It should be represented explicitly.

Example:

```text
Creative Direction
status = generated
        │
        ▼
User approves
        │
        ├── Update direction status
        ├── Create decision record
        └── Create/update memory entry
```

This prevents important user choices from existing only in UI state.

---

# 11. Hero Generation Architecture

```text
Approved Creative Direction
          │
          ├──────────────┐
          ▼              ▼
Project Memory      References
          │              │
          └──────┬───────┘
                 ▼
       Generation Prompt Builder
                 │
                 ▼
        Generation Record Created
                 │
                 ▼
             QUEUED
                 │
                 ▼
           PROCESSING
                 │
                 ▼
       Image Generation Provider
                 │
          ┌──────┴───────┐
          ▼              ▼
       SUCCESS         FAILURE
          │              │
          ▼              ▼
      Save Asset     Save Error
          │
          ▼
      COMPLETED
          │
          ▼
Update Project Memory
```

---

# 12. Generation Data Model

Generation should be a first-class entity.

Suggested fields:

```text
id
project_id
generation_type
provider
model
input_snapshot
status
error
started_at
completed_at
created_at
```

Why an input snapshot?

Because generation behavior may need to be debugged later.

The snapshot can preserve the relevant prompt/context used at the time.

Be careful not to store secrets.

---

# 13. Project Memory Architecture

V1 memory can be relational and structured.

```text
Project
   │
   ▼
ProjectMemoryEntry
   │
   ├── memory_type
   ├── structured_content
   ├── source
   ├── importance
   └── created_at
```

Example memory types:

```text
input
reference
direction
decision
generation
output
note
```

Potential future extension:

```text
Structured Memory
       +
Semantic Retrieval Layer
(Vector Search)
```

Do not build the vector layer until a concrete retrieval requirement exists.

---

# 14. Database Architecture

Recommended initial relational entities:

## profiles

```text
id PK
display_name
created_at
updated_at
```

References authenticated user identity.

## projects

```text
id PK
owner_id FK
title
description
status
created_at
updated_at
```

## project_inputs

```text
id PK
project_id FK
input_type
content
metadata JSONB
created_at
```

## references

```text
id PK
project_id FK
storage_path
reference_type
note
metadata JSONB
created_at
```

## creative_directions

```text
id PK
project_id FK
version
status
content JSONB
created_at
updated_at
```

## project_decisions

```text
id PK
project_id FK
decision_type
target_type
target_id
content JSONB
created_at
```

## generations

```text
id PK
project_id FK
generation_type
provider
model
input_snapshot JSONB
status
error
created_at
started_at
completed_at
```

## generated_assets

```text
id PK
project_id FK
generation_id FK nullable
storage_path
asset_type
metadata JSONB
created_at
```

## project_memory

```text
id PK
project_id FK
memory_type
content JSONB
source
created_at
```

The exact schema can be refined during implementation.

---

# 15. Authorization Architecture

All project-owned tables should support owner isolation.

Conceptually:

```text
Authenticated User
        │
        ▼
Project Owner Check
        │
        ▼
Allowed Project Operation
```

Supabase Row Level Security should reinforce this at the database layer.

Do not depend solely on application-layer checks.

---

# 16. Storage Architecture

Suggested storage categories:

```text
project-inputs/
project-references/
generated-assets/
```

Paths may be namespaced by:

```text
user_id / project_id / file
```

Example conceptual structure:

```text
user-123/
  project-456/
    inputs/
    references/
    generated/
```

Storage path conventions should be deterministic enough to support debugging and cleanup.

---

# 17. API / Service Boundaries

A clean initial conceptual boundary:

```text
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

Exact function names are implementation choices.

---

# 18. AI Provider Abstraction

Avoid this pattern:

```text
React Component
   └── directly calls Provider SDK
```

Prefer:

```text
UI
 │
 ▼
Application / Domain Service
 │
 ▼
AI Provider Adapter
 │
 ├── Text Model
 └── Image Model
```

This enables:

- Provider changes
- Testing
- Mock implementations
- Centralized prompt management
- Error handling

---

# 19. Failure Modes to Design For

## Upload Failure
Do not create a reference record pointing to a file that does not exist.

## AI Structured Output Failure
Validate output and surface retry/revision options.

## Image Generation Failure
Persist failed generation state.

Do not destroy the approved creative direction.

## Network Interruption
The project and prior completed state should remain intact.

## Duplicate Generation Requests
Consider preventing accidental duplicate submissions.

## Unauthorized Access
RLS and server-side ownership validation should reject access.

---

# 20. Background Jobs

V1 may not require Redis/BullMQ immediately.

However, generation records should already contain asynchronous states.

Initial implementation:

```text
Request
→ create generation record
→ call provider
→ save result
```

Later:

```text
Request
→ create queued generation
→ enqueue job
→ worker processes
→ save result
→ client polls/subscribes
```

The domain model should support both.

---

# 21. Observability

Minimum useful observability:

- Server errors
- AI generation failures
- Request IDs where useful
- Generation duration
- Provider/model metadata

Future:

- Structured logging
- Error tracking
- Metrics
- Tracing

---

# 22. Recommended Build Order

## Phase 1 — Foundation

```text
Next.js
TypeScript
Supabase
Authentication
Basic UI
```

## Phase 2 — Projects

```text
Dashboard
Create project
Project workspace
Ownership / RLS
```

## Phase 3 — Inputs and References

```text
Text brief
File upload
Reference upload
Storage metadata
```

## Phase 4 — Creative Intelligence

```text
Context assembly
Creative direction generation
Structured validation
```

## Phase 5 — Approval

```text
Review UI
Approve
Revise
Decision persistence
```

## Phase 6 — Hero Generation

```text
Generation record
Provider call
Status handling
Asset persistence
```

## Phase 7 — Hardening

```text
Errors
Loading states
Security review
Observability
Testing
```

---

# 23. Architecture Decision Summary

For Version 1:

- Use a modular monolith.
- Use Next.js as the application.
- Use Supabase for auth, PostgreSQL, storage, and RLS.
- Treat projects as the central domain aggregate.
- Treat project memory as persistent structured context.
- Keep AI providers behind service boundaries.
- Persist approvals explicitly.
- Treat generations as stateful records.
- Keep team collaboration out of active scope.
- Avoid unnecessary infrastructure until real requirements demand it.

This architecture is intended to be understandable by a single engineering student while still following production-oriented engineering principles.
