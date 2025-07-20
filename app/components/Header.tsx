import React from 'react'
import Image from 'next/image'

export default function Header(): React.JSX.Element {
  return (
    <header className="text-center mb-12 lg:mb-15">
      <div className="flex items-center justify-center mb-6 lg:mb-8">
        <Image
          src="/assets/logo.png"
          alt="Whispering Maps Logo"
          width={300}
          height={100}
          className="w-auto h-auto max-w-[250px] lg:max-w-full"
        />
      </div>
      <div className="text-center max-w-4xl mx-auto px-4">
        <p className="mb-4 lg:mb-5 text-base lg:text-lg">
          Our journey has just started, and we can't wait to take you around the world- to lands of wonder, whimsy and magic!
        </p>
        <p className="mb-4 lg:mb-5 text-base lg:text-lg">
          Join us as we bring you stories and activities that open doors to awe and curiosity.
        </p>
      </div>
    </header>
  )
} 