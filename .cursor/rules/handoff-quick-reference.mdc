---
description: Quick reference - when and how to create handoffs (only when user says "handoff")
globs: docs/handoffs/**/*.md
alwaysApply: false
---

# Handoff Quick Reference

## When to Create

**ONLY when user explicitly says "handoff"**

Examples:
- "Create a handoff"
- "I need a handoff for this"
- "Make a handoff document"

## Two Types - Ask User Which One

### Type 1: Review Report (Default)
**Audience**: Human (user reads it)  
**Purpose**: Summary of what was done  
**Format**: Executive summary

```markdown
# Session Summary

## What Was Done
- Feature X implemented
- Tests added and passing
- Documentation updated

## Files Modified
- src/auth.ts - Added JWT validation
- tests/auth.test.ts - Added 15 tests

## Testing
- All tests passing (npm test)
- Manual testing: Login flow works

## Next Steps
- Deploy to staging
- User acceptance testing
```

**Filename**: `YYYY-MM-DD-HH-MM-session-summary.md`

---

### Type 2: Continuation Doc
**Audience**: Next AI agent  
**Purpose**: Resume exactly where you left off  
**Format**: Detailed state dump

```markdown
# Agent Continuation - Auth Feature

## Resume Commands
```bash
git checkout feature/auth-system
sc workflow wip list  # Shows 3 files in progress
npm test     # Should see 2 failing tests
```

## Current State
- JWT validation partially implemented
- Tests failing: login_with_expired_token, refresh_token_flow
- WIP files: src/auth.ts (line 145 - TODO), src/session.ts

## Debug Context
Error message: "Cannot read property 'exp' of undefined"
Location: src/auth.ts:145
Attempted: Adding null check, didn't work
Hypothesis: Token decode happening before validation

## Exact Next Steps
1. Add token.decode() validation before accessing .exp
2. Update tests to use valid token format
3. Run: npm test -- auth.test.ts
```

**Filename**: `YYYY-MM-DD-HH-MM-continuation-auth-feature.md`

---

## If User Didn't Say "Handoff"

**Don't create a handoff. Instead:**

| User Intent | Create This Instead |
|---|---|
| Document completed work | Update feature README: `docs/features/{domain}/{feature}/README.md` |
| Plan next steps | Planning doc: `docs/features/{domain}/{feature}/planning/YYYY-MM-DD-next-steps.md` |
| Record research | Analysis: `docs/research_and_analysis/analysis/YYYY-MM-DD-topic.md` |
| Track WIP | WIP registry: `sc workflow wip register <files> --notes="Status update"` |
| Implementation notes | Feature notes: `docs/features/{domain}/{feature}/implementation/notes.md` |

---

## Handoff Creation Process

1. **User says "handoff"** → Trigger
2. **Ask type**: "Review report or continuation doc?"
3. **Create appropriate format** (see templates above)
4. **Use correct filename** (session-summary or continuation-[feature])
5. **Save to** `docs/handoffs/`

---

**Related**: [agent-hand-off.mdc](.cursor/rules/agent-hand-off.mdc)
