import React from 'react';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

interface RevealFooterProps {
  onGetStarted?: () => void;
}

export const RevealFooter = ({ onGetStarted }: RevealFooterProps) => {
  return (
    <div 
      className="relative h-[80vh]" 
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[80vh] w-full bg-[#050a14] flex flex-col justify-between p-12 md:p-24">
         {/* Top Content */}
         <div className="flex flex-col md:flex-row justify-between gap-12">
            <div>
               <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter">
                  LET'S <br/>
                  BUILD <span className="text-cyan-500">STARTUP.</span>
               </h2>
               <button 
                  onClick={onGetStarted}
                  className="group flex items-center gap-4 text-xl md:text-2xl text-white border-2 border-white px-8 py-4 rounded-full hover:bg-white hover:text-[#050a14] transition-all duration-300 hover:scale-105"
               >
                  <span className="font-bold">Let's Go</span>
                  <Rocket className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform duration-300" />
               </button>
            </div>
            
            <div className="flex flex-col gap-6 text-gray-400 text-lg">
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
               <a href="#" className="hover:text-white transition-colors">GitHub</a>
               <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
         </div>

         {/* Bottom Content */}
         <div className="flex justify-between items-end text-sm text-gray-600 uppercase tracking-widest">
            <div>
               <p>© 2026 StartupOps</p>
               <p>San Francisco, CA</p>
            </div>
            <div className="hidden md:block">
               <p>Scroll to top</p>
            </div>
         </div>
         
         {/* Background Giant Text */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
            <h1 className="text-[20vw] font-bold text-white leading-none text-center translate-y-[20%]">
               STARTUPOPS
            </h1>
         </div>
      </div>
    </div>
  );
};
