---
description: Git worktree workflow for multi-agent isolation
globs: ["**/*"]
alwaysApply: true
priority: critical
---

# Worktree Workflow for Multi-Agent Development

## CRITICAL: Worktree Required Before Any Changes

**DO NOT make changes while on main branch.** Always use a worktree.

### Session Start (AUTO-CREATE)

On session start, if you're on main:
1. A worktree is **automatically created** (named `session-{sessionId}`)
2. You'll see a `cd` command to switch to it
3. **Run the cd command** to enter your worktree

```bash
# The hook shows this on startup:
# ============================================================
# 🔧 Worktree auto-created: session-abc12345
# ============================================================
#
#    REQUIRED - Run this command to continue:
#    cd .worktrees/session-abc12345
```

If auto-create fails or you want a custom name:
```bash
sc agent assign <descriptive-feature-name>
cd .worktrees/<feature-name>
```

### Why This Is Mandatory

- 5+ agents may work concurrently on this repo
- Direct commits to main cause merge conflicts
- Worktrees provide complete isolation
- Our registry tracks who is working on what

## Merging Back to Main (REBASE-FIRST)

When ready to merge your worktree changes to main:

```bash
sc git merge --push
```

**What happens:**
1. Fetches latest main from origin
2. **Rebases your branch on main** (catches conflicts locally)
3. Checks out main in the main repo
4. Merges your rebased branch (should be conflict-free)
5. Pushes to origin (with `--push`)

### Handling Merge Conflicts

If conflicts occur, they surface **during rebase in your worktree**:

```bash
# You'll see:
# ❌ Rebase conflicts detected.
#
# Resolve in your worktree:
#   1. Check conflicted files: git status
#   2. Edit and resolve conflicts
#   3. Stage resolved files: git add <files>
#   4. Continue rebase: git rebase --continue
#   5. Re-run merge: sc git merge
```

**Key benefit**: Conflicts are resolved in your isolated worktree, not on main.

## Session End Check

**BEFORE ending session, verify:**
1. All changes committed
2. Commits merged to main (if ready)

```bash
# Check status
git status

# If uncommitted changes exist:
sc git commit -m "feat(feature): description"

# If ready to merge:
sc git merge --push

# Then unassign (choose one):
sc agent unassign --remove  # Delete worktree
sc agent unassign --keep    # Keep for later
```

## Commands Reference

| Command | Purpose |
|---------|---------|
| `sc agent status` | Check current agent context |
| `sc agent assign <name>` | Create/switch to worktree |
| `sc agent list` | List all worktrees with activity info |
| `sc agent unassign --remove` | Unassign and delete worktree |
| `sc agent unassign --keep` | Unassign but keep worktree |
| `sc git merge` | Rebase then merge to main |
| `sc git merge --push` | Rebase, merge, and push |
| `sc git merge --dry-run` | Preview merge steps |

## Checking Other Agents' Work

See all active worktrees and their last activity:

```bash
$ sc agent list

🌿 WORKTREES (4 active)

  Feature                          Branch                 Last Activity
  ---------------------------------------------------------------------------
  fix-coverage-auto-run            feat/fix-coverage...   3 minutes ago
  session-abc12345                 feat/session-abc...    just now ← YOU
  background-job-system            feat/background-...    2 hours ago (uncommitted)
  ---------------------------------------------------------------------------

  Tip: cd .worktrees/<name> to switch
```

## Enforcement

- Main branch commits are soft-blocked (can bypass with `SC_ALLOW_MAIN_COMMIT=1`)
- File writes on main are **hard-blocked** by pre-tool-use hook
- Worktree auto-created on session start when on main

## Why Worktrees?

- **Isolation**: Each agent/feature has separate working directory
- **No conflicts**: Rebase-first merge catches conflicts locally
- **Clean history**: Merge when ready, not on every commit
- **Rollback**: Easy to discard failed experiments
