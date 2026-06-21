import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { Compass, Star, MapPin, Mail, Phone, ArrowLeft } from 'lucide-react';

// Minimal brand-neutral OAuth glyph (Google has no official lucide-react icon)
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.95z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" />
  </svg>
);

const LoginPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  // 'choose' -> 'email' | 'phone' (collect identifier) -> 'code' (verify OTP)
  const [mode, setMode] = useState('email'); // default tab: email
  const [step, setStep] = useState('identifier'); // 'identifier' | 'code'
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFlow = () => {
    setStep('identifier');
    setIdentifier('');
    setCode('');
    setError('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    resetFlow();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isLoaded || !identifier.trim()) return;

    setError('');
    setIsSubmitting(true);

    try {
      await signIn.create({ identifier: identifier.trim() });

      if (mode === 'email') {
        await signIn.emailCode.sendCode();
      } else {
        await signIn.phoneCode.sendCode();
      }

      setStep('code');
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "We couldn't find an account with those details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!isLoaded || !code.trim()) return;

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: mode === 'email' ? 'email_code' : 'phone_code',
        code: code.trim(),
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        window.location.href = '/dashboard';
      } else {
        console.log(result);
        setError('Additional verification is required to finish signing in.');
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'That code didn\'t work. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback', // must exist as a route that calls Clerk's handleRedirectCallback
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans">

      {/* Left: branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1753810809056-4d5ddb6eeca2?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80"
          alt="Amsterdam canal at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#007ACC]/80 via-[#0F172A]/60 to-[#0F172A]/80" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full animate-[fadeIn_0.6s_ease-out]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-8 border border-white/20">
              <span className="text-sm leading-none">✦</span>
              Travel Smarter
            </div>

            <h1 className="text-[40px] font-bold text-white leading-[1.15] mb-5 max-w-md">
              Your next adventure starts here.
            </h1>

            <p className="text-[15px] text-white/85 leading-relaxed max-w-sm">
              Discover amazing hotels, compare options effortlessly, and let Sally help you find the perfect stay.
            </p>
          </div>

          {/* Glassmorphism floating card */}
          <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl p-5 max-w-xs shadow-2xl">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 mb-3">
              <span>✨</span>
              Sally's Recommendation
            </div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-white/80" />
              <p className="text-white font-bold text-[15px]">Amsterdam Grand Hotel</p>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-3.5 h-3.5 text-white/30" />
            </div>
            <p className="text-white font-semibold text-[14px] mb-2">€95/night</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-white/90 bg-white/15 px-2 py-0.5 rounded-md">Great location</span>
              <span className="text-[11px] text-white/90 bg-white/15 px-2 py-0.5 rounded-md">Breakfast included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-[fadeIn_0.6s_ease-out]">

          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">CheckInn</span>
          </div>

          <h2 className="text-[26px] font-bold text-[#0F172A] mb-2">Welcome Back</h2>
          <p className="text-[14.5px] text-slate-500 mb-8">Sign in to continue your journey.</p>

          {error && (
            <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
              {error}
            </div>
          )}

          {step === 'identifier' ? (
            <>
              {/* Email / Phone tabs */}
              <div className="flex gap-1.5 bg-slate-100 rounded-xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode('email')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-[13.5px] font-medium py-2 rounded-lg transition-all duration-200 ${
                    mode === 'email' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('phone')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-[13.5px] font-medium py-2 rounded-lg transition-all duration-200 ${
                    mode === 'phone' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Phone
                </button>
              </div>

              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label htmlFor="identifier" className="block text-[13px] font-medium text-[#0F172A] mb-1.5">
                    {mode === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <input
                    id="identifier"
                    type={mode === 'email' ? 'email' : 'tel'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder={mode === 'email' ? 'you@example.com' : '+1 234 567 8900'}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200"
                  />
                  {mode === 'phone' && (
                    <p className="text-[12px] text-slate-400 mt-1.5">Use international format, e.g. +31 6 1234 5678</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isLoaded}
                  className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)]"
                >
                  {isSubmitting ? 'Sending code…' : 'Continue'}
                </button>
              </form>

              <div className="flex items-center gap-3 my-7">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[12px] text-slate-400 font-medium">Or continue with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 rounded-xl py-3.5 transition-all duration-200"
              >
                <GoogleIcon className="w-4 h-4" />
                <span className="text-[14px] font-medium text-[#0F172A]">Continue with Google</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <button
                type="button"
                onClick={resetFlow}
                className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#0F172A] transition-colors duration-200 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <div>
                <label htmlFor="code" className="block text-[13px] font-medium text-[#0F172A] mb-1.5">
                  Verification Code
                </label>
                <p className="text-[13px] text-slate-500 mb-3">
                  We sent a code to <span className="font-medium text-[#0F172A]">{identifier}</span>
                </p>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="123456"
                  autoFocus
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[18px] tracking-[0.3em] text-center text-[#0F172A] placeholder:text-slate-300 placeholder:tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isLoaded}
                className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)]"
              >
                {isSubmitting ? 'Verifying…' : 'Verify & Sign In'}
              </button>
            </form>
          )}

          <p className="text-center text-[13.5px] text-slate-500 mt-8">
            Don't have an account?{' '}
            <a href="/signup" className="font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">
              Create Account
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;