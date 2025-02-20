import { motion } from 'framer-motion';
import { Sun, Moon, Globe, Eye, Bell, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplay, updateAccessibility } from '../store/slices/userPreferencesSlice';
import type { RootState } from '../store/store';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.userPreferences);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Appearance */}
          <section className="cosmic-card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Appearance
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Theme</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Choose your preferred theme</p>
                </div>
                <button
                  onClick={() => dispatch(updateDisplay({ 
                    theme: preferences.display.theme === 'light' ? 'dark' : 'light' 
                  }))}
                  className="cosmic-button"
                >
                  {preferences.display.theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <span>{preferences.display.theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">High Contrast</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Increase contrast for better visibility</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.accessibility.highContrast}
                    onChange={(e) => dispatch(updateAccessibility({ 
                      highContrast: e.target.checked 
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Language */}
          <section className="cosmic-card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language
            </h2>
            
            <div className="space-y-4">
              <select className="cosmic-input">
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>
          </section>

          {/* Notifications */}
          <section className="cosmic-card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              {['Course updates', 'Study group messages', 'Assessment reminders'].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section className="cosmic-card">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </h2>
            
            <div className="space-y-4">
              <button className="cosmic-button w-full justify-center">
                Change Password
              </button>
              <button className="cosmic-button w-full justify-center">
                Enable Two-Factor Authentication
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}