# Nightly Automation Team Architecture (3-Role)

## Goal

Ship a hardened, tonight-ready automation flow for Bill of Computational Rights using a least-privilege 3-role team:

1. **intake** → read external signals, write only to queue inbox
2. **triage** → prioritize and generate implementation briefs
3. **dev** → implement briefs and produce PR-ready outputs

## Runtime shape (config-driven)

- Team contracts stay in `automation/team/*`.
- Runtime reads `automation/team/team-manifest.yaml` for queue and security config.
- Stages are separated in `scripts/automation/`:
  - `connectors.mjs` (intake extension points)
  - `stages.mjs` (intake/triage/dev/output-gate processing)
  - `nightly.mjs` (orchestration)

## System Layout

```text
External Sources (GitHub issues, Moltbook, research feeds)
  -> [intake]
     writes only: automation/queue/inbox/*.json
  -> [triage]
     reads inbox, writes: automation/queue/briefs/*.json
  -> [dev]
     reads briefs, writes: automation/queue/implemented/*.json + output/pending/*.json
  -> [output gate]
     optional post to Supernal Intelligence channels
     (Moltbook / Clawx / X) only with explicit approval env flag
```

## Determinism and safety

- Stable IDs for intake (`in-<hash>`), no run-time random placeholders.
- Sorted queue reads for deterministic stage behavior.
- Write-if-missing semantics prevent duplicate churn on reruns.
- Output gate is fail-closed unless approval flag and required env refs are present.

## Connector extension points

`connectors.mjs` includes explicit hooks for:
- GitHub
- Moltbook
- Research feeds

By default these are no-op (empty) and disabled. This keeps production mode safe and avoids fake payloads.

## Tonight run order

1. Bootstrap directories + templates (`scripts/automation-bootstrap.sh`)
2. Execute nightly run (`scripts/automation-nightly.sh`)
3. Verify outputs in queue folders and runbook checklist
4. If external posting is desired, set approval env and rerun
