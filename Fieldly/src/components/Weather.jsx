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
    const [description, setDescription] = useState('');
    const [loadingDescription, setLoadingDescription] = useState(false);
    const [city, setCity] = useState('');


    
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        lat: 26.9136,
                        lon: 75.7858,
                        appid: import.meta.env.VITE_WEATHER_API_KEY,
                        units: 'metric',
                    },
                });
                setData(response.data);
                console.log('Weather data:', response.data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };
        fetchWeather();
    }, []);

    const fetchWeatherByCity = async () => {
  if (!city) return;

  const coords = await getCoordsFromCity(city);
  if (!coords) return;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: 'metric',
      },
    });
    setData(response.data);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
};

    useEffect(() => {
        const generateDescription = async () => {
            if (!data) return;
            setLoadingDescription(true);
            const prompt = `Generate a short weather description using the json ${data}. it consists of dense weather info, understad it and give me a description along the following guidelines:
                Using this weather data:
                - Temperature: 37.69°C
                - Humidity: 24%
                - Wind: 3.58 km/h
                - Air Pressure: 993 hPa
                - Condition: Overcast

                Give me a structured weather summary for farmers, divided into:
                1. General Weather
                2. Detailed Weather
                3. Insights for Farmers (use short bullet points)
                4. Recommendations (use short bullet points)
                5. Use 2 <br> tags whenever one is necessary to put it in a HTML format
                6. Format text sizez so it looks nice

                IMPORTANT: Do not include markdown symbols, no **bold**, no *italics*. Keep it as simple plain text for direct display.
                `;
            try {
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                    { contents: [{ parts: [{ text: prompt }] }] },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                const reply = response.data.candidates[0]?.content?.parts[0]?.text || 'No description available.';
                setDescription(reply);
            } catch (error) {
                console.error('Error generating description:', error);
                setDescription('Sorry, unable to generate weather description.');
            } finally {
                setLoadingDescription(false);
            }
        };
        generateDescription();
    }, [data]);

    const getCoordsFromCity = async (cityName) => {
  try {
    const geoRes = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
        q: cityName,
        limit: 1,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
      },
    });

    if (geoRes.data.length === 0) {
      alert('City not found');
      return null;
    }

    const { lat, lon } = geoRes.data[0];
    return { lat, lon };
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null;
  }
};


    


  return (
    <div className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen relative overflow-auto'>
    <div className='bg-[#ffffffab] h-screen overflow-auto'>
        <Navbar></Navbar>
        
      <div className="max-w-7xl mt-13 mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-green-700">Weather Intelligence</h1>
        <p className="text-center text-green-600">Real-time weather data and AI-powered agricultural insights</p>

        <div className="flex justify-center items-center space-x-2 bg-[#000000c4] backdrop-blur-2xl p-5 rounded-lg shadow-2xl mx-5 md:mx-0">
          <input className="border-green-400 bg-[#6c6c6c] focus:outline-none focus:border-black p-2 border rounded w-full text-white placeholder-white" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="px-4 py-2 bg-green-500 text-white rounded flex" onClick={fetchWeatherByCity}> <IoMdSearch className='mt-1 mr-1'/> Search</button>
        </div>

        <div className='w-full md:flex  gap-5 h-[37vh]'>
            <div className="flex flex-col gap-4 h-full mt-8 px-5 md:p-0 md:w-2xl">
            <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 md:col-span-2">
                  <h2 className="md:text-3xl text-xl font-semibold text-green-400 mb-2 flex"><IoSunnyOutline className='mt-1 mr-1 text-orange-400'/> Current Conditions {city? '':'(Default)'}</h2>
                  <div className='md:flex justify-around'>
                      <div className='mb-5 md:block flex justify-center items-center md:mb-10'>
                          <div className="md:text-4xl text-2xl font-bold mt-5 text-white">{data? `${data.main.temp}`: 'unavailable'}°C</div>
                          <span className="text-white">Sunny</span>
                      </div>

                      <div className=' flex gap-10'>
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
                </div>
            </div>
              <div className='md:w-1/2 h-full shadow-2xl md:mt-8 mx-5 md:mx-0 pb-5 md:pb-0'>
                  <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 h-full flex flex-col">
                      <h2 className="text-xl font-semibold text-green-400 mb-2">AI Weather Summary</h2>
                      <div className="border border-[#fff3] p-2 rounded text-white mb-2 overflow-y-auto flex-1" dangerouslySetInnerHTML={{ __html: loadingDescription ? 'Generating summary...' : description }}/>
                  </div>
              </div>
            </div>
              
            </div>
        
        </div>
         
         
            {/* <div className="bg-[#000000c4] backdrop-blur-2xl rounded-lg shadow-2xl p-4 w-2xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">7-Day Forecast</h2> */}
            {/* <div className="space-y-2">
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

            </div> */}
            {/* </div> */}
         
              
      </div>
     

      
  );
}
