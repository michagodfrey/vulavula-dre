export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { secret, path, slug } = req.body || {};

  if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Determine the path to revalidate
  // Prefer explicit path, otherwise fall back to post detail route
  const targetPath = path || (slug ? `/post/${slug}` : null);

  if (!targetPath) {
    return res
      .status(400)
      .json({ error: "Missing 'path' or 'slug' in request body" });
  }

  try {
    await res.revalidate(targetPath);
    return res.status(200).json({ revalidated: true, path: targetPath });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error revalidating", details: err?.message });
  }
}
