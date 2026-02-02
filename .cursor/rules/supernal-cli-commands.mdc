# 🛠️ Supernal Coding CLI Commands

**All commands can be run with either 'sc' or 'supernal-coding' prefix**

## Quick Reference

### Core Workflow

**`sc requirement <action>`** - Manage requirements
  Options: `--priority <level>`, `--status <status>`
  Example: `sc requirement <action> --help`

**`sc validate`** - Validate current installation
  Options: `-v, --verbose`, `--requirements`
  Example: `sc validate --all`

**`sc priority <action>`** - Priority management for requirements
  Options: `-n, --limit <number>`, `--all`
  Example: `sc priority <action> --help`

**`sc feature <action>`** - Manage features in the feature-by-phase system
  Options: `--fix`, `--quiet`
  Example: `sc feature <action> --help`

### Development

**`sc docs <action>`** - Documentation management
  Options: `--structure`, `--template`
  Example: `sc docs <action> --help`

**`sc test [action]`** - Test execution, management, and evidence logging
  Options: `--quick`, `--requirement <id>`
  Example: `sc test [action] --help`

**`sc build`** - Build execution wrapper (BUILDME.sh or npm run build)
  Options: `--quiet`, `--no-colors`
  Example: `sc build --help`

**`sc deploy [action] [target]`** - Vercel deployment with monitoring (DEPLOYME.sh wrapper)
  Actions: (default) deploy, `status <id>`, `logs <id>`
  Options: `-p, --production`, `--no-wait`, `--timeout <secs>`, `--poll <secs>`, `--json`, `-q, --quiet`
  Environment: `VERCEL_TOKEN` (required)
  Example: `sc deploy --production --json`
  Example: `sc deploy status dpl_abc123`
  Example: `sc deploy logs dpl_abc123 --json`

**`sc code type-check`** - Detect and prevent TypeScript/JavaScript type duplications
  Options: `--pre-commit`, `--show-ignored`
  Example: `sc code type-check --help`

### System Management

**`sc init [directory]`** - Equip repository with Supernal Coding
  Options: `--minimal`, `--standard`
  Example: `sc init [directory] --help`

**`sc git hooks <action>`** - Manage git hooks
  Example: `sc git hooks <action> --help`

**`sc git <subcommand>`** - Unified git workflow operations
  Subcommands:
  - `commit [files...]` - Smart commit with traceability
  - `branch <name>` - Create smart branch with validation
  - `check` - Check repository context and status
  - `merge <branch>` - Safe merge with rebase and tests (`--ignore-submodules` to skip drift)
  - `deploy` - Deploy with tests and versioning
  - `submodule status` - Show submodule states with change type classification
  - `submodule validate` - Validate submodule refs exist on remotes (read-only)
  - `submodule fix` - Fix invalid refs (dry-run default, `--apply` to execute)
  Options: `-m, --message <msg>`, `--nit`, `--push`, `--delete-local`, `-v`
  Example: `sc git commit file.ts -m "feat: add feature"`
  Example: `sc git submodule status`
  Example: `sc git <action> --help`

### Git & GitHub

**`sc github <action> [subaction] [args...]`** - GitHub integration: sync, issue management, response detection
  Options: `--issues`, `--prs`
  Example: `sc github <action> [subaction] [args...] --help`

**`sc monitor [subcommand]`** - Development status and GitHub issue monitoring
  Options: `--issue <number>`, `--interval <time>`
  Example: `sc monitor [subcommand] --help`

### Configuration

**`sc config <action> [args...]`** - Configuration management
  Options: `-v, --verbose`, `--section <name>`
  Example: `sc config <action> [args...] --help`

**`sc rules <action>`** - Rule management
  Options: `--force`, `--json`
  Example: `sc rules <action> --help`

**`sc template <action>`** - Template management
  Options: `-v, --verbose`
  Example: `sc template <action> --help`

**`sc workflow <action>`** - Workflow state management
  Options: `-v, --verbose`
  Example: `sc workflow <action> --help`

### Integrations

**`sc connect [plugin] [command] [args...]`** - Connect to and interact with external services (Jira, Google)
  Options: `-p, --project <key>`, `-s, --status <status>`
  Example: `sc connect [plugin] [command] [args...] --help`

## Full Command Details

For complete help on any command:
```bash
sc <command> --help
```

## Agent-Specific Usage Patterns

### Task Management Workflow
```bash
sc planning kanban list          # See current tasks
sc planning kanban todo "task"   # Create new task  
sc planning kanban done <id>     # Mark task complete
```

### Validation & Quality
```bash
sc validate --all       # Full project validation
sc validate --requirements  # Just requirements check
```

### Getting Help
```bash
sc suggest "feedback"   # Quick GitHub issue creation
sc help                 # Show all commands
```

**Total Commands Available: 39**
**Last Updated: 1/30/2026**
