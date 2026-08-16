import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Apex Institute of Technology
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering the next generation of engineers, scientists, and leaders through academic excellence, cutting-edge research, and intelligent campus management.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Accredited by National Board of Accreditation (NBA) & Grade 'A++' by NAAC.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Faculty Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Student ERP Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Examination Cell
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Fee Payment Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 transition cursor-pointer">AI & Machine Learning</li>
              <li className="hover:text-indigo-400 transition cursor-pointer">Computer Science Engg</li>
              <li className="hover:text-indigo-400 transition cursor-pointer">Information Technology</li>
              <li className="hover:text-indigo-400 transition cursor-pointer">Electronics & Communication</li>
              <li className="hover:text-indigo-400 transition cursor-pointer">Mechanical & Civil Engg</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Campus Office</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">100 University Boulevard, Tech Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-400">+1 (800) 555-APEX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-400">contact@apex.college.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Apex Institute College Management System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
