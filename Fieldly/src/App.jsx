import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import CTASection from './components/CTASection'
import axios from 'axios';

function App() {
  useEffect(() => {
    const startBackend = async ()=>{
      try{
        const response = await axios.get('https://fieldly-ai.onrender.com/startup')
        console.log("startup " + response);
      }catch(error){console.log(error)}
    }
    startBackend();
    useEffect(() => {
    alert("The backend is starting up, it might take 1 minute or two.")
}, [])

  }, [])
  

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
