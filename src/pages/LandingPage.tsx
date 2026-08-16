import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Shield,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  CreditCard,
  Calendar,
  Sparkles,
  Bell,
  Building2,
  CheckCircle2,
  ArrowRight,
  Send,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Award,
  Globe,
  Lock,
  Zap
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { Role } from '../types';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const { departments } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleQuickLogin = (role: Role) => {
    if (role === 'admin') login('admin@college.com', 'admin');
    if (role === 'faculty') login('faculty@college.com', 'faculty');
    if (role === 'student') login('student@college.com', 'student');
    showToast(`Logged in as ${role.toUpperCase()} (Demo Mode)`, 'success');
    navigate(`/${role}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setFormSubmitted(true);
    showToast('Your message has been sent to the college administration!', 'success');
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const features = [
    {
      icon: GraduationCap,
      title: 'Student Management',
      description: 'Comprehensive student lifecycle management from admissions, profile records, department enrollment to graduation.',
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      icon: Users,
      title: 'Faculty Management',
      description: 'Faculty profiles, subject allocations, teaching workload distribution, and qualification tracking.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      icon: CalendarCheck,
      title: 'Attendance Management',
      description: 'Daily automated and manual roll-call marker, real-time subject-wise percentage analytics, and low attendance alerts.',
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      icon: FileSpreadsheet,
      title: 'Examination Management',
      description: 'End-to-end exam scheduling, hall ticket generation, seating arrangements, and automated GPA gradebook calculation.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Centralized curriculum catalog, syllabus breakdown, credit distribution, and semester course catalogs.',
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      icon: CreditCard,
      title: 'Fee Management',
      description: 'Tuition fees ledger, invoice generation, online payment gateway simulation, and instant downloadable receipts.',
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    },
    {
      icon: Calendar,
      title: 'Timetable Management',
      description: 'Interactive weekly visual scheduling for lectures, laboratory sessions, room allocations, and faculty timetables.',
      color: 'bg-teal-50 text-teal-600 border-teal-100'
    },
    {
      icon: Bell,
      title: 'Events & Notices',
      description: 'Campus circulars, instant urgent alerts, priority broadcasts, and inter-college cultural & technical symposium calendars.',
      color: 'bg-orange-50 text-orange-600 border-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Academic ERP & Campus Portal</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              College Management System
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              Smart, simple and centralized management for students, faculty and college administration.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition cursor-pointer"
              >
                <span>Portal Login</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Demo Access Cards */}
            <div className="pt-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Instant One-Click Demo Access
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-500 hover:shadow-md hover:text-indigo-600 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">Admin Demo</p>
                    <p className="text-[10px] text-slate-400">admin@college.com</p>
                  </div>
                </button>

                <button
                  onClick={() => handleQuickLogin('faculty')}
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500 hover:shadow-md hover:text-emerald-600 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-600">Faculty Demo</p>
                    <p className="text-[10px] text-slate-400">faculty@college.com</p>
                  </div>
                </button>

                <button
                  onClick={() => handleQuickLogin('student')}
                  className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-500 hover:shadow-md hover:text-amber-600 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-amber-600">Student Demo</p>
                    <p className="text-[10px] text-slate-400">student@college.com</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-indigo-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-800">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-200 tracking-tight">
                5,000+
              </p>
              <p className="text-sm font-medium text-indigo-300/90 mt-1">Enrolled Students</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-200 tracking-tight">
                250+
              </p>
              <p className="text-sm font-medium text-indigo-300/90 mt-1">Distinguished Faculty</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-200 tracking-tight">
                50+
              </p>
              <p className="text-sm font-medium text-indigo-300/90 mt-1">Accredited Courses</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-200 tracking-tight">
                15+
              </p>
              <p className="text-sm font-medium text-indigo-300/90 mt-1">Specialized Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Integrated Campus Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything Needed to Run a Modern Institution
            </h2>
            <p className="text-base text-slate-600">
              From automated attendance to examinations and fee invoicing, experience a unified digital ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${feat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Award className="w-4 h-4" />
                <span>About Apex College Management System</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Empowering Institutions with Next-Level Academic & Administrative Efficiency
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                The College Management System provides a synchronized digital infrastructure designed specifically to streamline higher education workflows. By eliminating paper bottlenecks, manual roll books, and disconnected spreadsheets, we empower college administrations, professors, and students to focus on academic excellence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Real-Time Data Sync</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Instant updates across Admin, Faculty & Student dashboards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Zero Paper Waste</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Digitized hall tickets, marks cards, receipts, and circulars.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Role-Based Security</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Strict permission boundaries protecting confidential records.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">High Availability</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Accessible from laptops, tablets, and mobile browsers seamlessly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Grid */}
            <div className="relative">
              <div className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-900 to-slate-900 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-indigo-800/80 pb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">Campus Performance</p>
                      <h3 className="text-xl font-bold text-white mt-0.5">Academic Year 2026-27</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                      Live Operational
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-slate-400">Attendance Rate</p>
                      <p className="text-2xl font-bold text-white mt-1">94.2%</p>
                      <p className="text-[11px] text-emerald-400 mt-0.5">↑ 2.4% this term</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-slate-400">Average CGPA</p>
                      <p className="text-2xl font-bold text-white mt-1">8.65 / 10</p>
                      <p className="text-[11px] text-indigo-300 mt-0.5">Top 5% University rank</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/60 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-indigo-200">Fee Clearance Metric</span>
                      <span className="font-semibold text-white">88% Settled</span>
                    </div>
                    <div className="w-full h-2 bg-indigo-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Academic Wings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Our Academic Departments
            </h2>
            <p className="text-base text-slate-600">
              Discover engineering and technological disciplines guided by research-oriented faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {dept.code}
                    </span>
                    <span className="text-xs text-slate-400">Est. {dept.establishedYear}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                    {dept.description}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 mt-4">
                    HOD: <span className="text-indigo-600">{dept.headOfDepartment}</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-slate-100 text-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{dept.studentsCount}</p>
                    <p className="text-[10px] text-slate-400">Students</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{dept.facultyCount}</p>
                    <p className="text-[10px] text-slate-400">Faculty</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{dept.coursesCount}</p>
                    <p className="text-[10px] text-slate-400">Courses</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Connect With College Administration
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Have questions regarding admissions, course transfers, examinations, or technical portal assistance? Our academic counseling and support teams are here to help.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Campus Address</h4>
                    <p className="text-xs text-slate-500 mt-0.5">100 University Boulevard, Tech Valley, CA 94043, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Administrative Email</h4>
                    <p className="text-xs text-slate-500 mt-0.5">admissions@apex.college.edu | helpdesk@apex.college.edu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Phone Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">+1 (800) 555-APEX / +1 (555) 019-2830 (Mon - Fri: 8AM - 5PM)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-6">Fill out the form below to receive a response within 24 hours.</p>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Thank you for reaching out!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your inquiry has been logged in the administrative ticketing queue.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject / Department Inquiry
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Admission Inquiry for AI & ML"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your message or inquiry here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
