import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateDisplay } from '../store/slices/userPreferencesSlice';
import type { RootState } from '../store/store';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.userPreferences.display);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(updateDisplay({ theme: newTheme }));
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="cosmic-button"
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
}