---
description: AI navigation system for Supernal Coding documentation
globs: docs/**/*.md
alwaysApply: false
---

# Documentation Navigation System

## **Purpose**
This rule helps AI agents navigate Supernal Coding's documentation structure efficiently and correctly.

---

## **Directory Structure**

```
docs/
├── workflow/
│   └── sops/                   # Standard Operating Procedures
│       ├── INDEX.md            # Quick navigation
│       ├── SOP-0-*.md          # Main SOPs
│       ├── parts/              # 16 modular parts
│       ├── phase-N-*/          # Phase-specific SOPs
│       └── tools/              # Tool-specific SOPs
├── architecture/               # System-wide architecture (IMPLEMENTED & TESTED only)
│   ├── system/                 # System views
│   ├── components/             # Component specs
│   └── decisions/              # ADRs
├── requirements/               # Cross-cutting requirements (affect multiple features)
│   ├── core/
│   ├── compliance/
│   ├── infrastructure/
│   └── workflow/
├── features/                   # Features by functional domain
│   ├── ai-workflow-system/    # AI automation & workflows
│   │   └── {feature}/
│   │       ├── design/         # Feature-specific architecture (PLANNING)
│   │       ├── requirements/   # Feature-specific requirements
│   │       └── planning/
│   ├── compliance-framework/  # Compliance & regulatory
│   ├── content-management/    # Content & social media
│   ├── dashboard-platform/    # Dashboard UI & integrations
│   ├── developer-tooling/     # CLI, docs, dev tools
│   ├── integrations/          # External service connections
│   ├── workflow-management/   # Workflow & state tracking
│   ├── admin-operations/      # Admin features
│   └── archived/              # Historical reference
├── planning/                   # Plans, epics, roadmaps
│   ├── epics/
│   ├── roadmap/
│   └── kanban/
├── research_and_analysis/      # High-level research
│   └── analysis/
└── guides/                     # User guides
```

---

## **Finding Documents**

### By Type

| Document Type | Location | Navigation |
|---------------|----------|------------|
| **SOPs** | `docs/workflow/sops/` | Start at [INDEX.md](../workflow/sops/INDEX.md) |
| **Requirements (cross-cutting)** | `docs/requirements/{category}/` | Check specific category |
| **Requirements (feature-specific)** | `docs/features/{domain}/{feature}/requirements/` | Within feature folder |
| **Features** | `docs/features/{domain}/` | Check functional domain |
| **Architecture (system-wide, implemented)** | `docs/architecture/` | System/Components/Decisions |
| **Architecture (feature-specific, planning)** | `docs/features/{domain}/{feature}/design/` | Within feature folder |
| **Guides** | `docs/guides/` | User-facing documentation |

### By SOP Type

| SOP Type | Location | Use Case |
|----------|----------|----------|
| **Main SOPs** | `sops/SOP-0-*.md` | High-level workflow overviews |
| **Modular Parts** | `sops/parts/SOP-0.1.XX-*.md` | Detailed guidance (16 parts) |
| **Phase SOPs** | `sops/phase-N-*/SOP-N.XX-*.md` | Deep-dive per phase |
| **Tool SOPs** | `sops/tools/SOP-T.XX-*.md` | Tool-specific procedures |

### Quick SOP Reference

**AI Foundations** (Parts 01-04):
- Part 01: Foundation - AI collaboration basics
- Part 02: Chat Management - Managing AI conversations
- Part 03: Prompting Patterns - Effective prompts
- Part 04: Validation & Quality - Quality control

**Development Workflow** (Parts 05-14):
- Part 05: Requirements & Planning
- Part 06: Design & Architecture
- Part 07: AI Implementation Safeguards
- Part 08: Testing Strategy
- Part 09: End-to-End Testing
- Part 10: Documentation Standards
- Part 11: Decision Tracking
- Part 12: Git Workflow & Code Review
- Part 13: Change Control & Deployment
- Part 14: Evaluation & Learning

**Reference** (Parts 15-16):
- Part 15: Naming Conventions ⭐
- Part 16: Roles & Responsibilities ⭐

**Phase-Specific**:
- Phase 0: Discovery (SOP-0.01, SOP-0.02)
- Phase 2: Requirements (SOP-2.03 Compliance, SOP-2.04 Security)
- Phase 6: Operations (SOP-6.01 Marketing, SOP-6.02 Post-Launch)

---

## **Navigation Strategy**

### For New Projects
1. **Start**: `docs/workflow/sops/INDEX.md`
2. **Read**: SOP-0 (complete workflow)
3. **Read**: SOP-0.1 (AI workflow hub)
4. **Reference**: Relevant parts as needed

