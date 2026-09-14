# CONDUCTOR — Product Requirements Document (PRD)
## Version 1.0 — Solo Designer MVP

**Status:** Product definition / implementation-ready  
**Primary user:** Solo designer or solo creative professional  
**Secondary future users:** Creative teams, event teams, marketing teams, agencies, creators  
**Product type:** AI-assisted creative workflow orchestration platform

---

# 1. Product Summary

Conductor is a project-based creative orchestration system.

A user starts with a messy creative idea: a short description, typed brief, voice input, project document, PDF, or uploaded reference material. Conductor helps turn that raw context into a structured creative project.

For Version 1.0, the product's primary job is:

> Turn a creative brief into an approved creative direction and generate one hero poster while preserving the project's evolving context as persistent project memory.

Conductor is **not** intended to replace human creativity.

The intended workflow is:

**Human creative spark → structured brief → references → creative direction → human approval → hero poster generation → persistent project memory**

The human remains responsible for taste, intent, and final approval.

---

# 2. Problem Statement

Creative work, especially recurring event and campaign design, often begins in an unstructured way:

- An event or project idea is discussed.
- The designer interprets the concept.
- The designer talks with AI tools.
- References are manually collected.
- Ideas are explored through trial and error.
- A visual identity emerges.
- A hero poster or primary visual is created.
- The resulting identity becomes the source for later assets.

The process is fragmented across chat tools, image generation tools, reference platforms, local folders, documents, and design tools.

The most valuable context frequently exists only in the designer's head or scattered across files and conversations.

Conductor attempts to create a persistent project intelligence layer around that workflow.

---

# 3. Product Vision

Long-term, Conductor should become a general creative workflow orchestration platform capable of coordinating:

- Creative briefs
- Project context
- User preferences
- References
- Visual direction
- Brand identity
- Assets
- Deliverables
- Tasks
- Approvals
- Collaboration
- AI-assisted generation

Version 1.0 does **not** attempt to build the entire platform.

Version 1.0 establishes the core primitives:

1. User identity
2. Project identity
3. Structured project context
4. References
5. Creative direction
6. Approval checkpoints
7. Hero asset generation
8. Persistent project memory

---

# 4. Target User for V1

## Primary Persona: Solo Designer

A user who:

- Works independently.
- Handles multiple creative projects.
- Uses AI as part of their workflow.
- Collects references manually.
- Generates multiple creative directions.
- Wants project context to persist.
- Wants a structured creative workflow without losing creative control.

Example projects:

- Event poster
- College event branding
- Marketing campaign
- Social media campaign
- Creator content identity
- Product launch visual
- Presentation visual identity

## Explicit Non-Goal for V1

Full team collaboration is not required to function in Version 1.0.

The database and architecture should avoid making future collaboration impossible, but:

- Team creation
- Member invitations
- Roles
- Shared workspaces
- Assignment systems
- Real-time collaboration

are Version 1.x / Version 2 concerns.

---

# 5. Core Product Principles

## 5.1 Human spark, machine orchestration

The user provides the initial creative intent.

Conductor should not pretend to autonomously possess taste.

## 5.2 Approval before expensive generation

Major creative decisions should be reviewable before generating the final hero asset.

## 5.3 Project context is persistent

Every meaningful project input and decision should be capable of being represented as project context.

## 5.4 Structured memory over chat history

Project memory should not simply be a raw transcript.

Important information should be captured as structured, queryable context.

## 5.5 One clear workflow before many features

V1 should complete one valuable end-to-end workflow well.

---

# 6. Version 1.0 Scope

## In Scope

### Authentication
- User sign up
- User sign in
- User sign out
- Persistent authenticated session

### Project Management
- Create project
- View project list
- Open project
- Edit basic project metadata
- Project status tracking

### Creative Brief Input
The user can provide project context through:

- Typed text
- Uploaded files/documents
- Uploaded images/references
- Optional voice input if implemented without destabilizing the MVP

### Reference Gathering
The user can:

- Upload references manually
- Attach project-specific reference images
- Add notes describing why references matter

V1 should not depend on automated scraping from third-party platforms.

### Creative Direction
Conductor helps convert the brief and references into structured creative direction.

Potential fields:

- Project concept
- Audience
- Tone
- Theme
- Visual style
- Color direction
- Typography direction
- Keywords
- Avoidances / negative direction
- Visual motifs
- Design rationale

The user reviews and approves this direction.

### Approval Checkpoint
The user can:

- Approve direction
- Request revision
- Edit inputs and regenerate direction

### Hero Poster Generation
After creative direction is approved:

- Generate one or more candidate hero poster outputs
- Persist generation metadata
- Save resulting asset(s) to project storage

For MVP, generation can initially produce one output.

### Project Memory
Each project contains persistent memory derived from:

- Original brief
- Documents
- References
- Creative direction
- User approvals
- Generation prompts
- Important notes
- Generated outputs

---

# 7. Core User Flow

## Step 1 — Authentication

User signs in.

System identifies the authenticated user.

## Step 2 — Dashboard

User sees:

- Existing projects
- Project status
- Option to create a project

## Step 3 — Create Project

User enters basic information:

- Project name
- Optional short description

A project record is created immediately.

## Step 4 — Creative Kickoff

User provides raw context through:

- Typed brief
- Optional document upload
- Optional reference upload
- Optional voice input

The goal is to capture the user's messy initial thought without forcing a rigid form.

## Step 5 — Context Processing

The system extracts and organizes available context.

Output should become a structured working brief.

## Step 6 — Reference Collection

The user adds or confirms visual references.

