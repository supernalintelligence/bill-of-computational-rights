---
description: Don't create summary documents - update existing docs and use commit messages instead
alwaysApply: true
---

# No Summary Documents (Unless Requested)

## **Core Principle: Update, Don't Summarize**

When you make changes, **update the relevant existing documentation**. Don't create separate summary documents unless explicitly requested or part of a handoff.

## **What NOT to Create**

### ❌ **Forbidden Unless Requested**
- `SUMMARY-OF-CHANGES.md`
- `WHAT-WE-DID-TODAY.md`
- `IMPLEMENTATION-SUMMARY.md`
- `SESSION-NOTES.md`
- Any file that just recaps what you did

### ✅ **Exceptions (When Summary Docs Are OK)**
1. **User explicitly asks**: "Create a summary document"
2. **Handoff**: User says "create a handoff" (see [handoff-quick-reference.mdc](.cursor/rules/handoff-quick-reference.mdc))
3. **Planning docs**: Forward-looking plans (not retrospective summaries)
4. **Architecture decisions**: ADRs documenting future impact (not what you just did)

## **Instead: Update Existing Documentation**

### ✅ **DO: Consolidate Changes**

**Scenario**: You just implemented a new flag

**DON'T**:
```
Create: docs/features/.../SUMMARY-NEW-FLAG.md
```

**DO**:
```
Update: docs/features/.../README.md (add flag to usage)
Update: docs/cli/command.md (add flag to reference)
```

### ✅ **DO: Use Commit Messages**

**DON'T**:
```
Create: docs/sessions/2026-01-06-bug-fix-summary.md
```

**DO**:
```bash
git commit -m "fix(git): date validation (REQ-108)

- Fixed ISO 8601 parsing
- Added regression test
- Updated docs

Closes TASK-042"
```

**The commit message IS the summary.**

## **When User Asks: "What Did You Do?"**

### ❌ **DON'T: Create a Document**

### ✅ **DO: Answer Directly in Chat**

```
Completed:
1. Fixed date validation bug
2. Added test (tests/integration/...)
3. Updated docs

Committed: fix(git): date validation (abc123)
```

**That's it. No document needed.**

## **Documentation Decision Tree**

```
Did I just complete work?
├─ User asked for summary? → Create summary doc
├─ User said "handoff"? → Create handoff doc (see handoff rule)
├─ Changed existing feature? → Update feature README
├─ Fixed bug? → Update relevant docs + commit message
├─ Added functionality? → Update existing docs
└─ Just want to recap? → DON'T. Use commit message.
```

## **Examples by Scenario**

### Bug Fix
**DON'T**: Create `BUG-FIX-SUMMARY.md`  
**DO**: Update relevant README + commit message

### Feature Implementation
**DON'T**: Create `FEATURE-IMPLEMENTATION-NOTES.md`  
**DO**: Update feature's `README.md` + requirement file

### Multi-Day Work
**DON'T**: Create daily summary docs  
**DO**: Use WIP registry notes + commit messages

## **Handoff Exception**

**ONLY create handoff when user explicitly says "handoff"**

See [handoff-quick-reference.mdc](.cursor/rules/handoff-quick-reference.mdc)

## **Red Flags (Stop and Ask)**

If you're about to create a file with these words:
- "Summary", "Session", "Recap", "Notes", "Log"
- "What we did", "Changes made", "Work completed"

**STOP. Ask yourself**:
1. Did user explicitly request this document?
2. Is this a handoff (user said "handoff")?
3. Can I update existing docs instead?

**99% of the time: Update existing docs, don't create summaries.**
