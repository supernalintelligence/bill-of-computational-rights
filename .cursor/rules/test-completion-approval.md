# Test Completion and Approval Workflow Rules

## 🎯 Core Principle

**Different types of work require different approval processes** to ensure quality while maintaining development velocity.

## 📋 Test Completion States

### 1. **TESTS_PASSING** - All automated tests pass

- **Status**: Ready for next phase
- **Rule**: Can proceed to approval phase automatically
- **Action**: Move to appropriate approval queue

### 2. **NEEDS_MANUAL_APPROVAL** - Requires human review

- **Status**: Waiting for manual verification
- **Rule**: Cannot proceed until manually approved
- **Location**: `docs/planning/kanban/tasks/needs-approval/`

### 3. **APPROVED** - Manual approval completed

- **Status**: Ready for completion
- **Rule**: Can be moved to DONE
- **Action**: Complete the task/requirement

### 4. **REJECTED** - Failed approval

- **Status**: Needs rework
- **Rule**: Move back to DOING with feedback
- **Action**: Address approval feedback

## 🔄 Test Completion Decision Tree

### Automatic Approval (No Manual Review)

**Triggers**:

- Simple bug fixes
- Documentation updates
- Configuration changes
- Refactoring with full test coverage
- Tasks marked with `auto-approve: true`

**Process**:

```
Tests Pass → Automated Checks → DONE
```

### Manual Approval Required

**Triggers**:

- Security-related changes
- API changes
- Database schema changes
- Production configuration
- New user-facing features
- Tasks marked with `requires-approval: true`

**Process**:

```
Tests Pass → NEEDS_MANUAL_APPROVAL → Manual Review → APPROVED/REJECTED
```

## 🧪 Test Evaluation Rules

### Unit Tests

- **Requirement**: Must pass for any code change
- **Blocking**: Cannot proceed without passing
- **Coverage**: Minimum 80% for new code
- **Process**: Automatic evaluation

### Integration Tests

- **Requirement**: Must pass for API/service changes
- **Blocking**: Cannot proceed without passing
- **Coverage**: All integration points tested
- **Process**: Automatic evaluation

### E2E Tests

- **Requirement**: Must pass for user-facing changes
- **Blocking**: Cannot proceed without passing
- **Coverage**: Critical user journeys
- **Process**: Automatic evaluation with manual verification

### Manual Tests

- **Requirement**: Required for complex features
- **Blocking**: Cannot proceed without completion
- **Coverage**: Scenarios that can't be automated
- **Process**: Manual execution and approval

## 📊 Approval Categories

### 🟢 **Auto-Approve Categories**

- **Documentation**: README updates, code comments
- **Styling**: CSS changes, formatting
- **Bug Fixes**: Simple fixes with tests
- **Dependencies**: Minor version updates
- **Configuration**: Non-production config changes

```yaml
# Task metadata example
auto-approve: true
approval-category: documentation
```

### 🟡 **Standard Approval Categories**

- **Features**: New functionality
- **Refactoring**: Code restructuring
- **Performance**: Optimization changes
- **Testing**: New test implementations

```yaml
# Task metadata example
requires-approval: true
approval-category: feature
approval-type: standard
```

### 🔴 **High-Risk Approval Categories**

- **Security**: Authentication, authorization
- **Data**: Database changes, migrations
- **Infrastructure**: Deployment, scaling
- **API**: Breaking changes, new endpoints

```yaml
# Task metadata example
requires-approval: true
approval-category: security
approval-type: high-risk
approval-reviewers: ['security-team', 'lead-dev']
```

## 🔄 Approval Workflow States

### State: NEEDS_MANUAL_APPROVAL

**Actions**:

1. **Move task**: From `DOING` to `needs-approval/`
2. **Add metadata**: Approval type, reviewers, deadline
3. **Notify**: Appropriate reviewers
4. **Document**: What needs approval and why

**File Structure**:

```
docs/planning/kanban/tasks/needs-approval/
├── [task-name]-feature.md
├── [task-name]-security.md
└── [task-name]-api-change.md
```

### State: UNDER_REVIEW

**Actions**:

1. **Assign reviewer**: Based on approval category
2. **Set deadline**: Based on priority and complexity
3. **Track progress**: Review status and feedback
4. **Escalate**: If deadline approaches

### State: APPROVED

**Actions**:

1. **Document approval**: Who approved, when, conditions
2. **Move to DONE**: Complete the task
3. **Update records**: Mark as completed
4. **Archive**: Move to completed tasks

### State: REJECTED

**Actions**:

1. **Document feedback**: Specific issues to address
2. **Move to DOING**: Return to development
3. **Update requirements**: If needed based on feedback
4. **Reassign**: If necessary

## 🚨 Approval Escalation Rules

### Standard Escalation Timeline

