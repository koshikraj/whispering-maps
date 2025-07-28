import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { name, email, reason, message } = await request.json()

    // Validate input
    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { error: 'Name, email, reason, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send confirmation email to the person who submitted the form
    const confirmationEmail = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@whisperingmaps.com',
      subject: 'Thank you for reaching out to Whispering Maps! 📬',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; border-radius: 15px; text-align: center;">
            <h1 style="color: #1e40af; margin-bottom: 20px; font-size: 28px;">Thank you for reaching out! 📬</h1>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your message!
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We've received your inquiry and will get back to you within 48 hours (often sooner).
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to explore our books and behind-the-scenes world on Instagram: <a href="https://instagram.com/whisperingmaps" style="color: #1e40af; text-decoration: none;">@whisperingmaps</a>
            </p>
            
            <p style="color: #1e40af; font-size: 18px; font-weight: bold; margin: 0;">
              Warm regards,<br>
              The Whispering Maps Team<br>
              <span style="font-size: 14px; color: #6b7280;">Wander + Wonder = Magic ✨</span>
            </p>
          </div>
        </div>
      `
    }

    // Send notification email to admin with the contact form details
    const adminEmail = {
      to: process.env.ADMIN_EMAIL || 'koshik.raj@gmail.com',
      from: process.env.FROM_EMAIL || 'noreply@whisperingmaps.com',
      subject: 'New Contact Form Submission - Whispering Maps',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Reason for Inquiry:</strong> ${reason}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #1e40af;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p style="margin-top: 15px;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Please respond to this inquiry within 48 hours.
          </p>
        </div>
      `
    }

    // Send both emails
    await Promise.all([
      sgMail.send(confirmationEmail),
      sgMail.send(adminEmail)
    ])

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    )
  }
} 