import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import imgBrookeCagleG1Kr4OzfoacUnsplash1 from "figma:asset/f687ccdf2e16530c580690b03b0e58b4012ea25f.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export const AboutUs = () => {
  return (
    <section className="py-32 bg-[#03212d] relative overflow-hidden">
       {/* Background Gradients */}
       <div className="absolute inset-0 bg-gradient-to-b from-[#03212d] to-[#011011]" />
       
       <div className="container mx-auto px-6 relative z-10">
         <div className="flex flex-col items-center mb-24">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#9c9c9c] text-xl font-semibold mb-4"
            >
              Who We Are
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl text-white text-center font-light tracking-tight"
              style={{ fontFamily: '"Inter Tight", sans-serif' }}
            >
              We are "AI Architects"
            </motion.h2>
         </div>

         <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent mix-blend-overlay z-10" />
                <ImageWithFallback 
                  src={imgBrookeCagleG1Kr4OzfoacUnsplash1} 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Decorative gradient overlay */}
              <div className="absolute -bottom-10 -left-10 w-full h-full border border-white/10 rounded-lg -z-10" />
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 flex flex-col gap-12"
            >
              <div>
                <h3 className="text-3xl font-semibold italic text-white mb-8" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
                  We build what others can't.
                </h3>
                <div className="space-y-8 text-lg text-gray-300 font-light" style={{ fontFamily: '"Manrope", sans-serif' }}>
                  <p>
                    Our team of machine learning experts, data scientists, and industry specialists creates custom AI models that solve real business problems—not generic ones.
                  </p>
                  <p>
                    From computer vision and natural language processing to predictive analytics and process automation, we engineer AI solutions that integrate perfectly with your existing systems and deliver measurable impact.
                  </p>
                </div>
              </div>

              <button className="w-fit flex items-center gap-3 px-8 py-4 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-colors group">
                Know more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
         </div>
       </div>
    </section>
  );
};
