import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import CTASection from './components/CTASection'

function App() {  

  return (
    <>
   <div className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen relative'>
    <Navbar/>
    <HeroSection/>
    <FeatureSection/>
    <CTASection/>
    </div>
    </>
  )
}

export default App
