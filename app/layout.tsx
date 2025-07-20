import React from 'react'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'

const lora = Lora({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Whispering Maps - Children\'s Books',
  description: 'Our journey has just started, and we can\'t wait to take you around the world- to lands of wonder, whimsy and magic!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lora.className} bg-cream text-darkGray leading-relaxed`}>
        {children}
      </body>
    </html>
  )
} 