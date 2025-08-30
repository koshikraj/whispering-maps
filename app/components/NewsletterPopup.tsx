'use client'

import React, { useState } from 'react'

interface NewsletterPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewsletterPopup({ isOpen, onClose }: NewsletterPopupProps): React.JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage('Welcome to our Story Circle! Check your email to confirm your subscription.')
        
        // Clear form
        setName('')
        setEmail('')
        
        // Close popup after 3 seconds
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setMessage('')
        }, 3000)
      } else {
        setIsSuccess(false)
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage('Network error. Please check your connection and try again.')
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
      className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-cream rounded-xl shadow-lg max-w-md w-full relative overflow-hidden">
        {/* Clean, minimal background matching the landing page */}
        <div className="relative bg-cream p-8">
          {/* Stars decoration - scattered yellow stars */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-6 right-8 text-yellow-400 text-xl">⭐</div>
            <div className="absolute top-12 left-6 text-yellow-400 text-sm">⭐</div>
            <div className="absolute top-20 right-6 text-yellow-400 text-base">⭐</div>
            <div className="absolute bottom-12 left-8 text-yellow-400 text-sm">⭐</div>
            <div className="absolute bottom-6 right-10 text-yellow-400 text-lg">⭐</div>
            <div className="absolute top-16 left-12 text-yellow-400 text-xs">⭐</div>
            <div className="absolute bottom-16 right-4 text-yellow-400 text-sm">⭐</div>
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
            <h2 className="text-2xl font-serif text-green-800 text-center mb-4">
              Let the Magic Find You
            </h2>
            
            <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
              Get early access to our magical storybooks, freebies, and behind-the-scenes peeks.
            </p>

            {/* Success/Error Message */}
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
                isSuccess 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  placeholder="your.email@example.com"
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
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-gray-600 text-xs text-center mt-4 leading-relaxed">
              We promise to send only the good stuff. No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Frog character illustration with purple cloak and stars */}
          <div className="absolute bottom-2 right-2 w-20 h-20 opacity-30">
            <div className="relative w-full h-full">
              {/* Frog body */}
              <div className="absolute inset-0 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-xl">🐸</span>
              </div>
              {/* Purple cloak with stars */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full opacity-60 flex items-center justify-center">
                <span className="text-yellow-300 text-xs">⭐</span>
              </div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-purple-600 rounded-full opacity-60 flex items-center justify-center">
                <span className="text-yellow-300 text-xs">⭐</span>
              </div>
            </div>
          </div>

          {/* Map/paper illustration */}
          <div className="absolute bottom-4 left-4 w-16 h-12 bg-amber-100 rounded opacity-40 border border-amber-200">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-6 bg-amber-200 rounded opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 