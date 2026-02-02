Following feature development workflow from `.cursor/rules/feature-flow.mdc`.

## Feature Development Flow

**Core Principle**: Formalize → Document → Generate → Test → Verify

---

## The 12 Phases

| Phase | Name | Key Actions |
|-------|------|-------------|
| **1-2** | Discovery/Research | Search first, no code |
| **3** | Architecture | Design + risk assessment |
| **4** | Planning | Break down, estimate |
| **5** | Requirements | Gherkin + validation |
| **6** | Testing | Write tests first (TDD) |
| **7** | Build | Search → implement |
| **8** | Integration | E2E + security tests |
| **9-12** | Deploy/Ops | Follow procedures |

---

## Current Phase Guidance

**Which phase are you in?** Tell me the phase number, and I'll show specific guidance.

Or reference the full workflow rule: `.cursor/rules/feature-flow.mdc`

---

## Quick Links

- **Phase 5** (Requirements): Use `/create-requirement` command
- **Phase 6** (Tests): `sc requirement generate-tests <REQ-ID>`
- **Phase 7** (Build): Search before implementing (see `search-before-implement.mdc`)
- **Git Workflow**: See `git-commit-smart.mdc` for commit format

---

## Key Principle

**Always search before implementing** to prevent duplication. See `.cursor/rules/search-before-implement.mdc`.







