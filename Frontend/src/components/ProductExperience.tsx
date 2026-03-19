import React from 'react';
import { motion } from 'motion/react';

export const ProductExperience = () => {
  return (
    <section className="py-32 bg-[#02040a] relative">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-1 border border-white/10">
          <div className="bg-[#050a14] rounded-[22px] overflow-hidden relative min-h-[600px] flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616578981448-9e9d74efe3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwYWklMjBpbnRlcmZhY2UlMjBodWQlMjBkYXJrfGVufDF8fHx8MTc2OTg4MjcyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-20 mix-blend-screen" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent" />

            {/* Central Visualization */}
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative mb-12"
              >
                {/* Abstract Glowing Orb/Waveform */}
                <div className="w-64 h-64 mx-auto relative flex items-center justify-center">
                   <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
                   <div className="absolute inset-4 bg-purple-500/20 blur-2xl rounded-full animate-pulse delay-700" />
                   
                   {/* Animated Wave Bars */}
                   <div className="flex items-center gap-1 h-32">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: ["20%", "80%", "40%", "100%", "30%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: i * 0.1
                          }}
                          className="w-2 md:w-3 rounded-full bg-gradient-to-t from-cyan-400 to-purple-500"
                        />
                      ))}
                   </div>
                </div>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                "Generate a bedtime story about a space whale."
              </motion.h3>
              
              <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Processing Voice Intent...
              </motion.div>
            </div>
            
            {/* Overlay UI Elements */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-50">
                <div className="font-mono text-xs text-white/60">
                    FREQ: 44.1kHz<br/>
                    LATENCY: 12ms<br/>
                    MODE: NARRATIVE
                </div>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-full bg-cyan-500"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
