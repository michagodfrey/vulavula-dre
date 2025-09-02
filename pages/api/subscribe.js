import { getSupabaseAdminClient } from "../../services/supabaseServer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, action } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const supabase = getSupabaseAdminClient();

    if (action === "subscribe") {
      // Upsert to avoid duplicates
      const { error } = await supabase
        .from("subscribers")
        .upsert({ email, is_active: true })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return res.status(400).json({ error: "Email already subscribed" });
        }
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ message: "Successfully subscribed!" });
    } else if (action === "unsubscribe") {
      const { data, error } = await supabase
        .from("subscribers")
        .update({ is_active: false })
        .eq("email", email)
        .select("email");

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (!data || data.length === 0) {
        return res
          .status(400)
          .json({ error: "Email not found in subscribers" });
      }
      return res.status(200).json({ message: "Successfully unsubscribed!" });
    }
  }

  if (req.method === "GET") {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("subscribers")
      .select("email")
      .eq("is_active", true)
      .order("subscribed_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ subscribers: (data || []).map((r) => r.email) });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
