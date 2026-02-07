import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-20 bg-[#02040a]">
       <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
             
             {/* Background noise */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
             
             <div className="relative z-10 flex items-start gap-4 max-w-lg">
                <div className="p-3 bg-white/10 rounded-lg hidden sm:block">
                   <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                   <h3 className="text-2xl text-white font-bold mb-2">Subscribe to our crypto news weekly newsletter!</h3>
                   <p className="text-gray-400">Get the latest updates on AI trends and company news directly to your inbox.</p>
                </div>
             </div>

             <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-6 py-3 rounded-full bg-white text-black placeholder:text-gray-500 focus:outline-none min-w-[300px]"
                />
                <button className="px-6 py-3 rounded-full bg-[#4ADE80] text-[#022c22] font-bold hover:bg-[#22c55e] transition-colors flex items-center justify-center gap-2">
                   Subscribe <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>
       </div>
    </section>
  );
};
