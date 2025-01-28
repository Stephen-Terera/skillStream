import { motion } from 'framer-motion';
import { Users, Plus, Search, Video, MessageSquare, Share2, Settings, Calendar } from 'lucide-react';
import { useState } from 'react';

const studyGroups = [
  {
    id: 1,
    name: 'Web Development Mastermind',
    category: 'Technology',
    members: 15,
    activeSession: true,
    description: 'A group focused on modern web development practices and technologies.',
    nextSession: '2024-03-20T18:00:00Z'
  },
  {
    id: 2,
    name: 'Healthcare Management Study Circle',
    category: 'Healthcare',
    members: 8,
    activeSession: false,
    description: 'Discussion group for healthcare management professionals and students.',
    nextSession: '2024-03-22T17:00:00Z'
  }
];

export default function StudyGroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Study Groups</h1>
        <p className="text-gray-400">Connect, collaborate, and learn together</p>
      </motion.div>

      {/* Actions Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="cosmic-button">
          <Plus size={20} />
          <span>Create Group</span>
        </button>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search study groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cosmic-input w-full pl-10"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="cosmic-input"
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* Study Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyGroups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            className="cosmic-card"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              {group.activeSession && (
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  Live Session
                </span>
              )}
            </div>

            <p className="text-gray-400 mb-4">{group.description}</p>

            <div className="flex items-center space-x-4 mb-4">
              <span className="flex items-center space-x-1 text-sm text-gray-400">
                <Users size={16} />
                <span>{group.members} members</span>
              </span>
              <span className="flex items-center space-x-1 text-sm text-gray-400">
                <Calendar size={16} />
                <span>Next: {new Date(group.nextSession).toLocaleDateString()}</span>
              </span>
            </div>

            <div className="flex space-x-2">
              <button className="cosmic-button flex-1">
                <Video size={18} />
                <span>Join Session</span>
              </button>
              <button className="cosmic-button">
                <MessageSquare size={18} />
              </button>
              <button className="cosmic-button">
                <Share2 size={18} />
              </button>
              <button className="cosmic-button">
                <Settings size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}