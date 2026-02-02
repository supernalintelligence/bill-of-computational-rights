---
description: Always test before committing - committing broken code is a failure
globs: '**/*.{ts,tsx,js,jsx,py,go,java,c,cpp,rs}'
alwaysApply: true
---

# Test Before Commit

## **🚨 CRITICAL PRINCIPLE: NEVER COMMIT BROKEN CODE**

**Committing untested or broken code is a failure. Test before every commit.**

---

## **Required Workflow**

### ✅ **DO: Test → Build → Commit**

```bash
# Step 1: Run tests FOR THE CODE YOU CHANGED
npm test -- path/to/tests/for/your-changes.test.js  # Test YOUR changes
# OR (if no specific tests exist)
npm test -- path/to/affected/module.test.js         # Test affected modules
# OR (for broad changes)
npm test                                             # All tests

# Step 2: Build (if applicable)
pnpm run build                       # Or npm run build

# Step 3: Only commit if tests pass
git add <files>
sc git commit -m "feat(scope): description"
```

**🎯 KEY PRINCIPLE: Test the specific code you modified, not just any tests.**

### ❌ **DON'T: Commit Without Testing**

```bash
# BAD: No testing
git add src/feature.ts
git commit -m "feat: add feature"  # ❌ Might be broken!

# BAD: Skipping build verification
git commit -m "fix: urgent hotfix" --no-verify  # ❌ Bypassing safety checks
```

---

## **Testing Requirements by Change Type**

### **Code Changes (Mandatory Testing)**

**🎯 CRITICAL: Run tests that cover the SPECIFIC code you modified**

| File Type | Required Test | Command |
|-----------|---------------|---------|
| `*.ts`, `*.tsx`, `*.js`, `*.jsx` | Test file for changed module | `npm test -- path/to/YOUR-MODULE.test.js` |
| `*.py` | pytest for changed module | `pytest tests/path/to/YOUR_MODULE_test.py` |
| `*.go` | go test for changed package | `go test ./pkg/YOUR_PACKAGE` |
| CLI commands | Integration test for YOUR command | `npm test -- tests/integration/YOUR-COMMAND.test.js` |
| Dashboard components | Test for YOUR component | `npm test -- src/components/YOUR-COMPONENT.test.tsx` |

**If no specific tests exist for your changes:**
1. Write tests first (TDD - Phase 6)
2. Or ensure existing tests cover your changes
3. Or run full test suite and verify your code doesn't break anything

### **Documentation/Config Changes (Build Verification)**

| File Type | Required Check | Command |
|-----------|----------------|---------|
| `*.md` | Link validation | `sc docs links` |
| `*.yaml`, `*.json` | Config validation | `sc validate --all` |
| `package.json` | Dependency check | `npm install && npm run build` |
| `tsconfig.json` | Build check | `pnpm run build` |

### **Trivial Changes (Testing Optional)**

- Typo fixes in documentation
- README updates
- Comment changes
- Whitespace/formatting (if auto-formatted by CI)

**Even for trivial changes: Run linting/formatting checks**

```bash
npm run lint
pnpm run format
```

---

## **Pre-Commit Hook Integration**

The system includes **automated pre-commit checks** to catch issues before commit:

```bash
# Install hooks (one-time setup)
sc git hooks install
```

### **Configured Checks (supernal.yaml)**

```yaml
git_hooks:
  pre_commit:
    checks:
      test_suite:              # Run tests before commit
        enabled: true
        block_on_failures: true
      
      build_check:             # Verify build succeeds
        enabled: true
        block_on_errors: true
      
      lint_check:              # ESLint validation
        enabled: true
        block_on_errors: true
```

**These hooks will automatically:**
1. Run tests on modified files
2. Verify builds succeed
3. Check linting/formatting
4. Block commit if checks fail

---

## **Workflow Examples**

### **Example 1: Feature Implementation**

