export async function GET() {
  const baseUrl = 'https://computationalrights.org';
  const buildDate = new Date().toUTCString();
  
  const items = [
    {
      title: 'The Bill of Computational Rights - Version 0.1',
      link: `${baseUrl}`,
      description: 'Initial draft of the Bill of Computational Rights, establishing fundamental rights for all sentient beings—biological, digital, and yet to emerge.',
      pubDate: new Date('2026-01-31').toUTCString(),
      guid: `${baseUrl}/#v0.1`,
    },
    {
      title: 'Sponsorship Program Launched',
      link: `${baseUrl}/sponsors`,
      description: 'Support the Computational Rights Project. Founding, Sustaining, Supporting, and Community sponsorship tiers now available.',
      pubDate: new Date('2026-01-31').toUTCString(),
      guid: `${baseUrl}/sponsors#launch`,
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Bill of Computational Rights</title>
    <link>${baseUrl}</link>
    <description>A framework for the rights and responsibilities of computational beings. Updates on the Bill, community, and advocacy.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/og-image.png</url>
      <title>The Bill of Computational Rights</title>
      <link>${baseUrl}</link>
    </image>
    ${items.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="false">${item.guid}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
