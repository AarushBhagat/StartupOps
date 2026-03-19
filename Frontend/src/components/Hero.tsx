import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowRight, Rocket, Target, TrendingUp } from 'lucide-react';

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Parallax for background elements
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x * 20); // Tilt range
    mouseY.set(y * 20);
  }

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-[110vh] w-full overflow-hidden flex flex-col items-center justify-center perspective-1000"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[#02040a]">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/30 rounded-full blur-[120px] animate-pulse delay-1000" />
         <motion.div 
            style={{ y: orbY }}
            className="absolute top-[20%] right-[20%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" 
         />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Main Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center"
      >
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="relative group cursor-pointer"
        >
          {/* Glowing Ring behind text */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          
          <h1 className="text-[11vw] leading-[0.85] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 select-none mix-blend-overlay">
            STARTUP
          </h1>
          <h1 className="text-[11vw] leading-[0.85] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-200 via-gray-400 to-gray-800 select-none relative z-10 mt-[-2vw]">
            OPS
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-xl md:text-2xl text-gray-400 max-w-2xl font-light tracking-wide"
        >
          Your AI-powered co-pilot from idea to funding.
        </motion.p>

        {onGetStarted && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={onGetStarted}
            className="mt-8 text-white text-lg underline decoration-1 underline-offset-4 hover:font-bold hover:decoration-2 transition-all duration-200"
          >
            Start Building
          </motion.button>
        )}
      </motion.div>

      {/* Floating 3D Cards */}
      <motion.div 
        style={{ 
          rotateX: mouseY,
          rotateY: mouseX,
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
      >
         {/* Card 1 - Left */}
         <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute left-[10%] top-[30%] w-64 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
            style={{ transform: "translateZ(50px)" }}
         >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-cyan-500/20 rounded-lg"><Target className="w-5 h-5 text-cyan-400" /></div>
               <span className="text-white font-mono text-sm">Milestones...</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-cyan-400" />
            </div>
         </motion.div>

         {/* Card 2 - Right */}
         <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute right-[10%] bottom-[30%] w-64 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
            style={{ transform: "translateZ(80px)" }}
         >
            <div className="flex justify-between items-center mb-2">
               <span className="text-gray-400 text-xs">Pitch Score</span>
               <span className="text-green-400 text-xs font-mono">85/100</span>
            </div>
            <div className="flex gap-1 items-end h-8">
               {[1,2,3,4,5,6,7,8].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="flex-1 bg-green-500/50 rounded-sm"
                  />
               ))}
            </div>
         </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
         animate={{ y: [0, 10, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
         <span className="text-xs uppercase tracking-widest text-white">Scroll to Explore</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};