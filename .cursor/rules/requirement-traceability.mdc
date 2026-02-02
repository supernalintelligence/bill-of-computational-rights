---
description: Requirement frontmatter NEVER includes implementation paths - those are inferred from tests
globs: docs/requirements/**/*.md
alwaysApply: false
---

# Requirement Traceability Flow

## ✅ CORRECT Flow

**Requirement → Tests (in frontmatter) → Implementation (inferred from test imports)**

```yaml
---
id: REQ-WORKFLOW-108
title: People Management CLI
tests:                                    # ← ONLY tests in frontmatter
  - tests/requirements/req-108/*.test.js
  - tests/integration/cli/people.integration.test.js
---
```

```javascript
// tests/requirements/req-108/req-108-people-cli.test.js
// ↓ Tests import implementations - THIS is how we trace to implementations
const { PeopleManager } = require('../../../supernal-code-package/lib/people/PeopleManager');
```

## ❌ NEVER Do This

```yaml
---
id: REQ-WORKFLOW-108
tests: [...]
implements:               # ❌ NEVER PUT THIS IN FRONTMATTER
  - src/file.ts          # ❌ WRONG
  - src/file.ts          # ❌ WRONG
---
```

## Why

1. **Tests define what they test** - Implementation paths are in `require()` statements
2. **DRY principle** - Don't duplicate information
3. **Auto-discoverable** - Tools can parse test imports to find implementations
4. **Maintainable** - When files move, tests break (good!), not stale frontmatter

## Tools

- `sc trace show REQ-XXX` - Discovers implementations from test imports
- `populate-requirement-tests.js` - Populates `tests:` field only






