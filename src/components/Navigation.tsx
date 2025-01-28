import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, GraduationCap, BookOpen, MessageSquare, LayoutDashboard, 
  Map, LogIn, Users, BookMarked, Bell, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'chat',
      message: 'New message from Sarah Chen',
      time: '2m ago',
      read: false,
      link: '/chat/sarah-chen'
    },
    {
      id: 2,
      type: 'study',
      message: 'Web Development study session starting in 15 minutes',
      time: '5m ago',
      read: false,
      link: '/study-groups/web-dev'
    },
    {
      id: 3,
      type: 'system',
      message: 'Your course "React Masterclass" has been updated',
      time: '1h ago',
      read: true,
      link: '/courses/react-masterclass'
    }
  ]);
  const location = useLocation();

  const menuItems = [
    { icon: GraduationCap, label: 'Tutors', path: '/tutors' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'SkillMap', path: '/skillmap' },
    { icon: Users, label: 'Study Groups', path: '/study-groups' },
    { icon: BookMarked, label: 'Notes', path: '/notes' },
    { icon: Settings, label: 'Preferences', path: '/preferences' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (id: number, link: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setShowNotifications(false);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1026]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent 
                           transition-all duration-300 group-hover:from-purple-400 group-hover:to-blue-500">
                SkillStream
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="text-white hover:text-blue-400 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 cosmic-card z-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          Mark all as read
                        </button>
                        <button 
                          onClick={handleClearNotifications}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <Link
                          key={notification.id}
                          to={notification.link}
                          onClick={() => handleNotificationClick(notification.id, notification.link)}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`p-3 rounded-lg cursor-pointer transition-colors
                              ${notification.read ? 'bg-blue-500/5' : 'bg-blue-500/10'}
                              hover:bg-blue-500/20`}
                          >
                            <div className="flex justify-between items-start">
                              <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                                {notification.message}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                    {notifications.length === 0 && (
                      <p className="text-center text-gray-400 py-4">No notifications</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/auth"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:from-purple-500 hover:to-blue-600 transition-all duration-300"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-16 left-0 w-64 h-screen bg-[#0B1026]/95 backdrop-blur-sm"
          >
            <div className="p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300
                            ${location.pathname === item.path 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'text-white hover:bg-blue-500/10 hover:text-blue-400'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}