import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Flag, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  X,
  ChevronRight,
  Target,
  MoreVertical
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  due?: string;
  milestone?: string;
}

interface Milestone {
  id: string;
  title: string;
  due: string;
  progress: number;
  tasks: number;
  completed: number;
  delayed?: boolean;
}

export const TasksPage = () => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState('all');

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Launch MVP',
      due: 'Mar 15',
      progress: 60,
      tasks: 10,
      completed: 6,
      delayed: true
    },
    {
      id: '2',
      title: 'Get First Users',
      due: 'Apr 1',
      progress: 30,
      tasks: 8,
      completed: 2
    },
    {
      id: '3',
      title: 'Raise Pre-Seed',
      due: 'May 15',
      progress: 15,
      tasks: 12,
      completed: 1
    }
  ];

  const tasks: Task[] = [
    { id: '1', title: 'Design UI mockups', status: 'in-progress', priority: 'high', assignee: 'Sarah', due: '2 days', milestone: 'Launch MVP' },
    { id: '2', title: 'Backend API development', status: 'in-progress', priority: 'high', assignee: 'John', due: '3 days' },
    { id: '3', title: 'User research interviews', status: 'done', priority: 'medium', assignee: 'Emma', due: 'Done' },
    { id: '4', title: 'Testing authentication', status: 'review', priority: 'high', assignee: 'Mike', due: '1 day' },
    { id: '5', title: 'Write documentation', status: 'todo', priority: 'low', assignee: 'Alex', due: '1 week' },
    { id: '6', title: 'Set up analytics', status: 'todo', priority: 'medium', assignee: 'Sarah', due: '5 days' },
    { id: '7', title: 'Payment integration', status: 'in-progress', priority: 'high', assignee: 'John', due: '4 days', milestone: 'Launch MVP' },
    { id: '8', title: 'Customer onboarding flow', status: 'review', priority: 'medium', assignee: 'Emma', due: '2 days' },
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-cyan-400" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', count: getTasksByStatus('todo').length },
    { id: 'in-progress', title: 'In Progress', count: getTasksByStatus('in-progress').length },
    { id: 'review', title: 'In Review', count: getTasksByStatus('review').length },
    { id: 'done', title: 'Completed', count: getTasksByStatus('done').length },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[2000px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Tasks & Milestones
        </h1>
        <p className="text-gray-400">
          Manage your startup's execution with AI-powered task management
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 mb-6"
      >
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span className="text-sm text-gray-400">12 tasks this week</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl">
          <span className="text-sm text-cyan-400">🎯 3 active milestones</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-xl">
          <span className="text-sm text-green-400">✓ 8 completed today</span>
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAIGenerator(!showAIGenerator)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI Generate</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </motion.button>
      </motion.div>

      {/* AI Task Generator */}
      <AnimatePresence>
        {showAIGenerator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">AI Task Generator</h3>
                </div>
                <button
                  onClick={() => setShowAIGenerator(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what you need to do... e.g., 'We need to launch our MVP next month with user authentication, payment gateway, and analytics dashboard'"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Tasks with AI</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout: Milestones + Kanban */}
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Milestones Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span>Milestones</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {milestone.title}
                </h3>
                {milestone.delayed && (
                  <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">
                    Delayed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                <span>Due: {milestone.due}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{milestone.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-full rounded-full ${milestone.delayed ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-purple-600'}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{milestone.completed}/{milestone.tasks} tasks</span>
                  {milestone.delayed && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-cyan-400 hover:underline"
                    >
                      Break into tasks
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-w-[800px]">
            {columns.map((column, columnIndex) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + columnIndex * 0.1 }}
                className="flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-4 mb-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(column.id)}
                    <h3 className="font-semibold text-white">{column.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-gray-400">
                      {column.count}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-400" />
                  </motion.button>
                </div>

                {/* Task Cards */}
                <div className="space-y-3 flex-1">
                  {getTasksByStatus(column.id).map((task, taskIndex) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + columnIndex * 0.1 + taskIndex * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTask(task)}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors flex-1">
                          {task.title}
                        </h4>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        {task.milestone && (
                          <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400">
                            {task.milestone}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        {task.assignee && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                              {task.assignee.charAt(0)}
                            </div>
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.due && (
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">{task.due}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTask(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl p-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <p className="text-white">
                    {selectedTask.description || 'No description provided yet.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white capitalize">
                      {selectedTask.status}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                    <div className={`px-4 py-2 rounded-lg ${getPriorityColor(selectedTask.priority)} text-center capitalize font-medium`}>
                      {selectedTask.priority}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Assignee</label>
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                      {selectedTask.assignee || 'Unassigned'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                      {selectedTask.due || 'No deadline'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
                  >
                    Delete Task
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
