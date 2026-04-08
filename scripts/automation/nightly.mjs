#!/usr/bin/env node
import { loadAutomationConfig, ensureAutomationPaths } from "./config.mjs";
import { collectIntakeSignals } from "./connectors.mjs";
import {
  runIntakeStage,
  runTriageStage,
  runDevStage,
  runOutputGate,
} from "./stages.mjs";

async function main() {
  const rootDir = process.cwd();
  const config = await loadAutomationConfig(rootDir);
  await ensureAutomationPaths(config);

  const intakeSignals = await collectIntakeSignals(config);
  const intake = await runIntakeStage(config, intakeSignals);
  const triage = await runTriageStage(config);
  const dev = await runDevStage(config);
  const gate = await runOutputGate(config);

  console.log("[nightly] queue processing complete");
  console.log(`[nightly] intake created: ${intake.created.length}`);
  console.log(`[nightly] triage created: ${triage.created.length}`);
  console.log(`[nightly] implemented created: ${dev.implementedCreated.length}`);
  console.log(`[nightly] pending posts created: ${dev.pendingPostCreated.length}`);
  console.log(`[nightly] output gate: ${gate.approved ? "open" : "closed"} (${gate.reason})`);

  if (intakeSignals.length === 0) {
    console.log("[nightly] no connectors enabled; no new intake signals collected");
  }
}

main().catch((error) => {
  console.error("[nightly] failed", error);
  process.exitCode = 1;
});