- **P0 (Critical)**: 4 hours → Escalate to management
- **P1 (High)**: 24 hours → Escalate to senior team
- **P2 (Medium)**: 3 days → Escalate to team lead
- **P3 (Low)**: 1 week → Escalate to backlog review
- **P4 (Future)**: 2 weeks → Archive or defer

### Escalation Actions

1. **Notify**: Next level of approval authority
2. **Document**: Reason for escalation
3. **Update**: Priority or requirements if needed
4. **Expedite**: If blocking critical work

## 🔧 Automation Functions

### Check Approval Status

```bash
# Function to check items needing approval
check_approval_queue() {
    local needs_approval_count=$(find docs/planning/kanban/tasks/needs-approval/ -name "*.md" | wc -l)
    local overdue_count=$(find docs/planning/kanban/tasks/needs-approval/ -name "*.md" -mtime +3 | wc -l)

    echo "Items needing approval: $needs_approval_count"
    echo "Overdue approvals: $overdue_count"

    if [ $overdue_count -gt 0 ]; then
        echo "⚠️  Overdue approvals detected!"
        find docs/planning/kanban/tasks/needs-approval/ -name "*.md" -mtime +3 -exec basename {} \;
        return 1
    fi

    if [ $needs_approval_count -gt 0 ]; then
        echo "📋 Pending approvals:"
        ls docs/planning/kanban/tasks/needs-approval/
    fi
}
```

### Move to Approval

```bash
# Function to move task to approval queue
move_to_approval() {
    local task_file="$1"
    local approval_type="$2"

    # Validate inputs
    if [ ! -f "$task_file" ]; then
        echo "Error: Task file not found: $task_file"
        return 1
    fi

    # Extract task name
    local task_name=$(basename "$task_file" .md)
    local approval_file="docs/planning/kanban/tasks/needs-approval/${task_name}.md"

    # Move file
    mv "$task_file" "$approval_file"

    # Add approval metadata
    echo -e "\n## 📋 Approval Information" >> "$approval_file"
    echo -e "- **Approval Type**: $approval_type" >> "$approval_file"
    echo -e "- **Submitted**: $(date)" >> "$approval_file"
    echo -e "- **Status**: NEEDS_MANUAL_APPROVAL" >> "$approval_file"

    echo "✅ Task moved to approval queue: $approval_file"
}
```

### Approve Task

```bash
# Function to approve a task
approve_task() {
    local task_file="$1"
    local approver="$2"
    local comments="$3"

    # Add approval record
    echo -e "\n## ✅ Approval Record" >> "$task_file"
    echo -e "- **Approved by**: $approver" >> "$task_file"
    echo -e "- **Approved on**: $(date)" >> "$task_file"
    echo -e "- **Comments**: $comments" >> "$task_file"

    # Move to done
    local done_file="docs/planning/kanban/tasks/done/$(basename "$task_file")"
    mv "$task_file" "$done_file"

    echo "✅ Task approved and completed: $done_file"
}
```

## 📊 Integration with Task Creation

### Task Metadata Templates

```yaml
# In task creation templates
---
requires-approval: false # Default for simple tasks
approval-category: none # documentation, feature, security, etc.
approval-type: none # standard, high-risk
auto-approve: false # Only for safe changes
---
```

### Approval Decision Logic

```bash
# Function to determine if approval is needed
needs_approval() {
    local task_file="$1"
    local category=$(grep "approval-category:" "$task_file" | cut -d' ' -f2)
    local auto_approve=$(grep "auto-approve:" "$task_file" | cut -d' ' -f2)

    if [ "$auto_approve" = "true" ]; then
        return 1  # No approval needed
    fi

    case "$category" in
        "security"|"data"|"infrastructure"|"api")
            return 0  # Approval required
            ;;
        "documentation"|"styling"|"bug-fix")
            return 1  # No approval needed
            ;;
        *)
            return 0  # Default to requiring approval
            ;;
    esac
}
```

## 🎯 Best Practices

### Setting Approval Requirements

- **Be explicit**: Clear approval categories in task metadata
- **Default secure**: Require approval unless explicitly auto-approved
- **Document rationale**: Why approval is/isn't needed
- **Set deadlines**: Appropriate review timeframes

### Review Process

- **Focused reviews**: Review specific to approval category
- **Documented feedback**: Clear, actionable comments
- **Timely response**: Respect escalation timelines
- **Constructive approach**: Help improve rather than block

### Automation

- **Auto-approve safe changes**: Documentation, simple fixes
- **Escalate overdue**: Prevent bottlenecks
- **Track metrics**: Approval times, rejection rates
- **Continuous improvement**: Refine approval criteria

---

_Test completion and approval workflows ensure quality while maintaining development velocity through appropriate automation and manual oversight._
