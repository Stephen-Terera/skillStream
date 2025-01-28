import { motion } from 'framer-motion';
import { Eye, Languages } from 'lucide-react';
import { usePreferences } from '../hooks/usePreferences';

export default function PreferencesPanel() {
  const { preferences, setAccessibilityPreference, setLanguagePreference } = usePreferences();

  return (
    <motion.div className="cosmic-card">
      <h2 className="text-2xl font-bold mb-6">Accessibility</h2>

      {/* High Contrast */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Eye className="mr-2" size={20} />
          Visual Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span>High Contrast</span>
            <input
              type="checkbox"
              checked={preferences.accessibility.highContrast}
              onChange={(e) => setAccessibilityPreference({ highContrast: e.target.checked })}
              className="cosmic-input"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Reduced Motion</span>
            <input
              type="checkbox"
              checked={preferences.accessibility.reducedMotion}
              onChange={(e) => setAccessibilityPreference({ reducedMotion: e.target.checked })}
              className="cosmic-input"
            />
          </label>

          <div>
            <label className="block mb-2">Font Size</label>
            <select
              value={preferences.accessibility.fontSize}
              onChange={(e) => setAccessibilityPreference({ 
                fontSize: e.target.value as 'small' | 'medium' | 'large' 
              })}
              className="cosmic-input w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </section>

      {/* Language */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Languages className="mr-2" size={20} />
          Language
        </h3>
        <select
          value={preferences.language}
          onChange={(e) => setLanguagePreference(e.target.value as 'en-GB' | 'en-US')}
          className="cosmic-input w-full"
        >
          <option value="en-GB">English (UK)</option>
          <option value="en-US">English (US)</option>
        </select>
      </section>
    </motion.div>
  );
}