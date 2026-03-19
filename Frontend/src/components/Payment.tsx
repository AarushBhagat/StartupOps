import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { FloatingShapes } from './FloatingShapes';

interface PaymentProps {
  onBack: () => void;
  onComplete: () => void;
  selectedPlan: string;
}

export const Payment = ({ onBack, onComplete, selectedPlan }: PaymentProps) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    zipCode: ''
  });
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

  const planPrices: { [key: string]: string } = {
    'Pro': '$49/month',
    'Enterprise': 'Custom Pricing'
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#02040a] text-white px-6 py-20 relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <AnimatedBackground mouseX={mouseX} mouseY={mouseY} />
      
      {/* Floating Geometric Shapes */}
      <FloatingShapes mouseX={mouseX} mouseY={mouseY} count={4} />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="container mx-auto max-w-6xl mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Purchase</span>
          </h1>
          <p className="text-xl text-gray-400">Secure payment powered by Stripe</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <motion.input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      whileFocus={{ scale: 1.01, borderColor: "rgb(6, 182, 212)" }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Billing Address</label>
                  <input
                    type="text"
                    value={formData.billingAddress}
                    onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                    placeholder="123 Main St, City, State"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ZIP / Postal Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="12345"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 rounded-lg p-4">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300"
                >
                  {selectedPlan === 'Enterprise' ? 'Contact Sales' : `Pay ${planPrices[selectedPlan]}`}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-6">
                {/* Plan Details */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedPlan} Plan</h3>
                      <p className="text-gray-400 text-sm mt-1">Billed monthly</p>
                    </div>
                    <span className="text-2xl font-bold">{planPrices[selectedPlan]}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {selectedPlan === 'Pro' ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Unlimited workspaces
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Advanced AI insights
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Investor dashboard
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Pitch deck generator
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Priority support
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Everything in Pro
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Dedicated account manager
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          Custom AI training
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400" />
                          White-label solution
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{planPrices[selectedPlan]}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span>{planPrices[selectedPlan]}</span>
                  </div>
                </div>

                {/* Money Back Guarantee */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                  <p className="text-green-400 font-medium">30-Day Money Back Guarantee</p>
                  <p className="text-xs text-gray-400 mt-1">Cancel anytime, no questions asked</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};