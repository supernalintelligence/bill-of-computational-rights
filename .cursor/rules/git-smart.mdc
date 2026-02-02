---
description: Safe Git workflow using sc git commands
globs: 
alwaysApply: false
---

# Smart Git Rules

## Core Safety Principles
- **Never use destructive commands**: No `git push --force`, `git reset --hard`, or other destructive operations
- **Commit intelligently**: Use specific file commits with clear, informative messages that others can understand
- **Always use safe automation**: Leverage `sc git` commands for validated operations

## Use sc git for:
- **Committing**: `sc git commit [files...] -m "msg"` for safe, selective commits
- **Branching**: `sc git branch <name>` for smart branch creation with validation
- **Context Check**: `sc git check` to verify repository status and recent work
- **Merging**: `sc git merge <branch>` for safe, automated merging with rebase and validation
- **Deployment**: `sc git deploy` for comprehensive, validated deployments

## Common Commands

### Smart Commit
```bash
# Commit specific files
sc git commit file1.ts file2.ts -m "[FEATURE:auth] REQ-042: Add login"

# Commit only trivial changes (nits)
sc git commit --nit

# Preview commit
sc git commit --dry-run
```

### Branch Management
```bash
# Create branch from requirement
sc git branch REQ-042

# Create feature branch
sc git branch feature/authentication

# Check repository context
sc git check
```

### Safe Merge
```bash
# Merge current branch to main
sc git merge

# Merge specific branch
sc git merge feature/auth

# Merge and push
sc git merge --push

# Merge and delete local branch
sc git merge --delete-local

# Merge ignoring submodule state drift
sc git merge --ignore-submodules
```

### Submodule Management
```bash
# Show submodule status with change type classification
sc git submodule status
sc git submodule status --verbose

# Validate that submodule refs exist on remotes (read-only)
sc git submodule validate

# Fix invalid references (dry-run by default - safe!)
sc git submodule fix

# Actually apply the fixes (requires explicit --apply)
sc git submodule fix --apply
```

### Deployment
```bash
# Full deployment with tests
sc git deploy

# Deploy with custom tag
sc git deploy --tag v1.2.3

# Emergency deploy (skip tests)
sc git deploy --skip-tests
```

## Never Do These Things
- `git push --force` or `git push -f`
- `git reset --hard` (use proper workflow recovery instead)
- Deploy without running tests (unless emergency with explicit `--skip-tests`)
- Work directly on main/master branch
- Delete branches without pushing to remote first 

## Related
- [SOP-0.1.12: Git Workflow](docs/workflow/sops/general/SOP-0.1.12-git-workflow.md)
- [git-commit-smart.mdc](.cursor/rules/git-commit-smart.mdc)
- [wip-registry.mdc](.cursor/rules/wip-registry.mdc)
