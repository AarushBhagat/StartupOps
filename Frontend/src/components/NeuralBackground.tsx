import React, { useEffect, useRef } from "react";

const NeuralBackground = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Node configuration
    const particles: { x: number, y: number, vx: number, vy: number }[] = [];
    const connectionDistance = 150;
    
    // Calculate node density based on screen size to prevent clutter on mobile
    const particleCount = Math.floor((width * height) / 12000); 
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      });
    }
    
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw connections first so they sit behind the dots
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        // Bounce off walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        
        // Check distances and draw lines
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Opacity gets stronger as nodes get closer
            const opacity = 1 - dist / connectionDistance;
            
            // Colors for the connecting lines (Indigo)
            // You can replace these RGB values with your own project's theme colors
            const isDark = document.documentElement.classList.contains('dark') || true; // Assuming dark theme by default based on project
            const color = isDark ? '99, 102, 241' : '79, 70, 229'; 
            
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.3})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      // Draw dots on top
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        
        // Colors for the dots (Emerald)
        const isDark = document.documentElement.classList.contains('dark') || true;
        const color = isDark ? '52, 211, 153' : '16, 185, 129'; 
        
        ctx.fillStyle = `rgba(${color}, 0.6)`; 
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Handle Window Resizing smoothly
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white font-sans transition-colors duration-500">
      
      {/* Background Gradient Orbs (Blurred CSS shapes) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[30%] left-[50%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Canvas Layer for Neural Network Animation */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none opacity-100" 
      />
      
      {/* Content Layer (Your actual app sits inside here) */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default NeuralBackground;
