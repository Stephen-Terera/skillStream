import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TutorsPage from './pages/TutorsPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import SkillMapPage from './pages/SkillMapPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import NotesPage from './pages/NotesPage';
import PreferencesPage from './pages/PreferencesPage';
import AuthPage from './pages/AuthPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import SubscriptionPage from './pages/SubscriptionPage';
import type { RootState } from './store/store';

// ScrollToTop component to handle navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isLoading, accessibility, display } = useSelector((state: RootState) => state.userPreferences);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', accessibility.highContrast);
    document.documentElement.classList.toggle('reduce-motion', accessibility.reducedMotion);
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    document.documentElement.classList.add({
      'small': 'text-sm',
      'medium': 'text-base',
      'large': 'text-lg'
    }[accessibility.fontSize]);
    document.documentElement.classList.toggle('light', display.theme === 'light');
  }, [accessibility, display]);

  if (initialLoading || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen">
        <ParticleBackground />
        <div className="relative z-10">
          <Navigation />
          <main className="min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/tutors" element={<TutorsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/skillmap" element={<SkillMapPage />} />
              <Route path="/study-groups" element={<StudyGroupsPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/preferences" element={<PreferencesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}