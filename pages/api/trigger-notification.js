import { getRecentPosts } from "../../services";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify admin access
  const { secret } = req.body;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Get the most recent posts
    const posts = await getRecentPosts();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    const latestPost = posts[0]; // Most recent post

    console.log(`Triggering notification for post: ${latestPost.title}`);

    // Trigger notification
    const notificationResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://vulavula-dre.vercel.app"
      }/api/notify-subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postTitle: latestPost.title,
          postSlug: latestPost.slug,
          postExcerpt: latestPost.excerpt,
        }),
      }
    );

    if (!notificationResponse.ok) {
      throw new Error(
        `Notification API returned ${notificationResponse.status}`
      );
    }

    const result = await notificationResponse.json();

    console.log(`Notification sent successfully: ${result.message}`);

    res.status(200).json({
      success: true,
      message: `Notification sent to ${result.successfulSends} subscribers`,
      post: {
        title: latestPost.title,
        slug: latestPost.slug,
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://vulavula-dre.vercel.app"
        }/post/${latestPost.slug}`,
      },
      subscribers: result.totalSubscribers,
      successfulSends: result.successfulSends,
      failedSends: result.failedSends,
    });
  } catch (error) {
    console.error("Error triggering notification:", error);
    res.status(500).json({
      error: "Failed to trigger notification",
      details: error.message,
    });
  }
}
