import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';

interface FloatingShapesProps {
  mouseX?: ReturnType<typeof useMotionValue>;
  mouseY?: ReturnType<typeof useMotionValue>;
  count?: number;
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ 
  mouseX: externalMouseX, 
  mouseY: externalMouseY,
  count = 5
}) => {
  const internalMouseX = useMotionValue(0);
  const internalMouseY = useMotionValue(0);
  
  const mouseX = externalMouseX || internalMouseX;
  const mouseY = externalMouseY || internalMouseY;
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const shapes = [
    {
      className: "top-[15%] left-[10%] w-32 h-32 rounded-2xl",
      gradient: "from-cyan-500/10 to-purple-600/10",
      border: "border-cyan-500/20",
      parallaxX: [-40, 40],
      parallaxY: [-40, 40],
      animate: { y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.1, 1] },
      duration: 6
    },
    {
      className: "bottom-[20%] right-[15%] w-24 h-24 rounded-full",
      gradient: "from-purple-500/10 to-pink-600/10",
      border: "border-purple-500/20",
      parallaxX: [30, -30],
      parallaxY: [30, -30],
      animate: { y: [0, 40, 0], rotate: [0, -8, 0], scale: [1, 1.15, 1] },
      duration: 8,
      delay: 1
    },
    {
      className: "top-[40%] right-[8%] w-20 h-20 rounded-xl",
      gradient: "from-blue-500/10 to-cyan-600/10",
      border: "border-blue-500/20",
      parallaxX: [20, -20],
      parallaxY: [20, -20],
      animate: { y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 12, 0] },
      duration: 7,
      delay: 2
    },
    {
      className: "top-[60%] left-[15%] w-28 h-28 rounded-2xl",
      gradient: "from-emerald-500/10 to-teal-600/10",
      border: "border-emerald-500/20",
      parallaxX: [-25, 25],
      parallaxY: [-25, 25],
      animate: { y: [0, 35, 0], rotate: [0, -12, 0], scale: [1, 1.12, 1] },
      duration: 9,
      delay: 0.5
    },
    {
      className: "bottom-[40%] left-[5%] w-16 h-16 rounded-full",
      gradient: "from-orange-500/10 to-red-600/10",
      border: "border-orange-500/20",
      parallaxX: [15, -15],
      parallaxY: [15, -15],
      animate: { y: [0, -20, 0], x: [0, -10, 0], rotate: [0, 15, 0] },
      duration: 8.5,
      delay: 1.5
    }
  ];

  return (
    <>
      {shapes.slice(0, count).map((shape, index) => (
        <motion.div
          key={index}
          style={{
            x: useTransform(smoothMouseX, [-0.5, 0.5], shape.parallaxX),
            y: useTransform(smoothMouseY, [-0.5, 0.5], shape.parallaxY)
          }}
          animate={shape.animate}
          transition={{ 
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay
          }}
          className={`absolute ${shape.className} bg-gradient-to-br ${shape.gradient} border ${shape.border} backdrop-blur-sm z-0`}
        />
      ))}
    </>
  );
};
