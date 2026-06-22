import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import {
  Compass,
  Check,
  BarChart3,
  BrainCircuit,
  BedDouble,
  Globe,
  Building2,
  ArrowLeft
} from 'lucide-react';

// ─── Google SVG ───────────────────────────────────────────────────────────────
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.95z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" />
  </svg>
);

// ─── Left panel data ──────────────────────────────────────────────────────────
const stats = [
  { value: "10,000+", label: "Properties Listed" },
  { value: "250,000+", label: "Monthly Bookings" },
  { value: "98%", label: "Partner Satisfaction" }
];

const benefits = [
  { icon: Globe,        label: "Reach More Travelers" },
  { icon: BedDouble,    label: "Real-Time Booking Management" },
  { icon: BarChart3,    label: "Revenue Analytics" },
  { icon: BrainCircuit, label: "AI-Powered Insights" },
  { icon: Building2,    label: "Automated Guest Communication" },
  { icon: Check,        label: "Occupancy Optimization" }
];

const trustItems = [
  "Secure Verification",
  "No Setup Fees",
  "AI-Powered Property Management"
];

// ─── Mini dashboard mockup ────────────────────────────────────────────────────
const DashboardMockup = () => (
  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <p className="text-white/90 text-[13px] font-semibold">Occupancy Overview</p>
      <span className="text-[11px] text-white/60 bg-white/10 px-2 py-0.5 rounded-full">This week</span>
    </div>
    <div className="flex items-end gap-1.5 h-16 mb-4">
      {[65, 80, 55, 90, 75, 95, 70].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-white/30" style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="text-white font-bold text-[15px] leading-tight">{s.value}</p>
          <p className="text-white/60 text-[10px] leading-tight mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const OwnerSignInPage = () => {
  const { isLoaded, signIn } = useSignIn();

  // step: 'auth' | 'verify'
  const [step, setStep]           = useState('auth');
  const [email, setEmail]         = useState('');
  const [code, setCode]           = useState('');
  const [error, setError]         = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Clerk: send email OTP ──────────────────────────────────────────────────
  const handleEmailContinue = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setIsSubmitting(true);
    try {
      await signIn.create({ identifier: email.trim() });
      await signIn.emailCode.sendCode();
      setStep('verify');
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "We couldn't find a partner account with that email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Clerk: verify OTP ──────────────────────────────────────────────────────
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setIsSubmitting(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: code.trim()
      });
      if (result.status === 'complete') {
        await signIn.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl('/partner/dashboard');
            window.location.href = url.startsWith('http') ? url : '/partner/dashboard';
          }
        });
      } else {
        setError('Additional verification required. Please try again.');
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || "That code didn't work. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Clerk: Google OAuth ────────────────────────────────────────────────────
  const handleGoogle = async () => {
    if (!isLoaded) return;
    setError('');
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',        // route that calls Clerk's handleRedirectCallback
        redirectUrlComplete: '/partner/dashboard'
      });
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Google sign-in failed. Please try again.');
    }
  };

  const inputCls = "w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200";
  const labelCls = "block text-[13px] font-medium text-[#0F172A] mb-1.5";

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans">

      {/* ── Left: branding panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007ACC] via-[#005fa3] to-[#0F172A]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-12 animate-[fadeIn_0.6s_ease-out]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-8 border border-white/20">
              <Building2 className="w-3.5 h-3.5" />
              Partner Portal
            </div>

            <h1 className="text-[38px] font-bold text-white leading-[1.15] mb-5 max-w-md">
              Welcome back to CheckInn
            </h1>

            <p className="text-[15px] text-white/80 leading-relaxed max-w-sm mb-8">
              Sign in to manage your properties, view bookings, and access your AI-powered dashboard.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90">
                  <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[13px]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <DashboardMockup />
        </div>
      </div>

      {/* ── Right: sign-in form ──────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-[fadeIn_0.6s_ease-out]">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[15px] font-bold text-[#0F172A] tracking-tight">CheckInn</span>
              <span className="ml-1.5 text-[11px] font-semibold text-[#007ACC] bg-[#007ACC]/10 px-1.5 py-0.5 rounded">Partner Portal</span>
            </div>
          </div>

          {/* ── STEP: auth ── */}
          {step === 'auth' && (
            <>
              <h2 className="text-[24px] font-bold text-[#0F172A] mb-1.5">Welcome back</h2>
              <p className="text-[14px] text-slate-500 mb-7">Sign in to your partner account.</p>

              {error && (
                <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                  {error}
                </div>
              )}

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-[#E2E8F0] hover:border-slate-300 rounded-xl py-3.5 mb-5 transition-all duration-200 shadow-sm"
              >
                <GoogleIcon className="w-4 h-4" />
                <span className="text-[14.5px] font-semibold text-[#0F172A]">Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[12px] text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <form onSubmit={handleEmailContinue} className="space-y-4">
                <div>
                  <label htmlFor="email" className={labelCls}>Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@hotel.com"
                    className={inputCls}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isLoaded}
                  className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)]"
                >
                  {isSubmitting ? 'Sending code…' : 'Continue with Email'}
                </button>
              </form>

              {/* Trust strip */}
              <div className="flex flex-col gap-1.5 mt-7 pt-6 border-t border-slate-100">
                {trustItems.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12.5px] text-slate-500">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                    {t}
                  </div>
                ))}
              </div>

              <p className="text-center text-[13px] text-slate-500 mt-6">
                Not a partner yet?{' '}
                <a href="/partner/signup" className="font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">
                  Create Account
                </a>
              </p>
            </>
          )}

          {/* ── STEP: verify OTP ── */}
          {step === 'verify' && (
            <>
              <button
                onClick={() => { setStep('auth'); setError(''); setCode(''); }}
                className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#0F172A] transition-colors duration-200 mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <h2 className="text-[24px] font-bold text-[#0F172A] mb-1.5">Check your email</h2>
              <p className="text-[14px] text-slate-500 mb-7">
                We sent a sign-in code to{' '}
                <span className="font-medium text-[#0F172A]">{email}</span>
              </p>

              {error && (
                <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label htmlFor="code" className={labelCls}>Verification Code</label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    placeholder="123456"
                    autoFocus
                    className={`${inputCls} text-[18px] tracking-[0.3em] text-center placeholder:tracking-[0.3em] placeholder:text-[14px]`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !isLoaded}
                  className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)]"
                >
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
            </>
          )}

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

export default OwnerSignInPage;