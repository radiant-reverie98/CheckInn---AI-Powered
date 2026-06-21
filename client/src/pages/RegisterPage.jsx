import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Compass, CheckCircle2, MapPin, Mail, Phone, ArrowLeft, User } from 'lucide-react';

const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.95z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" />
  </svg>
);

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [mode, setMode] = useState('email'); // 'email' | 'phone'
  const [step, setStep] = useState('details'); // 'details' | 'code'
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetFlow = () => {
    setStep('details');
    setCode('');
    setError('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setIdentifier('');
    resetFlow();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!isLoaded || !identifier.trim() || !firstName.trim() || !lastName.trim()) return;

    setError('');
    setIsSubmitting(true);

    try {
      // 1. Create the sign-up with the provided details
      await signUp.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        ...(mode === 'email' ? { emailAddress: identifier.trim() } : { phoneNumber: identifier.trim() }),
      });

      // 2. Prepare verification
      if (mode === 'email') {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      } else {
        await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' });
      }

      setStep('code');
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "Something went wrong. Please check your details and try again.");
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
      const result = mode === 'email' 
        ? await signUp.attemptEmailAddressVerification({ code: code.trim() })
        : await signUp.attemptPhoneNumberVerification({ code: code.trim() });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        window.location.href = '/dashboard';
      } else {
        console.log(result);
        setError('Additional verification is required to finish signing up.');
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
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans">

      {/* Left: branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Paris cityscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#007ACC]/90 via-[#0F172A]/70 to-[#0F172A]/80" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full animate-[fadeIn_0.6s_ease-out]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-8 border border-white/20">
              <span className="text-sm leading-none">✦</span>
              Join the Club
            </div>

            <h1 className="text-[40px] font-bold text-white leading-[1.15] mb-5 max-w-md">
              Unlock the world's best stays.
            </h1>

            <p className="text-[15px] text-white/85 leading-relaxed max-w-sm">
              Create an account to save your favorite destinations, sync your itinerary, and get exclusive member rates.
            </p>
          </div>

          {/* Glassmorphism floating card - Member Benefits */}
          <div className="bg-white/15 backdrop-blur-lg border border-white/25 rounded-2xl p-5 max-w-xs shadow-2xl">
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 mb-4">
              <span>💎</span>
              Member Benefits
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-white text-[13.5px] font-medium">Exclusive 10% off member rates</p>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-white text-[13.5px] font-medium">Free cancellation on most rooms</p>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-white text-[13.5px] font-medium">Sally AI Copilot itinerary planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-[fadeIn_0.6s_ease-out]">

          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">CheckInn</span>
          </div>

          <h2 className="text-[26px] font-bold text-[#0F172A] mb-2">Create an Account</h2>
          <p className="text-[14.5px] text-slate-500 mb-8">Join CheckInn and start planning your next journey.</p>

          {error && (
            <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
              {error}
            </div>
          )}

          {step === 'details' ? (
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-[13px] font-medium text-[#0F172A] mb-1.5">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="Jane"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[13px] font-medium text-[#0F172A] mb-1.5">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Doe"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200"
                    />
                  </div>
                </div>

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
                  className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)] mt-2"
                >
                  {isSubmitting ? 'Creating account…' : 'Create Account'}
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
                <span className="text-[14px] font-medium text-[#0F172A]">Sign up with Google</span>
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
                {isSubmitting ? 'Verifying…' : 'Verify & Complete'}
              </button>
            </form>
          )}

          <p className="text-center text-[13.5px] text-slate-500 mt-8">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">
              Sign In
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

export default RegisterPage;