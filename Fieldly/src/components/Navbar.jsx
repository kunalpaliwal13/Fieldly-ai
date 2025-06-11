import React, { useState } from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { LuWheat } from "react-icons/lu";
import { BiSolidSprayCan } from "react-icons/bi";
import { TiWeatherPartlySunny } from "react-icons/ti";

function Navbar() {
  const [active, setActive] = useState(null);


  const items = [
    { icon: <IoHomeSharp className="text-2xl" />, label: "Home", href: "/" },
    { icon: <LuWheat className="text-2xl" />, label: "Crop Prediction", href: "/crop-predict" },
    { icon: <BiSolidSprayCan className="text-2xl" />, label: "Fertilizer Prediction", href: "/fertilizer-predict" },
    { icon: <TiWeatherPartlySunny className="text-2xl" />, label: "Weather Report", href: "/weather" },
  ];
  
  return (
    <div className='w-full h-20 flex justify-center items-center'>
   <nav className="md:block hidden fixed z-40 mx-auto mt-8 w-7xl rounded-full bg-gray-900 px-6 py-4 font-inter shadow-lg md:px-8 lg:px-12">
      <div className=" md:flex items-center justify-between">
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
          <a href= "mailto:kunalpaliwal2003@gmail.com" className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white shadow-md transition-colors duration-200 hover:bg-emerald-600">
            Contact Us
          </a>
        </div>

      </div>
    </nav>

    {/* mobile navbar */}
    <nav className='md:hidden fixed z-20 mx-auto mt-8 w-7xl rounded-full bg-gray-900 px-6 py-4 font-inter shadow-lg md:px-8 lg:px-12 max-w-[60%]'>
      <div className=" md:flex items-center justify-between">
       <ul className="md:hidden space-x-8 flex">
  {items.map((item, index) => (
    <li className="flex justify-center items-center" key={index}>
      <a
        onClick={() => setActive(index)}
        href={item.href}
        className="group text-sm font-medium flex flex-col justify-center items-center text-white transition-colors duration-200 hover:text-gray-300"
      >
        {item.icon}
        {active === index && (
          <span className="z-40 absolute mt-16 w-auto rounded-[2px] p-1 bg-gray-800">
            {item.label}
          </span>
        )}
      </a>
    </li>
  ))}
</ul>


      </div>
    </nav>

    </div>
  )
}

export default Navbar