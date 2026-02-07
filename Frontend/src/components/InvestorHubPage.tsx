import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Sparkles,
  Download,
  Share2,
  Eye,
  DollarSign,
  Users,
  Calendar,
  Upload,
  FileCheck
} from 'lucide-react';

export const InvestorHubPage = () => {
  const [metricsEdit, setMetricsEdit] = useState(false);
  const [metrics, setMetrics] = useState({
    mrr: '0',
    users: '120',
    growth: '15',
    burn: '5000',
    runway: '6'
  });

  const pitchScore = 67;
  const scoreItems = [
    { label: 'Problem statement defined', status: 'complete', icon: CheckCircle },
    { label: 'Solution articulated', status: 'complete', icon: CheckCircle },
    { label: 'Team profiles complete', status: 'complete', icon: CheckCircle },
    { label: 'Traction metrics missing', status: 'warning', icon: AlertCircle },
    { label: 'Competitive analysis not done', status: 'missing', icon: XCircle },
    { label: 'Financial projections needed', status: 'missing', icon: XCircle },
    { label: 'Customer testimonials (0/3)', status: 'missing', icon: XCircle },
  ];

  const dueDiligenceDocs = [
    { label: 'Cap table', status: 'missing' },
    { label: 'Financial statements (P&L, Cash flow)', status: 'missing' },
    { label: 'Pitch deck', status: 'complete' },
    { label: 'Product roadmap', status: 'missing' },
    { label: 'Customer contracts/LOIs', status: 'missing' },
    { label: 'IP/Patent documentation', status: 'missing' },
    { label: 'Team agreements', status: 'missing' },
    { label: 'Legal entity documents', status: 'missing' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-cyan-500 to-blue-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-orange-500 to-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 85) return 'Excellent! Ready for investors';
    if (score >= 70) return 'Good start!';
    if (score >= 50) return 'Keep improving';
    return 'Needs work';
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Investor Hub
        </h1>
        <p className="text-gray-400">
          Track investor readiness and manage fundraising materials
        </p>
      </motion.div>

      {/* Pitch Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Target className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Pitch Score</h2>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-8">
          {/* Score Circle */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <motion.circle
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * pitchScore) / 100 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="553"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-white">{pitchScore}</div>
                <div className="text-sm text-gray-400">/ 100</div>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getScoreColor(pitchScore)} bg-opacity-20 text-white font-medium mb-6`}>
              {getScoreText(pitchScore)}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-4">Complete these to reach 85+:</h3>
            <div className="grid gap-3">
              {scoreItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      item.status === 'complete'
                        ? 'bg-green-500/10'
                        : item.status === 'warning'
                        ? 'bg-yellow-500/10'
                        : 'bg-red-500/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      item.status === 'complete'
                        ? 'text-green-400'
                        : item.status === 'warning'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`} />
                    <span className="text-white flex-1">{item.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
            >
              Auto-fill Missing Data
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Traction Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Traction Metrics
            </h3>
            {!metricsEdit && (
              <button
                onClick={() => setMetricsEdit(true)}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Monthly Recurring Revenue (MRR)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.mrr}
                  onChange={(e) => setMetrics({ ...metrics, mrr: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  ${metrics.mrr}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Total Active Users</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.users}
                  onChange={(e) => setMetrics({ ...metrics, users: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  {metrics.users}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Month-over-Month Growth (%)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.growth}
                  onChange={(e) => setMetrics({ ...metrics, growth: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  {metrics.growth}%
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Monthly Burn Rate</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.burn}
                  onChange={(e) => setMetrics({ ...metrics, burn: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  ${metrics.burn}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Runway (Months)</label>
              {metricsEdit ? (
                <input
                  type="text"
                  value={metrics.runway}
                  onChange={(e) => setMetrics({ ...metrics, runway: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  {metrics.runway} months
                </div>
              )}
            </div>

            {metricsEdit && (
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMetricsEdit(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                >
                  Save Metrics
                </motion.button>
                <button
                  onClick={() => setMetricsEdit(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Investor Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" />
              Investor Dashboard Preview
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <div className="text-2xl font-bold text-white mb-1">PetHealth AI</div>
              <div className="text-gray-400">AI-powered vet consultations</div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400">Pre-Seed</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">HealthTech</span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-3">Traction</div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>• {metrics.users} active users</span>
                  <span className="text-green-400">+{metrics.growth}% MoM</span>
                </div>
                <div>• 3 milestones completed</div>
                <div>• 85% positive user feedback</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-2">Team</div>
              <div className="text-sm text-gray-300">5 members • 2 Engineers • 1 Designer</div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-bold text-gray-400 mb-2">Recent Activity</div>
              <div className="space-y-1 text-sm text-gray-300">
                <div>• Completed "User Research" milestone</div>
                <div>• 15 tasks completed this week</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Pitch</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Due Diligence Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-orange-400" />
            Due Diligence Checklist
          </h3>
          <span className="text-sm text-gray-400">
            {dueDiligenceDocs.filter(d => d.status === 'complete').length}/{dueDiligenceDocs.length} complete
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {dueDiligenceDocs.map((doc, index) => (
            <motion.div
              key={doc.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                doc.status === 'complete'
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {doc.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
                <span className={doc.status === 'complete' ? 'text-white' : 'text-gray-400'}>
                  {doc.label}
                </span>
              </div>
              {doc.status === 'missing' && (
                <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
                  <Upload className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Document</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>Generate Template</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Pitch Deck Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Auto-Generate Pitch Deck</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            Based on your data, we'll create a professional pitch deck with:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {['Problem', 'Solution', 'Traction & Metrics', 'Team', 'Roadmap', 'The Ask'].map((slide, index) => (
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-2 text-gray-300"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                  {index + 1}
                </div>
                <span>Slide {index + 1}: {slide}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold hover:from-purple-400 hover:to-pink-500 transition-all flex items-center justify-center gap-3"
        >
          <Sparkles className="w-6 h-6" />
          <span>Generate Pitch Deck</span>
        </motion.button>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium mb-1">PetHealth_Pitch_Feb2026.pdf</div>
              <div className="text-sm text-gray-400">Generated 2 hours ago</div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
