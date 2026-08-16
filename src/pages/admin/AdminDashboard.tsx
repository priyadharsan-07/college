import React from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  FileSpreadsheet,
  Bell,
  ArrowRight,
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    faculty,
    courses,
    departments,
    examinations,
    fees,
    notices,
    attendanceRecords
  } = useData();

  const navigate = useNavigate();

  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const totalCourses = courses.length;
  const totalDepartments = departments.length;

  const totalPendingFees = fees.reduce((acc, curr) => acc + curr.pendingAmount, 0);

  const avgAttendance =
    students.length > 0
      ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
      : 88;

  const upcomingExams = examinations.filter((e) => e.status === 'Upcoming').slice(0, 4);
  const recentNotices = notices.slice(0, 4);
  const recentStudents = students.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrative Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time academic telemetry, campus administration, and institutional stats.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/students"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </Link>
          <Link
            to="/admin/attendance"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <CalendarCheck className="w-4 h-4 text-slate-500" />
            <span>Take Attendance</span>
          </Link>
        </div>
      </div>

      {/* Primary Dashboard Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents.toLocaleString()}
          subtitle="Enrolled active"
          icon={GraduationCap}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          trend={{ value: '+12%', isPositive: true }}
          onClick={() => navigate('/admin/students')}
        />
        <StatCard
          title="Total Faculty"
          value={totalFaculty}
          subtitle="Professors & Staff"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => navigate('/admin/faculty')}
        />
        <StatCard
          title="Total Courses"
          value={totalCourses}
          subtitle="Programs offered"
          icon={BookOpen}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => navigate('/admin/courses')}
        />
        <StatCard
          title="Departments"
          value={totalDepartments}
          subtitle="Academic wings"
          icon={Building2}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => navigate('/admin/departments')}
        />
        <StatCard
          title="Today's Attendance"
          value={`${avgAttendance}%`}
          subtitle="Campus average"
          icon={CalendarCheck}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          trend={{ value: '+2.1%', isPositive: true }}
          onClick={() => navigate('/admin/attendance')}
        />
        <StatCard
          title="Pending Fees"
          value={`$${totalPendingFees.toLocaleString()}`}
          subtitle="Tuition receivable"
          icon={CreditCard}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          onClick={() => navigate('/admin/fees')}
        />
      </div>

      {/* Visual Charts & Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance & Enrollment Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Department Performance & Enrollment
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current student distribution across engineering departments
              </p>
            </div>
            <Link
              to="/admin/departments"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Department Bars */}
          <div className="space-y-4">
            {departments.slice(0, 5).map((dept) => {
              const percentage = Math.min(100, Math.round((dept.studentsCount / 800) * 100));
              return (
                <div key={dept.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 font-semibold">{dept.name} ({dept.code})</span>
                    <span className="text-slate-500">{dept.studentsCount} students • {dept.facultyCount} faculty</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Attendance Highlights Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] font-medium text-slate-500">Highest Attendance</p>
              <p className="text-sm font-bold text-emerald-600 mt-0.5">Civil Engg (95%)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] font-medium text-slate-500">Top CGPA Department</p>
              <p className="text-sm font-bold text-indigo-600 mt-0.5">AI & ML (8.92 Avg)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] font-medium text-slate-500">Active Exam Season</p>
              <p className="text-sm font-bold text-amber-600 mt-0.5">Fall Mid-Terms</p>
            </div>
          </div>
        </div>

        {/* Quick Notices / Announcements Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Recent Notices</h3>
              </div>
              <Link
                to="/admin/notices"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/70 transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        notice.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : notice.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {notice.priority} Priority
                    </span>
                    <span className="text-[10px] text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/notices"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition block"
          >
            + Post New Circular Notice
          </Link>
        </div>
      </div>

      {/* Two Columns: Upcoming Examinations & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Examinations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Upcoming Examinations</h3>
                <p className="text-xs text-slate-400">Scheduled campus test sessions</p>
              </div>
            </div>
            <Link
              to="/admin/examinations"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Manage Schedule
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {exam.subjectName} <span className="text-slate-400 font-normal">({exam.subjectCode})</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {exam.department} • Semester {exam.semester}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-indigo-600 block">{exam.date}</span>
                  <span className="text-[10px] text-slate-400">{exam.roomNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Enrolled Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Students</h3>
                <p className="text-xs text-slate-400">Latest enrolled candidates</p>
              </div>
            </div>
            <Link
              to="/admin/students"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View Directory
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentStudents.map((std) => (
              <div key={std.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={std.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={std.name}
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{std.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {std.studentId} • {std.department} (Year {std.year})
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">
                    {std.attendance}% Att.
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{std.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
