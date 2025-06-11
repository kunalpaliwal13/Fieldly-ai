import React from 'react'
import { ArrowRight, Smartphone, Globe, Headphones } from 'lucide-react';

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join the agricultural revolution today. Start making data-driven decisions and watch your yields soar.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="crop-predict" 
              className="bg-gradient-to-r flex from-green-500 to-green-500 hover:from-green-600 hover:to-green-700 text-white text-lg px-12 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 mt-1 transition-transform" />
            </a>
            <button 
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg px-8 py-4 rounded-full font-medium transition-all duration-300"
            >
              Talk to Expert
            </button>
          </div>

          {/* Support Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#91ffbd80] p-4 rounded-full mb-4">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-center">Access Fieldly anywhere, anytime from your mobile device</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#91ffbd80] p-4 rounded-full mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Multi-Language</h3>
              <p className="text-gray-600 text-center">Available in multiple languages for global farmers</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#91ffbd80] p-4 rounded-full mb-4">
                <Headphones className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-center">Round-the-clock assistance for all your farming needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection