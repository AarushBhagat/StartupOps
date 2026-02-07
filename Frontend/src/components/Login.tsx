import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
  onLogin: (email: string) => void;
  onSignup: () => void;
}

export const Login = ({ onBack, onLogin, onSignup }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <motion.div 
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20])
        }}
        className="absolute inset-0 z-0"
      >
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             opacity: [0.15, 0.25, 0.15]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.5, 1],
             x: [0, 30, 0],
             y: [0, -30, 0]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute top-[20%] right-[20%] w-64 h-64 bg-blue-900/10 rounded-full blur-[80px]" 
         />
      </motion.div>

      {/* Grid Overlay with Parallax */}
      <motion.div 
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [10, -10]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [10, -10])
        }}
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
      />

      {/* Floating Elements with Enhanced Animations */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40])
        }}
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[15%] left-[10%] w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 backdrop-blur-sm z-0"
      />
      
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [30, -30])
        }}
        animate={{ 
          y: [0, 40, 0],
          rotate: [0, -8, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 backdrop-blur-sm z-0"
      />

      <motion.div
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [20, -20])
        }}
        animate={{ 
          y: [0, -25, 0],
          x: [0, 15, 0],
          rotate: [0, 12, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[40%] right-[8%] w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/20 backdrop-blur-sm z-0"
      />

      <motion.div
        style={{
          x: useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]),
          y: useTransform(smoothMouseY, [-0.5, 0.5], [-25, 25])
        }}
        animate={{ 
          y: [0, 35, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-[35%] left-[12%] w-16 h-16 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-600/10 border border-pink-500/20 backdrop-blur-sm z-0"
      />

      {/* Additional floating particles */}
      <motion.div
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[60%] left-[20%] w-2 h-2 rounded-full bg-cyan-400/50 z-0"
      />
      
      <motion.div
        animate={{
          y: [0, -120, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[70%] right-[25%] w-2 h-2 rounded-full bg-purple-400/50 z-0"
      />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      {/* Login Form with 3D Tilt Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-3xl blur-xl opacity-50"
        />
        
        <div className="relative bg-[#0a0e1a]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Logo with stagger animation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white"
            >
              S
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              StartupOps
            </motion.span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-4xl font-bold mb-2"
          >
            Welcome Back
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-gray-400 mb-8"
          >
            Sign in to continue your startup journey
          </motion.p>

          {/* Demo Credentials */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
          >
            <p className="text-sm text-cyan-400 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-300">Team Leader: <span className="font-mono">leader@gmail.com</span></p>
            <p className="text-xs text-gray-300">Team Member: <span className="font-mono">team@gmail.com</span></p>
            <p className="text-xs text-gray-400 mt-1">Password: any</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-400 hover:underline">Forgot password?</a>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              Sign In
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-4 my-6"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Social Login */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </motion.button>

          {/* Signup Link */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center text-gray-400 mt-6"
          >
            Don't have an account?{' '}
            <button onClick={onSignup} className="text-cyan-400 hover:underline font-medium">
              Sign up
            </button>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};