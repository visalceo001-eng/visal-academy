import { Resend } from 'resend';

// Use API key from environment or hardcoded (use env for production)
const apiKey = process.env.RESEND_API_KEY || 're_NtYNaDXP_Dyrfvi5WqCXE5h6hopPyKSdy';
const resend = new Resend(apiKey);

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, guardian, email, phone, program, message } = req.body;

    // Validate required fields
    if (!name || !guardian || !email || !program || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'noreply@visalacademy.com',
      to: 'visalceo001@gmail.com',
      subject: `New Enrollment Inquiry: ${name}`,
      html: `
        <h2>New Form Submission from Visal Academy Website</h2>
        <p><strong>Athlete Name:</strong> ${name}</p>
        <p><strong>Parent/Guardian:</strong> ${guardian}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Contact details: +91 78069 08543 | ceo@visalacademy.com</p>
      `
    });

    console.log('Email sent successfully:', emailResponse);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. We will contact you at +91 78069 08543 or visalceo001@gmail.com shortly.',
      contact: {
        phone: '+91 78069 08543',
        email: 'visalceo001@gmail.com'
      }
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to submit form. Please try again or contact us directly at +91 78069 08543'
    });
  }
}
