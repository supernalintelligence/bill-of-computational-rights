---
description: ONLY create handoffs when user explicitly says "handoff" - not for normal documentation
globs: docs/handoffs/**/*.md
alwaysApply: false
---

# Agent Hand-Off Rules

## 🚨 CRITICAL: When to Create Handoffs

### ✅ ONLY create a handoff when:

**The user explicitly says "handoff" or "create a handoff"**

Examples:
- "Create a handoff for this work"
- "I need a handoff document"
- "Make a handoff for the next session"

### ❌ NEVER create handoffs for:

- **Normal documentation** → Use `docs/features/` or `docs/planning/`
- **Work in progress** → Use WIP registry (`sc workflow wip register`)
- **Planning documents** → Use `docs/planning/`
- **Research findings** → Use `docs/research_and_analysis/`
- **Feature specs** → Use `docs/features/{domain}/{feature}/`
- **Requirements** → Use `sc requirement new`
- **Architecture docs** → Use `docs/architecture/`
- **Completion summaries** → Just report in chat
- **Progress updates** → Update existing docs or WIP registry

---

## Two Types of Handoffs (User Must Specify)

### Type 1: Human Review Report (Default)

**Purpose**: You review what AI did  
**Audience**: Human (you)  
**Format**: Executive summary

**Structure**:
```markdown
# [Feature/Task] - Session Summary

## What Was Done
- Bullet list of accomplishments
- Changes made
- Decisions taken

## Files Modified
- List with brief description of changes

## Testing Status
- What was tested
- What passed/failed

## Next Steps (if any)
- What needs to happen next
- Dependencies or blockers
```

**Location**: `docs/handoffs/YYYY-MM-DD-HH-MM-session-summary.md`

---

### Type 2: Agent Continuation Doc

**Purpose**: Next AI agent picks up exactly where you left off  
**Audience**: Next AI agent  
**Format**: Detailed state dump

**Structure**:
```markdown
# [Feature/Task] - Agent Continuation

## Current Branch
[branch name]

## WIP Files
```bash
sc workflow wip list
# Output here
```

## Last Actions Taken
1. Specific command/file/change
2. With exact parameters
3. And outcomes

## Current State
- What's working
- What's broken
- What's in-progress

## Exact Next Steps
1. First command to run
2. Second command to run
3. Expected outcomes

## Context Dump
- Relevant variable values
- Configuration states
- Debug findings
- Error messages

## How to Resume
```bash
# Exact commands to get back to this state
git checkout [branch]
sc workflow wip list
# etc.
```
```

**Location**: `docs/handoffs/YYYY-MM-DD-HH-MM-continuation-[feature].md`

---

## User Must Choose Type

When user says "handoff", ask:

```
What type of handoff?
1. **Review report** (for you to read) - Summary of what was done
2. **Continuation doc** (for next agent) - Detailed state for resumption

Default: Review report
```

---

## Handoff Naming Convention

**Review reports**: `YYYY-MM-DD-HH-MM-session-summary.md`  
**Continuation docs**: `YYYY-MM-DD-HH-MM-continuation-[feature-name].md`

---

## Before Creating a Handoff: Checklist

When user says "handoff", verify:

