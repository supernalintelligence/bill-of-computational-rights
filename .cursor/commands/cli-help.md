CLI command reference from `.cursor/rules/supernal-cli-commands.mdc`.

## 🛠️ Supernal Coding CLI Commands

**All commands can be run with either 'sc' or 'supernal-coding' prefix**

---

## Core Workflow

**`sc requirement <action>`** - Manage requirements
- Options: `--priority <level>`, `--status <status>`
- Example: `sc requirement new "Title" --epic=X --priority=high`

**`sc validate`** - Validate current installation
- Options: `-v, --verbose`, `--requirements`
- Example: `sc validate --all`

**`sc feature <action>`** - Feature management
- Options: `--fix`, `--quiet`
- Example: `sc planning feature --id=my-feature`

---

## Development

**`sc docs <action>`** - Documentation management
- Example: `sc docs links --fix`

**`sc test [action]`** - Test execution & evidence
- Options: `--quick`, `--requirement <id>`
- Example: `sc test path/to/test.test.js`

**`sc build`** - Build wrapper (BUILDME.sh or npm run build)
- Options: `--show=errors`
- Example: `sc build --show=errors`

---

## System Management

**`sc init [directory]`** - Equip repository with Supernal Coding
- Options: `--minimal`, `--standard`
- Example: `sc init /path/to/project`

**`sc git <subcommand>`** - Unified git workflow
- Subcommands: `commit`, `branch`, `merge`, `deploy`
- Example: `sc git commit --message="feat: add feature"`

**`sc git-hooks <action>`** - Manage git hooks
- Example: `sc git-hooks install`

---

## Git & GitHub

**`sc github <action>`** - GitHub operations
- Example: `sc github issue create`

**`sc monitor [subcommand]`** - Monitor & issues
- Example: `sc monitor status`

---

## Help

**`sc <command> --help`** - Get detailed help
**`sc help`** - Show all commands

---

## Full Reference

For complete command documentation, see `.cursor/rules/supernal-cli-commands.mdc` or run:
```bash
sc help
```

**Total Commands Available**: 35+







