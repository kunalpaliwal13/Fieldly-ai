import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CropPredict from './components/CropPredict.jsx'
import FertilizerPredict from './components/FertilizerPredict.jsx'
import Weather from './components/Weather.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/crop-predict" element={<CropPredict/>} />
      <Route path="/fertilizer-predict" element={<FertilizerPredict/>} />
      <Route path="/weather" element={<Weather/>} />
     </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
