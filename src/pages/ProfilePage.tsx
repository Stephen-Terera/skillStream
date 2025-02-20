import { motion } from 'framer-motion';
import { User, Mail, Calendar, Book, Award, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="cosmic-card mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[var(--accent-primary)]"
              />
              <button className="absolute bottom-0 right-0 cosmic-button p-2">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{user?.username || 'User'}</h1>
              <div className="flex flex-col space-y-2 text-[var(--text-secondary)]">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email || 'email@example.com'}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined February 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="cosmic-card"
          >
            <Book className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            <p className="text-3xl font-bold text-[var(--accent-primary)]">12</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="cosmic-card"
          >
            <Award className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold">Certificates</h3>
            <p className="text-3xl font-bold text-[var(--accent-primary)]">3</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="cosmic-card"
          >
            <User className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold">Study Groups</h3>
            <p className="text-3xl font-bold text-[var(--accent-primary)]">5</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/courses" className="cosmic-card group">
            <Book className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Continue Learning</h3>
            <p className="text-[var(--text-secondary)]">Resume your latest course or start a new one.</p>
          </Link>

          <Link to="/settings" className="cosmic-card group">
            <Settings className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-[var(--text-secondary)]">Update your profile and preferences.</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}