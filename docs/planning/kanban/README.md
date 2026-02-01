# Kanban Project Management

This directory contains the kanban task management system.

## Structure

- **BRAINSTORM/**: Ideas and exploration
- **PLANNING/**: Planning and scoping tasks  
- **TODO/**: Ready to work tasks
- **DOING/**: In progress work
- **BLOCKED/**: Blocked tasks
- **DONE/**: Completed tasks
- **handoffs/**: Agent/developer handoffs and documentation

## Usage

Use the `sc kanban` command to interact with this system:

```bash
sc kanban list              # Show all tasks
sc kanban todo "new task"   # Create new task
sc kanban priority next     # Show next priority task
```

See `sc kanban --help` for full documentation.
