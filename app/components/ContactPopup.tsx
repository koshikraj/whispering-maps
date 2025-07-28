'use client'

import React, { useState } from 'react'

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps): React.JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, reason, message })
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setResponseMessage('Thank you for your message! We typically respond within 48 hours.')
        
        // Clear form
        setName('')
        setEmail('')
        setReason('')
        setMessage('')
        
        // Close popup after 4 seconds
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setResponseMessage('')
        }, 4000)
      } else {
        setIsSuccess(false)
        setResponseMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setIsSuccess(false)
      setResponseMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay, not the form content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return <></>

  return (
    <div 
      className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full relative overflow-hidden border border-gray-300">
        {/* Background with warm rustic texture and stars */}
        <div className="relative bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-50 p-8">
          {/* Stars decoration - scattered stars in two shades */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-6 right-8 text-green-600 text-xl">⭐</div>
            <div className="absolute top-12 left-6 text-yellow-500 text-sm">⭐</div>
            <div className="absolute top-20 right-6 text-green-600 text-base">⭐</div>
            <div className="absolute bottom-12 left-8 text-yellow-500 text-sm">⭐</div>
            <div className="absolute bottom-6 right-10 text-green-600 text-lg">⭐</div>
            <div className="absolute top-16 left-12 text-yellow-500 text-xs">⭐</div>
            <div className="absolute bottom-16 right-4 text-green-600 text-sm">⭐</div>
            <div className="absolute top-32 left-20 text-yellow-500 text-base">⭐</div>
            <div className="absolute bottom-24 right-16 text-green-600 text-xs">⭐</div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold z-10"
          >
            ×
          </button>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-serif text-green-800 text-center mb-2">
              Have a Question or Idea?
            </h2>
            
            <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
              We'd love to hear from you! Use the form below to reach out.
            </p>

            {/* Success/Error Message */}
            {responseMessage && (
              <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
                isSuccess 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {responseMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-green-800 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  placeholder="Full name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-green-800 text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-green-800 text-sm font-medium mb-2">
                  Reason for Inquiry
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent appearance-none"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select an option</option>
                  <option value="general">General Question</option>
                  <option value="book-inquiry">Book Inquiry</option>
                  <option value="collaboration">Collaboration Idea</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-green-800 text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                  placeholder="Write your message here..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <p className="text-green-800 text-xs text-center mt-4 leading-relaxed">
              We typically respond within 48 hours.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-2 right-2 w-16 h-16 opacity-30">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 w-12 h-8 bg-yellow-100 rounded opacity-40 border border-yellow-200">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-6 h-4 bg-yellow-200 rounded opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 