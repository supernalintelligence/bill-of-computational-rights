---
description: Default autonomy policy for AI agents — pre-approvals, guardrails, and execution flow centered on the `sc` CLI
globs: 
alwaysApply: true
---

**Core Principle: Use Supernal Coding (Use `sc`)**

**Pre‑Approvals (via `sc`)**
  - `sc planning req` lifecycle: `new`, `validate`, `generate-tests`, `update`, `show`, `list`
  - `sc git`: `commit`, `branch`, `check`, `merge --push --delete-local`
  - `sc git hooks`: `install`, `pre-commit`, `pre-push`, `safety`, `status`
  - `sc workflow wip`: `register`, `unregister`, `list`, `status`, `cleanup`, `check`
  - `sc test` and `sc test-map` for guidance/mapping; run full suite with `npm test` unless a project `TESTME.sh` exists (then follow its interface)
  - `sc build` for builds with log capture (uses BUILDME.sh if present)
  - `sc deploy` for Vercel deployments with monitoring (uses DEPLOYME.sh if present)
  - `sc docs` and `sc rules` where documentation or rules require changes
  - `sc init`/`install` only when initializing or equipping repositories (not during regular feature work)
  - `sc spec`: `create`, `validate`, `list` for ralph loop spec management
  - `sc agent`: `assign`, `unassign`, `status` for worktree management
  - `sc agent loop`: `start`, `status`, `abort`, `logs` for autonomous ralph loops

**Execution Flow (Do Not Ask; Use `sc`)**
  - Analyze → Plan → Implement → Test → Finalize metadata/docs → Commit → Report
  - Use WIP registry for multi-agent feature development (NOT feature branches)
  - Use `sc workflow wip register <file> --feature=X --requirement=REQ-XXX` to track work in progress
  - Use feature-scoped commits: `feat(name): Description (REQ-XXX)`
  - Only use `sc git branch` for isolated experiments or PRs to external repositories

**Tests & Build**
  - Run `sc test <path>` for specific tests with evidence logging (automatically wraps in npm test)
  - Run `sc test` to run all tests with evidence logging
  - Use `npm test` directly only when NOT needing evidence logging
  - If `TESTME.sh` exists, `sc test` will use it by default
  - Run `sc build` for builds with log capture (uses BUILDME.sh if present)

**Deployment**
  - Run `sc deploy` for Vercel deployments with monitoring
  - Use `sc deploy --production` for production deployments
  - Use `sc deploy --json` for AI-friendly JSON output with error extraction
  - Use `sc deploy status <id>` to check deployment status
  - Use `sc deploy logs <id> --json` for parsed error logs
  - If `DEPLOYME.sh` exists, `sc deploy` will use it by default
  - Requires `VERCEL_TOKEN` environment variable

**Hooks & Metadata**
  - Install hooks with `sc git hooks install` and respect them during commits
  - **NEVER use `--no-verify`, `SC_SKIP_ALL_CHECKS`, or other bypasses unless:**
    - Hooks themselves have bugs preventing legitimate commits (document in commit message)
    - Metadata-only changes after repeated commits don't converge (extremely rare)
  - **FIX validation failures, don't bypass them** - they reveal real issues
  - If hooks auto‑update requirement metadata (e.g., `git_tracking`), continue committing the metadata using normal commits until the working tree is clean
  - To temporarily disable a specific check, use `supernal.yaml` configuration (e.g., `enabled: false`) not bypass variables
  - Document ANY bypass usage in commit message with clear justification

**Destructive Changes (Guardrails)**
  - Remove redundant legacy artifacts when a canonical `sc`/JS path exists (e.g., shell scripts superseded by a JS module)
  - For non‑redundant or ambiguous deletions, refactor in place or open a PR
  - Never remove business logic or specs without equivalent/updated coverage

**Commit Policy**
  - Use requirement‑traceable commit messages when applicable: `REQ-XXX: Description`
  - Group related changes and include associated rule/doc updates

**Commit Policy (continued)**
  - Commit directly to main/current branch using WIP registry workflow
  - Use feature scopes to enable parallel co-development: `feat(name): Description (REQ-XXX)`
  - Unregister files from WIP registry on commit (automatic if using `sc git commit`)
  - Only create PRs if repository policy or technical constraints require it

**Ralph Loops (Autonomous Execution)**
  - **ALWAYS validate specs before running**: `sc spec validate <file>` must pass
  - Create specs following [SPEC-PATTERN.md](supernal-code-package/docs/ralph/SPEC-PATTERN.md)
  - Required spec sections: Goal, Output, Tasks (with `- [ ]` checkboxes)
  - One spec = One ralph run = One PR
  - Use worktrees for isolation: `sc agent assign <name>` before `sc agent loop start`
  - See [SOP-T.12](docs/workflow/sops/tools/SOP-T.12-using-ralph-loops.md) for full workflow
