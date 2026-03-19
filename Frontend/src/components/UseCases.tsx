import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const CaseSection = ({ title, description, image, reversed = false }) => {
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 mb-32 last:mb-0`}>
      <motion.div 
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full"
      >
        <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          {title}
        </h3>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <li key={i} className="flex items-center gap-3 text-white/80">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400">
                <Check className="w-3 h-3" />
              </span>
              <span>Enhanced engagement metrics</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export const UseCases = () => {
  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <CaseSection 
          title="Interactive Education"
          description="Transform static textbooks into living conversations. Students can ask questions, get explanations, and learn through dialogue."
          image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
        />
        
        <CaseSection 
          title="Dynamic Gaming NPCs"
          description="Give video game characters a real voice and brain. No more pre-recorded lines—infinite possibilities for dialogue and interaction."
          image="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
          reversed={true}
        />
        
        <CaseSection 
          title="Accessibility Assistants"
          description="A voice that doesn't just read screen text, but describes the world with empathy and understanding for the visually impaired."
          image="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
        />
      </div>
    </section>
  );
};
