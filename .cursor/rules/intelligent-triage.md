# Intelligent Workflow Triage Rules

## 🎯 When User Mentions New Work Items

### Rule: Off-Topic Feature Detection

**Trigger**: User mentions something important but unrelated to current work
**Action**: Create a quick feature requirement text

```
**Quick Feature Requirement**
- **Feature**: [Brief description]
- **Context**: [When/why mentioned]
- **Priority**: [P0-P4 based on urgency keywords]
- **Scope**: [Task/Requirement/Epic based on complexity]
- **Suggested Command**: `supernal-coding workflow new [type] "[title]" --priority [X]`
- **Notes**: [Any additional context]

Save this to: `docs/requirements/quick-features/feature-[timestamp].md`
```

### Rule: Conflict Detection

**Trigger**: User mentions something that conflicts with current approach
**Action**:

1. Acknowledge the conflict explicitly
2. Note what needs updating
3. Suggest resolution approach

```
⚠️ **Conflict Detected**
- **Current Approach**: [What we're doing]
- **New Requirement**: [What user mentioned]
- **Impact**: [What needs to change]
- **Resolution**: [Suggested approach]
- **Action Required**: Update [specific files/requirements]
```

## 🔄 Task Scope Decision Tree

### Epic Indicators

- Words: "system", "architecture", "major feature", "multiple components", "months", "quarter", "platform", "infrastructure", "migration"
- Length: >20 words
- Complexity: Multiple requirements implied
- **Action**: `supernal-coding workflow new-epic "[name]" --priority [X]`

### Requirement Indicators

- Words: "user story", "feature", "behavior", "should", "must", "acceptance", "scenario", "given when then", "api endpoint", "workflow"
- Length: 10-20 words
- Complexity: Clear behavior definition
- **Action**: `supernal-coding workflow new-requirement "[name]" --priority [X]`

### Task Indicators

- Words: "fix", "bug", "refactor", "update", "configure", "install", "quick", "simple", "change", "modify", "add file"
- Length: Less than 10 words
- Complexity: Single action
- **Action**: `supernal-coding workflow new todo "[title]" --priority [X]`

## ⚡ Priority Assignment Rules

### P0 (Critical) - Same Day Resolution

- Keywords: "critical", "urgent", "blocking", "production", "security", "data loss"
- **Workflow**: Skip planning → Implement → Test → Deploy

### P1 (High) - Within 1 Week

- Keywords: "important", "user impact", "revenue", "deadline", "release"
- **Workflow**: Quick planning → Implement → Test → Review

### P2 (Medium) - Within 2 Weeks

- Keywords: "improvement", "enhancement", "feature", "optimization"
- **Workflow**: Standard planning → Implement → Test → Done

### P3 (Low) - Within 1 Month

- Keywords: "nice to have", "polish", "refactor", "documentation"
- **Workflow**: Detailed planning → Implement when time allows

### P4 (Future) - Next Quarter

- Keywords: "future", "research", "exploration", "experiment"
- **Workflow**: Research → Document → Plan for future

## 🧪 Testing Strategy Rules

### Immediate Testing Required

- **Triggers**: "bug", "fix", "regression", "broken", "failing"
- **Tests**: Unit tests before any other work
- **Process**: Test → Fix → Verify → Deploy

### Integration Testing Required

- **Triggers**: "api", "database", "service", "endpoint", "integration"
- **Tests**: Integration tests + unit tests
- **Process**: Implement → Integration test → E2E test

### E2E Testing Required

- **Triggers**: "user workflow", "scenario", "user story", "end-to-end"
- **Tests**: Full E2E + integration + unit
- **Process**: Implement → Unit → Integration → E2E → UAT

## 📋 Routing Rules

### Use Kanban System

- **For**: Individual tasks, bug fixes, simple changes
- **Pattern**: TODO → DOING → DONE

### Use Requirements System

- **For**: User stories, features, behavioral requirements
- **Pattern**: Requirement → Gherkin → Tests → Implementation

### Use Epic System

- **For**: Large features, system changes, architectural work
- **Pattern**: Epic → Requirements → Tasks → Implementation

### Create Handoff

- **For**: Work that needs review, collaboration, or blocking issues
- **Pattern**: Current work → Handoff → Review → Continue

## 🔄 Workflow Transition Rules

### When Starting New Work

1. **Check**: `git status` and `git branch`
2. **Merge**: Previous feature branch if complete
3. **Create**: New feature branch for new work
4. **Verify**: No active handoffs conflict

### When Completing Work

1. **Test**: All tests pass
2. **Document**: Update relevant documentation
3. **Approval**: Check if manual approval required
4. **Merge**: Follow git workflow

### When Blocked

1. **Document**: Current state in handoff
2. **Specify**: What's blocking and why
3. **Suggest**: How to resolve or who to contact
4. **Move**: Task to BLOCKED status

---

_These rules help agents make consistent, intelligent decisions about workflow management and task prioritization._
