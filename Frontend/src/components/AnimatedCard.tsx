import React from 'react';
import { motion } from 'motion/react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  tap?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  hover = true,
  tap = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        transition: { type: "spring", stiffness: 300 }
      } : undefined}
      whileTap={tap ? { scale: 0.98 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};
