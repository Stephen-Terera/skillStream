import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { fetchAIResponse } from '../store/slices/aiSlice';
import type { RootState } from '../store/store';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const dispatch = useDispatch();
  const { chatHistory, isLoading } = useSelector((state: RootState) => state.ai);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      dispatch(fetchAIResponse(prompt));
      setPrompt('');
    }
  };

  return (
    <div className="cosmic-card h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold">SkillStream AI Assistant</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto space-y-4 mb-4"
      >
        <AnimatePresence>
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex space-x-2 ${
                chat.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!chat.isUser && <Bot className="text-blue-400" size={20} />}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  chat.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-500/10'
                }`}
              >
                {chat.message}
              </div>
              {chat.isUser && <User className="text-blue-400" size={20} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything about SkillStream..."
          className="cosmic-input flex-1"
          aria-label="AI prompt input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="cosmic-button"
          disabled={isLoading}
          aria-label="Send message"
        >
          <Send size={20} />
        </motion.button>
      </form>
    </div>
  );
}