import React from 'react';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#010205] border-t border-white/5 pt-20 pb-10 text-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white text-lg">B</div>
              <span className="text-xl font-bold text-white tracking-tight">BrainVoice.AI</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              Empowering enterprises with custom AI solutions that drive innovation and efficiency.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Twitter className="w-4 h-4" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Linkedin className="w-4 h-4" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Enterprise GenAI</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Computer Vision</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Predictive Analytics</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Process Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-500">
              <li>hello@brainvoice.ai</li>
              <li>+1 (555) 123-4567</li>
              <li>123 AI Boulevard, Tech City, CA 94000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">© 2024 BrainVoice AI Inc. All rights reserved.</p>
          <div className="flex gap-8 text-gray-600">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
