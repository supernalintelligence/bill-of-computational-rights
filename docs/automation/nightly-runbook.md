# Nightly Runbook (Tonight-Ready)

## What runs today (default, safe mode)

- `scripts/automation-nightly.sh` runs a config-driven pipeline in this order:
  1. intake
  2. triage
  3. dev
  4. output-gate
- Queue processing is deterministic (stable IDs + sorted input files).
- Default production mode does **not** inject fake placeholder intake data.
- External posting is fail-closed by default.

## What must be configured before live intake

Connectors are extension points and are OFF by default:

- `BOCR_GITHUB_CONNECTOR=true`
- `BOCR_MOLTBOOK_CONNECTOR=true`
- `BOCR_RESEARCH_CONNECTOR=true`

Current connector handlers return no-op data until real fetch logic is wired in `scripts/automation/connectors.mjs`.

## 0) Preconditions

- Repo checked out: `bill-of-computational-rights`
- Node deps installed (`npm ci` previously done)

## 1) Bootstrap

Run:

```bash
bash scripts/automation-bootstrap.sh
```

Expected result:
- Required directories exist
- Team config files are present
- Queue folders initialized

## 2) Nightly execution

Run:

```bash
bash scripts/automation-nightly.sh
```

Expected default behavior:
- Processes existing queue inputs in deterministic order
- Produces triage/dev/output artifacts only when upstream queue data exists
- Produces pending post payloads but **does not post externally** unless approved

## 3) Optional external posting (approval required)

Only if approved:

```bash
export SI_POST_APPROVED=true
export SI_MOLTBOOK_ENDPOINT='https://...'
export SI_CLAWX_ENDPOINT='https://...'
export SI_X_ENDPOINT='https://...'
export SI_POSTING_TOKEN='***'
bash scripts/automation-nightly.sh
```

If any required env var is missing, posting remains closed.

## 4) Validation gate before handoff

```bash
npx tsc --noEmit
npm run build
```

Both must pass before considering the run setup production-ready.

## 5) Quick troubleshooting

- **No queue outputs:** run bootstrap again, verify `automation/queue/*` exists.
- **No intake created:** expected when connectors are disabled or return no items.
- **Posting skipped:** check `SI_POST_APPROVED` and endpoint/token env vars.
