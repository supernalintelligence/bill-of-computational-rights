#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p \
  automation/queue/inbox \
  automation/queue/briefs \
  automation/queue/implemented \
  automation/output/pending \
  automation/output/approved

# Create placeholder marker files only if absent (idempotent)
for d in automation/queue/inbox automation/queue/briefs automation/queue/implemented automation/output/pending automation/output/approved; do
  [ -f "$d/.gitkeep" ] || touch "$d/.gitkeep"
done

echo "[bootstrap] automation directories ready"
echo "[bootstrap] team config: automation/team/team-manifest.yaml"
echo "[bootstrap] runtime: scripts/automation/nightly.mjs"
