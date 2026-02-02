---
description: Safe and thoughtful git merge strategy for branches (work sessions, feature branches)
globs: 
alwaysApply: false
---

# Git Merge Strategy

## **Workflow Context**

**Default workflow**: Trunk-based with `feat(name):` commits on main (no branching needed)

**When branches are used**:
1. **Work sessions** (preferred): Multi-feature personal branches (`session-alice-dec15`)
2. **Feature branches** (optional): One-branch-per-feature (`feature/req-XXX`)

See: SOP-0.1.12 for full workflow comparison

## **Core Principles**
- **Safety First**: Always verify branch state before merging
- **Clean History**: Use rebase to maintain linear history (unless work session with multiple features)
- **Conflict Resolution**: Handle conflicts thoughtfully with context
- **Automation with Oversight**: Automate routine tasks, manual approval for critical decisions

## **Pre-Merge Checklist**

### **✅ DO: Before Any Merge**
- Verify branch is ready (work session complete or feature done)
- Ensure branch is up to date with latest main
- Run tests and validate functionality
- Check for merge conflicts and resolve preemptively
- For work sessions: Verify all features are complete or mark WIP

### **❌ DON'T: Unsafe Merge Practices**
- Never force push to main branch
- Don't merge without conflict resolution
- Avoid merging incomplete or failing features (unless marked WIP)
- Don't delete branches until confirmed pushed to remote (if needed)

## **Merge Workflow Steps**

### **1. Pre-Merge Preparation**
```bash
# Update main branch
git checkout main
git pull origin main

# Update your branch with latest main
git checkout session-alice-dec15  # or feature/req-XXX-description
git rebase main

# Resolve any conflicts during rebase
# Run tests to ensure everything still works
```

### **2. Merge Options (Choose Based on Context)**

#### **Option A: Preserve Commits (Preferred for Work Sessions)**
```bash
# After successful rebase
# Preserves feat(name): tags for tracking
git checkout main
git merge --no-ff session-alice-dec15
git push origin main
```

**Use when**: Work sessions with multiple features, want to preserve feature tags

#### **Option B: Squash Merge (For Feature Branches)**
```bash
git checkout main
git merge --squash feature/req-XXX-description
git commit -m "feat: [Descriptive summary of feature] (REQ-XXX)"
git push origin main
```

**Use when**: Single feature branch, want clean history

### **3. Post-Merge Cleanup**
```bash
# Push branch to remote for tracking (if needed for audit trail)
git push origin session-alice-dec15  # or feature/req-XXX-description

# Delete local branch
git branch -d session-alice-dec15

# For work sessions: Update all feature/requirement statuses
sc planning req update XXX --status=merged

# For work sessions: Unregister from WIP if using session management
sc session finish  # (future command)
```

## **Automated Merge Command**

### **Safe Merge Script: `sc git-merge`**
```bash
#!/bin/bash
# Usage: sc git-merge <feature-branch> [--auto-push] [--delete-local]

# Validation phase
- Check if feature branch exists
- Verify main branch is up to date
- Run pre-merge tests
- Check for uncommitted changes

# Merge phase
- Rebase feature branch on main
- Handle conflict detection (pause for manual resolution)
- Perform merge with --no-ff flag
- Run post-merge validation

# Cleanup phase
- Push to remote if --auto-push flag
- Delete local branch if --delete-local flag
- Update requirement tracking
```

## **Conflict Resolution Strategy**

### **When Conflicts Occur**
1. **Pause automation** - Never auto-resolve conflicts
2. **Analyze conflict context** - Understand what changed in both branches
3. **Manual resolution** - Edit files to maintain intent of both changes
4. **Test resolution** - Ensure merged code works correctly
5. **Document resolution** - Add comment explaining complex conflict resolutions

### **Common Conflict Patterns**
- **Package files**: Usually accept newer versions unless breaking
- **Requirements**: Merge both changes, update IDs if needed
- **Documentation**: Combine content, maintain consistency
- **Code changes**: Preserve functionality, follow project patterns

## **Branch Management Best Practices**

### **Feature Branch Lifecycle**
1. **Create**: `git checkout -b feature/req-XXX-description`
2. **Develop**: Regular commits with clear messages
3. **Pre-merge**: Rebase on main, resolve conflicts
4. **Merge**: Use safe merge process
5. **Archive**: Push to remote, delete local
6. **Track**: Update requirement status

### **Remote Branch Strategy**
- **Keep remote feature branches** for audit trail and collaboration
- **Delete local branches** after successful merge to avoid confusion
- **Use tags** for important release points
- **Document** branch purpose in initial commit

## **Integration with Requirements System**

### **Requirement Status Updates**
```bash
# Before merge
sc planning req validate XXX  # Ensure requirement is ready
sc planning req update XXX --status=in-progress  # Set to in-progress

# After merge
sc planning req update XXX --status=implemented  # Mark as complete
```

### **Branch Naming Convention**
- **Format**: `feature/req-XXX-brief-description`
- **Epic branches**: `epic/epic-name-major-feature`
- **Hotfix branches**: `hotfix/critical-issue-description`
- **Documentation**: `docs/update-description`

## **Safety Mechanisms**

### **Pre-Merge Validation**
- All tests pass
- No uncommitted changes
- Feature branch rebased on latest main
- Requirement validation passes
- No merge conflicts detected

### **Post-Merge Verification**
- Main branch builds successfully
- All tests still pass
- Documentation updated if needed
- Requirement status reflects completion
- Feature branch backed up to remote

## **Emergency Procedures**

### **If Merge Goes Wrong**
```bash
# Immediately assess damage
git log --oneline -10

# If main branch is broken
git revert <problematic-commit-hash>
git push origin main

# If need to completely undo merge
git reset --hard HEAD~1  # DANGER: Only if not pushed
```

### **Recovery Strategy**
- Always have recent backup of main branch
- Use `git reflog` to find previous states
- Test thoroughly before declaring recovery complete
- Document what went wrong for future prevention