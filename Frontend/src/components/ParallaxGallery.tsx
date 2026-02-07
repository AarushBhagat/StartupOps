import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import imgUntitledDesign51 from "figma:asset/a27404bf1a3aa3a31ff2647c53bfe3dea010819f.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

const Project = ({ title, category, image, yOffset }) => {
  return (
    <motion.div 
       style={{ y: yOffset }}
       className="relative group aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
    >
       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
       <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
       />
       
       <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-cyan-400 text-sm tracking-widest uppercase mb-2">{category}</span>
          <div className="flex justify-between items-end">
             <h3 className="text-2xl font-bold text-white">{title}</h3>
             <div className="p-2 bg-white rounded-full text-black">
                <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>
       </div>
    </motion.div>
  );
};

export const ParallaxGallery = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="py-32 bg-[#02040a] relative overflow-hidden">
      <div className="container mx-auto px-6">
         <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-none">
               SELECTED <br/> WORKS
            </h2>
            <p className="text-gray-400 max-w-sm text-right">
               A showcase of our most ambitious projects, pushing the boundaries of what's possible with AI.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-8 mt-0 md:mt-24">
               <Project 
                  title="FinTech Core" 
                  category="Predictive Analytics"
                  image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  yOffset={y1}
               />
               <Project 
                  title="AutoDrive OS" 
                  category="Computer Vision"
                  image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop"
                  yOffset={y1}
               />
            </div>

            <div className="space-y-8">
               <Project 
                  title="MediScan AI" 
                  category="Healthcare"
                  image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
                  yOffset={y2}
               />
               <Project 
                  title="Dave Financial" 
                  category="CRM Integration"
                  image={imgUntitledDesign51}
                  yOffset={y2}
               />
            </div>

            <div className="space-y-8 mt-0 md:mt-48">
               <Project 
                  title="AgriTech Sense" 
                  category="IoT & Intelligence"
                  image="https://images.unsplash.com/photo-1625246333195-58f214f76328?q=80&w=1974&auto=format&fit=crop"
                  yOffset={y3}
               />
               <Project 
                  title="CyberGuard" 
                  category="Security"
                  image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                  yOffset={y3}
               />
            </div>
         </div>
      </div>
    </section>
  );
};