References remain associated with the project.

## Step 7 — Creative Direction

The system proposes a structured creative direction.

The user can:

- Approve
- Edit
- Reject
- Regenerate

## Step 8 — Direction Approval

Approval creates an explicit project decision.

The approved direction becomes part of project memory.

## Step 9 — Hero Poster Generation

The generation service receives:

- Approved creative direction
- Relevant references
- Structured project context
- Generation-specific instructions

The service generates the hero asset.

## Step 10 — Save Output

Generated asset and metadata are persisted.

The user can return later and retain the full project context.

---

# 8. Functional Requirements

## FR-1 Authentication

The system shall authenticate users securely.

The system shall prevent users from accessing projects belonging to other users.

## FR-2 Project Creation

A user shall be able to create multiple projects.

Each project shall belong to an owner.

## FR-3 Project Context

A project shall support persistent structured context.

Context shall not depend exclusively on a temporary AI conversation.

## FR-4 File Upload

A user shall be able to upload supported project files.

Files shall be associated with the project.

## FR-5 Reference Storage

A user shall be able to store project-specific references.

References shall support metadata and notes.

## FR-6 Creative Direction Generation

The AI orchestration layer shall produce structured creative direction from available project context.

## FR-7 Approval State

Creative direction shall have an explicit lifecycle state.

Suggested states:

- draft
- generated
- changes_requested
- approved

## FR-8 Hero Asset Generation

The system shall create and persist hero poster generation requests and results.

## FR-9 Project Memory

The system shall persist important project knowledge independently from a single model conversation.

## FR-10 Data Isolation

Users shall only access their own V1 projects and related assets.

---

# 9. Non-Functional Requirements

## Security
- Secure authentication
- Server-side protection of AI credentials
- Row-level access control
- Private storage by default

## Reliability
- Generation requests should have explicit status.
- Failed generations should not corrupt project state.
- Upload failures should be recoverable.

## Observability
At minimum, record:

- Errors
- Generation failures
- Request status
- Important server-side events

## Performance
The application UI should remain responsive while asynchronous generation occurs.

Generation latency should be represented as a product state, not hidden.

Suggested states:

- queued
- processing
- completed
- failed

## Maintainability
Business logic should not be embedded throughout UI components.

External AI providers should be accessed through service boundaries.

---

# 10. Project Memory Model

Project memory is the central product primitive.

It is not merely "AI memory."

Project memory is persistent contextual knowledge attached to a project.

## Categories

### Input Memory
What the user initially provided.

Examples:

- Brief
- Documents
- Notes
- Voice transcript

### Reference Memory
What visual or conceptual references matter.

Examples:

- Uploaded image
- Source URL
- User annotation
- Reason for relevance

### Direction Memory
What creative decisions were made.

Examples:

- Theme
- Tone
- Color direction
- Typography direction
- Motifs
- Avoidances

### Decision Memory
Explicit user choices.

Examples:

- Direction approved
- Direction rejected
- Revision requested

### Generation Memory
How outputs were produced.

Examples:

- Prompt
- Model/provider
- Parameters
- Generation status

### Output Memory
What the project produced.

Examples:

- Hero poster
- Asset file
- Generated image metadata

---

# 11. Suggested Project States

A simple initial state machine:

- `draft`
- `brief_in_progress`
- `references_ready`
- `direction_pending`
- `direction_review`
- `direction_approved`
- `generating`
- `completed`

V1 does not need every transition to be rigidly enforced, but important milestones should be explicit.

---

# 12. AI System Requirements

The AI layer should be treated as an application dependency, not the application itself.

## Responsibilities

The AI orchestration layer may:

- Summarize project context
- Extract structured information
- Propose creative direction
- Generate prompts
- Help transform references into textual design constraints
- Generate hero image instructions

## The AI layer should not be responsible for:

- Authentication
- Authorization
- Database ownership
- Storage permissions
- Core project state
- Approval truth

The database remains the source of truth.

---

# 13. Generation Strategy

Generation should be asynchronous from the user's perspective.

Recommended flow:

1. User requests generation.
2. Server validates project ownership.
3. Server creates generation record.
4. Generation status becomes `queued`.
5. Server/provider processes generation.
6. Result is stored.
7. Asset record is created.
8. Generation status becomes `completed`.
9. Project UI updates.

The V1 implementation may initially use a simpler synchronous server action if necessary, but the data model should preserve the ability to move generation into a background job.

---

# 14. V1 Success Criteria

A successful Version 1 should allow a real solo designer to:

1. Create an account.
2. Create a project.
3. Provide a messy creative brief.
4. Upload references or documents.
5. Receive structured creative direction.
6. Approve or revise it.
7. Generate a hero poster.
8. Return later and find the project context preserved.

If this works reliably, Conductor has a real end-to-end product foundation.

---

# 15. Explicitly Out of Scope for V1

- Full team collaboration
- Role-based team permissions
- Real-time collaboration
- Canva integration
- Automatic publishing
- Full campaign asset generation
- PPT generation
- Video generation
- Complex workflow automation
- Marketplace
- Billing
- Mobile application
- Autonomous multi-agent pipelines

These should not block the core workflow.

---

# 16. Future Expansion

Potential future modules:

- Team workspaces
- Creative asset pipelines
- Deliverable templates
- Task orchestration
- Approvals
- Canva/Figma integrations
- Social publishing
- Multi-asset generation
- Brand profiles
- User-level creative preference memory
- Retrieval/vector memory
- Background workers
- Multi-model AI routing

The V1 architecture should make these possible without prematurely building them.
