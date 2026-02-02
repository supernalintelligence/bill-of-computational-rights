---
description: Use documentation processor to extract and implement code blocks from planning docs with git integration
globs: docs/**/*.md, *.md
alwaysApply: false
---

# Documentation-Driven Development Pattern

## **Core Principle: Plan → Process → Implement → Commit**

When creating implementation plans or design documents with code examples, use the documentation processor to automatically extract, create files, and commit changes.

## **The Pattern**

Use this exact format in your markdown documentation:

```markdown
**File**: `path/to/file.ext`

```language
// Your code here
```
```

After processing with `sc docs process <doc-file> --commit`, the system will:
- ✅ Create the file at the specified path
- ✅ Add generation header with source doc name and timestamp
- ✅ Create necessary directory structure
- ✅ Mark the block as `**File IMPLEMENTED**:` with metadata in the documentation
- ✅ Remove the code block (DRY principle - code lives in files, not docs)
- ✅ Automatically commit all changes with traceability
- ⚠️ Detect conflicts if file already exists with different content

## **Command Options**

```bash
# Process and commit (recommended)
sc docs process <doc-file> --commit

# Process and commit with custom message
sc docs process <doc-file> --commit --message "feat: Implement feature X"

# Process without committing (manual commit later)
sc docs process <doc-file>

# Process without adding generation headers
sc docs process <doc-file> --commit --no-header

# Dry run (see what would happen)
sc docs process <doc-file> --commit --dry-run
```

## **When to Use**

### ✅ **DO Use For**:
- Large refactors affecting multiple files
- New feature implementations with clear structure
- Architecture changes with defined file organization
- Migration plans with step-by-step code changes
- Planning documents that become implementation guides

### ❌ **DON'T Use For**:
- Single file changes (just edit directly)
- Exploratory code snippets (use regular code blocks)
- Examples that shouldn't become files
- Documentation that's purely explanatory

## **Complete Example**

### Planning Document (Before)

```markdown
# Feature Implementation Plan

## Step 1: Create Utility Helper

**File**: `src/utils/stringHelper.ts`

```typescript
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};
```

## Step 2: Create Main Module

**File**: `src/features/userDisplay.ts`

```typescript
import { capitalize, truncate } from '../utils/stringHelper';

export const formatUsername = (username: string): string => {
  return capitalize(truncate(username, 20));
};
```
```

### After `sc docs process --commit`

**Planning Document** (After):
```markdown
# Feature Implementation Plan

## Step 1: Create Utility Helper

**File IMPLEMENTED**: `src/utils/stringHelper.ts`  
Generated from: `implementation-plan.md` | Commit: abc123f | 2025-12-14

## Step 2: Create Main Module

**File IMPLEMENTED**: `src/features/userDisplay.ts`  
Generated from: `implementation-plan.md` | Commit: abc123f | 2025-12-14
```

**Generated File** (`src/utils/stringHelper.ts`):
```typescript
// Generated from: implementation-plan.md
// Generated on: 2025-12-14
// DO NOT EDIT - Regenerate from documentation if changes needed

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};
```

**Git Commit**:
```
[SC] docs: Implement code from implementation-plan.md

- Created 2 file(s)
- Updated implementation-plan.md
```

## **Advanced Features**

### Similarity Detection
Files are compared using normalized line-based comparison:
- **>90% similar**: Considered matching, code block removed
- **<90% similar**: Marked as conflict, requires manual review

### Directory Creation
Nested directory structures are created automatically:
```markdown
**File**: `src/deeply/nested/path/to/file.ts`
```
This will create all intermediate directories.

### Multiple File Types
Supports any file type with appropriate comment syntax:
- TypeScript/JavaScript: `//` and `/* */`
- Python: `#` and `"""`
- Shell: `#`
- CSS/SCSS: `//` and `/* */`
- YAML: `#`
- Markdown: `<!-- -->`

### Generation Headers
Automatically detects language and adds appropriate headers:
- Source document name (basename only)
- Generation timestamp
- Warning not to edit generated file

## **Integration with Requirements**

When implementing requirements:

```markdown
# REQ-042: User Profile Display

**Requirement**: Users need formatted display names

## Implementation

**File**: `src/features/userProfile.ts`

```typescript
// Implementation for REQ-042
export const formatUserProfile = (user: User): DisplayProfile => {
  return {
    displayName: formatUsername(user.name),
    // ... REQ-042 implementation
  };
};
```
```

After processing with `--commit`:
```bash
sc docs process docs/requirements/req-042-user-profile.md --commit

# Automatic commit with message:
# [SC] docs: Implement code from req-042-user-profile.md
# - Created 1 file(s)
# - Updated req-042-user-profile.md
```

## **Best Practices**

### ✅ DO:
- Use `--commit` flag for automated workflow
- Use descriptive file paths
- Include necessary imports in code blocks
- Review dry-run output before committing
- Keep planning docs under version control
- Use the processor for systematic, planned changes

### ❌ DON'T:
- Process the same doc multiple times without reviewing
- Use for quick experimental changes
- Expect it to merge complex conflicts
- Mix implementation code with unrelated examples
- Skip reviewing changes before they're committed
- Use `--no-header` unless you have a specific reason

## **Error Handling**

The processor handles common scenarios:
- **Missing parent directories**: Creates them automatically
- **File already exists**: Checks similarity, marks conflicts if different
- **Invalid paths**: Reports error, continues with other files
- **Permission issues**: Reports error with details
- **Git commit failures**: Files are processed but not committed, manual commit needed

## **Troubleshooting**

### Problem: Code blocks not detected
**Solution**: Ensure exact format `**File**: \`path\`` with backticks

### Problem: Wrong directory created
**Solution**: Use paths relative to project root, not docs directory

### Problem: Conflicts on clean files
**Solution**: Check for whitespace differences, formatter settings

### Problem: Commit failed
**Solution**: Check git status, ensure working directory is clean, verify permissions

### Problem: Headers not added
**Solution**: Don't use `--no-header` flag; check file extension is supported

## **Related Commands**

- `sc docs cleanup`: Clean up documentation structure
- `sc docs validate`: Validate documentation format
- `sc requirement new`: Create new requirement with proper structure
- `sc git commit`: Manual safe git commit

## **See Also**

- [Git Workflow SOP](docs/workflow/sops/general/SOP-0.1.12-git-workflow.md)
- [Implementation with AI Pair Programming](docs/workflow/sops/phase-7-build/SOP-7.01-implementation-with-ai-pair-programming.md)
- [CLI Commands Reference](supernal-code-package/templates/guides/CLI_USAGE_GUIDE.md)
