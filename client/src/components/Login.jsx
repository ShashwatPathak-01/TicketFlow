import { useState } from 'react';
import { LockClosedIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import { loginUser } from "../api/authApi";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({
        email,
        password,
    });
    console.log(data);

      localStorage.setItem("token", data.token);
      console.log(localStorage.getItem("token"));

      onLogin(data.user);

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <LockClosedIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Ticket System</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your support tickets</p>
        </div>

        {/* Demo Credentials */}
        {showDemo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold text-blue-900">Demo Credentials</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Hide
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Please wait after clicking on signin button as the backend deployed on render it may take some time to get activated</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Admin Account</p>
                    <p className="text-sm font-semibold text-gray-900">admin@test.com/123456</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Can manage all tickets and assign tasks</p>
              </div>
              <div className="bg-white rounded p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">User Account</p>
                    <p className="text-sm font-semibold text-gray-900">john@test.com/123456</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Can create and view own tickets</p>
              </div>
              <div className="bg-white rounded p-3 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">supportIT Account</p>
                    <p className="text-sm font-semibold text-gray-900">rahul@test.com/123456</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Can manage all tickets and assign tasks</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <LockClosedIcon className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          </form>

          {!showDemo && (
            <button
              onClick={() => setShowDemo(true)}
              className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800"
            >
              Show demo credentials
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact IT Support at{' '}
            <a href="mailto:support@company.com" className="text-blue-600 hover:text-blue-800">
              support@company.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
