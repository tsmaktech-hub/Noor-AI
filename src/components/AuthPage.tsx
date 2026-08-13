import React, { useState } from 'react';
import { Mail, Phone, Lock, User as UserIcon, ArrowRight, ShieldCheck, Sparkles, Check, Moon } from 'lucide-react';
import { User, AuthTab, AuthMethod } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onBackToOverview: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onBackToOverview }) => {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        {/* Login / Sign Up Tab Switcher */}
        <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => { setAuthTab('login'); setErrorMsg(''); }}
            id="tab-auth-login"
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              authTab === 'login'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setAuthTab('signup'); setErrorMsg(''); }}
            id="tab-auth-signup"
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              authTab === 'signup'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-800">
          
          {errorMsg && (
            <div className="mb-5 bg-rose-950/80 border border-rose-800 text-rose-300 p-3 rounded-xl text-xs font-medium">
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
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-medium text-sm rounded-xl shadow-md transition-all group"
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
                className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  activeMethod === 'email'
                    ? 'bg-slate-800 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Continue with Email</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMethod('phone')}
                className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  activeMethod === 'phone'
                    ? 'bg-slate-800 border-blue-500 text-blue-300 shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Continue with Phone</span>
              </button>
            </div>

          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-semibold">
                Or fill details below
              </span>
            </div>
          </div>

          {/* Form for Phone */}
          {activeMethod === 'phone' ? (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 234 567 8900"
                    disabled={otpSent}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Enter Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="1234"
                    maxLength={6}
                    className="w-full bg-slate-950 border border-blue-500/50 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-600 text-center tracking-widest font-mono focus:outline-none"
                  />
                  <p className="text-[11px] text-blue-400 mt-1">
                    ✓ Code sent to {phoneNumber}. (Enter 1234 for quick verify)
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                id="btn-auth-phone-submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl text-sm shadow-md transition-all"
              >
                {isLoading ? 'Processing...' : otpSent ? 'Verify & Login' : 'Send SMS Verification Code'}
              </button>
            </form>
          ) : (
            /* Form for Email / Default */
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {authTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name (Optional)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abdullah / Amina"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="btn-auth-email-submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{isLoading ? 'Loading...' : authTab === 'login' ? 'Sign In with Email' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Guest Alternative */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <button
              onClick={handleGuestLogin}
              id="btn-auth-guest"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center space-x-1.5 w-full py-2 bg-slate-950/60 rounded-lg border border-slate-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Or Skip & Continue as Guest</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
