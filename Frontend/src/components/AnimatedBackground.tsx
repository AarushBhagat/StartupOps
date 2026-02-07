import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface AnimatedBackgroundProps {
  mouseX?: ReturnType<typeof useMotionValue>;
  mouseY?: ReturnType<typeof useMotionValue>;
  variant?: 'default' | 'dashboard' | 'minimal';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  mouseX: externalMouseX, 
  mouseY: externalMouseY,
  variant = 'default'
}) => {
  const internalMouseX = useMotionValue(0);
  const internalMouseY = useMotionValue(0);
  
  const mouseX = externalMouseX || internalMouseX;
  const mouseY = externalMouseY || internalMouseY;
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const intensity = variant === 'minimal' ? 10 : 20;

  return (
    <>
      {/* Animated Background with Parallax */}
      <motion.div 
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-intensity, intensity]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-intensity, intensity])
        }}
        className="absolute inset-0 z-0"
      >
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.5, 1],
             x: [0, 30, 0],
             y: [0, -30, 0]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-[20%] right-[20%] w-64 h-64 bg-blue-900/10 rounded-full blur-[80px]" 
         />
      </motion.div>

      {/* Grid Overlay with Parallax */}
      <motion.div 
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [intensity/2, -intensity/2]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [intensity/2, -intensity/2])
        }}
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
      />
    </>
  );
};
