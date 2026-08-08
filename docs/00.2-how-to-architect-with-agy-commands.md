# How to Architect a Software Solution with `agy` Commands

A step-by-step guide to using Antigravity CLI slash commands as a structured project lifecycle — from initial idea through execution and ongoing maintenance.

---

## Project Lifecycle Overview

```
/grill-me  →  /plan  →  /goal (or /teamwork-preview)  →  /schedule  →  /learn
```

Each phase builds on the previous one. Follow this order to go from a vague idea to a fully implemented, maintainable solution.

---

## Phase 1: Alignment & Exploration — `/grill-me`

**When:** At the very beginning, before any code is written.

**What it does:** Starts an interactive interview where the agent asks you targeted questions to surface ambiguities, choose technologies, and agree on core design decisions.

**Why it matters:** Skipping this step leads to rework. By aligning on requirements, constraints, and trade-offs upfront, you avoid building the wrong thing.

**Example use cases:**
- Deciding between a monolith vs. microservices architecture
- Choosing a database (SQL vs. NoSQL)
- Clarifying MVP scope vs. future features
- Resolving UI/UX design preferences

---

## Phase 2: Architecture & Planning — `/plan`

**When:** After requirements are clear from the `/grill-me` session.

**What it does:** Generates a detailed, step-by-step implementation blueprint including files to create/modify, code structure, dependencies, and testing strategies.

**Why it matters:** A written plan serves as a contract between you and the agent. You can review, adjust, and approve it before any code changes are made.

**Example outputs:**
- File and directory structure
- Component breakdown and data flow
- API endpoint definitions
- Testing and validation strategy

---

## Phase 3: Execution — `/goal` or `/teamwork-preview`

**When:** After you have reviewed and approved the plan.

### Option A: `/goal` (Single Agent, Deep Focus)
**Best for:** Complex or autonomous tasks that require sustained concentration — the agent keeps working thoroughly until the goal is fully achieved.

### Option B: `/teamwork-preview` (Multi-Agent, Parallel Work)
**Best for:** Large projects that can be split into concurrent, independent tasks. Spawns a team of autonomous agents working together.

**Example use cases:**
- `/goal` — Build out an entire feature end-to-end, including tests
- `/teamwork-preview` — Implement frontend, backend, and infrastructure concurrently

---

## Phase 4: Automation & Monitoring — `/schedule`

**When:** After the core implementation is in progress or complete.

**What it does:** Sets up recurring tasks or one-time timers for agent-driven automation.

**Example use cases:**
- Run integration tests on a recurring schedule
- Monitor a deployment and report back
- Set a reminder to check on a long-running background task

---

## Phase 5: Retention & Continuous Improvement — `/learn`

**When:** At the end of a session, after solving a problem or discovering a useful workflow.

**What it does:** Records corrections, setup instructions, or preferences as persistent rules or skills so future sessions automatically benefit from them.

**Example use cases:**
- Persist a project-specific build command the agent initially got wrong
- Save a custom linting rule or code style preference
- Document a workaround for a tricky environment setup

---

## Quick Reference

| Phase | Command | Purpose |
|---|---|---|
| 1. Align | `/grill-me` | Resolve ambiguities and design decisions |
| 2. Plan | `/plan` | Generate a step-by-step implementation blueprint |
| 3. Execute | `/goal` or `/teamwork-preview` | Build the solution (single or multi-agent) |
| 4. Automate | `/schedule` | Set up recurring checks or reminders |
| 5. Retain | `/learn` | Persist lessons for future sessions |

---

## Tips

- **Don't skip Phase 1.** Even a quick `/grill-me` session saves significant rework later.
- **Review the `/plan` output carefully.** It's much cheaper to fix a plan than to fix code.
- **Use `/goal` for most projects.** Reserve `/teamwork-preview` for truly large, parallelizable efforts.
- **Use `/learn` liberally.** Every correction you persist now saves time in every future session.