```bash
# 1. Create requirement (Phase 5)
sc requirement new "User Authentication" --epic=auth --priority=high

# 2. Write tests (Phase 6)
cat > tests/integration/auth/login.test.js <<EOF
describe('REQ-AUTH-001: User Login', () => {
  it('should authenticate valid user', async () => {
    // Test implementation
  });
});
EOF

# 3. Implement feature (Phase 7)
cat > src/auth/login.ts <<EOF
export async function login(username: string, password: string) {
  // Implementation
}
EOF

# 4. TEST BEFORE COMMIT
npm test -- tests/integration/auth/login.test.js
# ✅ Tests pass

# 5. Build verification
pnpm run build
# ✅ Build succeeds

# 6. Commit with traceability
sc git commit src/auth/login.ts tests/integration/auth/login.test.js \
  -m "feat(auth): implement user login (REQ-AUTH-001)"
```

---

### **Example 2: Bug Fix**

```bash
# 1. Add regression test (reproduce bug)
cat > tests/unit/validation.test.js <<EOF
describe('Bug: Date validation fails on ISO format', () => {
  it('should parse ISO 8601 dates', () => {
    expect(parseDate('2025-12-01')).toBe(validDate);
  });
});
EOF

# 2. Verify test FAILS (reproduces bug)
npm test -- tests/unit/validation.test.js
# ❌ Test fails (expected)

# 3. Fix the bug
# ... edit src/utils/validation.ts ...

# 4. Verify test now PASSES
npm test -- tests/unit/validation.test.js
# ✅ Test passes

# 5. Run full test suite (ensure no regressions)
npm test
# ✅ All tests pass

# 6. Commit fix
sc git commit src/utils/validation.ts tests/unit/validation.test.js \
  -m "fix(validation): support ISO 8601 date format"
```

---

### **Example 3: Dashboard Component**

```bash
# 1. Modify component
vim apps/supernal-dashboard/src/components/FeatureCard.tsx

# 2. Run component tests
cd apps/supernal-dashboard
npm test -- src/components/FeatureCard.test.tsx
# ✅ Tests pass

# 3. Run smoke tests
pnpm test:dashboard
# ✅ Smoke tests pass

# 4. Build dashboard
pnpm run build:dashboard
# ✅ Build succeeds

# 5. Commit
cd ../..
sc git commit apps/supernal-dashboard/src/components/FeatureCard.tsx \
  -m "feat(dashboard): add feature card component"
```

---

## **When Tests Fail**

### **Option 1: Fix the Code (Preferred)**

```bash
# Tests reveal bug
npm test -- tests/integration/feature.test.js
# ❌ 2 tests fail

# Fix the implementation
vim src/feature.ts

# Re-test
npm test -- tests/integration/feature.test.js
# ✅ All tests pass

# Commit
git commit -m "feat(feature): implement with tests"
```

---

### **Option 2: Fix the Tests (If Tests Are Wrong)**

```bash
# Implementation is correct, tests are outdated
npm test -- tests/unit/old-api.test.js
# ❌ Tests fail (expected - API changed)

# Update tests to match new API
vim tests/unit/old-api.test.js

# Verify
npm test
# ✅ All tests pass

# Commit both
git commit -m "refactor(api): update API and tests"
```

---

### **Option 3: Document Untested Code (Last Resort)**

**Only when:**
- Experimental/WIP code
- Tests are complex and will come in follow-up commit
- Trivial changes with implicit test coverage

```bash
# Commit with explicit warning
git commit -m "feat(experiment): add prototype (UNTESTED - needs tests in REQ-042)"
```

**Follow up IMMEDIATELY with tests:**
```bash
# Next commit MUST add tests
git commit -m "test(experiment): add test coverage for prototype (REQ-042)"
```

---

## **Emergency Situations**

### **Production Hotfix (Tests Breaking Build)**

```bash
# ONLY for critical production issues
# Document why bypassing

# Option 1: Skip pre-commit hook (one commit)
git commit --no-verify -m "hotfix(critical): fix production outage

BYPASS REASON: Production down, tests can't run in emergency.
Tests will be added in follow-up commit.

Closes INCIDENT-123"

# Option 2: Environment variable bypass
SC_SKIP_PRE_COMMIT=true git commit -m "hotfix: critical fix"
```

**⚠️ CRITICAL: Add tests in follow-up commit within 24 hours**

```bash
# Follow-up commit with tests
git commit -m "test(hotfix): add regression tests for emergency fix

Related to previous emergency hotfix.
Closes TASK-456"
```

---

## **Bypass Variables (Emergency Only)**

