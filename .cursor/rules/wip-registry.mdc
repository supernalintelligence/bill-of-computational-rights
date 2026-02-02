---
description: WIP registry system for managing WIP files and multi-agent coordination
globs: **/*
alwaysApply: true
---

# WIP Registry System

## **Core Principle: Track All Files**

Every file must be in one of four states:
1. **Committed** (tracked by git)
2. **Staged** (via `git add`)
3. **Ignored** (in `.gitignore`)
4. **WIP-tracked** (in `.supernal/wip-registry.yaml`)

If 5+ files are in none of these states → **Commit blocked**

---

## **When to Use WIP Registry**

### ✅ **DO WIP-Track**:
- **Multi-agent work**: Files being worked on by multiple agents/developers in parallel
- **WIP features**: Code actively being developed but not ready to commit
- **Experiments**: Trying out approaches that may be discarded
- **Large features**: Breaking down work into multiple sessions

### ❌ **DON'T WIP-Track**:
- Files ready to commit (just commit them)
- Temporary files (add to `.gitignore`)
- Generated files (add to `.gitignore`)
- One-off scripts already complete

---

## **Commands**

### Register File for WIP Tracking
```bash
# Auto-detect userid from git config (RECOMMENDED)
# Uses: git config user.github → git config user.name → $USER
sc workflow wip register src/auth.ts --feature=authentication --requirement=REQ-042

# Override with explicit userid (multi-user scenarios)
sc workflow wip register src/auth.ts \
  --feature=authentication \
  --requirement=REQ-042 \
  --userid=alice

# With reason and notes (userid still auto-detected)
sc workflow wip register experiment.ts \
  --feature=performance \
  --requirement=REQ-043 \
  --reason="Testing new algorithm" \
  --notes="Compare with baseline"
```

### Check Status
```bash
# See all WIP-tracked files (shows userid)
sc workflow wip list

# Filter by user
sc workflow wip list --userid=alice
sc workflow wip list --me                  # Current user's files

# Show unassigned files
sc workflow wip list --unassigned

# Check untracked files (not committed/staged/WIP-tracked)
sc workflow wip status                     # Shows stats by user

# Statistics by user
sc workflow wip stats

# See what would be cleaned up
sc workflow wip cleanup --dry-run
```

### Unregister & Reassign Files
```bash
# Manual unregister
sc workflow wip unregister <file>

# Reassign to different user
sc workflow wip reassign <file> --to=<userid>

# Auto-cleanup old files (>7 days)
sc workflow wip cleanup --older-than 7
```

---

## **Git Hook Behavior**

### Fail-Fast Check
- Runs in `.husky/pre-commit` BEFORE slow checks (linting/formatting)
- Blocks if 5+ untracked files detected
- Shows exact files and commands to fix
- Provides clear examples

### Bypass Options
```bash
# Skip WIP registry check once
SC_SKIP_WIP_CHECK=true git commit -m "message"

# Skip all checks (emergency)
SC_SKIP_ALL_CHECKS=true git commit -m "message"
```

---

## **Multi-Agent Workflow Pattern**

### Scenario: Two Agents Working in Parallel

```bash
# Agent 1 (alice): WIP-track files
for f in agent1-*.ts; do
  sc workflow wip register "$f" --feature=auth --requirement=REQ-042 --userid=alice
done

# Agent 2 (bob): WIP-track files  
for f in agent2-*.ts; do
  sc workflow wip register "$f" --feature=dashboard --requirement=REQ-043 --userid=bob
done

# Now commits work - all files accounted for
git add README.md
git commit -m "docs: Update README"
# ✅ Passes - all files tracked or WIP-tracked

# Check who's working on what
sc workflow wip list
# Shows:
#   - agent1-auth.ts (feature: auth, @alice)
#   - agent2-dashboard.ts (feature: dashboard, @bob)

# Alice: View only her files
sc workflow wip list --me
# Shows only files registered by alice

# Alice: Commit work when ready
git add agent1-*.ts
git commit -m "feat(auth): agent 1 implementation (REQ-042)"

# Bob: Commit work when ready
git add agent2-*.ts
git commit -m "feat(dashboard): agent 2 implementation (REQ-043)"

# Conflict Prevention: Bob tries to register Alice's file
sc workflow wip register agent1-auth.ts --feature=test --requirement=REQ-044 --userid=bob
# ⚠️ Error: File already WIP-tracked by @alice. Contact them before registering.
```

### Scenario: Handoff Between Agents

```bash
# Alice starts work
sc workflow wip register feature.ts --feature=auth --requirement=REQ-042 --userid=alice

# Alice needs to hand off to Bob
sc workflow wip reassign feature.ts --to=bob

# Bob can now see it as his file
sc workflow wip list --me
# Shows: feature.ts (feature: auth, @bob)
```

---

## **Configuration**

### In `supernal.yaml`:
```yaml
git_hooks:
  pre_commit:
    checks:
      wip_registry_check:
        enabled: true
        block_on_untracked: true
        threshold: 5              # Number of files before blocking
        allow_bypass: true
```

### Bypass Variables:
```yaml
bypass_variables:
  wip_registry: SC_SKIP_WIP_CHECK
```

---

## **Best Practices**

### ✅ DO:
- WIP-track files when starting work on a feature
- Use descriptive feature names
- Link to requirements when possible
- Clean up old WIP-tracked files regularly
- Use bypass for quick documentation fixes

### ❌ DON'T:
- Leave files WIP-tracked for weeks
- WIP-track everything "just in case"
- Use WIP tracking as a substitute for proper `.gitignore`
- Abuse bypass to avoid dealing with untracked files
- WIP-track files that are ready to commit

---

## **Common Scenarios**

### Quick Documentation Fix
```bash
# Have untracked WIP files, need to commit docs
git add docs/README.md
SC_SKIP_WIP_CHECK=true git commit -m "docs: Fix typo"
```

### External Content Drop
```bash
# Blog post from external source
git add blog/new-post.md
SC_SKIP_WIP_CHECK=true git commit -m "docs: Add blog post"
```

### Large Feature Development
```bash
# Day 1: Start feature
sc workflow wip register feature-*.ts --feature=new-ui

# Day 2-5: Continue work, files stay WIP-tracked
# Commits don't complain about untracked files

# Day 6: Feature complete
git add feature-*.ts
git commit -m "feat: Add new UI"
# Files auto-deregistered (if using `sc git commit`)
```

---

## **Troubleshooting**

### "Commit blocked: 10 untracked files"
**Solution**:
```bash
# Option 1: WIP-track WIP files
sc workflow wip register wip-*.ts --feature=experiment

# Option 2: Commit ready files
git add ready-*.ts && git commit -m "feat: Add features"

# Option 3: Add to .gitignore
echo "temp-*" >> .gitignore

# Option 4: Bypass once
SC_SKIP_WIP_CHECK=true git commit -m "message"
```

### "File already WIP-tracked"
**Solution**:
```bash
# Check who owns the file
sc workflow wip list | grep <file>

# If same user: Update timestamp
sc workflow wip touch <file>

# If different user: Contact them or reassign
sc workflow wip reassign <file> --to=<new-userid>

# Or unregister and re-register
sc workflow wip unregister <file>
sc workflow wip register <file> --feature=new-feature --requirement=REQ-XXX --userid=<your-id>
```

### "Who's working on what?"
**Solution**:
```bash
# See all WIP files by user
sc workflow wip stats

# See specific user's files
sc workflow wip list --userid=alice

# See your own files
sc workflow wip list --me

# See unassigned files
sc workflow wip list --unassigned
```

---

## **Integration with Feature-Based Commits**

WIP tracking works seamlessly with feature-based commits:

```bash
# WIP-track all feature files
sc workflow wip register feature-*.ts --feature=user-auth

# Commit with feature tag
git commit -m "[FEATURE:user-auth] Implement authentication"

# Files tracked via WIP registry
# No conflicts with other agents' work
```

---

## **Files & Locations**

- **Registry**: `.supernal/wip-registry.yaml`
- **Hook**: `.husky/pre-commit` (primary check)
- **Config**: `supernal.yaml`
- **Manager**: `supernal-code-package/lib/wip/WipManager.js`
- **CLI**: `supernal-code-package/cli/wip.js`

---

## **Related Documentation**

- [WIP-REGISTRY-USER-TRACKING.md](docs/features/workflow-management/WIP-REGISTRY-USER-TRACKING.md) - User tracking design
- [WIP-REGISTRY-ENFORCEMENT-PLAN.md](docs/features/workflow-management/WIP-REGISTRY-ENFORCEMENT-PLAN.md) - Full design
- [FEATURE-BASED-COMMITS.md](docs/features/workflow-management/FEATURE-BASED-COMMITS.md) - Feature registry
- [SOP-0.1.12](docs/workflow/sops/general/SOP-0.1.12-git-workflow.md) - Git workflow

---

**Last Updated**: 2025-12-01  
**Status**: ✅ Active and enforcing with user tracking
