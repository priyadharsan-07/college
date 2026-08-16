import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Check,
  ChevronDown,
  User,
  Shield,
  GraduationCap,
  Users,
  LogOut,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Role } from '../../types';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, resetAllDemoData } = useData();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (newRole: Role) => {
    switchRole(newRole);
    setRoleSwitcherOpen(false);
    navigate(`/${newRole}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
        {/* Left Side: Hamburger & Search trigger */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-hidden"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Trigger Input */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-100/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl text-xs sm:text-sm font-medium w-full max-w-xs transition border border-transparent hover:border-slate-200"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Search students, faculty, exams...</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-400 border border-slate-200">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Demo Role Switcher, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-200/60 transition"
              title="Quickly switch demo user role"
            >
              {role === 'admin' && <Shield className="w-3.5 h-3.5" />}
              {role === 'faculty' && <Users className="w-3.5 h-3.5" />}
              {role === 'student' && <GraduationCap className="w-3.5 h-3.5" />}
              <span className="capitalize">{role} View</span>
              <ChevronDown className="w-3 h-3 text-indigo-500" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-indigo-50 ${
                    role === 'admin' ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Administrator</span>
                  </div>
                  {role === 'admin' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <button
                  onClick={() => handleRoleChange('faculty')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-indigo-50 ${
                    role === 'faculty' ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Faculty (Teacher)</span>
                  </div>
                  {role === 'faculty' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <button
                  onClick={() => handleRoleChange('student')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-indigo-50 ${
                    role === 'student' ? 'font-semibold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Student Portal</span>
                  </div>
                  {role === 'student' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-800">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications at this time
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-3.5 text-left transition hover:bg-slate-50 cursor-pointer ${
                          !notif.read ? 'bg-indigo-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-xs font-semibold ${!notif.read ? 'text-indigo-950' : 'text-slate-800'}`}>
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <span className="hidden md:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                {user?.name?.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800 text-sm truncate">{user?.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] uppercase">
                    {role}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    to={role === 'admin' ? '/admin/settings' : `/${role}/profile`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Public Landing Page</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Command Dialog */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
