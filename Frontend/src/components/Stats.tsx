import React from 'react';
import { motion } from 'motion/react';

const Stat = ({ value, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center justify-center py-12 px-8 border-r border-white/10 last:border-r-0 min-w-[250px]"
  >
    <div className="text-5xl md:text-6xl font-light text-white mb-4" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
      {value}
    </div>
    <div className="text-gray-400 text-lg uppercase tracking-wide">
      {label}
    </div>
  </motion.div>
);

export const Stats = () => {
  return (
    <section className="bg-[#021c25] border-y border-white/5 relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-stretch divide-y md:divide-y-0 divide-white/10">
          <Stat value="10+" label="Custom AI Models" delay={0.1} />
          <Stat value="5+" label="Industries Served" delay={0.2} />
          <Stat value="85%" label="ROI Increase" delay={0.3} />
          <Stat value="48 hrs" label="Proof of Concept" delay={0.4} />
        </div>
      </div>
    </section>
  );
};
