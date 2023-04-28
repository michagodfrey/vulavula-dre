import axios from 'axios';

export default async function handler(req, res) {
    const email = req.body;

    if (!email || !email.length) {
      res.status(400).json({ error: "Please enter an email address" });
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const SERVER = process.env.MAILCHIMP_SERVER;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;

    const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed'
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `api_key ${API_KEY}`
      }
    }

    try {

      const response = await axios.post(url, data, options);
      console.log(data)

      if (response.status >= 400) {
        return res.status(400).json({
          error:
            "Oops :( There was an error subscribing. Email me at keluburotu@gmail.com and I'll sign you up.",
        });
      }

      return res.status(201).json({
        message: 'Success!'
      })


    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ error: error.message })

    }
}


