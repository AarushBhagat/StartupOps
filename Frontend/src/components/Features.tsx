import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Brain, Radio, MessageSquare, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="flex-shrink-0 w-80 md:w-96 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-colors"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-colors" />
    
    <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/5 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8 text-cyan-300" />
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

export const Features = () => {
  const scrollRef = useRef(null);
  
  // Create a horizontal scroll illusion
  // In a real comprehensive app, we might use a sticky horizontal scroll container
  // For this demo, we'll use a horizontal overflow container with nice styling

  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#02040a] to-[#02040a] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            How BrainVoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Thinks</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Unlike traditional TTS engines, our model processes intent before articulation.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x hide-scrollbar">
          <FeatureCard 
            icon={Brain}
            title="Contextual Awareness"
            description="Understands the nuance of the conversation to adjust tone, speed, and pitch dynamically in real-time."
            delay={0.1}
          />
          <FeatureCard 
            icon={Radio}
            title="Emotional Resonance"
            description="Can whisper, shout, laugh, or pause for effect. It feels human because it understands human emotion."
            delay={0.2}
          />
          <FeatureCard 
            icon={Zap}
            title="Zero Latency"
            description="Streaming generation means the voice starts playing the moment the first token is predicted."
            delay={0.3}
          />
          <FeatureCard 
            icon={MessageSquare}
            title="Adaptive Learning"
            description="The voice gets better the more you use it, learning specific vocabulary and cadence preferences."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};
