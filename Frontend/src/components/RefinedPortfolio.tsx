import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const CaseStudy = ({ title, category, description, image, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32 last:mb-0"
    >
      {/* Image Side */}
      <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
         <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
         <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
      </div>

      {/* Content Side */}
      <div className={`${index % 2 === 1 ? 'md:order-1 md:text-right' : 'md:text-left'}`}>
         <div className="mb-6 flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-widest uppercase">
            <span className={`w-8 h-[1px] bg-cyan-400 ${index % 2 === 1 ? 'order-2' : ''}`} />
            {category}
         </div>
         <h3 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-none">
            {title}
         </h3>
         <p className={`text-xl text-gray-400 mb-10 leading-relaxed max-w-md ${index % 2 === 1 ? 'md:ml-auto md:mr-0' : 'ml-0 mr-auto'}`}>
            {description}
         </p>
         <button className="px-8 py-4 border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-colors">
            Read Success Story
         </button>
      </div>
    </motion.div>
  );
};

export const RefinedPortfolio = () => {
  return (
    <section className="bg-[#02040a] py-32 relative z-20">
      <div className="container mx-auto px-6">
         <div className="mb-32 text-center">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Success Stories</h2>
            <h3 className="text-4xl md:text-6xl text-white font-medium">Startups We've Powered</h3>
         </div>

         <div className="flex flex-col">
            <CaseStudy 
               title="HealthTech AI" 
               category="Series A - $2M Raised"
               description="From idea to funded in 6 months. AI-generated roadmap helped secure their first 10 enterprise clients and close their seed round."
               image="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwc3RhcnR1cCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzA0ODg5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
               index={0}
            />
            <CaseStudy 
               title="FinFlow SaaS" 
               category="Pre-Seed - $500K"
               description="Unified execution tracking helped them launch MVP 3 weeks ahead of schedule. Pitch deck generator scored 92/100 with investors."
               image="https://images.unsplash.com/photo-1702047135360-e549c2e1f7df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzAzOTg4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
               index={1}
            />
            <CaseStudy 
               title="EdTech Pro" 
               category="Bootstrap to Profitable"
               description="AI insights helped optimize their customer acquisition funnel. Went from 0 to 1,000 paying users in 4 months without external funding."
               image="https://images.unsplash.com/photo-1758876203342-fc14c0bba67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBvZmZpY2V8ZW58MXx8fHwxNzcwNDY2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
               index={2}
            />
         </div>
      </div>
    </section>
  );
};