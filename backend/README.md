# Visal Academy Form Backend

This backend handles form submissions from your website and sends confirmation emails via Resend.

## ✅ DEPLOYMENT INSTRUCTIONS (REQUIRED FOR FORMS TO WORK)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy to Vercel
Navigate to the backend folder and run:
```bash
cd backend
vercel --prod
```

This will:
- Create a new Vercel project (or link to existing)
- Deploy your API to production
- Give you a deployment URL like: `https://visal-academy.vercel.app/api/submit`

### Step 3: Forms Will Work Automatically
Once deployed, the forms on your website will automatically submit to:
- `https://visal-academy.vercel.app/api/submit`

Emails will be sent to: `visalceo001@gmail.com`

---

## Backend Configuration

**API Key:** `re_NtYNaDXP_Dyrfvi5WqCXE5h6hopPyKSdy`

**Email Notifications:** visalceo001@gmail.com

**Available Endpoints:**
- `POST /api/submit` - Form submission endpoint

### Form Fields Expected:
- `name` - Athlete Name (required)
- `guardian` - Parent/Guardian (required)
- `email` - Email Address (required)
- `phone` - Phone Number (optional)
- `program` - Preferred Program (required)
- `message` - Goals/Message (required)
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
