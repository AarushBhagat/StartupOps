import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, image }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-8 rounded-2xl"
  >
    <Quote className="w-8 h-8 text-cyan-500 mb-6 opacity-50" />
    <p className="text-lg text-gray-300 mb-8 italic leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
      <div>
        <h4 className="text-white font-medium">{author}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </motion.div>
);

export const Testimonials = () => {
  return (
    <section className="py-24 bg-[#02040a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <span className="text-cyan-500 uppercase tracking-widest text-xs font-bold mb-3 block">Testimonials</span>
           <h2 className="text-3xl md:text-4xl text-white font-light uppercase" style={{ fontFamily: '"Inter Tight", sans-serif' }}>
             Stories of Trust: Client Stories
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           <TestimonialCard 
             quote="Brainvoice AI revolutionized our manufacturing process. We can now predict maintenance needs 48 hours in advance."
             author="Sarah Jenkins"
             role="CTO, TechFlow Industries"
             image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
           />
           <TestimonialCard 
             quote="The custom LLM they built for our customer support team reduced ticket resolution time by 60% in the first month."
             author="Michael Chen"
             role="VP of Operations, FinServe"
             image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
           />
        </div>
      </div>
    </section>
  );
};
