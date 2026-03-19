import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, Calendar, User, Flag, CheckCircle2, CheckCircle, Clock, AlertCircle, Sparkles, X, ChevronRight, Target, MoreVertical } from 'lucide-react';
import { SelectedTemplatesBanner } from './SelectedTemplatesBanner';
import { useAuth } from '../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  due?: string;
  milestone?: string;
  requirements?: string[];
  steps?: { id: string; text: string; completed: boolean }[];
  tags?: string[];
  createdDate?: string;
  isAI?: boolean;
  method?: string;
  week?: string;
  attachments?: { name: string; url: string }[];
  comments?: { author: string; text: string; date: string }[];
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

interface TasksPageProps {
  selectedTemplates?: string[];
}

export const TasksPage = ({ selectedTemplates = [] }: TasksPageProps) => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'in-progress' | 'review' | 'done'>('todo');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editDue, setEditDue] = useState('');
  const [editAssignee, setEditAssignee] = useState('');

  const { user } = useAuth();
  
  const handleGenerateAI = async () => {
    if (!aiPrompt.trim() || !user || !user.uid) return;
    setIsGenerating(true);
    try {
      const { auth } = await import('../lib/firebase');
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch('http://localhost:8080/api/startup/task/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'API Error');
      }
      const data = await res.json();
      
      if (data.tasks && data.tasks.length > 0) {
        const currentMilestones = user.roadmap?.milestones || [];
        const newTasksWithFlag = data.tasks.map((t: any) => ({
          ...t,
          isAI: true,
          status: 'todo', // Explicitly force into To Do as requested
          createdDate: new Date().toLocaleDateString()
        }));
        const newMilestones = [...currentMilestones, ...newTasksWithFlag];
        
        const { doc, updateDoc } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          'roadmap.milestones': newMilestones
        });
        
        setAiPrompt('');
        setShowAIGenerator(false);
      }
    } catch (err) {
      console.error('Failed to generate task:', err);
      alert('Failed to generate tasks. Please ensure the backend is running and CORS is allowed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !user || !user.uid) return;
    setIsAdding(true);
    try {
      const currentMilestones = user.roadmap?.milestones || [];
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
        priority: newTaskPriority,
        due: newTaskDue,
        assignee: newTaskAssignee,
        isAI: false,
        createdDate: new Date().toLocaleDateString()
      };
      const newMilestones = [...currentMilestones, newTask];
      
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'roadmap.milestones': newMilestones
      });
      
      setShowAddTaskModal(false);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskStatus('todo');
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateTaskDetails = async () => {
    if (!user || !user.uid || !selectedTask) return;
    try {
      const currentMilestones = user.roadmap?.milestones || [];
      const dbMilestones = currentMilestones.map((m: any) => 
        m.title === selectedTask.title ? { ...m, due: editDue, assignee: editAssignee } : m
      );
      
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'roadmap.milestones': dbMilestones
      });
      
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to update task details:', err);
    }
  };

  const handleUpdateTaskStatus = async (task: Task, newStatus: string) => {
    if (!user || !user.uid) return;
    try {
      const currentMilestones = user.roadmap?.milestones || [];
      const dbMilestones = currentMilestones.map((m: any) => 
        m.title === task.title ? { ...m, status: newStatus } : m
      );
      
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'roadmap.milestones': dbMilestones
      });
      
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (!user || !user.uid) return;
    try {
      const currentMilestones = user.roadmap?.milestones || [];
      const dbMilestones = currentMilestones.filter((m: any) => m.title !== task.title);
      
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'roadmap.milestones': dbMilestones
      });
      
      setSelectedTask(null);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Real dynamic data from AI Roadmap
  const aiRoadmap = user?.roadmap;
  
  // Map AI generated milestones to the Milestone interface
  const aiMilestones: Milestone[] = aiRoadmap?.milestones?.map((m: any, index: number) => {
    const isCompleted = m.status === 'completed' || m.status === 'done';
    return {
      id: `m${index}`,
      title: m.title,
      due: 'TBD',
      progress: isCompleted ? 100 : 0,
      tasks: 1,
      completed: isCompleted ? 1 : 0,
      description: m.description,
      delayed: false
    };
  }) || [];

  // Map AI generated milestones to actionable tasks in the Kanban board
  const aiTasks: Task[] = aiRoadmap?.milestones?.map((m: any, index: number) => ({
    id: `t${index}`,
    title: m.title,
    description: m.description,
    status: (m.status === 'completed' || m.status === 'done') ? 'done' : (m.status || 'todo'),
    priority: m.priority || 'medium',
    milestone: m.title,
    due: m.due,
    assignee: m.assignee,
    isAI: m.isAI || (m.title.toLowerCase().includes('ai') ? true : false),
    method: m.method || (m.title.includes(':') ? m.title.split(':')[0] : undefined),
    week: m.week || `Week ${Math.floor(index / 2) + 1}`,
    createdDate: user?.startupProfile?.onboardedAt ? new Date(user.startupProfile.onboardedAt).toLocaleDateString() : undefined
  })) || [];

  // Data sourced strictly from Firestore / AI Roadmap
  const milestones: Milestone[] = aiMilestones;
  const tasks: Task[] = aiTasks;

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByMilestone = (milestoneName: string) => {
    return tasks.filter(task => task.milestone === milestoneName);
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
      case 'done': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'review': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
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
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
          Tasks & Milestones
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your startup's execution with AI-powered task management
        </p>
      </motion.div>

      {/* Selected Templates Banner */}
      <SelectedTemplatesBanner selectedTemplates={selectedTemplates} />

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <div className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span className="text-sm text-gray-400 font-semibold tracking-wide">{tasks.length} total tasks</span>
        </div>
        <div className="px-6 py-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl">
          <span className="text-sm text-cyan-400 font-semibold tracking-wide">🎯 {milestones.length} active milestones</span>
        </div>
        <div className="px-6 py-3.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-xl">
          <span className="text-sm text-green-400 font-semibold tracking-wide">✓ {tasks.filter(t => t.status === 'done').length} completed</span>
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-13 pr-5 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white text-base placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors text-center tracking-wide"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilterModal(true)}
          className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white hover:bg-white/10 transition-colors flex items-center gap-3"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAIGenerator(!showAIGenerator)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI Task Suite</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddTaskModal(true)}
          className="px-8 py-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold transition-all flex items-center gap-3"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Task</span>
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
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  whileHover={!isGenerating ? { scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" } : {}}
                  whileTap={!isGenerating ? { scale: 0.98 } : {}}
                  className={`px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold transition-all flex items-center gap-2 ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:from-cyan-400 hover:to-purple-500'}`}
                >
                  <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating...' : 'Generate Tasks with AI'}</span>
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
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Target className="w-6 h-6 text-cyan-400" />
              <span>Milestones</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          {milestones.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-gray-500 italic">No milestones yet. Use AI to generate some!</p>
            </div>
          ) : (
            milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                onClick={() => setSelectedMilestone(milestone)}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl hover:border-cyan-500/40 transition-all cursor-pointer group shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors text-base leading-tight">
                    {milestone.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Timeline: {milestone.due}</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                  />
                </div>
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <span>{milestone.progress}% Done</span>
                  <span className="text-cyan-400">View Roadmap</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-w-[1200px]">
            {columns.map((column, columnIndex) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + columnIndex * 0.1 }}
                className="flex flex-col min-w-[280px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-6 py-5 mb-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(column.id)}
                    <h3 className="font-bold text-white text-base tracking-wide">{column.title}</h3>
                    <span className="px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold text-gray-300 min-w-[32px] text-center">
                      {column.count}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-white/15 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                  </motion.button>
                </div>

                {/* Task Cards */}
                <div className="space-y-5 flex-1 min-h-[500px] p-2 rounded-2xl bg-black/20 border border-white/5 shadow-inner">
                  {getTasksByStatus(column.id).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 opacity-50">
                      <Target className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">No tasks here</p>
                    </div>
                  ) : (
                    getTasksByStatus(column.id).map((task, taskIndex) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: taskIndex * 0.05 }}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -5, 
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                          borderColor: "rgba(6, 182, 212, 0.5)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedTask(task);
                          setEditDue(task.due || '');
                          setEditAssignee(task.assignee || '');
                        }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/[0.08] transition-all cursor-pointer group relative overflow-hidden"
                      >
                        {/* Status Accent Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                          task.status === 'done' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-cyan-500' :
                          task.status === 'review' ? 'bg-purple-500' :
                          'bg-gray-600'
                        }`} />

                        <div className="flex items-start justify-between mb-5">
                          <div className="flex-1">
                            {task.method && (
                              <div className="text-[10px] font-black uppercase text-cyan-400/80 mb-2 tracking-[0.2em]">
                                METHOD: {task.method}
                              </div>
                            )}
                            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight text-lg tracking-tight">
                              {task.title}
                            </h4>
                          </div>
                          {task.isAI && (
                            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                              <Sparkles className="w-4 h-4 text-cyan-400" />
                            </div>
                          )}
                        </div>
                        
                        <p className="text-[14px] text-gray-400/80 mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {task.description || "Synthesizing execution path..."}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                            task.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-green-500/10 text-green-400 border-green-500/20'
                          }`}>
                            {task.priority}
                          </span>
                          {task.week && (
                            <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400 border border-white/10">
                              {task.week}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5 bg-gradient-to-t from-white/[0.03] to-transparent -mx-8 -mb-8 px-8 pb-8 mt-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white shadow-xl">
                              {task.assignee?.charAt(0) || 'U'}
                            </div>
                            <span className="text-[12px] font-semibold text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-tight">{task.assignee || 'Unassigned'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 group-hover:text-cyan-400/70 transition-colors">
                             <Clock className="w-4 h-4" />
                             <span className="text-[11px] font-bold uppercase tracking-widest">{task.due || 'ASAP'}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl my-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Fixed Header */}
              <div className="flex items-start justify-between p-4 md:p-8 pb-4 gap-4 border-b border-white/10 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 break-words">{selectedTask.title}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-lg ${getPriorityColor(selectedTask.priority)} text-xs font-medium uppercase`}>
                      {selectedTask.priority} Priority
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs capitalize">
                      {selectedTask.status.replace('-', ' ')}
                    </span>
                    {selectedTask.milestone && (
                      <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 text-cyan-400 text-xs flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {selectedTask.milestone}
                      </span>
                    )}
                    {selectedTask.tags?.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#06b6d4 transparent'
                }}
              >
              <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                  {/* Description */}
                  <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedTask.description || 'No description provided yet.'}
                    </p>
                  </div>

                  {/* Requirements */}
                  {selectedTask.requirements && selectedTask.requirements.length > 0 && (
                    <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {selectedTask.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Steps/Checklist */}
                  {selectedTask.steps && selectedTask.steps.length > 0 && (
                    <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                        Steps to Complete
                      </h3>
                      <div className="space-y-3">
                        {selectedTask.steps.map((step) => (
                          <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <input
                              type="checkbox"
                              checked={step.completed}
                              onChange={() => {}}
                              className="w-5 h-5 rounded border-2 border-cyan-500/50 bg-transparent checked:bg-cyan-500 cursor-pointer"
                            />
                            <span className={`flex-1 ${step.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                              {step.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-cyan-400 font-medium">
                            {selectedTask.steps.filter(s => s.completed).length} of {selectedTask.steps.length} completed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                    <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-4">Attachments</h3>
                      <div className="space-y-2">
                        {selectedTask.attachments.map((file, idx) => (
                          <a
                            key={idx}
                            href={file.url}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">{file.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  {selectedTask.comments && selectedTask.comments.length > 0 && (
                    <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-4">Comments</h3>
                      <div className="space-y-4">
                        {selectedTask.comments.map((comment, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                              {comment.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-gray-300">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4 md:space-y-6">
                  {/* Key Details */}
                  <div className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-4">Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Assignee</label>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                          <User className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={editAssignee}
                            onChange={(e) => setEditAssignee(e.target.value)}
                            placeholder="Unassigned"
                            className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Due Date</label>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={editDue}
                            onChange={(e) => setEditDue(e.target.value)}
                            placeholder="e.g. 25/03/2026 or ASAP"
                            className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none text-sm uppercase"
                          />
                        </div>
                      </div>
                      {selectedTask.createdDate && (
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-2">Created</label>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-white">{selectedTask.createdDate}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateTaskDetails}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (selectedTask) {
                          handleUpdateTaskStatus(selectedTask, 'done');
                        }
                      }}
                      className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                    >
                      Mark as Complete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (selectedTask && confirm('Are you sure you want to delete this task?')) {
                          handleDeleteTask(selectedTask);
                        }
                      }}
                      className="w-full px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
                    >
                      Delete Task
                    </motion.button>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Detail Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMilestone(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl my-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Fixed Header */}
              <div className="flex items-start justify-between p-4 md:p-8 pb-4 gap-4 border-b border-white/10 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-7 h-7 text-cyan-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white break-words">{selectedMilestone.title}</h2>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap mt-3">
                    {selectedMilestone.delayed && (
                      <span className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium">
                        Delayed
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Due: {selectedMilestone.due}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm">
                      {selectedMilestone.completed} / {selectedMilestone.tasks} tasks completed
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 custom-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#06b6d4 transparent'
                }}
              >
                {/* Tasks List */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      Tasks ({getTasksByMilestone(selectedMilestone.title).length})
                    </h3>
                    
                    {getTasksByMilestone(selectedMilestone.title).length === 0 ? (
                      <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-gray-400">No tasks assigned to this milestone yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getTasksByMilestone(selectedMilestone.title).map((task) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01, x: 4 }}
                            onClick={() => {
                              setSelectedMilestone(null);
                              setSelectedTask(task);
                            }}
                            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer group"
                          >
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors flex-1 text-[15px] leading-relaxed">
                                {task.title}
                              </h4>
                              <span className={`px-3 py-1.5 rounded-lg ${getPriorityColor(task.priority)} text-xs font-medium uppercase whitespace-nowrap`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            {task.description && (
                              <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">{task.description}</p>
                            )}

                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                              <div className="flex items-center gap-4">
                                {task.assignee && (
                                  <div className="flex items-center gap-2.5 text-sm text-gray-400">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                                      {task.assignee.charAt(0)}
                                    </div>
                                    <span>{task.assignee}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs capitalize ${
                                  task.status === 'done' ? 'text-green-400 border-green-500/30' :
                                  task.status === 'in-progress' ? 'text-cyan-400 border-cyan-500/30' :
                                  task.status === 'review' ? 'text-purple-400 border-purple-500/30' :
                                  'text-gray-400'
                                }`}>
                                  {task.status.replace('-', ' ')}
                                </span>
                                {task.due && (
                                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Clock className="w-4 h-4" />
                                    {task.due}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Task Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedMilestone(null);
                      setShowAddTaskModal(true);
                    }}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 text-cyan-400 font-medium hover:from-cyan-500/20 hover:to-purple-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Task to Milestone
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilterModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-2xl bg-[#02040a] border border-white/10 backdrop-blur-xl space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Filter Tasks</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {['All', 'Todo', 'In Progress', 'Review', 'Done'].map((status) => (
                    <motion.button
                      key={status}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFilter(status.toLowerCase().replace(' ', '-'))}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        filter === status.toLowerCase().replace(' ', '-')
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Low', 'Medium', 'High'].map((priority) => (
                    <motion.button
                      key={priority}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPriorityFilter(priority.toLowerCase())}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        priorityFilter === priority.toLowerCase()
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {priority}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFilter('all');
                    setPriorityFilter('all');
                    setShowFilterModal(false);
                  }}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                >
                  Apply Filter
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddTaskModal(false)}
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
                <h2 className="text-2xl font-bold text-white">Create New Task</h2>
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Add task description..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <select 
                      value={newTaskStatus}
                      onChange={(e) => setNewTaskStatus(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                    <select 
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Assignee</label>
                    <input
                      type="text"
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      placeholder="Assign to..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTaskDue}
                      onChange={(e) => setNewTaskDue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowAddTaskModal(false);
                      // Reset form
                      setNewTaskTitle('');
                      setNewTaskDescription('');
                      setNewTaskStatus('todo');
                      setNewTaskPriority('medium');
                      setNewTaskAssignee('');
                      setNewTaskDue('');
                    }}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    disabled={isAdding}
                    whileHover={!isAdding ? { scale: 1.02 } : {}}
                    whileTap={!isAdding ? { scale: 0.98 } : {}}
                    onClick={handleAddTask}
                    className={`flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium transition-all ${isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:from-cyan-400 hover:to-purple-500'}`}
                  >
                    {isAdding ? 'Creating...' : 'Create Task'}
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
