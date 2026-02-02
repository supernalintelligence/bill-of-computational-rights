Commit message format from `.cursor/rules/git-commit-smart.mdc`.

## Basic Format

```
type(scope): description (REQ-XXX)

[optional body]

closes TASK-XXX
```

---

## Components

**Type** (required): `feat|fix|docs|style|refactor|test|chore`

**Scope** (required for feat/fix):
- Feature: `feat(domain/feature):` - Full path (e.g., `feat(developer-tooling/vscode-extension):`)
- Infrastructure: `feat(api):`, `fix(cli):`, `feat(dashboard):` - Standard components
- Other types: Scope optional

**Description** (required): Clear, present tense summary

**Traceability** (required for feat/fix): At least one of:
- `(scope)` - Conventional commit scope
- `REQ-XXX` - Links to requirement
- `TASK-XXX` - Links to task

**Closures** (when applicable):
- `closes TASK-XXX` - Closes task
- `closes #123` - Closes GitHub issue

---

## Examples

```bash
# Feature work (full domain/feature path)
git commit -m "feat(developer-tooling/vscode-extension): add Rules view (REQ-VSCODE-001)"
git commit -m "feat(workflow-management/task-system): add priority sorting (REQ-WORKFLOW-108)"

# Infrastructure (standard components)
git commit -m "feat(api): add health endpoint"
git commit -m "fix(cli): resolve parsing bug"

# With task closure
git commit -m "fix(auth): validation bug (TASK-042, closes TASK-042)"

# Documentation (no traceability required)
git commit -m "docs: fix typo in README"
```

---

## Critical: File Selection

**✅ DO**: Only commit files you specifically modified
```bash
git add src/auth.ts tests/auth.test.ts
git commit -m "feat(auth): add login"
```

**❌ DON'T**: Use `git add .` or `git add -A`

---

## Valid Scopes

**Feature work**: Use full `domain/feature` path
```bash
sc feature list  # See all valid paths
```

**Standard components**: `api`, `ui`, `cli`, `dashboard`, `docs`, `tests`, `db`, `config`, `ci`

---

For complete details, see `.cursor/rules/git-commit-smart.mdc`.