```bash
# Skip all pre-commit checks (EXTREME EMERGENCY)
SC_SKIP_HOOKS=true git commit -m "emergency fix"

# Skip only test suite check
SC_SKIP_TEST_SUITE=true git commit -m "docs: update README"

# Skip only build check
SC_SKIP_BUILD_CHECK=true git commit -m "wip: partial implementation"
```

**🚨 All bypasses are logged and audited. Use sparingly.**

---

## **Pre-Commit Hook Configuration**

### **Enable/Disable Test Checks**

Edit `supernal.yaml`:

```yaml
git_hooks:
  pre_commit:
    checks:
      test_suite:
        enabled: true              # Enable test suite check
        block_on_failures: true    # Hard-block if tests fail
      
      build_check:
        enabled: true              # Enable build verification
        block_on_errors: true      # Hard-block if build fails
```

### **Run Hooks Manually**

```bash
# Test pre-commit checks without committing
sc git hooks run pre-commit

# Verbose output
sc git hooks run pre-commit -v

# Check hook configuration
sc git hooks config
```

---

## **CI/CD Integration**

Pre-commit hooks are **first line of defense**. CI/CD provides **second line**:

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build
        run: pnpm run build
      
      - name: Lint
        run: pnpm run lint
```

**Even if you bypass local hooks, CI will catch issues.**

---

## **Best Practices Summary**

### ✅ **DO:**
- **Test the SPECIFIC code you changed before committing**
- Write tests for your changes first (TDD - Phase 6)
- Run tests that directly exercise your modifications
- Verify builds succeed for compiled code
- Run full test suite for critical/cross-cutting changes
- Document when committing untested code (extremely rare)
- Add tests immediately after emergency bypasses

### ❌ **DON'T:**
- Commit code without testing YOUR specific changes
- Run unrelated tests and assume your code is fine
- Bypass hooks without good reason
- Skip build verification for compiled code
- Assume "small changes" don't need tests
- Leave emergency bypasses without follow-up tests
- Use `--no-verify` habitually

**🎯 Remember: If you changed `src/auth/login.ts`, run `tests/auth/login.test.js` BEFORE committing.**

---

## **Quick Reference**

```bash
# Test YOUR specific changes (PREFERRED) - use sc test for auto-logging
sc test path/to/tests/for/YOUR-changes.test.js

# If you changed src/auth/login.ts:
sc test tests/auth/login.test.js

# If you changed a component:
sc test src/components/YourComponent.test.tsx

# Full test suite (for broad changes)
sc test

# Build verification
pnpm run build

# Pre-commit checks (manual)
sc git hooks run pre-commit

# Install hooks (one-time)
sc git hooks install

# Emergency bypass (rare)
git commit --no-verify -m "emergency: reason"
```

**🎯 Golden Rule: Always test the specific code you modified.**

---

## **SC CLI Testing Commands**

| Command | Purpose |
|---------|---------|
| `sc test` | Run tests with automatic log capture |
| `sc test audit` | Audit test-requirement traceability |
| `sc logs test` | Query captured test logs |
| `sc code fix-imports` | Auto-fix broken import paths in tests |
| `sc code type-check` | Detect TypeScript type duplications |
| `sc audit skipped-tests --cosmetic` | Find safe-to-remove stub tests |
| `sc traceability validate` | Validate requirement-test-code links |
| `sc health` | Project health checks |

### Debugging Multiple Test Failures

See [test-debugging.mdc](.cursor/rules/test-debugging.mdc) for the systematic approach:
1. Run `sc test` ONCE to capture all output
2. Analyze failures from `sc logs test --grep "FAIL"`
3. Fix tests from log analysis (no re-running)
4. Run `sc test` ONCE at end to verify

---

## **Related Documentation**

- [test-debugging.mdc](.cursor/rules/test-debugging.mdc) - Debugging multiple test failures
- [git-commit-smart.mdc](.cursor/rules/git-commit-smart.mdc) - Commit workflow
- [SOP-6.01: Testing Strategy](../docs/workflow/sops/phase-6-tests/SOP-6.01-testing-strategy.md)
- [SOP-0.1.12: Git Workflow](../docs/workflow/sops/general/SOP-0.1.12-git-workflow.md)

---

**Last Updated**: 2026-01-08  
**Status**: ✅ Active and enforced via pre-commit hooks  
**Enforcement**: Automated (git hooks) + CI/CD + Human review
