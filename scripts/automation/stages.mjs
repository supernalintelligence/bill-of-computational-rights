import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const nowIso = () => new Date().toISOString();

async function listJsonFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => path.join(dir, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJsonIfMissing(filePath, payload) {
  try {
    await fs.access(filePath);
    return false;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8");
    return true;
  }
}

function stableId(parts) {
  return crypto.createHash("sha1").update(parts.join("|")).digest("hex").slice(0, 12);
}

export async function runIntakeStage(config, intakeSignals) {
  const created = [];
  for (const signal of intakeSignals) {
    const externalId = signal.externalId ?? signal.id ?? signal.title ?? JSON.stringify(signal);
    const id = `in-${stableId([signal.source, externalId])}`;
    const item = {
      id,
      source: signal.source,
      title: signal.title ?? `New ${signal.source} signal`,
      summary: signal.summary ?? "",
      priority: signal.priority ?? "P2",
      status: "new",
      createdAt: signal.createdAt ?? nowIso(),
    };
    const filePath = path.join(config.queue.inboxPath, `${id}.json`);
    if (await writeJsonIfMissing(filePath, item)) created.push(filePath);
  }

  return { created };
}

export async function runTriageStage(config) {
  const inboxFiles = await listJsonFiles(config.queue.inboxPath);
  const created = [];

  for (const inboxFile of inboxFiles) {
    const intake = await readJson(inboxFile);
    if (intake.status !== "new") continue;

    const briefId = `br-${intake.id}`;
    const brief = {
      id: briefId,
      source: "triage",
      title: `Brief: ${intake.title}`,
      priority: intake.priority ?? "P2",
      status: "triaged",
      brief: {
        problem: intake.summary || intake.title,
        approach: "Convert intake signal into implementation-ready task and acceptance criteria.",
        acceptanceCriteria: [
          "Task scope is explicit",
          "Dependencies and risk are captured",
          "Implementation path is testable",
        ],
      },
      createdAt: nowIso(),
      intakeRef: path.basename(inboxFile),
    };

    const outPath = path.join(config.queue.briefsPath, `${briefId}.json`);
    if (await writeJsonIfMissing(outPath, brief)) created.push(outPath);
  }

  return { created };
}

export async function runDevStage(config) {
  const briefFiles = await listJsonFiles(config.queue.briefsPath);
  const implementedCreated = [];
  const pendingPostCreated = [];

  for (const briefFile of briefFiles) {
    const brief = await readJson(briefFile);
    if (brief.status !== "triaged") continue;

    const implementedId = `dev-${brief.id}`;
    const implementedPayload = {
      id: implementedId,
      source: "dev",
      title: `Implemented: ${brief.title}`,
      priority: brief.priority ?? "P2",
      status: "implemented",
      createdAt: nowIso(),
      briefRef: path.basename(briefFile),
    };

    const postId = `post-${brief.id}`;
    const postPayload = {
      id: postId,
      status: "ready_for_approval",
      channels: ["moltbook", "clawx", "x"],
      summary: `Automation output for ${brief.title}`,
      createdAt: nowIso(),
      implementedRef: `${implementedId}.json`,
    };

    const implementedPath = path.join(config.queue.implementedPath, `${implementedId}.json`);
    const pendingPath = path.join(config.queue.pendingPath, `${postId}.json`);

    if (await writeJsonIfMissing(implementedPath, implementedPayload)) {
      implementedCreated.push(implementedPath);
    }
    if (await writeJsonIfMissing(pendingPath, postPayload)) {
      pendingPostCreated.push(pendingPath);
    }
  }

  return { implementedCreated, pendingPostCreated };
}

export async function runOutputGate(config) {
  const approval = process.env[config.security.approvalEnv] === "true";
  if (!approval) {
    return {
      approved: false,
      reason: `external posting gated (${config.security.approvalEnv} must be true)`,
    };
  }

  const missing = [
    ...config.security.endpointEnvs.filter((name) => !process.env[name]),
    ...(process.env[config.security.tokenEnv] ? [] : [config.security.tokenEnv]),
  ];

  if (missing.length > 0) {
    return {
      approved: false,
      reason: `missing required posting env vars: ${missing.join(", ")}`,
    };
  }

  return {
    approved: true,
    reason: "approval env and posting env refs present; transport remains manual by design",
  };
}
