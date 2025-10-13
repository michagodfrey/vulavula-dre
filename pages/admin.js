import { useState } from "react";
import Head from "next/head";

export default function Admin() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [revalidateSlug, setRevalidateSlug] = useState("");

  const triggerNotification = async () => {
    setLoading(true);
    setStatus("");
    setResult(null);

    try {
      const response = await fetch("/api/trigger-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_ADMIN_SECRET || "your-secret",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Success!");
        setResult(data);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus("Failed to trigger notification");
    } finally {
      setLoading(false);
    }
  };

const triggerRevalidate = async () => {
  setLoading(true);
  setStatus("");
  try {
    const s = revalidateSlug.trim();
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_ADMIN_SECRET || "your-secret",
        slug: s || undefined,
        path: s ? undefined : "/", // home when slug empty
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setStatus(`Revalidated: ${data.path || `/post/${s}`}`);
    } else {
      setStatus(`Revalidate error: ${data.error}`);
    }
  } catch {
    setStatus("Failed to revalidate");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Admin Panel - Vulavula Dre</title>
        <meta name="description" content="Admin panel for Vulavula Dre blog" />
      </Head>

      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl mb-4 font-semibold">
            Send Email Notification
          </h2>
          <p className="text-gray-600 mb-6">
            This will send an email notification about the latest post to all
            subscribers.
          </p>

          <button
            onClick={triggerNotification}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 px-4 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>

          {status && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status.includes("Success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <p className="font-medium">{status}</p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Notification Results:</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <strong>Post:</strong> {result.post?.title}
                </li>
                <li>
                  <strong>Subscribers:</strong> {result.subscribers}
                </li>
                <li>
                  <strong>Successful sends:</strong> {result.successfulSends}
                </li>
                <li>
                  <strong>Failed sends:</strong> {result.failedSends}
                </li>
              </ul>
              {result.post?.url && (
                <a
                  href={result.post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-pink-600 hover:text-pink-700 text-sm"
                >
                  View Post →
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl mb-4 font-semibold">Quick Links</h2>
          <div className="space-y-2">
            <a
              href="/api/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-pink-600 hover:text-pink-700"
            >
              RSS Feed
            </a>
            <a
              href="/api/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-pink-600 hover:text-pink-700"
            >
              View Subscribers
            </a>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl mb-4 font-semibold">Revalidate ISR Cache</h2>
          <p className="text-gray-600 mb-4">
            Enter a post slug to revalidate its page (`/post/[slug]`). Leave
            blank to revalidate the home page.
          </p>
          <input
            type="text"
            value={revalidateSlug}
            onChange={(e) => setRevalidateSlug(e.target.value)}
            placeholder="post-slug-here"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
          />
          <button
            onClick={triggerRevalidate}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 px-4 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {loading ? "Revalidating..." : "Revalidate"}
          </button>
        </div>
      </div>
    </div>
  );
}
