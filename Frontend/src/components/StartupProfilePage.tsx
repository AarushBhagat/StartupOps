import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Edit3,
  Save,
  Users,
  Mail,
  Plus,
  X,
  Target,
  Calendar,
  Globe
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

export const StartupProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'PetHealth AI',
    tagline: 'AI-powered vet consultations',
    industry: 'HealthTech',
    stage: 'MVP',
    founded: '2025-01',
    website: 'pethealth.ai',
    problem: 'Pet owners struggle to get quick, affordable veterinary advice...',
    solution: 'AI-powered chat connects pet owners with certified veterinarians instantly...',
    valueProp: '24/7 instant access to veterinary expertise at 1/10th the cost'
  });

  const [team, setTeam] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Kim', role: 'Founder & CEO', email: 'sarah@pethealth.ai' },
    { id: '2', name: 'John Doe', role: 'CTO', email: 'john@pethealth.ai' },
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newMember, setNewMember] = useState({ email: '', role: '' });

  const pitchScore = 67;

  const industries = ['HealthTech', 'FinTech', 'EdTech', 'E-commerce', 'SaaS', 'Other'];
  const stages = ['Idea', 'Validation', 'MVP', 'Early Traction', 'Growth'];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleInvite = () => {
    if (newMember.email && newMember.role) {
      // Invite logic here
      setNewMember({ email: '', role: '' });
      setShowInviteForm(false);
    }
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
          Startup Profile
        </h1>
        <p className="text-gray-400">
          Manage your startup information and team
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Main Profile */}
        <div className="space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-cyan-400" />
                Basic Information
              </h2>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </motion.button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Startup Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    {profile.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tagline</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    {profile.tagline}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                  {isEditing ? (
                    <select
                      value={profile.industry}
                      onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                      {profile.industry}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Stage</label>
                  {isEditing ? (
                    <select
                      value={profile.stage}
                      onChange={(e) => setProfile({ ...profile, stage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                      {profile.stage}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Founded Date
                  </label>
                  {isEditing ? (
                    <input
                      type="month"
                      value={profile.founded}
                      onChange={(e) => setProfile({ ...profile, founded: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                      Jan 2025
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                      {profile.website}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Problem & Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Problem & Solution
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Problem Statement</label>
                {isEditing ? (
                  <textarea
                    value={profile.problem}
                    onChange={(e) => setProfile({ ...profile, problem: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    {profile.problem}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Solution</label>
                {isEditing ? (
                  <textarea
                    value={profile.solution}
                    onChange={(e) => setProfile({ ...profile, solution: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    {profile.solution}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Value Proposition</label>
                {isEditing ? (
                  <textarea
                    value={profile.valueProp}
                    onChange={(e) => setProfile({ ...profile, valueProp: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    {profile.valueProp}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                Team
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Invite Member</span>
              </motion.button>
            </div>

            {showInviteForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInvite}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                  >
                    Send Invite
                  </motion.button>
                  <button
                    onClick={() => setShowInviteForm(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Edit3 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Investor Preview Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl sticky top-6">
            <h3 className="text-xl font-bold text-white mb-4">💼 Investor Preview</h3>
            <p className="text-sm text-gray-400 mb-6">What investors see when you share</p>

            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-white mb-1">{profile.name}</div>
                <div className="text-gray-400">{profile.tagline}</div>
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                  {profile.stage}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                  {profile.industry}
                </span>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-gray-400 mb-2">Founded</div>
                <div className="text-white">Jan 2025</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-gray-400 mb-3">Traction</div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• 120 users</div>
                  <div>• $0 MRR</div>
                  <div>• 15% growth</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-gray-400 mb-2">Team</div>
                <div className="text-white">{team.length} members</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Pitch Score
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-white">{pitchScore}/100</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    pitchScore >= 85 ? 'bg-green-500/20 text-green-400' :
                    pitchScore >= 70 ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {pitchScore >= 85 ? 'Excellent' : pitchScore >= 70 ? 'Good' : 'Improving'}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pitchScore}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
