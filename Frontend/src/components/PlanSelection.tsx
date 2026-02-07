import React, { useState, useRef } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Rocket, ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';

interface PlanSelectionProps {
  onBack: () => void;
  onSelectPlan: (planName: string) => void;
}

export const PlanSelection = ({ onBack, onSelectPlan }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 startup workspace",
        "Up to 5 team members",
        "Basic AI insights",
        "Task & milestone tracking",
        "Limited analytics",
        "Community support"
      ],
      color: "from-gray-500 to-gray-700",
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      features: [
        "Unlimited workspaces",
        "Unlimited team members",
        "Advanced AI insights",
        "Full analytics suite",
        "Investor dashboard",
        "Pitch deck generator",
        "Priority support",
        "Custom integrations"
      ],
      color: "from-cyan-500 to-purple-600",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI training",
        "White-label solution",
        "SLA guarantees",
        "Advanced security",
        "API access",
        "Custom workflows"
      ],
      color: "from-orange-500 to-red-600",
      popular: false
    }
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    onSelectPlan(planName);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white py-20 px-6 relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <AnimatedBackground mouseX={mouseX} mouseY={mouseY} />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes mouseX={mouseX} mouseY={mouseY} count={5} />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="container mx-auto max-w-7xl mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Plan</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start building your startup with the perfect plan for your journey
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl border ${plan.popular ? 'border-cyan-500/50 scale-105' : 'border-white/10'} bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-500/50 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]'
                    : 'border-2 border-white/20 text-white hover:bg-white hover:text-[#02040a]'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-gray-400"
        >
          <p>Need help choosing? <a href="#" className="text-cyan-400 hover:underline">Contact our team</a></p>
        </motion.div>
      </div>
    </div>
  );
};