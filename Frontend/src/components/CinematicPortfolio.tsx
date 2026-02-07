import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import imgUntitledDesign51 from "figma:asset/a27404bf1a3aa3a31ff2647c53bfe3dea010819f.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

const Project = ({ title, category, year, image, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative w-full h-[80vh] mb-32 last:mb-0 flex items-center justify-center"
    >
      {/* Background Image with Parallax Scale */}
      <div className="absolute inset-0 mx-4 md:mx-20 rounded-[3rem] overflow-hidden">
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
         <img 
           src={image} 
           alt={title} 
           className="w-full h-full object-cover transform scale-125 group-hover:scale-100 transition-transform duration-[1.5s] ease-in-out"
         />
      </div>

      {/* Floating Content */}
      <div className="relative z-20 text-center mix-blend-difference px-4">
         <motion.div 
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="mb-4 inline-block px-6 py-2 rounded-full border border-white/50 text-white backdrop-blur-md"
         >
           {category} • {year}
         </motion.div>
         <h2 className="text-[10vw] font-bold text-white leading-[0.85] tracking-tighter uppercase">
           {title}
         </h2>
         <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-110 transition-transform">
               View Case Study
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export const CinematicPortfolio = () => {
  return (
    <section className="bg-[#02040a] py-32">
      <div className="container mx-auto px-6 mb-20">
         <h2 className="text-xl md:text-2xl text-gray-400 font-light border-b border-gray-800 pb-8">
            Selected Works (2023-2024)
         </h2>
      </div>
      
      <div className="w-full">
         <Project 
            title="NeoBank" 
            category="FinTech AI"
            year="2024"
            image={imgUntitledDesign51}
            index={0}
         />
         <Project 
            title="Nexus" 
            category="Cybernetics"
            year="2023"
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            index={1}
         />
         <Project 
            title="AeroOne" 
            category="Autonomous Systems"
            year="2024"
            image="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop"
            index={2}
         />
      </div>
    </section>
  );
};
