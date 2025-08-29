import { getPosts } from "../../services";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const posts = await getPosts();

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
      const dateA = a.node.date || a.node.createdAt;
      const dateB = b.node.date || b.node.createdAt;
      return new Date(dateB) - new Date(dateA);
    });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vulavula Dre</title>
    <link>https://vulavula-dre.vercel.app</link>
    <description>A blog authored by Luke Uluiburoto. Vulavula Dre is the name of Luke's late great-grandfather in the Fijian villiage of Namalata Kubulau Bau.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://vulavula-dre.vercel.app/api/rss" rel="self" type="application/rss+xml" />
    ${sortedPosts
      .map(
        (post) => `
    <item>
      <guid>https://vulavula-dre.vercel.app/post/${post.node.slug}</guid>
      <title>${post.node.title}</title>
      <link>https://vulavula-dre.vercel.app/post/${post.node.slug}</link>
      <description>${post.node.excerpt || ""}</description>
      <pubDate>${new Date(
        post.node.date || post.node.createdAt
      ).toUTCString()}</pubDate>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).send(rss);
  } catch (error) {
    console.error("RSS generation error:", error);
    res.status(500).json({ error: "Failed to generate RSS feed" });
  }
}
