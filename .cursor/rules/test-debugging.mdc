---
description: Systematic approach for debugging and fixing test failures using sc CLI
globs: '**/tests/**/*.{ts,tsx,js,jsx,test.ts,test.js,spec.ts,spec.js}'
alwaysApply: false
---

# Test Debugging Workflow

## Core Principle: Run Once, Fix from Logs

**NEVER re-run the full test suite repeatedly while debugging. Run ONCE, capture logs, fix from analysis.**

---

## SC CLI Tools for Testing

| Command | Purpose |
|---------|---------|
| `sc test` | Run tests with automatic log capture |
| `sc test audit` | Audit test-requirement traceability |
| `sc logs test` | Query captured test logs |
| `sc audit skipped-tests --cosmetic` | Find cosmetic/safe-to-remove tests |
| `sc code fix-imports` | Auto-fix broken import paths in test files |
| `sc code type-check` | Detect TypeScript type duplications |
| `sc docs links --fix` | Fix broken documentation links |
| `sc date-validate --fix` | Fix hardcoded dates in files |
| `sc traceability validate` | Validate requirement-test-code traceability |
| `sc health` | Project health checks |

---

## Workflow: Fixing Multiple Test Failures

### Step 1: Run Tests ONCE

```bash
# Use sc test for automatic logging
sc test

# Or manual capture
npm test 2>&1 | tee /tmp/test-output.log
```

### Step 2: Analyze from Logs (NOT re-running)

```bash
# Using sc logs
sc logs test --grep "FAIL"
sc logs test --severity=error

# Or from manual log
grep "^FAIL " /tmp/test-output.log | sed 's/.*\///' | sort -u
```

### Step 3: Fix Each Test from Log Analysis

For each failing test:
1. Extract error details from log: `sc logs test --grep "test-name"`
2. Read implementation and test files
3. Apply fix
4. **Do NOT run tests yet** - continue to next failure

### Step 4: Final Verification (ONCE)

```bash
sc test  # Run ONCE at end to verify all fixes
```

---

## Common Fix Patterns

### Fix Mock Paths
Mock path must match the actual require/import path:
```typescript
// Implementation uses: require('../wip/WipManager')
// Mock must use same path relative to test:
jest.mock('../../lib/wip/WipManager', () => {...});
```

### Reset Singletons
```typescript
beforeEach(() => {
  (SingletonClass as any).instance = undefined;
  instance = SingletonClass.getInstance();
});
```

### Disable Dev Mode Bypass
```typescript
beforeEach(() => {
  isDevModeSpy = jest.spyOn(validator as any, 'isDevMode').mockReturnValue(false);
});
afterEach(() => {
  isDevModeSpy?.mockRestore();
});
```

### Sequential Mock Returns
```typescript
mockGlob
  .mockResolvedValueOnce(['file1'] as any)
  .mockResolvedValueOnce([] as any);
```

### Boolean Type Guards
```typescript
// Before: returns null for falsy
return obj && typeof obj === 'object';

// After: returns proper boolean
return Boolean(obj && typeof obj === 'object');
```

### Case-Insensitive Matching
```typescript
violations.find(v => v.message.toLowerCase().includes('frontmatter'));
```

---

## Auto-Fix Commands

### Broken Test Imports
```bash
sc code fix-imports --dry-run    # Preview
sc code fix-imports              # Fix all
sc code fix-imports path/to/test.ts --verbose
```

### Test Traceability
```bash
sc test audit           # Check linkage
sc test audit --fix     # Auto-fix orphaned tests
sc traceability validate
```

### Cosmetic/Stub Tests
```bash
sc audit skipped-tests --cosmetic --dry-run    # Preview
sc audit skipped-tests --cosmetic --fix        # Remove stubs
```

### Type Duplications
```bash
sc code type-check
sc code type-check --pre-commit
```

---

## Log Analysis Commands

```bash
# View last test session
sc logs test

# Filter by severity
sc logs test --severity=error

# Search patterns
sc logs test --grep "Cannot find module"
sc logs test --grep "expected.*received"

# List sessions
sc logs list --type=test

# Clean old logs
sc logs clean --older-than 7d
```

---

## Related Rules

- [test-before-commit.mdc](.cursor/rules/test-before-commit.mdc) - Testing before commits
- [git-commit-smart.mdc](.cursor/rules/git-commit-smart.mdc) - Commit workflow

---

**Key Rule: Run tests ONCE at start, fix from logs, run ONCE at end.**