- [ ] Did user explicitly say "handoff"? (If NO → DON'T CREATE)
- [ ] Is this a review report or continuation doc? (Ask if unclear)
- [ ] Should this be regular documentation instead? (Check decision tree)

---

## Alternative Documentation (Instead of Handoff)

**If user wants to document work** (but didn't say "handoff"):

### Completed Feature
→ Update feature README: `docs/features/{domain}/{feature}/README.md`

### Planning/Design
→ Create planning doc: `docs/features/{domain}/{feature}/planning/YYYY-MM-DD-design.md`

### Research Findings  
→ Create analysis: `docs/research_and_analysis/analysis/YYYY-MM-DD-topic.md`

### Progress Update
→ Update WIP registry notes: `sc workflow wip register <files> --notes="Progress update"`

### Implementation Notes
→ Add to feature docs: `docs/features/{domain}/{feature}/implementation/notes.md`

---

## Determine Handoff Type (If User Said "Handoff")

Before creating a handoff, determine which type applies:

### ✅ **RESOLVED/COMPLETED Handoff**
- Task, feature, or issue has been **successfully completed**
- All acceptance criteria met
- No further work needed on this specific item
- Ready for review/merge or already merged

### 🔄 **UNRESOLVED/IN-PROGRESS Handoff**  
- Work is **incomplete** or **blocked**
- Issue not fully resolved
- Requires continuation by next agent
- May have encountered obstacles

---

## ✅ **RESOLVED/COMPLETED Handoff Workflow**

### 1. Create Completion Handoff
```bash
sc agent handoff --title "completed-[component-name]"
# Example: sc agent handoff --title "completed-priority-system-rewrite"
```

### 2. Focus on Documentation & Closure
**Priority Information to Include:**
- **✅ What was accomplished** - Detailed completion summary
- **🎯 Success metrics** - How you know it's complete
- **📚 Lessons learned** - What worked well, what didn't
- **🔄 Follow-up work** - Any maintenance or future enhancements
- **🧪 Testing performed** - Verification steps taken
- **📁 Files modified** - Complete list of changes made

### 3. Completion Transition Blurb Template
```
✅ COMPLETED HAND-OFF: [Brief description of completed work]

📁 **Hand-off Document**: supernal-coding/kanban/handoffs/completed-[component-name]-YYYY-MM-DD.md
🌿 **Branch Status**: [Ready for merge / Already merged / Closed]
🎯 **Accomplishments**: [Top 3 things completed]
📋 **Files Modified**: [List of changed files]
✅ **Verified Working**: [Comprehensive testing/verification done]
🔄 **Follow-up**: [Any maintenance or future work identified]

**Context**: [Summary of approach taken and final outcomes]
**Lessons Learned**: [Key insights for future similar work]
```

### 4. File Management for Completed Work
- Keep in `supernal-coding/kanban/handoffs/` initially
- Mark with **Status**: ✅ **COMPLETED** in the handoff
- After review, move to `supernal-coding/kanban/done/`

---

## 🔄 **UNRESOLVED/IN-PROGRESS Handoff Workflow**

### 1. Create Continuation Handoff
```bash
sc agent handoff --title "inprogress-[component-name]"
# Example: sc agent handoff --title "inprogress-auth-system-debugging"
```

### 2. Focus on Current State & Next Steps
**Priority Information to Include:**
- **🎯 Current objective** - What you were trying to accomplish
- **🔄 Progress made** - What's been completed so far
- **🚧 Current blockers** - Specific issues encountered
- **🧪 What's been tried** - Approaches attempted and results
- **💡 Debugging info** - Error messages, logs, investigation findings
- **📍 Exact stopping point** - Where the next agent should start

### 3. In-Progress Transition Blurb Template
```
🔄 IN-PROGRESS HAND-OFF: [Brief description of ongoing work]

📁 **Hand-off Document**: supernal-coding/kanban/handoffs/inprogress-[component-name]-YYYY-MM-DD.md
🌿 **Branch Status**: [Needs more work / Has blockers / Experimental]
🎯 **Current Objective**: [What we're trying to achieve]
📋 **Progress Made**: [What's working so far]
🚧 **Current Blockers**: [Specific issues to resolve]
🔄 **Next Actions**: [Immediate steps for continuation]

**Context**: [What approach was being taken and why]
**Debugging Info**: [Key error messages, logs, or investigation findings]
**Estimated Time**: [Time estimate for resolution]
```

### 4. File Management for Ongoing Work
- Keep in `supernal-coding/kanban/handoffs/` for immediate pickup
- Mark with **Status**: 🔄 **IN-PROGRESS** or 🚧 **BLOCKED**
- Move to `supernal-coding/kanban/doing/` when work resumes

---

## 🛠 **Common Steps for Both Types**

### 1. Pre-Handoff Check
```bash
# Always document current state first
git branch                    # Current branch
git status                   # Working directory state
npm run build                # Build status (if applicable)
npm run test                 # Test status (if applicable)
```

### 2. Review Existing Handoffs
```bash
sc agent handoff              # See what handoffs already exist
```

### 3. Fill Template Thoroughly
- Replace all `[FILL IN]` placeholders
- Be specific and actionable
- Include exact file paths and line numbers when relevant
- Add any relevant error messages or logs

### 4. File Organization
- **Active handoffs**: Stay in `supernal-coding/kanban/handoffs/`
- **Work resumed**: Move to `supernal-coding/kanban/doing/`
- **Work completed**: Move to `supernal-coding/kanban/done/`
- **Old/archived**: Auto-cleanup after 3 months

---

## 🚨 **Special Situations**

### When Work is BLOCKED
- Use **BLOCKED** status in handoff
- Focus heavily on the blocker details
- Include what was tried to resolve the blocker
- Suggest alternative approaches or escalation paths

### When Work is EXPERIMENTAL
- Mark branch as **Experimental** 
- Include success/failure criteria
- Document what was learned even if approach failed
- Suggest whether to continue or try different approach

### When Emergency Handoff Needed
- Create handoff immediately, even if incomplete
- Mark as **URGENT** in the title
- Include current state and immediate concerns
- Provide emergency contact or escalation info

---

## 📋 **Quality Checklist**

Before sharing your handoff:
- [ ] Status type clearly identified (COMPLETED vs IN-PROGRESS)
- [ ] Branch name and status documented
- [ ] All [FILL IN] placeholders replaced
- [ ] Specific file paths and changes listed
- [ ] Next steps are actionable and clear
- [ ] Testing/verification status documented
- [ ] Any blockers or issues clearly explained

---

**Remember**: A good hand-off saves the next agent hours of investigation and ensures project momentum continues smoothly. Be thorough, honest, specific, and always include branch management context.
