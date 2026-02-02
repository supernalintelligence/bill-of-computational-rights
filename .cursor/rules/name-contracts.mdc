---
description: Use centralized name contracts for all component IDs, API routes, and CLI commands
globs: apps/**/src/components/**/*.tsx, apps/**/src/app/api/**/*.ts, supernal-code-package/lib/**/*.js
alwaysApply: true
---

# Name Contracts System

## **Core Principle: Centralized, Type-Safe Names**

**Never use magic strings for component IDs, routes, or commands. Always use name contracts.**

---

## **Component IDs (data-testid)**

### ✅ **DO: Use Name Contracts**

```tsx
import { Components } from '@/lib/names';

export function SecurityView() {
  return (
    <div data-testid={Components.Compliance.SecurityView}>
      {/* ... */}
    </div>
  );
}
```

### ❌ **DON'T: Use Magic Strings**

```tsx
// Bad: Hardcoded string
export function SecurityView() {
  return <div data-testid="security-compliance-view">{/* ... */}</div>;
}
```

---

## **Why Name Contracts?**

1. **Type Safety**: IDE autocomplete, compile-time checks
2. **Refactor Safe**: Rename once, update everywhere
3. **Searchable**: `grep "Components.Compliance"` finds all uses
4. **Testable**: Automated validation ensures contracts match code
5. **Documentation**: Self-documenting, clear hierarchy

---

## **Freshness System**

Name contracts stay fresh via:

1. **Monitor Daemon**: `sc monitor` watches component files
   - Detects new `data-testid` attributes
   - Triggers contract regeneration
   - Updates in real-time

2. **Pre-Commit Hook**: Validates before commit
   - Ensures all components have contracts
   - Blocks commits with missing/duplicate IDs
   - Auto-runs `sc code validate`

3. **CLI Tools**: Manual management
   ```bash
   # All contract types (default)
   sc code scan                    # Scan components + routes
   sc code generate                # Generate all contracts
   sc code migrate                 # Migrate all types
   sc code validate                # Validate all contracts
   
   # Specific contract type
   sc code scan --type=components  # Components only
   sc code scan --type=routes      # Routes only
   sc code generate --type=routes  # Generate route contracts
   sc code validate --type=routes  # Validate route contracts
   ```

---

## **Workflow**

### **Creating New Component**

```bash
# 1. Create component with hardcoded testid
cat > SecurityView.tsx <<EOF
export function SecurityView() {
  return <div data-testid="security-view">{/* ... */}</div>;
}
EOF

# 2. Scan picks it up (auto via monitor daemon)
sc code scan

# 3. Generate adds it to contracts
sc code generate

# 4. Migrate updates your component
sc code migrate

# Result: Component now uses Components.Security.View
```

### **Migrating Existing Components**

```bash
# Step 1: Preview changes (safe, no modifications)
sc code migrate --dry-run

# Review what would change
# Output shows:
#   - Which files will be modified
#   - What imports will be added
#   - Which test IDs will be replaced
#   - No actual changes made

# Step 2: Migrate with backup (default, safe)
sc code migrate

# Creates .backup files for rollback
# Updates components to use name contracts

# Step 3: Review changes
git diff apps/supernal-dashboard/src/components/

# Step 4: Commit (two options)

# Option A: Manual commit
git add apps/supernal-dashboard/src/components/
git commit -m "refactor(ui): migrate to name contracts"

# Option B: Automatic commit (recommended)
sc code migrate --commit  # Migrates + commits in one step

# Safety: Rollback if needed
sc code rollback  # Restores from .backup files

# Cleanup backups after success
sc code cleanup-backups
```

**Safety Features**:
- ✅ `--dry-run` - Preview without changes
- ✅ Auto-backup (`.tsx.backup` files)
- ✅ `rollback` command
- ✅ `--commit` - Safe git commit with proper message
- ✅ Backups auto-cleaned after successful commit

---

## **Testing with Name Contracts**

```typescript
// Playwright/Jest tests
import { Components } from '@/lib/names';

test('security view renders', async ({ page }) => {
  await page.goto('/compliance/security');
  
  // Type-safe test ID
  await expect(page.getByTestId(Components.Compliance.SecurityView)).toBeVisible();
});
```

---

## **Structure**

```
supernal-code-package/lib/names/
├── index.ts           # Main entry + validation
├── Components.ts      # UI components (auto-generated)
├── API.ts             # API endpoints (future)
├── CLI.ts             # CLI commands (future)
└── Routes.ts          # Next.js routes (future)
```

---

## **Real-Time Updates**

The monitor daemon keeps contracts fresh:

```typescript
// In MonitorRunner.ts
class NameContractWatcher {
  watchComponents() {
    chokidar
      .watch('apps/**/src/components/**/*.tsx')
      .on('change', async (file) => {
        // Scan for new data-testid attributes
        const newIds = await this.scanFile(file);
        
        // Regenerate contracts if new IDs found
        if (newIds.length > 0) {
          await exec('sc code generate');
          console.log(`✅ Regenerated contracts: ${newIds.join(', ')}`);
        }
      });
  }
}
```

---

## **Pre-Commit Validation**

```bash
# In .husky/pre-commit
sc code validate || {
  echo "❌ Name contract validation failed"
  echo "   Run: sc code generate"
  exit 1
}
```

---

## **Coverage**

Name contracts cover:

- ✅ **Components**: `data-testid` (Phase 1 - DONE)
- ✅ **Routes**: Next.js route patterns (Phase 2 - DONE)
- 🚧 **API**: Endpoint paths (Phase 3)
- 🚧 **CLI**: Command strings (Phase 4)
- 🚧 **Functions**: Pure function IDs (Phase 5)

---

## **Migration Status**

Track migration progress:

```bash
# See unmigrated components
sc code validate

# Example output:
# ❌ Component exists but has no contract: new-dashboard-widget
# ❌ Component uses hardcoded string: FeatureCard.tsx:42
```

---

## **Related Documentation**

- [Feature Design](docs/features/developer-tooling/name-contracts/AUTO-GENERATION-FEATURE.md)
- [Implementation Summary](docs/features/developer-tooling/name-contracts/COMPLETE-IMPLEMENTATION-SUMMARY.md)
- [SOP-0.1.15: Naming Conventions](docs/workflow/sops/general/SOP-0.1.15-naming-conventions.md)

---

**Last Updated**: 2025-12-28  
**Status**: ✅ Phase 1 Active (Components), ✅ Phase 2 Active (Routes)  
**Next**: Phase 3 (API endpoints)
