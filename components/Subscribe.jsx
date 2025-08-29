import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, action: "subscribe" }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Success! You've been subscribed to email notifications.");
        setEmail("");
      } else {
        setStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-xl mb-4 font-semibold text-gray-900">
        📧 Subscribe to Updates
      </h3>
      <p className="text-gray-600 mb-4">
        Get notified when new posts are published on Vulavula Dre.
      </p>

      <form onSubmit={handleSubscribe} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? "Subscribing..." : "Subscribe to Updates"}
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-sm ${
            status.includes("Success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe anytime by replying to our emails.
      </p>
    </div>
  );
};

export default Subscribe;
