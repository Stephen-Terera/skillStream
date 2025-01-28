import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon, Bell, Clock, Settings, Languages, Eye, Palette, Layout, Book } from 'lucide-react';
import PreferencesPanel from '../components/PreferencesPanel';
import ThemeToggle from '../components/ThemeToggle';
import type { RootState } from '../store/store';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function PreferencesPage() {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.userPreferences);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Preferences</h1>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Preferences */}
          <PreferencesPanel />

          {/* Display Preferences */}
          <motion.div
            variants={pageVariants}
            className="cosmic-card"
          >
            <h2 className="text-2xl font-bold mb-6">Display Settings</h2>

            {/* Theme */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Palette className="mr-2" size={20} />
                Theme
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 cosmic-card">
                  <div className="flex items-center space-x-2">
                    <Sun className="text-yellow-400" size={20} />
                    <span>Light Mode</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="text-blue-400" size={20} />
                    <span>Dark Mode</span>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </section>

            {/* Layout */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Layout className="mr-2" size={20} />
                Layout
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span>Compact View</span>
                  <input
                    type="checkbox"
                    className="cosmic-input"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Show Sidebar</span>
                  <input
                    type="checkbox"
                    className="cosmic-input"
                  />
                </label>
              </div>
            </section>

            {/* Learning Preferences */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Book className="mr-2" size={20} />
                Learning Experience
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span>Show Progress Indicators</span>
                  <input
                    type="checkbox"
                    className="cosmic-input"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Enable Gamification</span>
                  <input
                    type="checkbox"
                    className="cosmic-input"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Show Achievement Notifications</span>
                  <input
                    type="checkbox"
                    className="cosmic-input"
                  />
                </label>
              </div>
            </section>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}