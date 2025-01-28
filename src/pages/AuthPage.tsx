import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, Building, User, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  companyName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  companyName?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    // Additional signup validations
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (accountType === 'business' && !formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with authentication
    try {
      // Authentication logic here
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="cosmic-card">
          {/* Toggle Buttons */}
          <div className="flex mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center rounded-l-lg transition-all duration-300 ${
                isLogin
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500/10 hover:bg-blue-500/20'
              }`}
            >
              <LogIn className="w-5 h-5 mx-auto mb-1" />
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center rounded-r-lg transition-all duration-300 ${
                !isLogin
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500/10 hover:bg-blue-500/20'
              }`}
            >
              <UserPlus className="w-5 h-5 mx-auto mb-1" />
              Sign Up
            </button>
          </div>

          {/* Account Type Selection */}
          {!isLogin && (
            <div className="mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setAccountType('individual')}
                  className={`flex-1 p-3 rounded-lg transition-all duration-300 ${
                    accountType === 'individual'
                      ? 'cosmic-card bg-blue-500/20'
                      : 'cosmic-card hover:bg-blue-500/10'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span>Individual</span>
                </button>
                <button
                  onClick={() => setAccountType('business')}
                  className={`flex-1 p-3 rounded-lg transition-all duration-300 ${
                    accountType === 'business'
                      ? 'cosmic-card bg-blue-500/20'
                      : 'cosmic-card hover:bg-blue-500/10'
                  }`}
                >
                  <Building className="w-6 h-6 mx-auto mb-2" />
                  <span>Business</span>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && accountType === 'business' && (
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="cosmic-input w-full pl-10"
                    placeholder="Enter company name"
                  />
                </div>
                {errors.companyName && (
                  <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="cosmic-input w-full pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="cosmic-input w-full pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="cosmic-input w-full pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="cosmic-input w-full pl-10 pr-10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full cosmic-button justify-center py-3 text-lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-blue-400 hover:text-blue-300">
              {isLogin ? 'Forgot password?' : 'Already have an account?'}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}