import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Shield,
  Upload,
  Save,
  Trash2,
  Check
} from 'lucide-react';

type TabId = 'account' | 'workspace' | 'notifications' | 'billing';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [accountData, setAccountData] = useState({
    fullName: 'Sarah Kim',
    email: 'sarah@pethealth.ai',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    milestoneDeadline: true,
    feedbackReceived: true,
    aiInsights: true,
    weeklyRetro: true,
    dailyDigest: false
  });

  const tabs = [
    { id: 'account' as TabId, label: 'Account', icon: User },
    { id: 'workspace' as TabId, label: 'Workspace', icon: Building2 },
    { id: 'notifications' as TabId, label: 'Notifications', icon: Bell },
    { id: 'billing' as TabId, label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Settings
        </h1>
        <p className="text-gray-400">
          Manage your account and workspace settings
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-6 py-3 font-medium transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
              <span className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeSettingsTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                      SK
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload New</span>
                      </motion.button>
                      <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={accountData.fullName}
                    onChange={(e) => setAccountData({ ...accountData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                    Founder (Cannot change)
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={accountData.currentPassword}
                    onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    value={accountData.newPassword}
                    onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={accountData.confirmPassword}
                    onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                  >
                    Update Password
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Tab */}
        {activeTab === 'workspace' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Workspace Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Startup Name</label>
                  <input
                    type="text"
                    defaultValue="PetHealth AI"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Workspace URL</label>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                    startupops.com/pethealth
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Team Members</h2>
              
              <div className="space-y-3 mb-4">
                {[
                  { name: 'Sarah Kim (You)', role: 'Founder', removable: false },
                  { name: 'John Doe', role: 'Team Member', removable: true },
                  { name: 'Mike Chen', role: 'Team Member', removable: true }
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div>
                      <div className="text-white font-medium">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                    </div>
                    {member.removable && (
                      <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors font-medium"
              >
                + Invite Member
              </motion.button>
            </div>

            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Danger Zone
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                This action cannot be undone. All data will be permanently deleted.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Workspace</span>
              </motion.button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Email Notifications</h2>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div>
                      <div className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-gradient-to-r from-cyan-500 to-purple-600' : 'bg-white/10'
                      }`}
                    >
                      <motion.div
                        animate={{ x: value ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Preferences</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Current Plan</h2>
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">FREE PLAN</div>
                    <div className="text-gray-400">Perfect for getting started</div>
                  </div>
                  <div className="text-3xl font-bold text-white">$0</div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>1 startup workspace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Up to 5 team members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Basic AI insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Limited analytics</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:from-cyan-400 hover:to-purple-500 transition-all"
              >
                Upgrade to Pro
              </motion.button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-6">Pro Plan - $49/month</h2>
              
              <div className="space-y-3 mb-6">
                {[
                  'Unlimited team members',
                  'Advanced AI insights',
                  'Full analytics suite',
                  'Investor dashboard sharing',
                  'Priority support',
                  'Custom branding',
                  'API access'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                >
                  Select Pro
                </motion.button>
                <button className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">
                  Compare Plans
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
