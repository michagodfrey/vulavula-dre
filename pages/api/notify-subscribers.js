import { Resend } from "resend";
import { getSupabaseAdminClient } from "../../services/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "Vulavula Dre <noreply@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });
    console.log(`Email sent to ${to}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { postTitle, postSlug, postExcerpt } = req.body;

  if (!postTitle || !postSlug) {
    return res.status(400).json({ error: "Post title and slug are required" });
  }

  const supabase = getSupabaseAdminClient();
  const { data: rows, error } = await supabase
    .from("subscribers")
    .select("email")
    .eq("is_active", true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const subscribers = (rows || []).map((r) => r.email);

  if (subscribers.length === 0) {
    return res.status(200).json({ message: "No subscribers to notify" });
  }

  const postUrl = `https://vulavula-dre.vercel.app/post/${postSlug}`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin-bottom: 10px;">Vulavula Dre</h1>
        <p style="color: #666; font-style: italic;">A blog by Luke Uluiburoto</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 15px;">New Blog Post: ${postTitle}</h2>
        ${
          postExcerpt
            ? `<p style="color: #666; font-style: italic; margin-bottom: 20px;">${postExcerpt}</p>`
            : ""
        }
        <p style="color: #333; margin-bottom: 20px;">A new post has been published on Vulavula Dre!</p>
        <a href="${postUrl}" style="display: inline-block; background-color: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Read Full Post</a>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p>You're receiving this because you subscribed to Vulavula Dre blog updates.</p>
        <p>To unsubscribe, reply to this email with "unsubscribe" in the subject line.</p>
        <p style="margin-top: 10px;">
          <a href="https://vulavula-dre.vercel.app" style="color: #999;">Visit Vulavula Dre</a>
        </p>
      </div>
    </div>
  `;

  try {
    // Throttle to comply with Resend's default 2 req/sec limit
    // We send sequentially with a ~600ms delay between requests (~1.66 req/sec)
    let successfulSends = 0;
    let failedSends = 0;

    for (let i = 0; i < subscribers.length; i++) {
      const email = subscribers[i];
      const result = await sendEmail(
        email,
        `New Post: ${postTitle}`,
        emailHtml
      );
      if (result.success) {
        successfulSends += 1;
      } else {
        failedSends += 1;
      }
      if (i < subscribers.length - 1) {
        await sleep(650);
      }
    }

    console.log(
      `Email notification results: ${successfulSends} successful, ${failedSends} failed`
    );

    res.status(200).json({
      message: `Notification sent to ${successfulSends} subscribers`,
      totalSubscribers: subscribers.length,
      successfulSends,
      failedSends,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Failed to send notifications" });
  }
}
