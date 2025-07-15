import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { FaThermometerHalf } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import { GrSun } from "react-icons/gr";
import axios from 'axios';

function CropPredict() {
    const [formData, setFormData] = useState({
        N:'',
        P:'',
        K:'',
        temp:'',
        humidity:'',
        location: ''
    })
    const [predictedCrop, setPredictedCrop]= useState(null);
    const [cropContent, setCropContent]= useState(null);
    const [loadingDescription, setLoadingDescription] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({...prev, [name]: value,}));};

    const handleSubmit = async (e) => {
        setLoadingDescription(true);
        e.preventDefault();
        console.log(formData);

        try {
          const res = await axios.post('https://fieldly-ai-srhi.onrender.com/predict', formData, {
                headers: {
                'Content-Type': 'application/json',
                },
        });
          console.log(res.data);
          setPredictedCrop(res.data);
        } catch (err) {
          console.error(err);
        }
    };
    useEffect(() => {
    if (predictedCrop) {
        getResponse();
     }
    }, [predictedCrop]);

    const getResponse= async ()=>{
        
        const prompt = `
          Generate only an **HTML-formatted** snippet (no markdown or code blocks) with the following sections for the crop: ${predictedCrop}.
          My location is ${formData.location}
- The crop name at the top as a green <h1> heading with class "text-green-300".
- Use <h2> for section titles: "Brief Description", "Best Farming Practices", "Fun Facts and Tips".
- Provide paragraphs (<p>) and bullet points (<ul><li>) where appropriate.
- Use 2 <br> tags only for line breaks inside paragraphs, use 2 after a heading or ':', and 1 br tag before a heading.
- Format text sizez so it looks nice
- use green-300 for headings to give color contrast
- Do NOT include any triple backticks (''') or markdown formatting in the response.
- Return only the raw HTML snippet.
- IMPORTANT: Do NOT include any markdown syntax, backticks, or code blocks.
Return raw HTML only. No explanations or disclaimers.

Example output for "Kidney Beans":

<h1 class="text-green-300 text-4xl">Kidney Beans</h1><br><br>
<h2>Brief Description</h2><br><br>
<p>Kidney beans are a variety of common bean named for their visual resemblance in shape and color to a human kidney. They are a major ingredient in chili con carne and are commonly used in salads, stews, and other dishes worldwide.</p>
<h1 className="text-green-300 text-4xl">Best Farming Practices</h2><br><br>
<ul><br>
  <li>Plant in well-drained soil with a pH between 6.0 and 7.0</li>
  <li>Ensure adequate soil moisture, especially during flowering and pod development.</li>
  <li>Control weeds to minimize competition for resources.</li>
  <li>Harvest when pods are dry and the beans rattle inside.</li>
</ul>
<h2 className="green-300">Fun Facts and Tips</h2><br><br>
<p>Kidney beans are an excellent source of protein and fiber.<br>Soaking kidney beans before cooking is crucial to remove toxins.</p>

             `;
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`
        
         try {
        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        console.log(prompt);
        const reply = response.data.candidates[0].content.parts[0].text;
        const cleanedHtml = reply
  .replace(/```html?\n?/g, '')   // remove starting triple backticks (html or plain)
  .replace(/```/g, '')            // remove ending triple backticks
  .replace(/<\/?html>/g, '')      // remove html tags if any
  .replace(/<\/?body>/g, '')      // remove body tags if any
  .trim();
        setLoadingDescription(false);
        console.log("false");
        setCropContent(cleanedHtml);
        console.log(reply)
        }catch(error){console.log(error);}

    }


  return (
    <>
    <div className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen relative overflow-auto'>
    <div className='bg-[#ffffffab] h-screen overflow-auto max-w-screen'>
    <Navbar/>
    <div className='md:w-screen flex flex-col justify-center items-center'>

    <h1 className='text-5xl mt-15 text-green-900 font-extrabold '> Crop Prediction </h1>
    <p className='text-xl text-green-700 font-normal mt-5 px-4 flex items-center justify-center text-center'>Get AI-powered insights for optimal crop selection and yield prediction</p>
    
    <div className='md:grid-cols-2 md:grid md:gap-10 block max-w-screen p-5' >
     <div className="bg-[#000000c4] backdrop-blur-2xl p-8 rounded-md mt-14 flex flex-col gap-5">
        
        <form onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-3 gap-7'>
            <div className='flex flex-col'>
                <p className='text-white font-medium'>Nitrogen(N)</p>
                <input type='number' placeholder='0-100'  name='N' value={formData.N} onChange={handleChange} className='bg-[#98989880] p-2 backdrop-blur-2xl rounded placeholder-white text-white md:w-30 mt-2 w-full' style={{border:"0.5px solid #FFFFFF80"}}></input>
            </div>
            <div className='flex flex-col'>
                <p className='text-white font-medium'>Phosphorus(P)</p>
                <input type='number' name='P' value={formData.P} onChange={handleChange} placeholder='0-100' className='bg-[#98989880] p-2 backdrop-blur-2xl rounded placeholder-white text-white md:w-30 w-full mt-2' style={{border:"0.5px solid #FFFFFF80"}}></input>
            </div>
            <div className='flex flex-col'>
                <p className='text-white font-medium'>Potassium(K)</p>
                <input type='number' placeholder='0-100' name='K' value={formData.K} onChange={handleChange} className='bg-[#98989880] p-2 backdrop-blur-2xl rounded placeholder-white text-white md:w-30 w-full mt-2' style={{border:"0.5px solid #FFFFFF80"}}></input>
            </div>
        </div>
        
        <div className='grid grid-cols-2 mt-5 gap-5'>
            <div className='flex flex-col'>
                <p className='text-white font-medium flex'> <FaThermometerHalf className='mt-1'/> Temperature (°C)</p>
                <input type='number' placeholder='0-50' name='temp' value={formData.temp} onChange={handleChange} className='bg-[#98989880] p-2 backdrop-blur-2xl rounded placeholder-white text-white mt-2' style={{border:"0.5px solid #FFFFFF80"}}></input>
            </div>
            <div className='flex flex-col'>
                <p className='text-white font-medium flex'> <IoSpeedometer className='mt-1 mr-1' />Humidity</p>
                <input type='number' placeholder='0-100' name='humidity' value={formData.humidity} onChange={handleChange} className='bg-[#98989880] p-2 backdrop-blur-2xl rounded placeholder-white text-white mt-2' style={{border:"0.5px solid #FFFFFF80"}}></input>
            </div>
        </div>

        <div>
            <p className='text-white font-medium mt-5 flex'> <IoLocationSharp className='mt-1'/> Location</p>
            <input type='text' placeholder='Add your location' className='bg-[#98989880] p-2 backdrop-blur-2xl w-full rounded placeholder-white text-white mt-2' style={{border:"0.5px solid #FFFFFF80"}}></input>
        </div>

        <button type="submit" className='flex justify-center items-center bg-green-500 text-xl p-2 rounded font-semibold mt-2 hover:bg-green-400 text-white'><BsGraphUp />Predict Crop Stats</button>
        </form>
     </div>
     
    <div className="bg-[#000000cc]  backdrop-blur-2xl px-8 py-5 md:w-2xl justify-center md:max-w-full items-start rounded-md mt-14 block 
 gap-5 overflow-y-auto max-h-96 shrink-0">
  <div className='text-white p-6 rounded-2xl'>
  {loadingDescription ? (<>
  <p className='text-green-300 mt-2'>Please wait</p>
  <p>Generating summary...</p></>
) : cropContent ? (
  <div dangerouslySetInnerHTML={{ __html: cropContent }} />
) : (
  <>
    <h1 className='flex items-center'>
      <GrSun className='mt-1 mr-1' />
      Ready to Predict
    </h1>
    <p className='text-green-300 mt-2'>
      Fill in your farm details and click predict to get AI-powered insights
    </p>
  </>
)}

</div>

</div>

    </div>
    
    </div>
    </div>
    </div>
    </>
  )
}

export default CropPredict