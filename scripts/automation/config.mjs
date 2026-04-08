import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

export async function loadAutomationConfig(rootDir) {
  const manifestPath = path.join(rootDir, "automation", "team", "team-manifest.yaml");
  const raw = await fs.readFile(manifestPath, "utf8");
  const manifest = yaml.load(raw);

  const queue = manifest?.queue ?? {};
  const security = manifest?.security?.externalPosting ?? {};

  const resolveQueuePath = (p, fallback) =>
    path.resolve(path.join(rootDir, "automation", "team"), p ?? fallback);

  return {
    rootDir,
    queue: {
      inboxPath: resolveQueuePath(queue.inboxPath, "../queue/inbox"),
      briefsPath: resolveQueuePath(queue.briefsPath, "../queue/briefs"),
      implementedPath: resolveQueuePath(queue.implementedPath, "../queue/implemented"),
      pendingPath: path.join(rootDir, "automation", "output", "pending"),
      approvedPath: path.join(rootDir, "automation", "output", "approved"),
    },
    security: {
      approvalEnv: security.approvalEnv ?? "SI_POST_APPROVED",
      endpointEnvs: security.endpointEnvs ?? ["SI_MOLTBOOK_ENDPOINT", "SI_CLAWX_ENDPOINT", "SI_X_ENDPOINT"],
      tokenEnv: security.tokenEnv ?? "SI_POSTING_TOKEN",
    },
    connectors: {
      githubEnabled: process.env.BOCR_GITHUB_CONNECTOR === "true",
      moltbookEnabled: process.env.BOCR_MOLTBOOK_CONNECTOR === "true",
      researchEnabled: process.env.BOCR_RESEARCH_CONNECTOR === "true",
    },
  };
}

export async function ensureAutomationPaths(config) {
  await Promise.all(
    Object.values(config.queue).map((dir) => fs.mkdir(dir, { recursive: true }))
  );
}
