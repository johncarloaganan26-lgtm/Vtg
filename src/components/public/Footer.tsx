import React from 'react';
import { VTGLogo } from '../common/VTGLogo';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setPublicPage, navigateToAdmin } = useApp();

  return (
    <footer id="main-footer" className="bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <div className="mb-4">
              <VTGLogo size="md" onClick={() => setPublicPage('home')} />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              Delivering powerful BPO & telemarketing solutions that drive growth,
              build customer loyalty, and create lasting impact.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-[#B91C1C] text-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-[#B91C1C] text-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-[#B91C1C] text-slate-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => setPublicPage('home')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('about')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('blog')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Blog & CSR
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('contact')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer"
                >
                  Contact Channels
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('apply')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer font-semibold text-[#8B151E]"
                >
                  Career Application
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Our Services */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer text-left"
                >
                  Appointment Setting
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer text-left"
                >
                  Outbound Sales & Closers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer text-left"
                >
                  Chat & Email Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer text-left"
                >
                  Technical Support & IT
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPublicPage('solutions')}
                  className="hover:text-[#B91C1C] transition-colors cursor-pointer text-left"
                >
                  Data Entry & Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us matching authentic details */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Contact Channels
            </h4>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#B91C1C] flex-shrink-0" />
                <a href="tel:+639159538248" className="hover:text-slate-900">
                  +63 915 953 8248
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#B91C1C] flex-shrink-0" />
                <a href="mailto:info@vigoroustelemarketing.com" className="hover:text-slate-900">
                  info@vigoroustelemarketing.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#B91C1C] flex-shrink-0 mt-0.5" />
                <span>Calabarzon, Philippines (SEC Reg: 2022060057912-11)</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={navigateToAdmin}
                className="text-[11px] font-semibold text-slate-500 hover:text-[#8B151E] cursor-pointer transition-colors"
                title="Management login (/admin)"
              >
                Staff Portal (/admin) →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-400">
          <p>© 2026 Vigorous Telemarketing Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
