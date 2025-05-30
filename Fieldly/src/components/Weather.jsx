import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import { IoMdSearch } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { BsDropletFill } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import axios from 'axios';


export default function Weather() {
    const [data, setData] = useState(null);
    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [doFetch,setDoFetch]= useState(false);

    
    useEffect(() => {
        const getLocation = async () => {
            try {
              const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
              });
          
              setCoords({
                lat: await position.coords.latitude,
                lon: await position.coords.longitude,
              });
            } catch (error) {
              console.error('Error getting location:', error);
            }
        };
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                  params: {lat: 26.9136, lon: 75.7858, appid: import.meta.env.VITE_WEATHER_API_KEY, units: 'metric',},});
                setData(response.data);
                console.log('Weather data Hourly:', response.data);
            }catch (error) {
                console.error('Error fetching weather:', error);}};

    if (navigator.geolocation) {getLocation();} 
    else {console.error('Geolocation is not supported by this browser.');}
    if(!doFetch){fetchWeather(); setDoFetch(true);}

    },[])



    


  return (
    <div className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen relative'>
    <div className='bg-[#ffffffab] h-screen'>
        <Navbar></Navbar>
        
      <div className="max-w-7xl mt-13 mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-green-700">Weather Intelligence</h1>
        <p className="text-center text-green-600">Real-time weather data and AI-powered agricultural insights</p>

        <div className="flex justify-center items-center space-x-2 bg-[#000000c4] backdrop-blur-2xl p-5 rounded-lg shadow-2xl">
          <input className="border-green-400 bg-[#6c6c6c] focus:outline-none focus:border-black p-2 border rounded w-full text-white placeholder-white" placeholder="Enter your city" />
          <button className="px-4 py-2 bg-green-500 text-white rounded flex"> <IoMdSearch className='mt-1 mr-1'/> Search</button>
        </div>

        <div className='w-full flex gap-5 h-[37vh]'>
            <div>
            <div className="flex flex-col gap-4 h-full mt-8">
            <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 md:col-span-2">
                <h2 className="text-3xl font-semibold text-green-400 mb-2 flex"><IoSunnyOutline className='mt-1 mr-1 text-orange-400'/> Current Conditions</h2>
                <div className='flex justify-around'>
                    <div>
                        <div className="text-4xl font-bold mt-5 text-green-400">{data? `${data.main.temp}`: 'unavailable'}°C</div>
                        <span className="text-green-300">Sunny</span>
                    </div>

                        <div className="flex flex-col items-center mt-4">
                            <div className='flex flex-col items-center justify-center text-white'>
                                <div className='text-blue-300 text-3xl'><BsDropletFill /></div>
                                <div className='font-semibold text-xl text-white'>{data? `${data.main.humidity}`: 'unavailable'}%</div>
                                Humidity
                            </div>    
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <div className='flex flex-col items-center justify-center text-white'>
                                <div className='text-purple-300 text-3xl'><FaWind /></div>
                                <div className='font-semibold text-xl text-white'>{data? `${data.wind.speed}`: 'unavailable'} Km/h</div>
                                Wind Speed
                            </div>    
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <div className='flex flex-col items-center justify-center text-white'>
                                <div className='text-blue-300 text-3xl'><RiTailwindCssFill /></div>
                                <div className='font-semibold text-xl text-white'>{data? `${data.main.pressure}`: 'unavailable'}</div>
                                Air Pressure
                            </div>    
                        </div>
                </div>
            </div>
            <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 w-2xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">7-Day Forecast</h2>
            <div className="space-y-2">
                <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                <div className="flex items-center gap-2">☀️ Today <span className="text-green-600">Sunny</span></div>
                <div className="flex space-x-4 text-sm">
                    <span>32°</span>
                    <span>18°</span>
                    <span>0%</span>
                </div>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                <div className="flex items-center gap-2">☁️ Tomorrow <span className="text-green-600">Cloudy</span></div>
                <div className="flex space-x-4 text-sm">
                    <span>30°</span>
                    <span>16°</span>
                    <span>10%</span>
                </div>
                </div>
                {/* Add more days similarly */}
            </div>
            </div>
            </div>
            </div>
         
         
         
         
            <div className='w-1/2 h-full shadow-2xl mt-8'>
            <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 h-full flex flex-col">
            <h2 className="text-xl font-semibold text-green-400 mb-2">Weather Assistant</h2>
            <div className="border p-2 rounded text-green-400 mb-2 overflow-y-auto flex-1">
              Hi! I can help you with weather forecasts and agricultural advice. Ask me about tomorrow's weather or farming conditions!
            </div>
            <div className="flex space-x-2 mt-2">
              <input className="flex-1 p-2 border border-green-300 rounded placeholder-white" placeholder="Ask about weather..." />
              <button className="px-4 py-2 bg-green-500 text-white rounded">Send</button>
            </div>
            </div>
            </div>
        
        </div>
      </div>
      </div>
      </div>
      
  );
}
