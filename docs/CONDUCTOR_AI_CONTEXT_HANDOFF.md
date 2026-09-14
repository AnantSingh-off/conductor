# CONDUCTOR — AI Context Handoff
## Implementation Context for Claude Code, Cursor, Codex, and Other AI Coding Agents

You are working on **Conductor**, a serious product project being built incrementally.

Do not treat this as a hackathon prototype or a single-page AI demo.

The goal is to build a production-minded creative workflow orchestration platform while maintaining an intentionally small Version 1 scope.

---

# 1. What Conductor Is

Conductor is a **project-based AI-assisted creative workflow orchestration platform**.

The first use case is a solo designer.

The user starts with an unstructured creative idea and provides:

- Text
- Notes
- Optional voice input
- Documents
- PDFs
- Images
- Visual references

Conductor helps transform this into:

1. Structured project context
2. References
3. Creative direction
4. Human approval
5. One generated hero poster
6. Persistent project memory

The core idea is:

> Human creative spark + structured project context + approval checkpoints + AI-assisted generation + persistent memory.

Conductor should not be designed as a generic chat application.

---

# 2. Product Philosophy

The human owns:

- Intent
- Taste
- Creative judgment
- Approval

The system helps with:

- Context organization
- Structured reasoning
- Memory
- Reference management
- Prompt construction
- Generation orchestration
- Persistence

Do not remove the human approval checkpoint from the core workflow.

---

# 3. Current Scope

We are building Version 1.0.

The primary supported user is a solo designer.

A future team mode is planned but does not need to function in V1.

However, avoid architectural decisions that make multi-user/team workspaces impossible later.

---

# 4. Required V1 Workflow

The end-to-end workflow is:

```text
User Authentication
        ↓
Dashboard
        ↓
Create Project
        ↓
Creative Kickoff
(text / files / references)
        ↓
Context Processing
        ↓
Reference Collection
        ↓
Creative Direction Generation
        ↓
User Review
        ↓
Approve / Revise
        ↓
Hero Poster Generation
        ↓
Persist Asset + Generation Metadata
        ↓
Project Memory Updated
```

This workflow is the product backbone.

---

# 5. Primary Product Primitive: Project

Everything should revolve around a project.

A project owns or connects to:

- Briefs
- Files
- References
- Creative directions
- Decisions
- Generations
- Assets
- Memory

Do not build global application state that becomes the primary source of truth.

The persistent database is the source of truth.

---

# 6. Project Memory

Project memory is a core requirement.

Important distinction:

Project memory is NOT simply a saved chat transcript.

It should be persistent contextual knowledge represented in structured records.

Suggested memory categories:

- input
- reference
- direction
- decision
- generation
- output
- note

Memory entries should preserve provenance when possible.

Example:

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

The exact schema may evolve.

Do not implement embeddings/vector search unless needed for the current feature.

Structured relational memory is sufficient for the first implementation.

---

# 7. Architecture Principles

Follow these rules.

## 7.1 Separation of concerns

Do not place:

- database logic
- AI provider calls
- authorization logic
- prompt construction

inside arbitrary React components.

Create clear service/module boundaries.

## 7.2 Database is authoritative

AI output can suggest information.

The database stores approved and persistent truth.

## 7.3 AI providers are replaceable

Create an AI service abstraction.

Avoid spreading provider SDK calls throughout the application.

Example conceptual boundary:

```text
AIService
├── generateCreativeDirection()
├── summarizeProjectContext()
└── generateHeroPrompt()

ImageGenerationService
└── generateHeroAsset()
```

Exact implementation is flexible.

## 7.4 Authorization belongs close to the data boundary

Every project operation must validate ownership.

Do not rely only on hiding UI.

## 7.5 Async work needs explicit state

Generation requests must have persisted states.

Suggested:

```text
queued
processing
completed
failed
```

---

# 8. Recommended V1 Tech Stack

## Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui or equivalent component primitives

## Backend / Platform

- Next.js server-side capabilities for the initial application
- Supabase

Supabase responsibilities:

- Authentication
- PostgreSQL database
- Storage
- Row Level Security

## AI

Use an AI provider abstraction.

Initial provider can support:

- Structured text generation
- Creative direction generation
- Prompt generation
- Image generation where appropriate

