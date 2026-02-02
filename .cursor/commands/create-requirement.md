Creating a requirement following guidelines in `.cursor/rules/add-requirement.mdc`.

## ✅ DO: Use CLI for All Requirements

**Always use `sc requirement new` - never create requirement files manually.**

The system handles ID assignment, validation, and integration automatically.

---

## Quick Workflow

```bash
# Create new requirement (system assigns ID automatically)
sc requirement new "Feature Title" \
  --epic=epic-name \
  --priority=high \
  --request-type=feature

# Validate quality
sc planning req validate <REQ-ID>

# Update status
sc planning req update <REQ-ID> --status=in-progress

# Generate tests
sc planning req generate-tests <REQ-ID>
```

---

## Request Types & Priority Levels

**Request Types:**
- `--request-type=feature` - 🆕 New Feature (default)
- `--request-type=bug` - 🐛 Bug Fix
- `--request-type=enhancement` - ⚡ Enhancement
- `--request-type=maintenance` - 🔧 Maintenance

**Priority Levels:**
- `--priority=critical` - 🚨 Critical
- `--priority=high` - 🔥 High
- `--priority=medium` - 📋 Medium (default)
- `--priority=low` - 📝 Low

---

## Available Epics

Check `supernal.yaml` for current epics, or run:
```bash
sc feature list --domains
```

---

## Next Steps

Please provide:
1. Requirement title
2. Epic name
3. Priority level
4. Request type

And I'll run the command to create it.







