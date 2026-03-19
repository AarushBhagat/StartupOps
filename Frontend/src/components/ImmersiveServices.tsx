import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Target, TrendingUp, Users, Lightbulb } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "AI Task Generation",
    description: "Smart task breakdown and milestone planning. Our AI analyzes your goals and generates actionable roadmaps tailored to your startup stage.",
    icon: Lightbulb,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "02",
    title: "Execution Tracking",
    description: "Real-time progress monitoring with intelligent insights. Stay on track with AI-powered alerts and team performance analytics.",
    icon: Target,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "03",
    title: "Investor Readiness",
    description: "Automated pitch deck generation and traction tracking. Calculate your pitch score and know exactly what investors want to see.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "04",
    title: "Team Collaboration",
    description: "Unified workspace for founders and teams. Assign tasks, collect feedback, and maintain alignment from idea to funding.",
    icon: Users,
    color: "from-orange-500 to-red-600"
  }
];

export const ImmersiveServices = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="relative min-h-screen bg-[#02040a] text-white py-32 overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left: List */}
          <div className="w-full lg:w-1/2 space-y-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveService(index)}
                className="group cursor-pointer relative pl-8 transition-all duration-300"
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${service.color} transition-all duration-300 ${activeService === index ? 'opacity-100 h-full' : 'opacity-20 h-0 group-hover:h-1/2'}`} />
                
                <h3 className={`text-4xl md:text-6xl font-bold mb-2 transition-all duration-300 ${activeService === index ? 'text-white translate-x-4' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {service.title}
                </h3>
                
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: activeService === index ? 'auto' : 0,
                    opacity: activeService === index ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-xl text-gray-400 font-light pt-4 max-w-lg">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/60">
                     Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right: Visual */}
          <div className="w-full lg:w-1/2 relative h-[600px] perspective-1000">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                   {/* Abstract Glowing Background */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${services[activeService].color} opacity-20`} />
                   
                   {/* Animated Elements */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`relative w-64 h-64 rounded-full bg-gradient-to-tr ${services[activeService].color} blur-[100px] animate-pulse`} />
                      
                      {/* Central Icon */}
                      <div className="relative z-10 p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                         {React.createElement(services[activeService].icon, { className: "w-24 h-24 text-white" })}
                      </div>

                      {/* Orbiting Particles */}
                      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                         <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                         <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/50 rounded-full" />
                      </div>
                   </div>

                   {/* Code Overlay */}
                   <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/40 backdrop-blur-sm font-mono text-xs text-green-400 opacity-60">
                      <div>&gt; INITIATING SEQUENCE...</div>
                      <div>&gt; LOADING MODULE: {services[activeService].title.toUpperCase()}</div>
                      <div>&gt; STATUS: OPTIMAL</div>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};