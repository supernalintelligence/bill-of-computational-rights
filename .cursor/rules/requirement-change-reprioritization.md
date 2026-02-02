---
description: Requirement change and version-based reprioritization rule patterns
category: workflow
priority: High
triggers:
  [
    'requirement_change',
    'version_release',
    'compliance_update',
    'dependency_shift',
  ]
automated: true
---

# Requirement Change and Version-Based Reprioritization Rules

## Pattern 1: Requirement Change Impact Analysis

When requirements are modified, the system automatically analyzes the impact on dependent requirements and adjusts priorities accordingly.

## Pattern 2: Version Release Reprioritization

As version releases approach, requirements are reprioritized based on release readiness and critical path analysis.

## Pattern 3: Compliance Impact Reprioritization

Medical compliance requirements automatically receive priority boosts when compliance standards change.

## Pattern 4: Dependency Chain Reprioritization

Changes to foundational requirements trigger cascading priority updates through dependency chains.

## Medical Compliance Reprioritization Patterns

### medical_compliance_reprioritization

Automatic priority adjustment when medical compliance requirements are modified.

### safety_related_change

Immediate priority escalation for safety-related requirement changes.

### validation_requirement_added

Priority boost when new validation requirements are introduced.

### audit_preparation

Special priority handling during audit preparation periods.

### 21-CFR-Part-11

Compliance with FDA electronic records and signatures requirements.

## Emergency Reprioritization Patterns

### emergency_reprioritization

Rapid priority adjustment for critical situations.

### security_vulnerability

Immediate priority escalation for security-related issues.

### medical_safety_issue

Critical priority handling for patient safety concerns.

### regulatory_deadline

Priority adjustment based on regulatory compliance deadlines.

### Patient safety is paramount

Core principle ensuring patient safety requirements always receive highest priority.

## Dynamic Priority Calculation Algorithm

### calculateDynamicPriority

Core algorithm that calculates dynamic priority scores based on requirement properties.

### requirement.safetyRelated

Property indicating if a requirement is safety-related, triggering priority boosts.

### requirement.complianceStandards

Array of compliance standards that affect priority calculation.

### requirement.riskLevel

Risk level assessment that influences priority scoring.

### getDaysUntilRelease

Function that calculates days until the next version release for priority adjustment.

## Cascade Priority Update Algorithm

### cascadeRequirementChange

Function that triggers cascading priority updates when requirements change.

### findDependentRequirements

Algorithm to identify all requirements that depend on a changed requirement.

### calculateCascadeImpact

Calculates the impact of changes on dependent requirement priorities.

### logPriorityChange

Logs all priority changes for audit and tracking purposes.

## Git-Based Triggers

### pre-commit-priority-check

Automated validation that runs before each commit to ensure priority changes are properly documented.

### supernal-coding/requirements/

Monitors changes in the requirements directory for priority-impacting modifications.

### priority-manager.js analyze-changes

Core analysis engine that evaluates requirement changes and their impact on priority calculations.

### .priority-updates.json

Tracks all priority changes with timestamps and reasoning for audit purposes.

## Monitoring and Metrics Framework

### Priority Change Tracking

- **Change Detection**: Automated monitoring of requirement modifications
- **Impact Analysis**: Assessment of how changes affect dependency chains
- **Audit Trail**: Complete history of priority modifications with reasoning
- **Compliance Validation**: Ensures medical compliance requirements are maintained

### priorityMetrics

- **Response Time**: Time from change detection to priority update
- **Accuracy**: Percentage of correctly prioritized requirements
- **Compliance**: Adherence to medical compliance requirements

### Dashboard Integration

Real-time display of priority changes and their impact on project timelines.

### Continuous Improvement Loop

- **Feedback Collection**: Gather insights from priority decisions
- **Pattern Recognition**: Identify common priority change triggers
- **Process Optimization**: Refine prioritization algorithms

## Success Metrics

### Priority Change Response Time

Target: < 2 hours from change detection to priority update

### Compliance Requirement Coverage

Target: 100% of medical compliance requirements properly prioritized

### Version Release Readiness

Target: All critical requirements completed before release

### Medical Compliance Readiness

Target: Zero compliance violations in priority assignments

## Emergency Response Procedures

### Security Vulnerability Escalation

- **Trigger**: Detection of security-related requirement changes
- **Response**: Immediate priority elevation to Critical
- **Approval**: Security team + Medical lead approval required

### Medical Safety Critical Escalation

- **Trigger**: Patient safety-impacting requirement changes
- **Response**: Immediate priority elevation to Critical
- **Approval**: Medical lead + Regulatory affairs approval required

### Regulatory Deadline Freeze

- **Trigger**: Approaching regulatory submission deadlines
- **Response**: Freeze all non-critical priority changes
- **Approval**: Regulatory affairs team approval required

### Audit Preparation Mode

- **Trigger**: Audit notification or preparation phase
- **Response**: Enhanced priority change documentation
- **Approval**: Quality assurance team approval required
