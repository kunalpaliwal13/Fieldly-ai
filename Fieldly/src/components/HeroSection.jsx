import React from 'react'
import { ArrowDown, Leaf, TrendingUp, Users } from 'lucide-react';

function HeroSection() {
  return (
    <div className="min-h-screen bg-agricultural-hero bg-cover bg-center bg-no-repeat relative flex items-center justify-center overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#00000075] to-[#000] backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40 animate-fade-in">
          {/* Logo with icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#84e6ab] p-4 rounded-full mr-4 animate-pulse">
              <Leaf className="w-8 h-8 text-fieldly-accent" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
              Fieldly
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-light max-w-4xl mx-auto">
            Revolutionizing agriculture with <span className="text-[#84e6ab] font-semibold">AI-powered insights</span>. 
            Make smarter farming decisions and maximize your crop yields with cutting-edge technology.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-green-300 mr-2" />
              <span className="text-white text-sm font-medium">Increase Yields</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-green-300 mr-2" />
              <span className="text-white text-sm font-medium">Sustainable Farming</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Users className="w-5 h-5 text-green-300 mr-2" />
              <span className="text-white text-sm font-medium">Expert Support</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-gradient-to-r from-green-700 to-green-600 hover:from-fieldly-green-600 hover:to-fieldly-green-700 text-white text-lg px-12 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
            >
              Start Your Journey
            </button>
            <button 
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <button className="text-white/70 hover:text-white transition-colors">
            <ArrowDown className="w-6 h-6 mx-auto" />
            <p className="text-sm mt-2">Discover Features</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection