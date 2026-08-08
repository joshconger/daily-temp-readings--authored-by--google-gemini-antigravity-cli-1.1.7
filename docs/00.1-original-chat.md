# Antigravity CLI — Conversation Notes
**Date:** August 7, 2026
**Workspace:** `/Users/joshconger/repos/testing-opencode`
**CLI Version:** `agy` v1.1.11

---

## 1. What Can I Do With 0 Credits?

### Local Development (No Credits Needed)
- Run and test code locally (`npm run dev`, `git`, linters, etc.)
- Manually edit, refactor, and structure project files
- Use **local LLMs** via Ollama, LM Studio, Continue.dev, or Cline (runs on your hardware for free)

### Free Tiers and Alternatives
- **Wait for quota resets** (daily/monthly depending on platform)
- **Codeium** — Free unlimited code completion for individuals
- **Gemini Code Assist** — Free individual tier for VS Code and JetBrains
- **GitHub Copilot Free Tier** — Limited free monthly chat and completions

### Tips to Maximize Usage
- Start clean conversations to avoid large context history costs
- Use lighter/faster models (e.g., Gemini Flash) for routine tasks

---

## 2. Daily Rate Limits

### By Plan
| Plan | Quota Refresh Cycle |
|---|---|
| **Google AI Pro / Ultra** | Rolling **5-hour** cycle |
| **Free / Individual Tier** | **Weekly**-based limit |

### How Limits Are Calculated
- Based on **total workload and compute intensity**, not simple request/token counts
- Higher reasoning effort (`--effort high`, Pro/Ultra models) consumes quota faster
- Lighter models (Gemini Flash) allow many more tasks per cycle

### How to Know When You Will Run Out
- **In-app notifications/warnings** appear as you approach the limit
- **Throttling messages** tell you how long until reset
- **Proactive management:** Use lighter models and shorter conversations to stretch quota

---

## 3. Included Skills

| Skill | Description |
|---|---|
| **agy-customizations** | Guide for defining rules, custom skills, hooks, and MCP servers |
| **antigravity-guide** | Quick references and site maps for CLI, IDE, Desktop App, and Python SDK |

---

## 4. Slash Commands

| Command | Purpose |
|---|---|
| `/grill-me` | Interactive interview to align on design decisions |
| `/plan` | Generate a step-by-step implementation blueprint |
| `/goal` | Run long/autonomous tasks until fully complete |
| `/teamwork-preview` | Spawn multiple concurrent agents for large projects |
| `/schedule` | Set up recurring tasks or one-time timers |
| `/learn` | Record corrections and preferences for future sessions |

---

## 5. Recommended Slash Command Order

1. **`/grill-me`** — Align on requirements and resolve ambiguities
2. **`/plan`** — Generate a detailed implementation plan
3. **`/goal`** or **`/teamwork-preview`** — Execute the plan
4. **`/schedule`** — Set up recurring checks or reminders
5. **`/learn`** — Persist lessons learned for future sessions

---

## 6. Working Directory in agy

### Check the Path During a Session
- Type **`!pwd`** at the agy prompt to print the current workspace path
- Type **`!ls`** to list files

### Always Show Directory in Your Terminal Prompt
Edit `~/.zshrc` and add:
```bash
PROMPT="%~ %# "
```
Then reload:
```bash
source ~/.zshrc
```

---

## 7. Useful CLI Flags

| Flag | Description |
|---|---|
| `--model` | Choose a model for the session |
| `--effort` | Set reasoning effort (low, medium, high) |
| `--continue` / `-c` | Resume the most recent conversation |
| `--conversation ID` | Resume a specific conversation by ID |
| `--add-dir` | Add extra directories to the workspace |
| `--print` / `-p` | Run a single prompt non-interactively |
| `--mode plan` | Set agent to plan-only mode |
