import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const logos = [
  "Y Combinator", "Techstars", "500 Global", "Sequoia", "a16z", "Stripe", "Notion", "Figma", "OpenAI", "Linear"
];

export const TrustedBy = () => {
  return (
    <section className="relative z-20 bg-[#02040a] py-24">
      <div className="container mx-auto px-6">
        {/* Isolated Box Container */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden relative">
          
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-xl" />

          <div className="py-12 flex flex-col items-center gap-10">
            <p className="text-sm font-medium text-gray-400 tracking-[0.2em] uppercase">
              Trusted by Fast-Growing Startups
            </p>

            {/* Infinite Scroll Marquee */}
            <div className="w-full relative flex overflow-x-hidden group mask-linear-fade">
              <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 px-16">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-bold text-white/30 hover:text-white transition-colors cursor-default select-none">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
      `}</style>
    </section>
  );
};