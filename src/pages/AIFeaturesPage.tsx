import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Book, Code, BarChart2, Target } from 'lucide-react';
import { 
  AIChat, 
  StudyPlanGenerator, 
  QuizGenerator, 
  CodeReview, 
  LearningAnalytics 
} from '../components/AIFeatures';

type AIFeature = 'chat' | 'study-plan' | 'quiz' | 'code-review' | 'analytics';

export default function AIFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<AIFeature>('chat');

  const features = [
    { id: 'chat', label: 'AI Assistant', icon: Bot },
    { id: 'study-plan', label: 'Study Plan', icon: Target },
    { id: 'quiz', label: 'Quiz Generator', icon: Book },
    { id: 'code-review', label: 'Code Review', icon: Code },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">AI Learning Tools</h1>
        <p className="text-gray-400">
          Enhance your learning experience with our AI-powered tools
        </p>
      </motion.div>

      {/* Feature Selection */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id as AIFeature)}
            className={`cosmic-button whitespace-nowrap ${
              activeFeature === feature.id ? 'bg-blue-500' : ''
            }`}
          >
            <feature.icon size={20} />
            <span>{feature.label}</span>
          </button>
        ))}
      </div>

      {/* Feature Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="min-h-[600px]"
        >
          {activeFeature === 'chat' && <AIChat />}
          {activeFeature === 'study-plan' && <StudyPlanGenerator />}
          {activeFeature === 'quiz' && <QuizGenerator />}
          {activeFeature === 'code-review' && <CodeReview />}
          {activeFeature === 'analytics' && <LearningAnalytics />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}