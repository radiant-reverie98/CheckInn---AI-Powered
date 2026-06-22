import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import {
  Compass,
  Check,
  ArrowRight,
  Building2,
  BarChart3,
  BrainCircuit,
  BedDouble,
  Globe,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

// ─── Google SVG (no lucide-react brand icon) ──────────────────────────────────
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.45.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.95z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" />
  </svg>
);

// ─── Left panel stats ─────────────────────────────────────────────────────────
const stats = [
  { value: "10,000+", label: "Properties Listed" },
  { value: "250,000+", label: "Monthly Bookings" },
  { value: "98%", label: "Partner Satisfaction" }
];

const benefits = [
  { icon: Globe, label: "Reach More Travelers" },
  { icon: BedDouble, label: "Real-Time Booking Management" },
  { icon: BarChart3, label: "Revenue Analytics" },
  { icon: BrainCircuit, label: "AI-Powered Insights" },
  { icon: Building2, label: "Automated Guest Communication" },
  { icon: Check, label: "Occupancy Optimization" }
];

const trustItems = [
  "Secure Verification",
  "No Setup Fees",
  "AI-Powered Property Management"
];

const propertyTypes = ["Hotel", "Resort", "Villa", "Apartment", "Hostel"];

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
const OwnerSignupPage = () => {
  const { isLoaded, signUp } = useSignUp();

  // auth step: 'auth' | 'verify' | 'onboarding'
  const [step, setStep] = useState('auth');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // onboarding form fields
  const [form, setForm] = useState({
    hotelName: '',
    ownerName: '',
    phone: '',
    propertyType: '',
    country: '',
    city: '',
    numProperties: '',
    website: '',
    agreeTerms: false
  });

  // ── Clerk: send email OTP ──────────────────────────────────────────────────
  const handleEmailContinue = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setIsSubmitting(true);
    try {
      await signUp.create({ emailAddress: email.trim() });
      await signUp.emailCode.sendCode();
      setStep('verify');
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Could not send verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Clerk: verify OTP then show onboarding ─────────────────────────────────
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setIsSubmitting(true);
    try {
      const result = await signUp.emailCode.verifyCode({ code: code.trim() });
      if (result.status === 'complete') {
        // Session created — move to onboarding form instead of redirecting
        setStep('onboarding');
      } else if (result.status === 'missing_requirements') {
        setStep('onboarding');
      } else {
        setError('Verification incomplete. Please try again.');
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
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',         // route that calls Clerk's handleRedirectCallback
        redirectUrlComplete: '/partner/onboarding'
      });
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Google sign-up failed. Please try again.');
    }
  };

  // ── Onboarding submit ──────────────────────────────────────────────────────
  const handleOnboarding = async (e) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      setError('Please agree to the Partner Terms to continue.');
      return;
    }
    // TODO: persist onboarding data to your backend, then finalize
    try {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl('/partner/dashboard');
          window.location.href = url.startsWith('http') ? url : `/partner/dashboard`;
        }
      });
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Could not complete registration. Please try again.');
    }
  };

  const inputCls = "w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007ACC]/25 focus:border-[#007ACC] transition-all duration-200";
  const labelCls = "block text-[13px] font-medium text-[#0F172A] mb-1.5";

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans">

      {/* ── Left: branding panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#007ACC] via-[#005fa3] to-[#0F172A]" />
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative z-10 flex flex-col justify-between h-full p-12 animate-[fadeIn_0.6s_ease-out]">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-8 border border-white/20">
              <Building2 className="w-3.5 h-3.5" />
              Partner with CheckInn
            </div>

            <h1 className="text-[38px] font-bold text-white leading-[1.15] mb-5 max-w-md">
              Grow Your Hotel Business Smarter
            </h1>

            <p className="text-[15px] text-white/80 leading-relaxed max-w-sm mb-8">
              List your property, manage bookings, increase occupancy, and leverage AI-powered insights to maximize revenue.
            </p>

            {/* Benefits */}
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

          {/* Dashboard mockup */}
          <DashboardMockup />
        </div>
      </div>

      {/* ── Right: registration form ─────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
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
              <h2 className="text-[24px] font-bold text-[#0F172A] mb-1.5">Become a CheckInn Partner</h2>
              <p className="text-[14px] text-slate-500 mb-7">Start managing your properties today.</p>

              {error && <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">{error}</div>}

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
                Already a partner?{' '}
                <a href="/partner/login" className="font-semibold text-[#007ACC] hover:text-[#0369A1] transition-colors duration-200">Sign In</a>
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
                We sent a verification code to <span className="font-medium text-[#0F172A]">{email}</span>
              </p>

              {error && <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">{error}</div>}

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
                  {isSubmitting ? 'Verifying…' : 'Verify & Continue'}
                </button>
              </form>
            </>
          )}

          {/* ── STEP: onboarding form ── */}
          {step === 'onboarding' && (
            <>
              <h2 className="text-[22px] font-bold text-[#0F172A] mb-1">Complete Your Profile</h2>
              <p className="text-[14px] text-slate-500 mb-6">Tell us about your property.</p>

              {error && <div className="mb-5 text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">{error}</div>}

              <form onSubmit={handleOnboarding} className="space-y-5">

                {/* Business Information */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Business Information</p>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="hotelName" className={labelCls}>Hotel / Business Name</label>
                      <input id="hotelName" type="text" required placeholder="Grand Amsterdam Hotel" value={form.hotelName} onChange={(e) => setForm({ ...form, hotelName: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="ownerName" className={labelCls}>Owner Full Name</label>
                      <input id="ownerName" type="text" required placeholder="John van der Berg" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone Number</label>
                      <input id="phone" type="tel" required placeholder="+31 6 1234 5678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Property Information</p>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="propertyType" className={labelCls}>Property Type</label>
                      <div className="relative">
                        <select
                          id="propertyType"
                          required
                          value={form.propertyType}
                          onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                          className={`${inputCls} appearance-none pr-9`}
                        >
                          <option value="">Select type…</option>
                          {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="country" className={labelCls}>Country</label>
                        <input id="country" type="text" required placeholder="Netherlands" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="city" className={labelCls}>City</label>
                        <input id="city" type="text" required placeholder="Amsterdam" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Business Details</p>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="numProperties" className={labelCls}>Number of Properties</label>
                      <input id="numProperties" type="number" min="1" required placeholder="1" value={form.numProperties} onChange={(e) => setForm({ ...form, numProperties: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="website" className={labelCls}>
                        Website <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input id="website" type="url" placeholder="https://yourhotel.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] text-[#007ACC] focus:ring-[#007ACC]/30 flex-shrink-0"
                  />
                  <span className="text-[13px] text-slate-600 leading-snug">
                    I agree to CheckInn's{' '}
                    <a href="/partner/terms" className="text-[#007ACC] hover:underline font-medium">Partner Terms</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-[#007ACC] hover:underline font-medium">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!form.agreeTerms || isSubmitting}
                  className="w-full bg-[#007ACC] hover:bg-[#0369A1] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,122,204,0.5)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Completing…' : 'Complete Registration'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
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

export default OwnerSignupPage;