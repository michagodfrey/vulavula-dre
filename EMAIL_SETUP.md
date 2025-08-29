# Email Notification Setup Guide

This guide will help you set up the manual email notification system for your Vulavula Dre blog.

## What's Been Implemented

✅ **Subscribe Component** - Added to post pages for email collection  
✅ **Subscription Management API** - Stores subscribers in JSON file  
✅ **Email Notification API** - Sends emails using Resend  
✅ **Manual Trigger API** - Allows manual notification sending  
✅ **RSS Feed** - Available at `/api/rss`  
✅ **Admin Panel** - Simple web interface at `/admin`

## Setup Steps

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Verify your domain (optional but recommended)

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key
RESEND_API_KEY=re_123456789...

# Admin secret for triggering notifications
ADMIN_SECRET=your-super-secret-key-here

# Site URL (optional, defaults to vercel.app)
NEXT_PUBLIC_SITE_URL=https://vulavula-dre.vercel.app
```

### 3. Vercel Environment Variables

When deploying to Vercel, add the same environment variables in your Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` = your Resend API key
   - `ADMIN_SECRET` = your secret key
   - `NEXT_PUBLIC_SITE_URL` = your site URL

## How to Use

### Manual Email Notifications

After publishing a new post in Hygraph, trigger email notifications using one of these methods:

#### Option 1: Admin Panel (Recommended)

1. Visit `/admin` on your site
2. Click "Send Notification"
3. View results and subscriber count

#### Option 2: cURL Command

```bash
curl -X POST https://your-domain.com/api/trigger-notification \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-admin-secret"}'
```

#### Option 3: Browser Bookmarklet

Create a bookmark with this JavaScript:

```javascript
javascript: (function () {
  fetch("/api/trigger-notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: "your-admin-secret" }),
  })
    .then((r) => r.json())
    .then((data) => alert(data.message || data.error))
    .catch((err) => alert("Error: " + err.message));
})();
```

### RSS Feed

Your RSS feed is automatically available at:

- **URL**: `https://your-domain.com/api/rss`
- **Format**: Standard RSS 2.0
- **Updates**: Automatically includes all posts

### Managing Subscribers

- **View subscribers**: GET `/api/subscribe`
- **Add subscriber**: POST `/api/subscribe` with `{"email": "user@example.com", "action": "subscribe"}`
- **Remove subscriber**: POST `/api/subscribe` with `{"email": "user@example.com", "action": "unsubscribe"}`

## Email Template

The email template includes:

- Blog branding and title
- Post title and excerpt
- Direct link to the full post
- Unsubscribe instructions
- Professional styling

## File Structure

```
pages/api/
├── subscribe.js              # Subscription management
├── notify-subscribers.js     # Email sending with Resend
├── trigger-notification.js   # Manual trigger endpoint
└── rss.js                    # RSS feed

components/
└── Subscribe.jsx             # Subscription form component

pages/
└── admin.js                  # Admin panel interface

data/
└── subscribers.json          # Subscriber list (auto-created)
```

## Troubleshooting

### Common Issues

1. **"Unauthorized" error**: Check your `ADMIN_SECRET` environment variable
2. **Email sending fails**: Verify your `RESEND_API_KEY` is correct
3. **No subscribers found**: Check if `/data/subscribers.json` exists and has content
4. **Domain verification**: If emails aren't sending, verify your domain in Resend

### Testing

1. **Test subscription**: Visit any post page and try subscribing
2. **Test admin panel**: Visit `/admin` and try triggering a notification
3. **Test RSS feed**: Visit `/api/rss` to see the feed
4. **Check logs**: Monitor Vercel function logs for errors

## Security Notes

- Keep your `ADMIN_SECRET` secure and private
- The admin panel is public - consider adding IP restrictions
- Subscriber emails are stored in plain text JSON
- Consider adding rate limiting for production use

## Next Steps

Once you're comfortable with the manual system, you could:

1. **Add webhook integration** with Hygraph for automatic notifications
2. **Implement email templates** with more branding
3. **Add subscriber analytics** and tracking
4. **Create an unsubscribe landing page**
5. **Add email validation** and confirmation emails

## Support

If you encounter issues:

1. Check the browser console for errors
2. Review Vercel function logs
3. Verify all environment variables are set
4. Test with a small subscriber list first
