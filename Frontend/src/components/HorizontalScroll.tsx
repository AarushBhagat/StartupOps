import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import imgBrookeCagleG1Kr4OzfoacUnsplash1 from "figma:asset/f687ccdf2e16530c580690b03b0e58b4012ea25f.png";

export const HorizontalScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#02040a]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-20">
           {/* Intro Panel */}
           <div className="relative h-[70vh] w-[80vw] md:w-[60vw] flex flex-col justify-center shrink-0">
              <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 leading-[0.9]">
                 WE BUILD <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    THE IMPOSSIBLE
                 </span>
              </h2>
              <p className="text-2xl text-gray-400 max-w-xl">
                 Scroll to explore our journey through the frontiers of artificial intelligence.
              </p>
           </div>

           {/* Image Panel 1 */}
           <div className="relative h-[70vh] w-[80vw] md:w-[50vw] shrink-0 rounded-3xl overflow-hidden group">
              <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                 alt="Team" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                 <h3 className="text-3xl text-white font-bold">Collaborative Intelligence</h3>
              </div>
           </div>

           {/* Text Panel */}
           <div className="relative h-[70vh] w-[60vw] md:w-[40vw] shrink-0 flex flex-col justify-center bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-3xl font-light text-white leading-relaxed">
                 "We don't just train models. We architect digital minds that align perfectly with your business intuition."
              </p>
           </div>

           {/* Image Panel 2 */}
           <div className="relative h-[70vh] w-[80vw] md:w-[50vw] shrink-0 rounded-3xl overflow-hidden group">
              <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                 alt="Tech" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                 <h3 className="text-3xl text-white font-bold">Future Proof</h3>
              </div>
           </div>

           {/* Final CTA Panel */}
           <div className="relative h-[70vh] w-[80vw] md:w-[60vw] shrink-0 flex flex-col items-center justify-center text-center bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-3xl border border-white/10">
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-12">
                 READY?
              </h2>
              <button className="px-12 py-6 rounded-full bg-white text-black text-xl font-bold hover:scale-105 transition-transform">
                 Start Your Project
              </button>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
