---
description: Document creation decision tree and commit practices aligned with the epic/requirement system 
globs: 
alwaysApply: true
---

# Document and Commit Rules

## **CRITICAL: Document Placement Decision Tree**

### Before Creating ANY New Document

Ask these questions IN ORDER:

#### 1. What TYPE of document?

**Requirement (Gherkin spec)** → See Section A below  
**Architecture/Design** → See Section B below  
**Planning/Analysis** → See Section C below  
**SOP/Workflow** → `docs/workflow/sops/`  
**Guide/Tutorial** → `docs/guides/`  
**Handoff** → Only create when user explicitly requests handoff (use `sc agent handoff`)

---

### Section A: Requirements

**Q: Is this requirement used by MULTIPLE features?**

**YES (cross-cutting)**:
- Location: `docs/requirements/{category}/req-{category}-NNN-title.md`
- Categories: `core/`, `infrastructure/`, `compliance/`, `workflow/`
- Example: Authentication affecting login, admin, API → `docs/requirements/core/req-core-042-auth.md`

**NO (feature-specific)**:
- Location: `docs/features/{domain}/{feature}/requirements/req-{feature}-NNN-title.md`
- Example: WIP file tracking ONLY for WIP registry → `docs/features/workflow-management/wip-registry/requirements/req-wip-001-tracking.md`

---

### Section B: Architecture/Design

**Q: Is this about something ALREADY IMPLEMENTED and TESTED?**

**YES (documenting existing system)**:
- **Q: Does it affect MULTIPLE features/domains?**
  - **YES (system-wide)** → `docs/architecture/{system|components|decisions}/`
    - System views → `docs/architecture/system/`
    - Component specs → `docs/architecture/components/`
    - ADRs → `docs/architecture/decisions/`
  - **NO (single feature)** → `docs/features/{domain}/{feature}/implementation/YYYY-MM-DD-architecture-notes.md`

**NO (planning future work)**:
- **Q: Does it affect MULTIPLE features/domains?**
  - **YES** → Create epic first: `docs/planning/epics/epic-{name}.md` with architecture section
  - **NO** → `docs/features/{domain}/{feature}/design/YYYY-MM-DD-architecture.md`
    - ALL future feature design goes here
    - Move to `docs/architecture/` ONLY when complete and system-wide

---

### Section C: Planning/Analysis

**Q: What scope?**

- **Research/Gap Analysis (high-level)** → `docs/research_and_analysis/analysis/YYYY-MM-DD-{topic}.md`
- **Epic planning** → `docs/planning/epics/epic-{name}.md`
- **Feature planning** → `docs/features/{domain}/{feature}/planning/YYYY-MM-DD-{topic}.md`
- **Requirement planning** → Same location as requirement (see Section A)

---

### Quick Examples

**❌ WRONG: New Feature Architecture**
```
docs/architecture/new-dashboard-system.md  ← NOT IMPLEMENTED YET
```

**✅ CORRECT: New Feature Architecture**
```
docs/features/dashboard-platform/system-redesign/design/2025-12-12-architecture.md
```

**❌ WRONG: Feature-Specific Requirement**
```
docs/requirements/core/req-core-101-wip-tracking.md  ← ONLY USED BY ONE FEATURE
```

**✅ CORRECT: Feature-Specific Requirement**
```
docs/features/workflow-management/wip-registry/requirements/req-wip-001-tracking.md
```

**✅ CORRECT: Cross-Cutting Requirement**
```
docs/requirements/core/req-core-042-authentication.md  ← Affects login, admin, API, audit
```

---

### Default Rule When in Doubt

**Default to feature-specific location** (`docs/features/{domain}/{feature}/...`).

It's easier to promote a feature-specific doc to system-wide than to break apart a premature system doc.

---

## **Smart Documentation Updates**

### **✅ DO: System-Aligned Documentation**
- **Update requirements** (Gherkin files) when specifications change during implementation
- **Move completed items to DONE** with completion notes and timestamps
- **Update epic progress** when requirements are completed
- **Create new requirements** when new needs are discovered during implementation
- **Follow decision tree above** when creating new documents

### **✅ DO: Commit with Requirements Traceability**
- **Use conventional commit format** with FEATURE scope: `feat(feature-name): description (REQ-XXX)`
  - Primary: Use feature name as scope (e.g., `feat(auth): implement login (REQ-042)`)
  - Disambiguation: Use `domain/feature` only when feature name exists in multiple domains
  - Example: `feat(workflow-management/planning): update docs (REQ-042)` when "planning" exists in multiple domains
  - Cross-feature: Use domain only when work spans multiple features
- **Reference specific requirements** in commit messages
- **Update requirement status** when code is committed
- **Create branches when needed**: Work sessions (preferred) or feature branches (optional)
  - Work session: `session-alice-dec15` (multi-feature)
  - Feature branch: `feature/req-001-user-login` (single feature)

### **✅ DO: Smart Commit Practices**
- **Commit specific files** related to the requirement being implemented
- **Stage requirement updates** along with code changes
- **Update rule files** when new patterns emerge from actual implementation

### **❌ DON'T: Scattered Documentation**
- Don't create random documentation files that don't fit the system
- Don't commit unrelated changes together
- Don't update documentation without corresponding code changes
- Don't commit without updating relevant requirement status
- Don't bypass the decision tree above

## **Implementation Pattern**
1. **Work on requirement** → Code changes
2. **Update requirement** → Mark progress or completion
3. **Commit together** → Code + requirement updates
4. **Follow naming** → Use REQ-XXX format

---

**Related**: [SOP-0.1.18: Feature Documentation Structure](docs/workflow/sops/general/SOP-0.1.18-feature-documentation-structure.md)