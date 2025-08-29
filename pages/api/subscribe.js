import fs from "fs";
import path from "path";

const subscribersFile = path.join(process.cwd(), "data", "subscribers.json");

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(subscribersFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(subscribersFile)) {
    fs.writeFileSync(subscribersFile, JSON.stringify([]));
  }
};

const getSubscribers = () => {
  ensureDataDir();
  const data = fs.readFileSync(subscribersFile, "utf8");
  return JSON.parse(data);
};

const saveSubscribers = (subscribers) => {
  ensureDataDir();
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, action } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const subscribers = getSubscribers();

    if (action === "subscribe") {
      if (subscribers.includes(email)) {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      subscribers.push(email);
      saveSubscribers(subscribers);
      return res.status(200).json({ message: "Successfully subscribed!" });
    } else if (action === "unsubscribe") {
      const index = subscribers.indexOf(email);
      if (index > -1) {
        subscribers.splice(index, 1);
        saveSubscribers(subscribers);
        return res.status(200).json({ message: "Successfully unsubscribed!" });
      }
      return res.status(400).json({ error: "Email not found in subscribers" });
    }
  }

  if (req.method === "GET") {
    const subscribers = getSubscribers();
    return res.status(200).json({ subscribers });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
