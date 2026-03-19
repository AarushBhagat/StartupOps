import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Enterprise Service",
    description: "Scalable AI infrastructure designed for high-volume enterprise environments, ensuring security, compliance, and reliability at scale."
  },
  {
    id: "02",
    title: "Expertise Service",
    description: "Access to top-tier AI researchers and engineers who work directly with your team to solve the most difficult technical challenges."
  },
  {
    id: "03",
    title: "Process Optimization",
    description: "Intelligent workflow automation that identifies bottlenecks and autonomously optimizes business processes for maximum efficiency."
  },
  {
    id: "04",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications integrated with on-device AI capabilities for real-time inference and user interaction."
  }
];

export const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="py-32 bg-[#010f10] relative">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <span className="text-gray-400 uppercase tracking-widest text-sm font-medium mb-4 block">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-light text-white uppercase max-w-4xl mx-auto leading-tight" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
            Your Aspiration, Our Expertise: <br/> Tailored Services for Unmatched Excellence.
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              className="group border-t border-white/10 py-12 cursor-pointer transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between gap-8">
                <div className="flex items-baseline gap-12 md:w-1/2">
                  <span className="text-xl md:text-2xl text-white/40 font-mono">{service.id}</span>
                  <h3 className="text-3xl md:text-5xl text-white font-light uppercase tracking-tight group-hover:text-cyan-200 transition-colors" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-8 md:w-1/2 justify-between">
                   <p className="text-gray-400 max-w-md hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     {service.description}
                   </p>
                   
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                     <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};
