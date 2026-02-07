import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  Sparkles,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  X,
  TrendingDown,
  Activity,
  Zap
} from 'lucide-react';

export const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [showInvestorMetrics, setShowInvestorMetrics] = useState(true);
  const [showCustomRangeModal, setShowCustomRangeModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const investorMetrics = [
    { label: 'MRR', value: '$0', change: '+0%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
    { label: 'Active Users', value: '45', change: '+15%', trend: 'up', icon: Users, color: 'from-cyan-500 to-blue-600' },
    { label: 'MoM Growth', value: '15%', change: '+5%', trend: 'up', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
    { label: 'Burn Rate', value: '$5K/mo', change: '-10%', trend: 'down', icon: DollarSign, color: 'from-orange-500 to-red-600' },
  ];

  const taskData = [
    { week: 'W1', tasks: 8 },
    { week: 'W2', tasks: 15 },
    { week: 'W3', tasks: 12 },
    { week: 'W4', tasks: 20 },
  ];

  const milestones = [
    { name: 'Launch MVP', progress: 80 },
    { name: 'First 10 Users', progress: 30 },
    { name: 'Raise Funding', progress: 20 },
  ];

  const teamPerformance = [
    { name: 'Sarah', tasks: 12, color: 'from-cyan-500 to-blue-600' },
    { name: 'John', tasks: 10, color: 'from-purple-500 to-pink-600' },
    { name: 'Mike', tasks: 8, color: 'from-green-500 to-emerald-600' },
    { name: 'Emma', tasks: 6, color: 'from-orange-500 to-red-600' },
  ];

  const aiInsights = [
    { text: 'Velocity increased 20% this week - great job!', type: 'positive', icon: '🎉' },
    { text: 'Customer acquisition slowing - consider testing new channels', type: 'warning', icon: '⚠️' },
    { text: 'On track to hit Q1 goals', type: 'positive', icon: '🎯' },
  ];

  const maxTasks = Math.max(...taskData.map(d => d.tasks));
  const maxTeamTasks = Math.max(...teamPerformance.map(d => d.tasks));

  return (
    <div className="p-6 lg:p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Analytics
        </h1>
        <p className="text-gray-400">
          Track your startup's performance with AI-powered insights
        </p>
      </motion.div>

      {/* Date Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {['7days', '30days', '90days'].map((range) => (
          <motion.button
            key={range}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDateRange(range)}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              dateRange === range
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {range === '7days' && 'Last 7 Days'}
            {range === '30days' && 'Last 30 Days'}
            {range === '90days' && 'Last 90 Days'}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCustomRangeModal(true)}
          className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Custom Range</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Investor Metrics */}
      {showInvestorMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-cyan-400" />
              Investor Metrics
            </h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Edit Metrics →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investorMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      metric.trend === 'up' || (!metric.trend && metric.change.startsWith('+'))
                        ? 'bg-green-500/20 text-green-400'
                        : metric.trend === 'down'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Task Completion Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Task Completion Over Time
            </h3>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-around gap-4">
            {taskData.map((data, index) => (
              <div key={data.week} className="flex-1 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.tasks / maxTasks) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-purple-600 relative group cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 rounded-lg bg-black/80 text-white text-xs font-medium whitespace-nowrap">
                      {data.tasks} tasks
                    </div>
                  </div>
                </motion.div>
                <span className="text-sm text-gray-400 font-medium">{data.week}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestone Progress */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Milestone Progress
            </h3>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{milestone.name}</span>
                  <span className="text-cyan-400 font-bold">{milestone.progress}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      milestone.progress >= 70
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : milestone.progress >= 40
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                        : 'bg-gradient-to-r from-orange-500 to-red-600'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Team Performance
          </h3>
          <span className="text-sm text-gray-400">Tasks completed this period</span>
        </div>

        <div className="space-y-4">
          {teamPerformance.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-sm">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{member.name}</span>
                  <span className="text-cyan-400 font-bold">{member.tasks} tasks</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(member.tasks / maxTeamTasks) * 100}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${member.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">AI-Generated Insights</h3>
        </div>

        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-4 rounded-xl border ${
                insight.type === 'positive'
                  ? 'bg-green-500/10 border-green-500/20'
                  : insight.type === 'warning'
                  ? 'bg-yellow-500/10 border-yellow-500/20'
                  : 'bg-cyan-500/10 border-cyan-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <p className="flex-1 text-gray-300">{insight.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Velocity Tracker & Real-time Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Velocity Tracker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Velocity Tracker
            </h3>
            <span className="text-2xl font-bold text-cyan-400">15.2</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="text-white font-medium mb-1">Story Points Completed</div>
                <div className="text-sm text-gray-400">This Sprint</div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-2xl font-bold text-white">42</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="text-white font-medium mb-1">Average Lead Time</div>
                <div className="text-sm text-gray-400">Per Task</div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-2xl font-bold text-white">2.5d</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="text-white font-medium mb-1">Cycle Time</div>
                <div className="text-sm text-gray-400">Average</div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-red-400" />
                <span className="text-2xl font-bold text-white">4.8d</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Activity Feed */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Real-time Activity
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-green-400">Live</span>
            </div>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {[
              { user: 'Sarah', action: 'completed', item: 'UI Design mockups', time: '2m ago', color: 'green' },
              { user: 'John', action: 'started', item: 'Backend API integration', time: '5m ago', color: 'cyan' },
              { user: 'Mike', action: 'reviewed', item: 'Authentication module', time: '8m ago', color: 'purple' },
              { user: 'Emma', action: 'created', item: 'New user story', time: '12m ago', color: 'blue' },
              { user: 'Alex', action: 'commented on', item: 'Payment flow task', time: '15m ago', color: 'orange' },
              { user: 'Sarah', action: 'updated', item: 'Dashboard analytics', time: '18m ago', color: 'pink' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${activity.color}-400 to-${activity.color}-600 flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>
                    {' '}<span className="text-gray-400">{activity.action}</span>
                    {' '}<span className="font-medium text-cyan-400 truncate">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 1 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Conversion Funnel
          </h3>
          <span className="text-sm text-gray-400">User Journey Analytics</span>
        </div>

        <div className="space-y-3">
          {[
            { stage: 'Awareness', users: 10000, percentage: 100, color: 'from-cyan-500 to-blue-600' },
            { stage: 'Interest', users: 4500, percentage: 45, color: 'from-blue-500 to-purple-600' },
            { stage: 'Consideration', users: 1800, percentage: 18, color: 'from-purple-500 to-pink-600' },
            { stage: 'Conversion', users: 450, percentage: 4.5, color: 'from-pink-500 to-red-600' },
            { stage: 'Retention', users: 360, percentage: 3.6, color: 'from-red-500 to-orange-600' },
          ].map((funnel, index) => (
            <motion.div
              key={funnel.stage}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{funnel.stage}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">{funnel.users.toLocaleString()} users</span>
                  <span className="text-cyan-400 font-bold">{funnel.percentage}%</span>
                </div>
              </div>
              <div className="relative h-12 bg-white/10 rounded-xl overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${funnel.percentage}%` }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                  className={`h-full rounded-xl bg-gradient-to-r ${funnel.color} flex items-center justify-end px-4`}
                >
                  <span className="text-white text-sm font-bold">{funnel.percentage}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Range Modal */}
      <AnimatePresence>
        {showCustomRangeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCustomRangeModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Custom Date Range</h2>
                <button
                  onClick={() => setShowCustomRangeModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCustomRangeModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDateRange('custom');
                      setShowCustomRangeModal(false);
                    }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                  >
                    Apply Range
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