### For Specific Tasks

**Setting up project**:
→ `docs/guides/getting-started/`

**Writing requirements**:
→ Part 05 (Requirements & Planning)
→ `docs/requirements/{category}/` (examples)

**Architecture decisions**:
→ Part 06 (Design & Architecture)
→ Part 11 (Decision Tracking)

**Testing**:
→ Part 08 (Testing Strategy)
→ Part 09 (E2E Testing)

**Compliance**:
→ SOP-2.03 (Compliance Requirements)
→ `docs/requirements/compliance/`

**Security**:
→ SOP-2.04 (Security Analysis)

**Deployment**:
→ Part 13 (Change Control & Deployment)
→ SOP-6.02 (Post-Launch Operations)

---

## **Document Metadata**

### Required Frontmatter

All documentation should include:
```yaml
---
type: [sop|requirement|feature|guide|architecture]
title: "Document Title"
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: [draft|review|approved|deprecated]
---
```



---

## **Creating New Documents**

**CRITICAL**: See [document-and-commit.mdc](.cursor/rules/document-and-commit.mdc) for the **decision tree** on where to place documents.

### Process
1. **Follow decision tree** in [document-and-commit.mdc](.cursor/rules/document-and-commit.mdc)
2. **Use template** from `templates/docs/`
3. **Add frontmatter** (required metadata)
4. **Update INDEX.md** in parent directory (if 5+ docs)
5. **Validate**: `sc docs links`

### Document Naming

**SOPs**:
- Main: `SOP-N-title.md`
- Parts: `SOP-0.1.XX-title.md`
- Phase: `SOP-N.XX-title.md`
- Tool: `SOP-T.XX-title.md`

**Requirements**:
- Format: `req-{category}-{num}-brief-title.md`
- Example: `req-core-042-user-authentication.md`

**Features**:
- No strict format
- Group by domain then feature
- Use descriptive names (kebab-case)

---

## **Validation**

### Commands
```bash
# Validate and fix document links
sc docs links                    # Check all links
sc docs links --fix              # Fix broken links
sc docs links --fix --commit     # Fix and auto-commit

# Validate and fix document dates
sc date-validate                 # Check all dates
sc date-validate --fix           # Fix date issues
sc date-validate --file=<path>   # Check specific file

# Validate requirements/tests/config
sc validate --requirements       # Validate requirements
sc validate --tests             # Validate tests
sc validate --all               # Validate everything

# Documentation cleanup
sc docs --cleanup               # Scan and cleanup structure
sc docs --auto-fix              # Fix documentation issues
```

### What Gets Validated
- ✅ Frontmatter present and valid (via `sc validate`)
- ✅ Internal links resolve (via `sc docs links`)
- ✅ Document dates match file dates (via `sc date-validate`)
- ✅ Requirements structure (via `sc validate --requirements`)
- ✅ Test coverage (via `sc validate --tests`)

---

## **Common Patterns**

### Pattern 1: Finding Related SOPs
```
Need: Requirements guidance
→ Start: docs/workflow/sops/INDEX.md
→ Section: "Group B: Development Workflow"
→ Find: Part 05 - Requirements & Planning
```

### Pattern 2: Understanding Workflow
```
Need: Complete workflow understanding
→ Read: SOP-0 (complete workflow overview)
→ Deep dive: Relevant parts (05-14) for phases
→ Phase details: Phase-specific SOPs if needed
```

### Pattern 3: Finding Examples
```
Need: Requirement example
→ Look: docs/requirements/{category}/
→ Find: Similar requirements
→ Reference: Template in templates/docs/
```

---

## **Best Practices**

### ✅ DO:
- Start navigation from INDEX.md files
- Check document frontmatter for type and relationships
- Use relative paths for cross-references
- Follow existing naming conventions
- Validate after creating/updating documents

### ❌ DON'T:
- Create documents without frontmatter
- Use absolute paths for internal links
- Skip INDEX.md updates (if 5+ files in directory)
- Guess document locations (check INDEX first)
- Create duplicate organization (one topic, one place)

---

## **Quick Commands**

```bash
# Find document by type
sc docs list --type=sop
sc docs list --type=requirement --category=compliance

# Search documentation
sc docs search "authentication"

# Generate INDEX files
sc docs generate-indexes

# Initialize documentation system
sc docs init-system
```

---

**Last Updated**: 2025-12-12  
**Maintained by**: Supernal Coding Core Team  
**Review**: Update when adding major documentation sections
