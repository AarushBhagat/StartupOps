import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  CheckSquare,
  MessageSquare,
  BarChart3,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Sparkles,
  Target,
  Users,
  Calendar
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  category: 'Navigation' | 'Actions' | 'Settings';
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userRole: 'leader' | 'team';
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onLogout,
  userRole
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define all commands
  const allCommands: Command[] = [
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: Home,
      action: () => onNavigate('dashboard'),
      category: 'Navigation',
      keywords: ['home', 'overview', 'main']
    },
    {
      id: 'nav-tasks',
      label: 'Go to Tasks',
      icon: CheckSquare,
      action: () => onNavigate('tasks'),
      category: 'Navigation',
      keywords: ['todo', 'kanban', 'work']
    },
    {
      id: 'nav-feedback',
      label: 'Go to Feedback',
      icon: MessageSquare,
      action: () => onNavigate('feedback'),
      category: 'Navigation',
      keywords: ['survey', 'responses', 'user']
    },
    {
      id: 'nav-analytics',
      label: 'Go to Analytics',
      icon: BarChart3,
      action: () => onNavigate('analytics'),
      category: 'Navigation',
      keywords: ['metrics', 'stats', 'data', 'reports']
    },
    {
      id: 'nav-profile',
      label: 'Go to Profile',
      icon: User,
      action: () => onNavigate('profile'),
      category: 'Navigation',
      keywords: ['account', 'team', 'info']
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      icon: Settings,
      action: () => onNavigate('settings'),
      category: 'Navigation',
      keywords: ['preferences', 'config', 'options']
    },
    {
      id: 'action-logout',
      label: 'Log Out',
      icon: LogOut,
      action: onLogout,
      category: 'Settings',
      keywords: ['sign out', 'exit', 'leave']
    }
  ];

  // Add investor hub for leaders only
  if (userRole === 'leader') {
    allCommands.splice(4, 0, {
      id: 'nav-investor-hub',
      label: 'Go to Investor Hub',
      icon: TrendingUp,
      action: () => onNavigate('investor-hub'),
      category: 'Navigation',
      keywords: ['pitch', 'fundraising', 'investors', 'deck']
    });
  }

  // Filter commands based on search
  const filteredCommands = search.trim() === '' 
    ? allCommands 
    : allCommands.filter(cmd => {
        const searchLower = search.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(searchLower) ||
          cmd.category.toLowerCase().includes(searchLower) ||
          cmd.keywords?.some(kw => kw.toLowerCase().includes(searchLower))
        );
      });

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          selectedCommand.action();
          onClose();
          setSearch('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Reset search when closing
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Command Palette */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl rounded-2xl bg-[#0a0f1a] border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search commands..."
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <kbd className="px-2 py-1 text-xs text-gray-400 bg-white/5 rounded border border-white/10">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-500">
                    No commands found
                  </div>
                ) : (
                  <div className="py-2">
                    {Object.entries(groupedCommands).map(([category, commands]) => (
                      <div key={category} className="mb-2">
                        <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {category}
                        </div>
                        {commands.map((cmd, idx) => {
                          const globalIndex = filteredCommands.indexOf(cmd);
                          const Icon = cmd.icon;
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <motion.button
                              key={cmd.id}
                              onClick={() => {
                                cmd.action();
                                onClose();
                                setSearch('');
                              }}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full px-6 py-3 flex items-center gap-3 text-left transition-colors ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-l-2 border-cyan-500' 
                                  : 'hover:bg-white/5 border-l-2 border-transparent'
                              }`}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                              <span className={`flex-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                {cmd.label}
                              </span>
                              {isSelected && (
                                <kbd className="px-2 py-1 text-xs text-gray-400 bg-white/5 rounded border border-white/10">
                                  ↵
                                </kbd>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↵</kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">ESC</kbd>
                    <span>Close</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400">StartupOps</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
