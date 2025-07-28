'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import NewsletterPopup from './components/NewsletterPopup'
import ContactPopup from './components/ContactPopup'

export default function Home(): React.JSX.Element {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <Header />

      {/* Video Section */}
      <section className="text-center mb-15">
        <video width="100%" height="450" controls className="max-w-4xl mx-auto">
          <source src="/assets/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Illustration Description */}
      <section className="text-center mb-15">
        <p className="text-lg max-w-2xl mx-auto px-4">
          All our illustrations are hand drawn. Crafted with a lot of love and attention for your precious ones to enjoy.
        </p>
      </section>

      {/* Featured Book Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-15 mb-20">
        <div className="flex-none w-full max-w-[500px] lg:w-[500px]">
          <Image
            src="/assets/book.png"
            alt="The Seven Kids and the Wolf Book Cover"
            width={500}
            height={600}
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <p className="text-lg mb-5">
            We began with <strong>The Seven Kids and the Wolf</strong>, a playful and bold retelling of a classic. Not too scary, not too sweet—just right for curious minds and bedtime giggles.
          </p>
          <p className="text-lg">
            Check it out on <a href="#" className="text-linkBlue underline">Amazon!</a>
          </p>
        </div>
      </section>

      {/* New Adventures Section */}
      <section className="relative mb-20">
        <div className="relative z-10 min-h-[400px] lg:min-h-[600px]">
          <div className="hidden lg:block absolute top-0 right-0 w-[80%] h-full">
            <Image
              src="/assets/frame.png"
              alt="Background illustrations"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative z-20 max-w-full lg:max-w-[40%] p-4 lg:p-8">
            <h2 className="text-xl lg:text-2xl mb-6 lg:mb-8 text-center lg:text-left">New adventures are being drawn and dreamed:</h2>
            <ul className="list-none mb-6 lg:mb-8">
              <li className="flex items-center mb-4 lg:mb-5 text-base lg:text-lg">
                <Image
                  src="/assets/logo-icon.png"
                  alt="Logo icon"
                  width={64}
                  height={64}
                  className="w-8 h-8 lg:w-10 lg:h-10 mr-3 lg:mr-4 flex-shrink-0"
                />
                <span>Picture books for little ones learning to listen to language</span>
              </li>
              <li className="flex items-center mb-4 lg:mb-5 text-base lg:text-lg">
                <Image
                  src="/assets/logo-icon.png"
                  alt="Logo icon"
                  width={64}
                  height={64}
                  className="w-8 h-8 lg:w-10 lg:h-10 mr-3 lg:mr-4 flex-shrink-0"
                />
                <span>Lyrical tales for growing readers who love a touch of magic</span>
              </li>
              <li className="flex items-center mb-4 lg:mb-5 text-base lg:text-lg">
                <Image
                  src="/assets/logo-icon.png"
                  alt="Logo icon"
                  width={64}
                  height={64}
                  className="w-8 h-8 lg:w-10 lg:h-10 mr-3 lg:mr-4 flex-shrink-0"
                />
                <span>Graphic novels for older kids who ask, 'What's next?'</span>
              </li>
            </ul>
            <p className="text-base lg:text-lg italic text-center lg:text-left">
              Each book is a soft map—a way to explore, to wonder, and to come home again.
            </p>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="text-center mb-20">
        <p className="text-lg mb-5 px-4">
          We're just getting started. The next pages are on their way.
        </p>
        <div className="flex items-center justify-center gap-3 text-lg px-4">
          <div className="w-5 h-5 bg-lightBlue rounded-full flex-shrink-0"></div>
          <span>
            <strong>Sign up</strong> to be the first to see sneak peeks, behind-the-scenes magic, and launch updates.
          </span>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="mt-6 bg-gradient-to-r from-orange-200 to-pink-200 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Subscribe to Newsletter
        </button>
      </section>

      {/* Contact Section */}
      <section className="text-center mb-20">
        <p className="text-lg mb-5 px-4">
          Have a question or idea? We'd love to hear from you!
        </p>
        <button
          onClick={() => setIsContactOpen(true)}
          className="bg-green-600 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Contact Us
        </button>
      </section>

      <Footer />

      {/* Newsletter Popup */}
      <NewsletterPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  )
} 