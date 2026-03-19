import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, TrendingUp, Users, BarChart, Lightbulb, CheckCircle2 } from 'lucide-react';

interface SelectedTemplatesBannerProps {
  selectedTemplates: string[];
}

const templateInfo: Record<string, { title: string; icon: any; color: string }> = {
  'mvp-launch': { title: 'MVP Launch Roadmap', icon: Zap, color: 'from-cyan-500 to-blue-600' },
  'product-market-fit': { title: 'Product-Market Fit', icon: Target, color: 'from-purple-500 to-pink-600' },
  'fundraising': { title: 'Fundraising Prep', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
  'team-building': { title: 'Team Building', icon: Users, color: 'from-orange-500 to-red-600' },
  'growth-marketing': { title: 'Growth & Marketing', icon: BarChart, color: 'from-indigo-500 to-purple-600' },
  'innovation': { title: 'Innovation Framework', icon: Lightbulb, color: 'from-yellow-500 to-orange-600' }
};

export const SelectedTemplatesBanner = ({ selectedTemplates }: SelectedTemplatesBannerProps) => {
  if (selectedTemplates.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm font-semibold text-gray-300">Active Roadmap Templates</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {selectedTemplates.map((templateId) => {
          const template = templateInfo[templateId];
          if (!template) return null;
          
          const Icon = template.icon;
          return (
            <motion.div
              key={templateId}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-4 py-2 rounded-xl bg-gradient-to-r ${template.color} bg-opacity-10 border border-white/10 flex items-center gap-2`}
            >
              <Icon className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{template.title}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Your tasks and milestones are based on the templates you selected during onboarding
      </p>
    </motion.div>
  );
};
