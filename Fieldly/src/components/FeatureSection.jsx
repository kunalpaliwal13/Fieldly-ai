import React from 'react'
import { Leaf, Cloud, Beaker, BarChart3, Shield, Zap } from 'lucide-react';

function FeatureSection() {
  const features = [
    {
      icon: Leaf,
      title: "Smart Crop Prediction",
      description: "AI-powered analysis of soil conditions, weather patterns, and historical data to recommend the best crops for your land.",
      gradient: "from-green-500 to-emerald-600",
      action: () => onNavigate?.('crop-predictor')
    },
    {
      icon: Beaker,
      title: "Fertilizer Optimization",
      description: "Precise fertilizer recommendations based on soil composition and crop requirements to maximize yield and minimize waste.",
      gradient: "from-blue-500 to-cyan-600",
      action: () => onNavigate?.('fertilizer-predictor')
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Real-time weather monitoring and forecasting with personalized alerts for optimal farming decisions.",
      gradient: "from-purple-500 to-indigo-600",
      action: () => onNavigate?.('weather-report')
    }
  ];

  const stats = [
    { icon: BarChart3, value: "95%", label: "Accuracy Rate" },
    { icon: Shield, value: "500+", label: "Happy Farmers" },
    { icon: Zap, value: "30%", label: "Yield Increase" }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-fieldly-green-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-fieldly-green-800 mb-6">
            Powerful Tools for Modern Farming
          </h2>
          <p className="text-xl text-fieldly-green-600 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to transform your agricultural practices and achieve unprecedented results.
          </p>
        </div>

        {/* Feature card]s */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <card 
              key={feature.title}
              className="group hover:shadow-2xl transition-all flex flex-col justify-center items-center duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden animate-fade-in p-5 rounded-2xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <cardHeader className="text-center pb-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <cardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </cardTitle><br></br>
              </cardHeader>
              <cardContent className="text-center">
                <cardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                  {feature.description}
                </cardDescription>
                <button 
                  className="w-full bg-green-600 mt-5 hover:bg-green-500 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Explore Feature
                </button>
              </cardContent>
            </card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">
            What Our Clients Say
          </h3>
          <div className="flex justify-center gap-8 flex-col items-center">
           <p className='text-gray-900 font-medium text-lg'>“The platform is intuitive and easy to navigate — excited to see how it evolves!” — Rishabh Sharma(Early Beta User)</p>
           <p className='text-gray-900 font-medium text-lg'>“Even in beta, the recommendations are clear and actionable. Looking forward to future updates!” — Disha Jalan(Early Beta User)</p>
           
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection