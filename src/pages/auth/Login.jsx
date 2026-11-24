import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Eye, EyeOff, Shield, BookOpen, Users, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const demoCredentials = [
  { role: 'Admin', username: 'admin', password: 'admin123', icon: Shield, color: 'from-blue-500 to-blue-600', description: 'Full system access' },
  { role: 'Principal', username: 'principal', password: 'principal123', icon: UserCheck, color: 'from-purple-500 to-purple-600', description: 'School management' },
  { role: 'Teacher', username: 'teacher1', password: 'teacher123', icon: BookOpen, color: 'from-green-500 to-green-600', description: 'Class & student management' },
  { role: 'Parent', username: 'parent1', password: 'parent123', icon: Users, color: 'from-orange-500 to-orange-600', description: 'View child progress' },
  { role: 'Student', username: 'student1', password: 'student123', icon: User, color: 'from-teal-500 to-teal-600', description: 'View academics & results' },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleQuickLogin = (cred) => {
    setUsername(cred.username);
    setPassword(cred.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <GraduationCap className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white">EduManager</h1>
          <p className="text-blue-200 mt-1">School Education Management System</p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {demoCredentials.map((cred) => (
            <button
              key={cred.role}
              onClick={() => handleQuickLogin(cred)}
              className={`bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl p-3 text-center hover:bg-opacity-20 transition-all group`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${cred.color} mb-2`}>
                <cred.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-white">{cred.role}</p>
              <p className="text-xs text-blue-200 mt-0.5">{cred.username}</p>
            </button>
          ))}
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-1">Sign In</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Enter your credentials or click a role above for demo</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-semibold text-blue-700 mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-1">
              {demoCredentials.map((cred) => (
                <p key={cred.role} className="text-xs text-blue-600">
                  <span className="font-medium">{cred.role}:</span> {cred.username} / {cred.password}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-blue-200 text-sm mt-6">
          &copy; 2026 EduManager. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
