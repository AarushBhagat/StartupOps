import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ImpossibleFuture = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  // Parallax for images
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [400, -400]);

  return (
    <section ref={targetRef} className="relative py-48 bg-[#02040a] overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div style={{ scale, opacity }} className="relative z-20">
            <h2 className="text-6xl md:text-9xl font-bold text-white leading-[0.85] tracking-tighter mb-8 mix-blend-overlay">
              STOP JUGGLING <br/>
              START BUILDING
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Founders waste 12 hours per week managing disconnected tools. We unified everything you need from idea to funding.
            </p>
        </motion.div>

        {/* Floating Abstract Visuals - Purely Decorational Parallax */}
        <motion.div style={{ y: y1, x: -300 }} className="absolute top-0 left-10 w-64 h-80 rounded-2xl overflow-hidden opacity-40 md:block hidden">
           <img src="https://images.unsplash.com/photo-1758876203342-fc14c0bba67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBvZmZpY2V8ZW58MXx8fHwxNzcwNDY2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080" className="w-full h-full object-cover grayscale" />
        </motion.div>

        <motion.div style={{ y: y2, x: 300 }} className="absolute bottom-0 right-10 w-56 h-72 rounded-2xl overflow-hidden opacity-40 md:block hidden">
           <img src="https://images.unsplash.com/photo-1710361197301-d3cd03b34561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBwbGFubmluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc3MDQ4ODkxMXww&ixlib=rb-4.1.0&q=80&w=1080" className="w-full h-full object-cover grayscale" />
        </motion.div>

      </div>
      
      {/* Scroll Hint Line */}
      <motion.div 
        style={{ scaleY: scrollYProgress }} 
        className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent origin-top" 
      />

    </section>
  );
};