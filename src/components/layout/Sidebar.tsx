import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  BookMarked,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  CreditCard,
  Calendar,
  Sparkles,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  ClipboardList,
  FolderKanban,
  FileCheck2,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();

  const getNavItems = (currentRole: Role | null): NavItem[] => {
    if (currentRole === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { label: 'Students', path: '/admin/students', icon: GraduationCap },
        { label: 'Faculty', path: '/admin/faculty', icon: Users },
        { label: 'Departments', path: '/admin/departments', icon: Building2 },
        { label: 'Courses', path: '/admin/courses', icon: BookOpen },
        { label: 'Subjects', path: '/admin/subjects', icon: BookMarked },
        { label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
        { label: 'Examinations', path: '/admin/examinations', icon: FileSpreadsheet },
        { label: 'Marks & Results', path: '/admin/marks', icon: Award },
        { label: 'Fees Management', path: '/admin/fees', icon: CreditCard },
        { label: 'Timetable', path: '/admin/timetable', icon: Calendar },
        { label: 'Events', path: '/admin/events', icon: Sparkles },
        { label: 'Notices', path: '/admin/notices', icon: Bell },
        { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
        { label: 'Settings', path: '/admin/settings', icon: Settings }
      ];
    }

    if (currentRole === 'faculty') {
      return [
        { label: 'Dashboard', path: '/faculty', icon: LayoutDashboard },
        { label: 'My Profile', path: '/faculty/profile', icon: UserCheck },
        { label: 'Students', path: '/faculty/students', icon: GraduationCap },
        { label: 'Attendance', path: '/faculty/attendance', icon: CalendarCheck },
        { label: 'Marks Entry', path: '/faculty/marks', icon: Award },
        { label: 'Assignments', path: '/faculty/assignments', icon: FolderKanban },
        { label: 'Timetable', path: '/faculty/timetable', icon: Calendar },
        { label: 'Exams Schedule', path: '/faculty/exams', icon: FileSpreadsheet },
        { label: 'Notices', path: '/faculty/notices', icon: Bell }
      ];
    }

    // student
    return [
      { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
      { label: 'My Profile', path: '/student/profile', icon: UserCheck },
      { label: 'Attendance', path: '/student/attendance', icon: CalendarCheck },
      { label: 'Timetable', path: '/student/timetable', icon: Calendar },
      { label: 'Subjects & Syllabus', path: '/student/subjects', icon: BookMarked },
      { label: 'Assignments', path: '/student/assignments', icon: FolderKanban },
      { label: 'Exams & Hall Ticket', path: '/student/exams', icon: FileSpreadsheet },
      { label: 'Results & GPA', path: '/student/results', icon: FileCheck2 },
      { label: 'Fees & Invoices', path: '/student/fees', icon: CreditCard },
      { label: 'Campus Events', path: '/student/events', icon: Sparkles },
      { label: 'Notices', path: '/student/notices', icon: Bell }
    ];
  };

  const navItems = getNavItems(role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight block leading-tight">
                Apex Institute
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                {role === 'admin' ? 'Admin Portal' : role === 'faculty' ? 'Faculty Portal' : 'Student Portal'}
              </span>
            </div>
          </NavLink>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Pill */}
        <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3 shrink-0">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/40"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user?.name || 'Logged User'}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-900/80 text-indigo-300 border border-indigo-700/50">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin' || item.path === '/faculty' || item.path === '/student'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 shrink-0 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};
