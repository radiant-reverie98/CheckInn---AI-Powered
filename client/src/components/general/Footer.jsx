import React from 'react';
import { Compass, Mail, ArrowRight } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 5.92c-.74.33-1.53.55-2.36.65a4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.6 11.6 0 0 1 3.39 4.6a4.1 4.1 0 0 0 1.27 5.47A4.07 4.07 0 0 1 2.8 9.6v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.53A8.35 8.35 0 0 0 22 5.92z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V9.83H5.67v8.51zM7 8.66a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18.34v-4.68c0-2.5-1.34-3.67-3.13-3.67a2.7 2.7 0 0 0-2.45 1.35v-1.15H10.1c.03.7 0 8.15 0 8.15h2.66v-4.55c0-.24.02-.49.09-.66.2-.49.65-1 1.4-1 .99 0 1.39.75 1.39 1.85v4.36z" />
  </svg>
);

const Footer = () => {
  const columns = [
    {
      title: "Explore",
      links: ["Popular destinations", "Featured stays", "Meet Sally", "Travel guides", "Deals & offers"]
    },
    {
      title: "Company",
      links: ["About CheckInn", "Careers", "Press", "Partner with us", "Blog"]
    },
    {
      title: "Support",
      links: ["Help center", "Cancellation options", "Contact us", "Safety information", "Accessibility"]
    },
    {
      title: "Legal",
      links: ["Terms of service", "Privacy policy", "Cookie policy", "Sitemap"]
    }
  ];

  const socials = [
    { icon: FacebookIcon, label: "Facebook" },
    { icon: InstagramIcon, label: "Instagram" },
    { icon: TwitterIcon, label: "Twitter" },
    { icon: LinkedinIcon, label: "LinkedIn" }
  ];

  return (
    <footer className="bg-[#0F172A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 py-12 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white mb-1.5">
              Get travel inspiration in your inbox
            </h3>
            <p className="text-[14px] text-slate-400">
              Hotel deals, destination guides, and tips from Sally — once a month, no spam.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 bg-[#007ACC] hover:bg-[#0369A1] text-white text-[14px] font-semibold px-5 py-3 rounded-xl transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 py-14">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 pr-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#007ACC] flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">CheckInn</span>
            </div>
            <p className="text-[13.5px] text-slate-400 leading-relaxed mb-6 max-w-xs">
              The hotel booking platform that helps you find the right stay, faster — with Sally, your AI travel copilot, by your side.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#007ACC] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={index} className="col-span-1 md:col-span-1">
              <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-[13.5px] text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-white/10">
          <p className="text-[13px] text-slate-500">
            © {new Date().getFullYear()} CheckInn. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            <Mail className="w-3.5 h-3.5" />
            <a href="mailto:hello@checkinn.com" className="hover:text-white transition-colors duration-200">
              hello@checkinn.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;