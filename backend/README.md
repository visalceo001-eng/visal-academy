# Visal Academy Form Backend

This backend handles form submissions from your website and sends confirmation emails via Resend.

## Setup Instructions

### 1. Get Your Resend API Key
- Go to [https://resend.com](https://resend.com)
- Sign up for a free account
- Navigate to **API Keys** and copy your key

### 2. Deploy to Vercel

**Option A: Git + GitHub(easiest)**
```bash
# 1. Commit your code to GitHub
git add .
git commit -m "Add form backend"
git push origin main

# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Select your GitHub repository
# 5. Set environment variable:
#    - Name: RESEND_API_KEY
#    - Value: your-resend-api-key
# 6. Click Deploy

# Your API endpoint will be: https://your-project-domain.vercel.app/api/submit
```

**Option B: Vercel CLI (direct deployment)**
```bash
npm install -g vercel
cd backend
vercel --env RESEND_API_KEY=your-resend-api-key
```

### 3. Update Your Forms

Once deployed, update the `FORM_ENDPOINT` in `js/forms.js`:

```javascript
const FORM_ENDPOINT = 'https://your-vercel-domain.vercel.app/api/submit';
```

## How It Works

1. User fills out form on your website
2. Form data is sent to your backend
3. Backend uses Resend API to email `visalceo001@gmail.com`
4. User sees success modal with contact details
5. You receive email with all submission details

## Environment Variables

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key |

## Form Fields

The form accepts:
- `name` - Athlete Name
- `guardian` - Parent/Guardian Name
- `email` - Email Address
- `phone` - Phone Number (optional)
- `program` - Selected Program
- `message` - Goals/Message

## Testing Locally

```bash
npm install
# Set the environment variable
export RESEND_API_KEY=your-api-key
node api/submit.js
```

## Troubleshooting

**"Form submission failed"**
- Verify `RESEND_API_KEY` is set in Vercel environment
- Check Resend account is active and has credits
- Review browser console for errors

**"Email not received"**
- Check spam folder
- Verify receiving email address is correct
- Confirm Resend API key is valid

**Deploy Issues**
- Ensure `package.json` and `api/submit.js` exist
- Check Node.js version compatibility (18+)
- Re-deploy after adding environment variables

## Support

Contact: +91 78069 08543 | visalceo001@gmail.com
