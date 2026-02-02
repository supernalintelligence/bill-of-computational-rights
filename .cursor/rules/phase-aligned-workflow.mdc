---
description: Follow 12-phase SOP workflow with phase-appropriate behavior
globs: **/*
alwaysApply: true
---

# Phase-Aligned Workflow

## **Core Principle**

Follow the 12-phase SOP workflow. Each phase has specific dos/don'ts.

**Reference**: [SOP-0: Complete Workflow](docs/workflow/sops/SOP-0-overview-complete-workflow.md)

---

## **The 12 Phases**

| Phase | Name | Key Rule | SOP |
|-------|------|----------|-----|
| **1-2** | Discovery/Research | Search first, no code | [SOP-1.02](docs/workflow/sops/phase-1-discovery/SOP-1.02-solution-technology-analysis.md) |
| **3** | Architecture | Design + risk assessment | [SOP-3.04](docs/workflow/sops/phase-3-design/SOP-3.04-security-analysis.md) |
| **4** | Planning | Break down, estimate | [SOP-4.01](docs/workflow/sops/phase-4-planning/SOP-4.01-feature-breakdown-and-estimation.md) |
| **5** | Requirements | Gherkin + validation | [SOP-5.01](docs/workflow/sops/phase-5-requirements/SOP-5.01-technical-requirements-development.md) |
| **6** | Testing | Write tests first (TDD) | [SOP-6.01](docs/workflow/sops/phase-6-tests/SOP-6.01-testing-strategy.md) |
| **7** | Build | Search → implement | [SOP-7.01](docs/workflow/sops/phase-7-build/SOP-7.01-implementation-with-ai-pair-programming.md) |
| **8** | Integration | E2E + security tests | [SOP-8.01](docs/workflow/sops/phase-8-integration/SOP-8.01-feature-integration-and-testing.md) |
| **9-12** | Deploy/Ops | Follow procedures | Various |

---

## **Phase-Specific Guidance**

### **Phase 1-2: Discovery/Research**
- ✅ Search existing solutions (external + internal)
- ✅ Document findings, identify gaps
- ❌ No coding, no technical decisions yet

### **Phase 3: Architecture**
- ✅ System design, ADRs, security, compliance
- ✅ Create `risks.yaml` for features
- ❌ No implementation code

### **Phase 4-5: Planning/Requirements**
- ✅ Use `sc requirement new` (not manual)
- ✅ Gherkin with acceptance criteria
- ❌ Don't skip validation

**Pre-Requisite**: Phase 5 MUST be complete before Phase 6

### **Phase 6: Testing**
- ✅ **Requirement MUST exist first** (Phase 5)
- ✅ Check requirement exists: `sc planning req list`
- ✅ Generate test stubs: `sc requirement generate-tests <REQ-ID>`
- ✅ Link test in requirement frontmatter: `tests: [path/to/test.test.js]`
- ✅ Reference REQ-XXX in test: `describe('REQ-XXX: ...', () => {})`
- ✅ Tests BEFORE code (TDD)
- ❌ **No tests without requirements** (violates SOP-6.01 prerequisite)
- ❌ No placeholder `REQ-XXX` in tests
- ❌ Don't skip or delete tests

**Before writing test**:
1. Verify requirement exists: `sc planning req list | grep -i "feature name"`
2. If missing, **STOP** → go back to Phase 5
3. Add test path to requirement frontmatter
4. Reference correct REQ-XXX in test describe()

**Check current status**: See [test-requirement-linkage.mdc](.cursor/rules/test-requirement-linkage.mdc) (dynamic rule)

### **Phase 7: Build**
- ✅ **Search first** ([see rule](.cursor/rules/search-before-implement.mdc))
- ✅ Follow TDD, use WIP registry
- ❌ No duplicates, no untested code

### **Phase 8+: Integration/Deploy**
- ✅ E2E tests, security scans
- ❌ No shortcuts

---

## **Phase Detection**

**Infer from context**:
- "research", "competitive analysis" → Phase 1-2
- "architecture", "design" → Phase 3
- "requirements", "Gherkin" → Phase 5
- "implement", "code" → Phase 7

**When unclear, ask user**.

---

## **Anti-Patterns**

❌ **Coding in research phase**  
❌ **Skipping architecture**  
❌ **No search before implementing**  
❌ **Designing while building**

---

## **Related Rules**

- [search-before-implement.mdc](.cursor/rules/search-before-implement.mdc) - Phase 7
- [feature-risk-assessment.mdc](.cursor/rules/feature-risk-assessment.mdc) - Phase 3
- [add-requirement.mdc](.cursor/rules/add-requirement.mdc) - Phase 4-5
- [git-commit-smart.mdc](.cursor/rules/git-commit-smart.mdc) - Phase 7

---

## **Note**

This rule references the existing phase-to-rule mapping in `rule-discovery.ts`. Consider dynamically generating phase-specific guidance via RuleWriter system.

---

**Last Updated**: 2025-12-16  
**Status**: Active  
**Future**: Could be dynamically generated from SOPs
