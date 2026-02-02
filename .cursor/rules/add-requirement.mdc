---
description: Use sc requirement commands for all requirement management - never create files manually
globs: docs/requirements/**/*.md
alwaysApply: false
---

# Requirement Management

## **✅ DO: Use CLI for All Requirements**

```bash
# Create new requirement (system assigns ID automatically)
sc requirement new "Feature Title" --epic=epic-name --priority=high --request-type=feature

# Quick workflow with request type classification
sc planning req new "Title" --epic=epic --priority=high --request-type=feature  # New feature
sc planning req new "Fix Bug" --epic=epic --priority=high --request-type=bug    # Bug fix
sc planning req validate 036                                                    # Check quality  
sc planning req update 036 --status=in-progress                                 # Mark as in-progress
sc planning req update 036 --status=done                                        # Mark complete
```

## **❌ DON'T: Manual File Creation**

```bash
# Wrong - bypasses validation and creates conflicts
edit supernal-coding/requirements/req-XXX-title.md
```

## **Request Types & Priority Levels**

### **Request Types**
- `--request-type=feature` - 🆕 New Feature (default)
- `--request-type=bug` - 🐛 Bug Fix 
- `--request-type=enhancement` - ⚡ Enhancement
- `--request-type=maintenance` - 🔧 Maintenance

### **Priority Levels**
- `--priority=critical` - 🚨 Critical
- `--priority=high` - 🔥 High  
- `--priority=medium` - 📋 Medium (default)
- `--priority=low` - 📝 Low

## **Common Commands**

```bash
sc planning req list                    # Show all requirements
sc planning req show 036               # View specific requirement
sc planning req validate 036           # Check quality
sc planning req generate-tests 036     # Create test framework
sc planning req update 036 --status=in-progress  # Mark as in-progress
```

## **Get Help**

```bash
sc requirement --help         # Full command reference
sc requirement validate --help # Specific command help
```

## **When to Create Requirements**

### ✅ Create Requirement BEFORE:
- Writing ANY test file
- Implementing behavioral validation
- Adding feature constraints/rules
- Testing user workflows
- Validation/safety checks

### 🚨 Trigger Words Requiring Requirement:
When you hear these phrases, **check if requirement exists first**:
- "test this feature" → Verify requirement exists with `sc planning req list`
- "ensure it validates" → Need requirement with validation criteria
- "test behavior" → Need behavioral requirement (Gherkin)
- "test that it blocks X" → Need constraint requirement
- "ensure it works" → Check for acceptance criteria in requirement

### Before Writing Tests:
```bash
# 1. Check if requirement exists
sc planning req list | grep -i "commit format"

# 2. If NOT found, create requirement first (Phase 5)
sc requirement new "Feature-Based Commit Format Validation" \
  --epic=developer-tooling \
  --priority=high \
  --request-type=feature

# 3. Add Gherkin scenarios to requirement file
# (Edit docs/requirements/.../req-XXX.md)

# 4. THEN create tests (Phase 6)
# (Link tests in requirement frontmatter)
```

**Related**: See dynamic rule [test-requirement-linkage.mdc](.cursor/rules/test-requirement-linkage.mdc) for current linkage status

---

**Remember: Always use `sc requirement` commands - never create requirement files manually. The system handles IDs, validation, and integration automatically.**
