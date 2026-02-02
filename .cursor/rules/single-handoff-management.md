# Single Handoff Management Rules

## 🎯 Core Principle

**Only one active handoff file should exist at any time** to prevent confusion and ensure clear responsibility.

## 📋 Handoff Lifecycle States

### 1. **ACTIVE** - Currently being worked on

- **Location**: `docs/planning/kanban/handoffs/active-[feature-name].md`
- **Status**: Agent is actively working on this
- **Rule**: No other handoffs should be active

### 2. **READY** - Complete and ready for pickup

- **Location**: `docs/planning/kanban/handoffs/ready-[feature-name].md`
- **Status**: Work is complete, next agent should pick up
- **Rule**: Should be converted to ACTIVE when picked up

### 3. **ARCHIVED** - Historical record

- **Location**: `docs/planning/kanban/handoffs/archive/[date]-[feature-name].md`
- **Status**: Work completed, kept for reference
- **Rule**: Moved here after successful completion

## 🔄 Handoff State Transitions

### Starting Work (No Existing Handoff)

1. **Check**: `find docs/planning/kanban/handoffs/ -name "*.md" -not -path "*/archive/*"`
2. **Verify**: No active handoffs exist
3. **Create**: New active handoff: `active-[feature-name].md`

### Starting Work (Existing Ready Handoff)

1. **Find**: `docs/planning/kanban/handoffs/ready-*.md`
2. **Rename**: `ready-[feature-name].md` → `active-[feature-name].md`
3. **Update**: Add your pickup timestamp and continuation notes
4. **Verify**: Read and understand all previous context

### Completing Work (Handing Off)

1. **Update**: Current `active-[feature-name].md` with completion status
2. **Rename**: `active-[feature-name].md` → `ready-[feature-name].md`
3. **Status**: Mark as ready for next agent
4. **Communicate**: Provide pickup instructions

### Completing Work (Fully Done)

1. **Update**: Final status in `active-[feature-name].md`
2. **Move**: To `archive/[YYYY-MM-DD]-[feature-name].md`
3. **Clean**: Remove from active handoffs directory
4. **Document**: Success and lessons learned

## 🚨 Conflict Resolution Rules

### Multiple Active Handoffs Found

```bash
# Check for conflicts
find docs/planning/kanban/handoffs/ -name "active-*.md" | wc -l
# If > 1, resolve conflicts
```

**Resolution Process**:

1. **Identify**: Which handoff is most recent/relevant
2. **Consolidate**: Merge information if needed
3. **Archive**: Non-active handoffs to archive/
4. **Continue**: With single active handoff

### Handoff Without Proper Naming

**Rule**: All handoffs must follow naming convention:

- `active-[feature-name].md` for current work
- `ready-[feature-name].md` for completed work
- `archive/[YYYY-MM-DD]-[feature-name].md` for historical

## 🔧 Automation Functions

### Check Handoff Status

```bash
# Function to check current handoff state
check_handoff_status() {
    local active_count=$(find docs/planning/kanban/handoffs/ -name "active-*.md" | wc -l)
    local ready_count=$(find docs/planning/kanban/handoffs/ -name "ready-*.md" | wc -l)

    echo "Active handoffs: $active_count"
    echo "Ready handoffs: $ready_count"

    if [ $active_count -gt 1 ]; then
        echo "⚠️  Multiple active handoffs detected!"
        return 1
    fi

    if [ $active_count -eq 0 ] && [ $ready_count -eq 0 ]; then
        echo "✅ No handoffs - fresh start"
        return 0
    fi

    if [ $ready_count -gt 0 ]; then
        echo "📋 Ready handoffs available for pickup"
        ls docs/planning/kanban/handoffs/ready-*.md
        return 0
    fi

    echo "🔄 Active handoff in progress"
    ls docs/planning/kanban/handoffs/active-*.md
}
```

### Pickup Ready Handoff

```bash
# Function to pickup a ready handoff
pickup_handoff() {
    local ready_file=$(ls docs/planning/kanban/handoffs/ready-*.md 2>/dev/null | head -1)

    if [ -z "$ready_file" ]; then
        echo "No ready handoffs to pickup"
        return 1
    fi

    local active_file=$(echo "$ready_file" | sed 's/ready-/active-/')

    echo "Picking up: $ready_file"
    mv "$ready_file" "$active_file"

    # Add pickup timestamp
    echo -e "\n## 🔄 Pickup Log\n**Picked up by**: Agent at $(date)\n" >> "$active_file"

    echo "✅ Handoff activated: $active_file"
}
```

### Create New Handoff

```bash
# Function to create new handoff
create_handoff() {
    local feature_name="$1"
    local handoff_file="docs/planning/kanban/handoffs/active-$feature_name.md"

    # Check for existing active handoffs
    if ls docs/planning/kanban/handoffs/active-*.md >/dev/null 2>&1; then
        echo "⚠️  Active handoff already exists!"
        ls docs/planning/kanban/handoffs/active-*.md
        echo "Complete or archive existing handoff first"
        return 1
    fi

    # Create new handoff from template
    cp templates/handoff-template.md "$handoff_file"

    # Update with current info
    sed -i "s/{{feature-name}}/$feature_name/g" "$handoff_file"
    sed -i "s/{{date}}/$(date)/g" "$handoff_file"
    sed -i "s/{{branch}}/$(git branch --show-current)/g" "$handoff_file"

    echo "✅ Created active handoff: $handoff_file"
}
```

## 📊 Integration with Agent Onboarding

**Update `scripts/agent-onboard.sh`**:

```bash
# Add to onboarding script
echo -e "\n${BLUE}4. Handoff Status Check${NC}"
check_handoff_status

# If ready handoffs exist, prompt for pickup
if ls docs/planning/kanban/handoffs/ready-*.md >/dev/null 2>&1; then
    echo -e "${YELLOW}🔄 Ready handoffs available for pickup${NC}"
    echo -e "Run: ${GREEN}pickup_handoff${NC}"
fi
```

## 🎯 Best Practices

### When Creating Handoffs

- **Use descriptive names**: `active-auth-system-refactor.md`
- **Include branch name**: Critical for continuation
- **Document current state**: What works, what doesn't
- **Provide clear next steps**: Specific actions needed

### When Picking Up Handoffs

- **Read completely**: Understand all context
- **Verify branch**: Switch to correct branch
- **Test current state**: Confirm what's working
- **Update with findings**: Add your assessment

### When Completing Handoffs

- **Update status**: Mark what's done
- **Document decisions**: Key choices made
- **Provide closure**: What was accomplished
- **Archive properly**: Keep for reference

---

_Single handoff management ensures clear responsibility and prevents confusion in agent transitions._
