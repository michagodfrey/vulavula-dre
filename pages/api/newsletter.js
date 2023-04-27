export default async function handler(req, res) {
    const email = req.body;

    if (!email || !email.length) {
      res.status(200).json({ error: "Please enter a email address" });
    }

    function getRequestParams(email) {
        const  listID = env.MAILCHIMP_LIST_ID;
        const api = env.MAILCHIMP_API_KEY;

  
    }
}