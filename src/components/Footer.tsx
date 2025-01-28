import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1026]/90 backdrop-blur-sm border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SkillStream
            </h3>
            <p className="text-gray-400 mb-4">
              Empowering learners worldwide with personalised education and collaborative learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tutors
                </Link>
              </li>
              <li>
                <Link to="/study-groups" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Study Groups
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <a href="mailto:support@skillstream.com" className="hover:text-blue-400 transition-colors">
                  support@skillstream.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <a href="tel:+441234567890" className="hover:text-blue-400 transition-colors">
                  +44 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={18} />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-500/20 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkillStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}