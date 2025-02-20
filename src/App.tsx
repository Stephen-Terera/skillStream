import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import AppRoutes from './routes';
import type { RootState } from './store/store';

export default function App() {
  const location = useLocation();
  const { theme } = useSelector((state: RootState) => state.userPreferences.display);

  // Apply theme class to root element
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 pt-16 pb-16 md:pb-0">
          <AppRoutes />
        </main>
        <Footer />
        <MobileNavigation />
      </div>
    </div>
  );
}