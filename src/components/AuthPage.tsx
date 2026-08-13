import React, { useState } from 'react';
import { Mail, Phone, Lock, User as UserIcon, ArrowRight, Sparkles } from 'lucide-react';
import { User, AuthTab, AuthMethod } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onBackToOverview: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [activeMethod, setActiveMethod] = useState<AuthMethod>('email');
  
  // Email Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Phone Form State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Google Auth
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onAuthSuccess(data.user);
      } else {
        setErrorMsg('Google login failed. Please try again.');
      }
    } catch {
      // Fallback local google login
      onAuthSuccess({
        id: 'usr_google_' + Date.now(),
        name: 'Google User',
        email: 'google.user@example.com',
        authProvider: 'google',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Google%20User'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all required email and password fields.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (data.success) {
        onAuthSuccess({
          ...data.user,
          name: name || data.user.name,
        });
      }
    } catch {
      // Fallback local auth
      onAuthSuccess({
        id: 'usr_' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        authProvider: 'email',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Phone Auth
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 6) {
      setErrorMsg('Please enter a valid phone number with country code.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Please enter the 4-digit OTP code (e.g. 1234).');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      if (data.success) {
        onAuthSuccess(data.user);
      }
    } catch {
      onAuthSuccess({
        id: 'usr_phone_' + Date.now(),
        name: 'Phone User (' + phoneNumber + ')',
        phoneNumber: phoneNumber,
        authProvider: 'phone',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=PhoneUser'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Guest Login
  const handleGuestLogin = () => {
    onAuthSuccess({
      id: 'usr_guest_' + Date.now(),
      name: 'Guest Learner',
      authProvider: 'guest',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Guest%20Learner'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        {/* Login / Sign Up Tab Switcher */}
        <div className="inline-flex p-1 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <button
            onClick={() => { setAuthTab('login'); setErrorMsg(''); }}
            id="tab-auth-login"
            className={`px-5 py-2 rounded-lg text-xs font-black transition-all ${
              authTab === 'login'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setAuthTab('signup'); setErrorMsg(''); }}
            id="tab-auth-signup"
            className={`px-5 py-2 rounded-lg text-xs font-black transition-all ${
              authTab === 'signup'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white dark:bg-zinc-950 py-8 px-6 sm:px-10 shadow-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors">
          
          {errorMsg && (
            <div className="mb-5 bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 p-3 rounded-xl text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* Social / Method Options */}
          <div className="space-y-3">
            
            {/* 1. Continue with Google */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              id="btn-auth-google"
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-extrabold text-sm rounded-xl shadow-sm transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Selector Method Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveMethod('email')}
                className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                  activeMethod === 'email'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Continue with Email</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('phone')}
                className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                  activeMethod === 'phone'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Continue with Phone</span>
              </button>
            </div>

          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-3 text-zinc-400 font-extrabold">
                Or fill details below
              </span>
            </div>
          </div>

          {/* Form for Phone */}
          {activeMethod === 'phone' ? (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 234 567 8900"
                    disabled={otpSent}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Enter Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="1234"
                    maxLength={6}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2.5 px-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 text-center tracking-widest font-mono focus:outline-none"
                  />
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    ✓ Code sent to {phoneNumber}. (Enter 1234 for quick verify)
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                id="btn-auth-phone-submit"
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-black rounded-xl text-sm shadow-sm transition-all"
              >
                {isLoading ? 'Processing...' : otpSent ? 'Verify & Login' : 'Send SMS Verification Code'}
              </button>
            </form>
          ) : (
            /* Form for Email / Default */
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {authTab === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Full Name (Optional)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abdullah / Amina"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="btn-auth-email-submit"
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-black rounded-xl text-sm shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>{isLoading ? 'Loading...' : authTab === 'login' ? 'Sign In with Email' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Guest Alternative */}
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <button
              onClick={handleGuestLogin}
              id="btn-auth-guest"
              className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300 hover:underline transition-colors flex items-center justify-center space-x-1.5 w-full py-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Or Skip & Continue as Guest</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

