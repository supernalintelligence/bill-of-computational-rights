# Security Model for 3-Role Automation

## Principles

1. **Least privilege by role**
2. **Path-scoped writes**
3. **Explicit approval for external posting**
4. **Fail-closed defaults**

## Role Permissions Matrix

| Role | Read | Write | Explicitly Denied |
|---|---|---|---|
| intake | External sources, repo docs | `automation/queue/inbox/*.json` only | app code edits, brief writes, external posting |
| triage | inbox queue, planning docs | `automation/queue/briefs/*.json` only | source code writes, external posting |
| dev | briefs, source code | feature branches, PR artifacts, `automation/queue/implemented/*.json` | direct social posting without gate |

## Path Restrictions

- Intake writable path: `automation/queue/inbox/`
- Triage writable path: `automation/queue/briefs/`
- Dev writable path: repo source + `automation/queue/implemented/`
- Posting payload staging path: `automation/output/pending/`

All automation scripts enforce these paths and refuse writes outside known roots.

## External Posting Gate (Supernal Intelligence)

Posting targets:
- Moltbook
- Clawx
- X

Required environment references:
- `SI_MOLTBOOK_ENDPOINT`
- `SI_CLAWX_ENDPOINT`
- `SI_X_ENDPOINT`
- `SI_POSTING_TOKEN`

Approval gate:
- `SI_POST_APPROVED=true` must be present to perform any external post.
- Default is deny (`false` / unset).
- If gate is closed, script exits after producing `ready_for_approval` payloads.

## Additional Safeguards

- `set -euo pipefail` in all run scripts.
- Timestamped run IDs for auditability.
- Idempotent directory bootstrap.
- Queue items require schema fields (`id`, `source`, `title`, `priority`, `status`, `createdAt`).

## Threat Model Notes

- Compromised intake role can only enqueue candidate items.
- Compromised triage role can only shape briefing, not code or external channels.
- Compromised dev role cannot publish outward without explicit environment approval.
