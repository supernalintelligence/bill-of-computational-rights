---
description: search before implementing any feature to prevent duplication
globs: **/*
alwaysApply: true
---

# Search Before Implement

## **Core Principle**

Before implementing any feature: **Search first, then decide** (reuse → extend → create)

**Reference**: [SOP-1.02](docs/workflow/sops/phase-1-discovery/SOP-1.02-solution-technology-analysis.md), [SOP-0.1.07](docs/workflow/sops/general/SOP-0.1.07-ai-implementation-safeguards.md)

---

## **Why**

Duplicate implementations cause:
- Maintenance nightmares
- Inconsistent behavior  
- Technical debt
- Confused developers

---

## **Search Strategy**

### **Step 1: Grep (Concrete Search)**

Search for exact names and patterns first:

```bash
# Class/function names
grep -r "FeatureName\|Feature.*Manager" --include="*.ts" --include="*.js"

# Patterns
grep -r "auth\|login\|session" --include="*.ts"
grep -r "validate\|validator" --include="*.ts"
```

---

### **Step 2: Alternative Names**

Think of synonyms and variations:

```bash
# Feature: "User Profile" 
# Search: profile, account, user info, member

grep -r "profile\|account\|member" --include="*.ts"
```

---

### **Step 3: Semantic Search (Abstract)**

Use natural language to find conceptual matches:

```
"How do we handle authentication?"
"Where is validation implemented?"
"What dashboard components exist?"
```

---

### **Step 4: Location Check**

Check standard directories:

```bash
ls -la src/services/ | grep -i feature
ls -la src/utils/ | grep -i feature
ls -la src/components/ | grep -i feature
```

---

## **Decision Tree**

```
Found existing?
├─ Exact match (100%) → ✅ REUSE
├─ Close match (80%+) → ✅ EXTEND
├─ Similar (50-80%) → ⚠️ Evaluate (refactor or separate?)
└─ None found (0%) → ⚠️ Search again, then CREATE
```

---

## **Examples**

### Example: Email Validation

**❌ BAD**:
```typescript
// No search, creates duplicate
export const validateEmail = (email: string) => { /*...*/ };
```

**✅ GOOD**:
```bash
# 1. Grep first
grep -r "validate.*email\|email.*valid" --include="*.ts"
# Found: ValidationUtils

# 2. Reuse
import { validateEmail } from '@/utils/ValidationUtils';
```

---

### Example: Dashboard Widget

**✅ GOOD Search Process**:
```bash
# 1. Grep for similar names
grep -r "Widget\|Dashboard.*Component" --include="*.tsx"
# Found: DashboardWidget, StatsCard

# 2. Semantic search for concepts
"What stat components exist?"
# Found: StatsCard component

# 3. Compose from existing
import { DashboardWidget, StatsCard } from '@/components';
```

---

## **Commit Format**

Document your search:

```
feat: Add [feature]

Search:
- grep: "[pattern]" → Found: [X, Y]
- Alternative names: [a, b, c]
- Decision: [reuse/extend/create]

Rationale: [why]
```

---

## **Related**

- [SOP-1.02: Solution Analysis](docs/workflow/sops/phase-1-discovery/SOP-1.02-solution-technology-analysis.md)
- [SOP-0.1.07: AI Safeguards](docs/workflow/sops/general/SOP-0.1.07-ai-implementation-safeguards.md)
- [Phase-Aligned Workflow](.cursor/rules/phase-aligned-workflow.mdc)

---

**Last Updated**: 2025-12-16  
**Status**: Active
