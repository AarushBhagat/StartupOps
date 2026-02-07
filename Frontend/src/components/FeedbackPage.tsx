import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Plus, 
  Link2, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles,
  Users,
  Calendar,
  Eye,
  Share2,
  X,
  CheckCircle,
  Target
} from 'lucide-react';

interface FeedbackRequest {
  id: string;
  title: string;
  responses: number;
  sentiment: number;
  status: 'active' | 'closed';
  created: string;
  type: 'internal' | 'external';
}

interface Response {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState<'collect' | 'responses'>('collect');
  const [selectedRequest, setSelectedRequest] = useState<FeedbackRequest | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    type: 'external',
    questions: ['']
  });

  const feedbackRequests: FeedbackRequest[] = [
    { id: '1', title: 'Payment Gateway Feature', responses: 20, sentiment: 85, status: 'active', created: 'Feb 1', type: 'external' },
    { id: '2', title: 'Mobile App Priority', responses: 15, sentiment: 70, status: 'active', created: 'Jan 28', type: 'external' },
    { id: '3', title: 'UI Redesign Feedback', responses: 12, sentiment: 60, status: 'closed', created: 'Jan 20', type: 'internal' },
  ];

  const responses: Response[] = [
    { id: '1', user: 'User #1', rating: 5, comment: 'This is a must-have feature! Would really help our workflow.', date: 'Feb 1' },
    { id: '2', user: 'User #2', rating: 4, comment: 'Would be great, but needs Stripe integration', date: 'Feb 1' },
    { id: '3', user: 'User #3', rating: 5, comment: 'Absolutely needed. Happy to beta test!', date: 'Feb 2' },
    { id: '4', user: 'User #4', rating: 3, comment: 'Nice to have, but not critical for us', date: 'Feb 2' },
  ];

  const addQuestion = () => {
    setNewFeedback({
      ...newFeedback,
      questions: [...newFeedback.questions, '']
    });
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...newFeedback.questions];
    newQuestions[index] = value;
    setNewFeedback({ ...newFeedback, questions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    setNewFeedback({
      ...newFeedback,
      questions: newFeedback.questions.filter((_, i) => i !== index)
    });
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
          Feedback & Validation
        </h1>
        <p className="text-gray-400">
          Collect feedback and validated learning from your users with AI-powered insights
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-8 border-b border-white/10"
      >
        <button
          onClick={() => {
            setActiveTab('collect');
            setSelectedRequest(null);
          }}
          className="relative px-6 py-3 font-medium transition-colors"
        >
          <span className={`${activeTab === 'collect' ? 'text-white' : 'text-gray-400'}`}>
            Collect Feedback
          </span>
          {activeTab === 'collect' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('responses')}
          className="relative px-6 py-3 font-medium transition-colors"
        >
          <span className={`${activeTab === 'responses' ? 'text-white' : 'text-gray-400'}`}>
            View Responses
          </span>
          {activeTab === 'responses' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      </motion.div>

      {/* Collect Feedback Tab */}
      {activeTab === 'collect' && !showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(true)}
            className="w-full p-12 rounded-2xl border-2 border-dashed border-white/10 hover:border-cyan-500/30 transition-colors group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Create New Feedback Request</h3>
                <p className="text-gray-400">
                  Collect insights from your team or customers with customizable questions
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Create Form */}
      {activeTab === 'collect' && showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create Feedback Request</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Topic/Question *
                </label>
                <input
                  type="text"
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  placeholder="e.g., Should we add payment gateway feature?"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setNewFeedback({ ...newFeedback, type: 'internal' })}
                    className={`flex-1 px-6 py-4 rounded-xl border transition-all ${
                      newFeedback.type === 'internal'
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">Internal</div>
                    <div className="text-xs text-gray-400">Team only</div>
                  </button>
                  <button
                    onClick={() => setNewFeedback({ ...newFeedback, type: 'external' })}
                    className={`flex-1 px-6 py-4 rounded-xl border transition-all ${
                      newFeedback.type === 'external'
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <Share2 className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">External</div>
                    <div className="text-xs text-gray-400">Shareable link</div>
                  </button>
                </div>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Questions
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addQuestion}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {newFeedback.questions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3"
                    >
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder={`Question ${index + 1}`}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      {newFeedback.questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(index)}
                          className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
                >
                  <Link2 className="w-5 h-5" />
                  <span>Generate Shareable Link</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                  Save Draft
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* View Responses Tab */}
      {activeTab === 'responses' && !selectedRequest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6"
        >
          {feedbackRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => setSelectedRequest(request)}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {request.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      {request.responses} responses
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      Created {request.created}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      request.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {request.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      request.type === 'internal'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {request.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">{request.sentiment}%</div>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Positive</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRequest(request);
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Link</span>
                </motion.button>
                {request.status === 'active' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Close
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detail View with AI Analysis */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Back Button */}
          <button
            onClick={() => setSelectedRequest(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>← Back to List</span>
          </button>

          {/* Header */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white mb-4">{selectedRequest.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 text-gray-400">
                <MessageSquare className="w-4 h-4" />
                {selectedRequest.responses} responses
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                Created {selectedRequest.created}
              </span>
              <span className={`px-3 py-1 rounded-full ${
                selectedRequest.status === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {selectedRequest.status}
              </span>
            </div>
          </div>

          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Analysis</h3>
            </div>

            <div className="space-y-6">
              {/* Sentiment Score */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">Overall Sentiment</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{selectedRequest.sentiment}/100</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      Positive ✓
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedRequest.sentiment}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                  />
                </div>
              </div>

              {/* Key Themes */}
              <div>
                <h4 className="font-bold text-white mb-3">Key Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {['Payment flexibility', 'Trust & security', 'Multiple options'].map((theme, index) => (
                    <motion.span
                      key={theme}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/10 text-gray-300 text-sm"
                    >
                      • {theme}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Recommendation
                </h4>
                <p className="text-gray-300 mb-4">
                  Strong validation! 17/20 users want this feature. Consider adding to your roadmap as high priority.
                  The feedback indicates strong demand for payment flexibility and security.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                >
                  Create Milestone from This
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Individual Responses */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Individual Responses</h3>
            {responses.map((response, index) => (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-sm">
                      {response.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{response.user}</div>
                      <div className="text-sm text-gray-400">{response.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < response.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{response.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
