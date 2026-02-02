---
description: Controlled files require workflow approval before AI or human modification
alwaysApply: true
---

# Controlled Files System

## **Core Principle: Workflow Before Modification**

Critical files are **controlled** and require explicit workflow approval before modification. This prevents accidental or unauthorized changes to infrastructure, configuration, and enforcement systems.

---

## **Three Control Levels**

### **Strict** (Highest Risk)
- Requires CHG document
- Requires approval from designated approvers
- Hard-blocks commit without workflow
- Examples: `supernal.yaml`, `package.json`, `.husky/**/*`

### **Moderate** (Medium Risk)
- Requires requirement linkage (REQ-XXX)
- Requires tests
- Hard-blocks commit without workflow
- Examples: `supernal-code-package/cli/**/*.js`, `supernal-code-package/lib/**/*.js`

### **Light** (Low Risk)
- Requires justification in commit message
- Warns but doesn't block
- Examples: `tsconfig.json`, `.eslintrc.js`, `jest.config.js`

---

## **Configuration**

Controlled files are defined in `.supernal/controlled-files.yaml`:

```yaml
version: '1.0'

controlled:
  strict:
    - path: 'supernal.yaml'
      reason: 'Core config'
      approvers: ['@tech-lead', '@security']
      requiresChg: true

  moderate:
    - path: 'supernal-code-package/cli/**/*.js'
      reason: 'CLI commands'
      requiresRequirement: true
      requiresTests: true

  light:
    - path: 'tsconfig.json'
      reason: 'TypeScript config'
```

---

## **Workflow**

### Check if File is Controlled

```bash
sc controlled check <file>
```

### Modify Controlled File (Required Before Editing)

```bash
sc controlled modify <file>
```

This prompts for:
- **Strict**: Create CHG document or link requirement
- **Moderate**: Create or link requirement
- **Light**: Provide justification

### Example: Modifying supernal.yaml

```bash
# 1. Run workflow first
$ sc controlled modify supernal.yaml

🚨 CONTROLLED FILE: supernal.yaml
Control Level: strict
Reason: Core config

What would you like to do?
> Create CHG document
  Link existing requirement
  Abort
  Bypass (emergency only)

# Select "Create CHG document"
# System creates CHG-XXXXXX and marks workflow complete

# 2. Now modify the file
$ nano supernal.yaml

# 3. Commit (pre-commit hook checks workflow)
$ git add supernal.yaml
$ git commit -m "chore: Update WIP threshold (CHG-000001)"

✅ Commit allowed - workflow completed
```

---

## **Pre-Commit Enforcement**

The pre-commit hook **hard-blocks** commits if:
- Controlled file is modified
- Workflow was NOT completed for that file

```bash
$ git commit -m "Update config"

❌ BLOCKED: Controlled files modified without workflow approval

The following controlled files were changed:
  📄 supernal.yaml

🚫 Controlled files CANNOT be committed without workflow

Required workflow steps:
  1. Unstage: git reset HEAD supernal.yaml
  2. Run workflow: sc controlled modify supernal.yaml
  3. Complete prompts (create CHG/REQ as needed)
```

---

## **Emergency Bypass**

For true emergencies ONLY (all bypasses are audited):

```bash
SC_ALLOW_CONTROLLED_EDIT=1 git commit -m "Emergency production fix"
```

**Bypass is logged** in `.supernal/controlled-files-audit.yaml`:
- Who bypassed
- What file
- When
- Reason (if provided)

---

## **Audit Trail**

View all controlled file modifications:

```bash
# All modifications
sc controlled audit

# Specific file
sc controlled audit --file=supernal.yaml

# Include bypasses
sc controlled audit --show-bypasses
```

---

## **Workflow State**

Workflow completion is tracked in `.supernal/controlled-files-workflow-state.yaml`:

```yaml
files:
  supernal.yaml:
    workflowCompleted: true
    type: chg
    chgId: CHG-000001
    timestamp: '2025-12-17T10:00:00Z'
    user: alice
```

State is **automatically cleared** after successful commit.

---

## **Integration with Existing Systems**

### With `.cursorignore`
- `.cursorignore` = **hard block** (AI can't read/write)
- Controlled files = **workflow required** (AI can read, modify with approval)

### With `DocumentRegistry`
- `DocumentRegistry` = **post-commit tracking** (signed commits, CHG for complex changes)
- Controlled files = **pre-commit blocking** (workflow before modification)

### With WIP Registry
- WIP Registry = **tracks uncommitted work**
- Controlled Files = **tracks workflow approval**
- Compatible: Can WIP-register controlled files after workflow

---

## **Common Scenarios**

### Scenario 1: AI Wants to Modify supernal.yaml

```bash
# AI runs:
$ sc controlled modify supernal.yaml

# Interactive prompt appears
# AI selects "Create CHG document"
# CHG-000001 created, workflow marked complete

# AI can now modify file
$ nano supernal.yaml

# Commit succeeds
$ git commit -m "chore: Update config (CHG-000001)"
✅ Allowed
```

### Scenario 2: Human Modifies CLI Command

```bash
# Human runs:
$ sc controlled modify src/cli/wip.js

# Prompt: Create requirement or link existing?
# Human selects "Link existing: REQ-042"
# Workflow marked complete

# Modify and commit
$ nano src/cli/wip.js
$ git commit -m "feat: Add new WIP command (REQ-042)"
✅ Allowed
```

### Scenario 3: Accidental Direct Modification

```bash
# Forgot to run workflow
$ nano supernal.yaml
$ git add supernal.yaml
$ git commit -m "Quick fix"

❌ BLOCKED: Controlled file modified without workflow

# Fix:
$ git reset HEAD supernal.yaml
$ sc controlled modify supernal.yaml
# ... complete workflow ...
$ git add supernal.yaml
$ git commit -m "chore: Update config (CHG-000001)"
✅ Allowed
```

---

## **Best Practices**

### ✅ DO

- Run `sc controlled check <file>` before editing
- Complete workflow BEFORE modifying file
- Link to CHG or REQ documents
- Use bypass ONLY for emergencies
- Review audit log regularly

### ❌ DON'T

- Edit controlled files without workflow
- Use bypass for non-emergencies
- Skip workflow "just this once"
- Forget to unstage after workflow failure
- Commit without reading error messages

---

## **Commands Reference**

```bash
# Check if file is controlled
sc controlled check <file>

# Start workflow for modification
sc controlled modify <file>

# List all controlled files
sc controlled list
sc controlled list --level=strict
sc controlled list --show-state

# View audit log
sc controlled audit
sc controlled audit --file=<file>
sc controlled audit --show-bypasses

# Emergency bypass (audited)
SC_ALLOW_CONTROLLED_EDIT=1 git commit -m "..."

# Skip pre-commit check (NOT recommended)
SC_SKIP_CONTROLLED_FILES_CHECK=true git commit -m "..."
```

---

## **Files & Locations**

- **Config**: `.supernal/controlled-files.yaml`
- **Workflow State**: `.supernal/controlled-files-workflow-state.yaml`
- **Audit Log**: `.supernal/controlled-files-audit.yaml`
- **Manager**: `supernal-code-package/lib/controlled-files/ControlledFilesManager.js`
- **CLI**: `supernal-code-package/cli/controlled.js`
- **Pre-Commit Hook**: `.husky/pre-commit` (via `supernal-code-package/lib/cli/commands/git/hooks/pre-commit.sh`)

---
