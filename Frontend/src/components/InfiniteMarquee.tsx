import React from 'react';
import { motion } from 'motion/react';

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ 
  items, 
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) => {
  // Duplicate items 3 times for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={`w-full relative flex overflow-x-hidden ${pauseOnHover ? 'group' : ''} ${className}`}>
      {/* Gradient fade masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#02040a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#02040a] to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-8 md:gap-16 px-8"
        animate={{
          x: direction === 'left' ? [0, '-50%'] : ['-50%', 0]
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        style={{
          animationPlayState: pauseOnHover ? 'running' : undefined
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className="text-xl md:text-2xl font-bold text-white/30 hover:text-white transition-colors cursor-default select-none"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