Do not tightly couple the entire codebase to one AI provider.

## Hosting

- Vercel or equivalent for the web application
- Managed Supabase

---

# 9. Suggested Repository Structure

A possible structure:

```text
conductor/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── projects/
│   │   └── [projectId]/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── projects/
│   ├── references/
│   └── creative-direction/
│
├── lib/
│   ├── supabase/
│   ├── ai/
│   ├── auth/
│   └── validation/
│
├── services/
│   ├── projects/
│   ├── references/
│   ├── memory/
│   ├── creative-direction/
│   └── generation/
│
├── types/
│
├── db/
│   └── migrations/
│
└── tests/
```

This is guidance, not a mandatory literal structure.

Keep domain logic grouped coherently.

---

# 10. Initial Data Domains

At minimum, expect entities similar to:

```text
User
Project
ProjectInput
Reference
CreativeDirection
ProjectDecision
Generation
GeneratedAsset
ProjectMemory
```

A file may be represented either directly or through an asset/input abstraction depending on the chosen schema.

Do not duplicate the same conceptual information unnecessarily.

---

# 11. Important User Flows

## Create Project

Input:

- title
- optional description

Output:

- project record
- project owner association
- initial status

## Add Brief

Input:

- raw text
- optional metadata

Output:

- persistent project input
- memory entry if appropriate

## Add Reference

Input:

- uploaded image/file
- optional note

Output:

- storage object
- database metadata
- project association

## Generate Creative Direction

Inputs:

- project brief
- selected references
- relevant project memory

Output:

- structured creative direction draft

The draft must be reviewable before becoming approved direction.

## Approve Direction

Input:

- explicit user approval

Output:

- creative direction status update
- project decision record
- memory update

## Generate Hero Poster

Inputs:

- approved creative direction
- relevant references
- project context

Output:

- generation record
- generated asset
- updated project memory

---

# 12. Creative Direction Schema

The AI should ideally return structured output rather than an uncontrolled paragraph.

Example conceptual shape:

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

Use runtime validation for structured AI output.

Do not trust model output without validation.

---

# 13. Security Requirements

Never expose:

- AI API keys
- Supabase service role credentials
- private environment secrets

to the client.

Use environment variables.

Apply Row Level Security to user-owned data.

Storage should be private by default unless public access is explicitly required.

Validate file uploads.

Validate ownership for project IDs supplied by the client.

---

# 14. Error Handling

Do not silently fail.

Important operations should expose:

- useful user-facing error messages
- server-side logs
- recoverable state when possible

Generation failures should not delete or corrupt:

- project context
- approved direction
- previous assets

---

# 15. Coding Agent Behavior

When implementing:

1. Read the relevant architecture/PRD context.
2. Inspect the existing repository before changing architecture.
3. Prefer small coherent changes.
4. Do not introduce unnecessary dependencies.
5. Do not rewrite working modules without a reason.
6. Keep types explicit.
7. Validate external inputs.
8. Preserve database migrations.
9. Explain significant architectural decisions.
10. Do not fabricate implementation details when repository context is missing.

Before adding a major feature, identify:

- UI requirement
- domain requirement
- database impact
- authorization impact
- service/API impact
- failure modes

---

# 16. Development Strategy

Build vertically, not by trying to complete every layer in isolation.

Recommended milestone sequence:

### Milestone 1
Authentication + dashboard + project creation

### Milestone 2
Project workspace + brief persistence

### Milestone 3
File/reference upload

### Milestone 4
Creative direction generation

### Milestone 5
Approval flow

### Milestone 6
Hero generation

### Milestone 7
Project memory polish + error handling + observability

Each milestone should leave the app in a usable state.

---

# 17. What Not to Build Yet

Do not prematurely implement:

- teams
- invitations
- RBAC complexity
- real-time collaboration
- Redis
- BullMQ
- microservices
- vector databases
- autonomous agents
- full workflow engines
- dozens of AI models

The architecture should be clean enough to grow, but the code should solve the current problem.

---

# 18. Definition of Done for V1

The V1 product is complete enough to test when a real user can:

- create an account
- create a project
- provide a creative brief
- upload references/documents
- generate structured creative direction
- revise or approve direction
- generate a hero poster
- return later and recover the project context

This is the current implementation target.
