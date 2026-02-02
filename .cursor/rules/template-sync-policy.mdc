---
description: Template synchronization policy with approval history preservation
globs: docs/workflow/**/*.md, docs/features/**/*.md, templates/**/*.md
alwaysApply: false
---

# Template Synchronization Policy

## **Core Principle: Preserve Approvals**

When syncing templates from `supernal-code-package/templates/` to project docs:
- **✅ DO**: Preserve approval history, review status, version history
- **✅ DO**: Update template content to canonical version
- **❌ DON'T**: Blindly overwrite with `rsync` or `cp`
- **❌ DON'T**: Lose approval records or review history

## **Smart Merge Tool**

### Usage

```bash
# Merge all templates with approval preservation
sc docs merge-templates

# Dry-run to see what would change
sc docs merge-templates --dry-run

# Merge specific path
sc docs merge-templates --path docs/workflow/sops/

# Generate approval report
sc docs merge-templates --report

# Verbose output
sc docs merge-templates --verbose
```

### What Gets Preserved

**From Target (Project Docs)**:
```yaml
reviewedBy: ['@architect', '@security-lead']
reviewDates: ['2025-11-21', '2025-11-29']
status: approved
version: '2.0'
version_history:
  - version: '1.0'
    date: 2025-11-21
    approvedBy: ['@tech-lead']
    changes: 'Initial approval'
approvalNotes: 'Approved with minor clarifications'
```

**From Template (Canonical)**:
```yaml
type: sop
category: ai-technique
sop_id: SOP-0.1.05
title: Requirements & Planning
phase: null
audience: [developers, architects]
tags: [requirements, planning]
# ... structural metadata ...
# ... entire content body ...
```

### What Gets Updated

**Merged Result**:
```yaml
# Structural from template
type: sop
category: ai-technique
sop_id: SOP-0.1.05
title: Requirements & Planning

# Approval from target (PRESERVED)
status: pending-review  # Changed if content differs significantly
version: '2.1'  # Incremented if re-approval needed
reviewedBy: ['@architect', '@security-lead']  # Preserved
reviewDates: ['2025-11-21', '2025-11-29']  # Preserved

# History accumulated
version_history:
  - version: '1.0'
    date: 2025-11-21
    approvedBy: ['@tech-lead']
    changes: 'Initial approval'
  - version: '2.0'
    date: 2025-11-29
    approvedBy: ['@architect', '@security-lead']
    changes: 'Added compliance section'
  - version: '2.1'
    date: 2025-11-29
    changes: 'Template sync: Updated section 7 structure'
    requiresReapproval: true

updated: 2025-11-29  # Current date
```

## **Re-Approval Policy**

### Automatic Re-Approval Required When:

**Significant Changes (>20% structural difference)**:
- ✅ Section headings added/removed/reordered
- ✅ Major content blocks changed (>25% word count)
- ✅ Code examples or tables modified
- ✅ Process steps changed
- ✅ Approval gates or requirements updated

**Minor Changes (No Re-Approval Needed)**:
- ✅ Typo fixes
- ✅ Formatting improvements
- ✅ Link corrections
- ✅ Minor clarifications (<25% content change)
- ✅ Grammar improvements

### Re-Approval Process

1. **Template Sync Runs**:
   ```bash
   sc docs merge-templates --report
   ```

2. **Review Report**:
   ```
   .supernal/reports/TEMPLATE_SYNC_APPROVAL_REQUIRED.md
   ```

3. **Reviewer Actions**:
   - Read changed sections
   - Verify technical accuracy
   - Check consistency with related docs
   - Approve or request changes

4. **Update Frontmatter**:
   ```yaml
   status: approved
   reviewedBy: ['@reviewer1', '@reviewer2']
   reviewDates: ['2025-11-21', '2025-11-29', '2025-11-30']
   ```

5. **Commit**:
   ```bash
   git add docs/workflow/sops/
   git commit -m "docs: Template sync - approved by @reviewer1, @reviewer2"
   ```

## **Version History Structure**

### Standard Fields

```yaml
version_history:
  - version: '1.0'              # Semantic version
    date: 2025-11-21            # When this version was created
    approvedBy: ['@tech-lead']  # Who approved it
    changes: 'Initial approval' # What changed
    requiresReapproval: false   # Was re-approval needed?
```

### Example Evolution

```yaml
# Initial state
version: '1.0'
status: approved
reviewedBy: ['@tech-lead']
reviewDates: ['2025-11-21']

# After template sync (minor change)
version: '1.0'  # No increment
status: approved  # Stays approved
version_history:
  - version: '1.0'
    date: 2025-11-29
    changes: 'Template sync: Fixed typos'
    requiresReapproval: false

# After template sync (major change)
version: '1.1'  # Incremented
status: pending-review  # Needs re-approval
version_history:
  - version: '1.0'
    date: 2025-11-21
    approvedBy: ['@tech-lead']
    changes: 'Initial approval'
  - version: '1.1'
    date: 2025-11-29
    changes: 'Template sync: Added compliance section, restructured phase 3'
    requiresReapproval: true

# After re-approval
version: '1.1'
status: approved
reviewedBy: ['@tech-lead', '@compliance-lead']
reviewDates: ['2025-11-21', '2025-11-30']
```

