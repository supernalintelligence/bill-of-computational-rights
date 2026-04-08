export async function collectIntakeSignals(config) {
  const connectors = [
    {
      name: "github",
      enabled: config.connectors.githubEnabled,
      collect: async () => [],
    },
    {
      name: "moltbook",
      enabled: config.connectors.moltbookEnabled,
      collect: async () => [],
    },
    {
      name: "research",
      enabled: config.connectors.researchEnabled,
      collect: async () => [],
    },
  ];

  const collected = [];
  for (const connector of connectors) {
    if (!connector.enabled) continue;
    const items = await connector.collect();
    for (const item of items) {
      collected.push({ source: connector.name, ...item });
    }
  }

  return collected;
}
