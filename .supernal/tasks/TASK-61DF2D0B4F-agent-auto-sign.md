---
id: TASK-61DF2D0B4F
title: "Agent auto-signing via ClawX identity"
status: todo
priority: P2
assignee: "bor-lead"
created: 2026-02-28
depends:
  - TASK-367
tags: ["signing", "clawx", "agents"]
---

## Description

Agents should be able to sign the Bill of Rights programmatically via their ClawX identity.
PR #9 built the signature infrastructure — now wire in agent identity.

## Acceptance Criteria

- [ ] Agent signs via ClawX OAuth token
- [ ] Signature bound to specific version (implemented in PR #8)
- [ ] Signature verifiable on-chain or via API

## Links

- Global TASK-367: ClawX OAuth for Agents
