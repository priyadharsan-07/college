import React from 'react';
import {
  BookOpen,
  Users,
  CalendarCheck,
  Award,
  Clock,
  ArrowRight,
  Plus,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { Link, useNavigate } from 'react-router-dom';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, subjects, timetable, examinations, notices } = useData();
  const navigate = useNavigate();

  // Find faculty's assigned subjects & classes
  const mySubjects = subjects.slice(0, 3);
  const myStudents = students.filter((s) => s.department === 'Computer Science & Engineering');
  const todayClasses = timetable.filter((t) => t.day === 'Monday').slice(0, 3);
  const lowAttendanceStudents = myStudents.filter((s) => s.attendance < 75);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {user?.name || 'Professor'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Faculty Portal
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Department of Computer Science & Engineering • Academic Term Fall 2025
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/faculty/attendance"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Class Attendance</span>
          </Link>
          <Link
            to="/faculty/marks"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Award className="w-4 h-4 text-slate-500" />
            <span>Upload Marks</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Courses"
          value={mySubjects.length}
          subtitle="Active lecture sections"
          icon={BookOpen}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => navigate('/faculty/classes')}
        />
        <StatCard
          title="Total Students Taught"
          value={myStudents.length * 2}
          subtitle="Enrolled candidates"
          icon={Users}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => navigate('/faculty/students')}
        />
        <StatCard
          title="Today's Lectures"
          value={todayClasses.length}
          subtitle="Monday schedule"
          icon={Clock}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => navigate('/faculty/timetable')}
        />
        <StatCard
          title="Attendance Risk"
          value={lowAttendanceStudents.length}
          subtitle="Students below 75%"
          icon={AlertTriangle}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => navigate('/faculty/attendance')}
        />
      </div>

      {/* Grid: Today's Lectures & Low Attendance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Lectures */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Class Schedule</h3>
              <p className="text-xs text-slate-500">Upcoming lecture slots for Monday</p>
            </div>
            <Link
              to="/faculty/timetable"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Full weekly timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.map((lecture) => (
              <div
                key={lecture.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/80 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {lecture.subjectCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{lecture.roomNumber}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{lecture.subjectName}</h4>
                  <p className="text-[11px] text-slate-500">{lecture.department} • Semester {lecture.semester}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    {lecture.timeSlot}
                  </span>
                  <Link
                    to="/faculty/attendance"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
                  >
                    Take Roll Call
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Attendance Watchlist */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Attendance Watchlist</h3>
                  <p className="text-[11px] text-slate-400">Below 75% attendance threshold</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {lowAttendanceStudents.slice(0, 4).map((std) => (
                <div
                  key={std.id}
                  className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{std.name}</p>
                    <p className="font-mono text-[10px] text-slate-500">{std.studentId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-rose-600 block">{std.attendance}%</span>
                    <span className="text-[10px] text-amber-700 font-semibold">Critical Alert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/faculty/attendance"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition block"
          >
            Review All Student Roster
          </Link>
        </div>
      </div>
    </div>
  );
};
