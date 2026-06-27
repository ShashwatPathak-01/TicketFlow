import { useState } from 'react';
import { LockClosedIcon, UserIcon, KeyIcon, EnvelopeIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { loginUser, registerUser } from "../api/authApi";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register-only fields
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('Employee');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const resetExtraFields = () => {
    setName('');
    setRole('Employee');
    setError('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setPassword('');
    resetExtraFields();
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === 'register' && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    setStatusMessage(
      mode === "login"
        ? "Signing in..."
        : "Creating your account..."
    );

    const wakingTimer = setTimeout(() => {
      setStatusMessage(
        "Our backend is hosted on Render's free tier and may be waking up. This usually takes 30–60 seconds. Please don't refresh the page."
      );
    }, 4000);

    try {
      if (mode === "login") {
        const data = await loginUser({
          email,
          password,
        });

        localStorage.setItem("token", data.token);
        onLogin(data.user);

      } else {
        await registerUser({
          name,
          email,
          password,
          role,
          department,
        });

      setStatusMessage("✅ Account created successfully! Please sign in.");

        setTimeout(() => {
          setPassword("");
          switchMode("login");
          setStatusMessage("");
        }, 2000);
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        (mode === "login"
          ? "Login failed"
          : "Registration failed")
      );
    } finally {
        clearTimeout(wakingTimer);
        setSubmitting(false);
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
          <p className="text-gray-600 mt-2">
            {mode === 'login'
              ? 'Sign in to manage your support tickets'
              : 'Create an account to get started'}
          </p>
        </div>

        {/* Demo Credentials */}
        {mode === 'login' && showDemo && (
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
            {statusMessage && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <svg
                  className="animate-spin h-4 w-4 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  />
                </svg>

                <span>{statusMessage}</span>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  minLength={mode === 'register' ? 6 : undefined}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      minLength={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Sales, Finance, IT"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee (raise &amp; track your own tickets)</option>
                    <option value="SupportAgent">Support Agent (handle assigned tickets)</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LockClosedIcon className="h-5 w-5" />
              <span>
                {submitting
                  ? (mode === 'login' ? 'Signing In...' : 'Creating Account...')
                  : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </span>
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  disabled={submitting}
                  onClick={() => switchMode("register")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  disabled={submitting}
                  onClick={() => switchMode('login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {mode === 'login' && !showDemo && (
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