import React from 'react';
import { motion } from 'motion/react';
import imgUntitledDesign51 from "figma:asset/a27404bf1a3aa3a31ff2647c53bfe3dea010819f.png";
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Portfolio = () => {
  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-gray-400 uppercase tracking-widest text-sm font-medium mb-4 block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-light text-white max-w-4xl mx-auto leading-tight" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
            From Challenge to Victory: <br/> Exploring Case Studies of Innovation and Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
             <div>
               <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Category</p>
               <h3 className="text-4xl text-white font-medium mb-6">Dave Financial CRM</h3>
               <p className="text-gray-400 text-lg leading-relaxed mb-8">
                 Revolutionizing financial customer relationship management with predictive AI that anticipates client needs before they ask. Resulted in a 40% increase in customer retention.
               </p>
             </div>

             {/* Tech Stack Grid */}
             <div className="grid grid-cols-3 gap-8 opacity-70">
                {/* Placeholders for tech icons */}
                <div className="flex items-center gap-2 text-white/60">
                    <div className="w-8 h-8 rounded bg-white/10" /> AWS
                </div>
                <div className="flex items-center gap-2 text-white/60">
                    <div className="w-8 h-8 rounded bg-white/10" /> Python
                </div>
                <div className="flex items-center gap-2 text-white/60">
                    <div className="w-8 h-8 rounded bg-white/10" /> Docker
                </div>
                <div className="flex items-center gap-2 text-white/60">
                    <div className="w-8 h-8 rounded bg-white/10" /> TensorFlow
                </div>
                <div className="flex items-center gap-2 text-white/60">
                    <div className="w-8 h-8 rounded bg-white/10" /> K8s
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
          >
            <div className="aspect-video relative">
               <ImageWithFallback src={imgUntitledDesign51} alt="Portfolio Case Study" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
