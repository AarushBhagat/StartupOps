import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layers, Zap, Shield, Smartphone } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, index, color }) => {
  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center">
      <motion.div 
        className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        style={{ 
          backgroundColor: '#030712',
          backgroundImage: `
            radial-gradient(circle at top right, ${color}20 0%, transparent 40%),
            linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)
          `
        }}
      >
        <div className="absolute inset-0 flex flex-col md:flex-row p-8 md:p-16 gap-12 items-center">
           <div className="flex-1 space-y-8 z-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-${color}-400`}>
                 <Icon className="w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{index}.</span> {title}
              </h2>
              <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                 {description}
              </p>
              <button className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
                 Learn more
              </button>
           </div>
           
           <div className="flex-1 w-full h-full relative min-h-[300px] rounded-2xl overflow-hidden bg-black/50 border border-white/5">
              {/* Abstract Graphic unique to each card */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className={`w-64 h-64 rounded-full bg-${color}-500/20 blur-[80px] animate-pulse`} />
                 <Icon className={`w-32 h-32 text-${color}-500/50`} />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ServicesStack = () => {
  return (
    <section className="bg-[#02040a] py-20 relative">
       <div className="container mx-auto px-6 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white text-center"
          >
             Our Expertise
          </motion.h2>
       </div>
       
       <div className="relative">
          <ServiceCard 
             index="01"
             title="Enterprise AI"
             description="Scalable infrastructure designed for high-volume environments, ensuring security and compliance."
             icon={Layers}
             color="cyan"
          />
          <ServiceCard 
             index="02"
             title="Neural Strategy"
             description="Top-tier research and engineering to solve your most difficult technical challenges."
             icon={Zap}
             color="purple"
          />
          <ServiceCard 
             index="03"
             title="Data Security"
             description="Fortified AI models that protect sensitive corporate data while maximizing utility."
             icon={Shield}
             color="green"
          />
          <ServiceCard 
             index="04"
             title="Edge Computing"
             description="Deploy AI directly on devices for zero-latency inference and real-time interaction."
             icon={Smartphone}
             color="blue"
          />
       </div>
    </section>
  );
};
