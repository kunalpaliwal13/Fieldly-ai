import React from 'react'

function Navbar() {
  return (
    <div className='w-full h-20 flex justify-center items-center'>
   <nav className="fixed z-10 mx-auto mt-8 w-7xl rounded-full bg-gray-900 px-6 py-4 font-inter shadow-lg md:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        {/* Brand Name / Logo */}
        <div className="text-2xl font-bold text-white md:text-3xl">
          Fieldly
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden space-x-8 md:flex">
          <li>
            <a href="/" className="text-lg font-medium text-white transition-colors duration-200 hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="crop-predict" className="text-lg font-medium text-white transition-colors duration-200 hover:text-gray-300">
              Crop Predictor
            </a>
          </li>
          <li>
            <a href="/fertilizer-predict" className="text-lg font-medium text-white transition-colors duration-200 hover:text-gray-300">
              Fertilizer Predictor
            </a>
          </li>
          <li>
            <a href="/weather" className="text-lg font-medium text-white transition-colors duration-200 hover:text-gray-300">
              Weather Report
            </a>
          </li>
        </ul>

        {/* Desktop Call-to-Action Button */}
        <div className="hidden md:block">
          <button className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white shadow-md transition-colors duration-200 hover:bg-emerald-600">
            Contact Us
          </button>
        </div>

      </div>
    </nav>
    </div>
  )
}

export default Navbar