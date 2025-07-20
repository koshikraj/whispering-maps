import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    // Send welcome email to subscriber
    const welcomeEmail = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@whisperingmaps.com',
      subject: 'Welcome to Whispering Maps! 🔮',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; border-radius: 15px; text-align: center;">
            <h1 style="color: #1e40af; margin-bottom: 20px; font-size: 28px;">Welcome to Whispering Maps! 🔮</h1>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for subscribing to Whispering Maps! 🔮
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              You're officially on the list to receive magical updates, sneak peeks, new book releases, and free printable goodies — all designed to bring stories alive in your world.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Whether you're a parent, a teacher, a fellow storyteller, or just a lover of timeless tales, we're so glad to have you here.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Until our next magical carpet ride,
            </p>
            
            <p style="color: #1e40af; font-size: 18px; font-weight: bold; margin: 0;">
              The Whispering Maps Team<br>
              <span style="font-size: 14px; color: #6b7280;">Wander + Wonder = Magic ✨</span>
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">
                Follow us on Instagram for more magical content:
              </p>
              <a href="https://instagram.com/whisperingmaps" style="display: inline-block; text-decoration: none; color: #6b7280;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); padding: 10px 20px; border-radius: 25px; border: 1px solid #e5e7eb;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style="flex-shrink: 0;">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span style="font-weight: 500; color: white;">@whisperingmaps</span>
                </div>
              </a>
              <p style="color: #6b7280; font-size: 12px; margin-top: 15px; margin-bottom: 0;">
                You can unsubscribe anytime by clicking the link at the bottom of our emails.
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Send notification email to admin
    const adminEmail = {
      to: process.env.ADMIN_EMAIL || 'koshik.raj@gmail.com',
      from: process.env.FROM_EMAIL || 'noreply@whisperingmaps.com',
      subject: 'New Newsletter Subscription - Whispering Maps',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e40af;">New Newsletter Subscription</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    }

    // Send both emails
    await Promise.all([
      sgMail.send(welcomeEmail),
      sgMail.send(adminEmail)
    ])

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
} 