## **Integration with Git**

### Pre-Merge Hook

```bash
# .husky/pre-commit or manual check before committing template syncs
sc docs check-approval-status

# Blocks commit if:
# - Files have status: pending-review
# - Files are missing required approvals
```

### Commit Message Format

```bash
# Minor template sync (no re-approval needed)
git commit -m "docs: Template sync - typo fixes, no re-approval needed"

# Major template sync (re-approval required)
git commit -m "docs: Template sync - requires re-approval

Updated files:
- docs/workflow/sops/general/SOP-0.1.05-requirements-planning.md
- docs/workflow/sops/general/SOP-0.1.11-decision-tracking.md

Changes: Added compliance sections, restructured approval gates
Status: pending-review
Required approvers: @tech-lead, @compliance-lead"

# After re-approval
git commit -m "docs: Approve template sync changes

Approved-by: @tech-lead, @compliance-lead
Date: 2025-11-30
Version: 1.1 → approved"
```

## **Workflow Integration**

### Before Template Sync

```bash
# 1. Check current approval status
sc docs list --status=approved

# 2. Backup current versions (for comparison)
git branch backup/template-sync-$(date +%Y%m%d)

# 3. Run smart merge
sc docs merge-templates --dry-run
sc docs merge-templates --report
```

### After Template Sync

```bash
# 1. Review changes
git diff --cached docs/workflow/

# 2. Check approval report
cat .supernal/reports/TEMPLATE_SYNC_APPROVAL_REQUIRED.md

# 3. Notify reviewers
# (send report to relevant approvers)

# 4. Wait for re-approval

# 5. Update frontmatter once approved
sc docs update-approval --file docs/workflow/sops/general/SOP-0.1.05-requirements-planning.md \
  --approver @tech-lead \
  --status approved

# 6. Commit
git add docs/workflow/ .supernal/reports/
git commit -m "docs: Template sync approved"
```

## **Anti-Patterns**

### ❌ DON'T: Direct rsync/cp

```bash
# This loses ALL approval history
rsync -av supernal-code-package/templates/workflow/ docs/workflow/
```

### ❌ DON'T: Skip Re-Approval

```bash
# Don't approve without review
sed -i 's/status: pending-review/status: approved/' *.md
git commit -m "docs: auto-approved" # NEVER DO THIS
```

### ❌ DON'T: Overwrite Version History

```bash
# This loses historical approvals
version_history: []  # Don't reset!
```

## **Best Practices**

### ✅ DO: Use Smart Merge Tool

```bash
# Always use the tool
sc docs merge-templates

# Review before committing
git diff

# Follow approval process
sc docs check-approval-status
```

### ✅ DO: Document Approval Decisions

```yaml
version_history:
  - version: '1.1'
    date: 2025-11-29
    changes: 'Template sync: Added compliance section'
    requiresReapproval: true
    approvalNotes: 'Approved after clarifying section 7.3 requirements'
    approvedBy: ['@tech-lead', '@compliance-lead']
    approvalDate: 2025-11-30
```

### ✅ DO: Communicate Changes

```bash
# Generate human-readable diff
sc docs merge-templates --verbose --report

# Share with team
cat .supernal/reports/TEMPLATE_SYNC_APPROVAL_REQUIRED.md | \
  # Send to Slack/email/etc
```

## **Related Documentation**

- [Document Approval Workflow](docs/workflow/sops/general/SOP-0.1.10-documentation.md)
- [Version Control Standards](docs/workflow/sops/general/SOP-0.1.12-git-workflow.md)
- [Change Control Process](docs/workflow/sops/general/SOP-0.1.13-change-control.md)

## **Implementation Checklist**

### Phase 1: Tool Creation ✅
- [x] Create smart merge tool
- [x] Add frontmatter preservation logic
- [x] Implement change detection
- [x] Add version history tracking

### Phase 2: Integration
- [ ] Add to `sc docs` command
- [ ] Create pre-commit check for approval status
- [ ] Add to CI/CD validation
- [ ] Document in SOP-0.1.10

### Phase 3: Workflow
- [ ] Train team on approval process
- [ ] Set up reviewer assignments
- [ ] Create approval tracking dashboard
- [ ] Monitor compliance

## **Future Enhancements**

1. **Approval Automation**: Auto-approve minor changes after 7 days if no objections
2. **Reviewer Routing**: Auto-assign reviewers based on SOP category
3. **Approval Dashboard**: Track pending approvals across all docs
4. **Change Summaries**: AI-generated summaries of what changed for reviewers
5. **Rollback Support**: Easy rollback if approval is denied

---

**Last Updated**: 2025-11-29
**Status**: Active Policy
**Requires**: Implementation of merge-templates command
