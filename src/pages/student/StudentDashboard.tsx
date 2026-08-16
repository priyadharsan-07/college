import React from 'react';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  BookOpen,
  CreditCard,
  Clock,
  ArrowRight,
  Bell,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { Link, useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, subjects, timetable, marks, fees, notices, examinations } = useData();
  const navigate = useNavigate();

  // Find active student record (or default to Aarav Patel)
  const currentStudent = students.find((s) => s.email === user?.email) || students[0];
  const myMarks = marks.filter((m) => m.studentId === currentStudent?.studentId);
  const myFee = fees.find((f) => f.studentId === currentStudent?.studentId) || fees[0];
  const todayClasses = timetable.filter((t) => t.day === 'Monday').slice(0, 3);
  const upcomingExams = examinations.filter((e) => e.status === 'Upcoming').slice(0, 2);

  const isEligibleForExams = (currentStudent?.attendance || 92) >= 75;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {currentStudent?.name || user?.name || 'Student'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              {currentStudent?.studentId}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {currentStudent?.department} • Year {currentStudent?.year} (Semester {currentStudent?.semester})
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/student/fees"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Tuition Fees</span>
          </Link>
        </div>
      </div>

      {/* Attendance & Exam Clearance Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isEligibleForExams
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : 'bg-rose-50/70 border-rose-200 text-rose-950'
        }`}
      >
        <div className="flex items-center gap-3">
          {isEligibleForExams ? (
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold">
              {isEligibleForExams
                ? 'Examination Hall Ticket Cleared'
                : 'Attendance Warning: Below 75% Requirement'}
            </h3>
            <p className="text-xs opacity-80">
              {isEligibleForExams
                ? `Your current attendance is ${currentStudent?.attendance}%. You are eligible to sit for all semester examinations.`
                : `Your current attendance is ${currentStudent?.attendance}%. Please meet your academic advisor to clear hall ticket hold.`}
            </p>
          </div>
        </div>
        <Link
          to="/student/attendance"
          className="text-xs font-bold underline shrink-0 hover:opacity-80"
        >
          View Subject Breakdown →
        </Link>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance"
          value={`${currentStudent?.attendance || 92}%`}
          subtitle="Requirement: >= 75%"
          icon={CalendarCheck}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => navigate('/student/attendance')}
        />
        <StatCard
          title="Cumulative CGPA"
          value={currentStudent?.cgpa.toFixed(2) || '8.85'}
          subtitle="Out of 10.0 scale"
          icon={Award}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => navigate('/student/marks')}
        />
        <StatCard
          title="Enrolled Courses"
          value={subjects.length}
          subtitle="Current semester"
          icon={BookOpen}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          onClick={() => navigate('/student/courses')}
        />
        <StatCard
          title="Outstanding Tuition"
          value={`$${myFee ? myFee.pendingAmount.toLocaleString() : '0'}`}
          subtitle={myFee?.status === 'Paid' ? 'Fully Cleared' : 'Installment Due'}
          icon={CreditCard}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => navigate('/student/fees')}
        />
      </div>

      {/* Grid: Today's Schedule & Academic Marks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Class Schedule (Monday)</h3>
              <p className="text-xs text-slate-500">Upcoming lecture slots & classrooms</p>
            </div>
            <Link
              to="/student/timetable"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Weekly Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.map((lecture) => (
              <div
                key={lecture.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {lecture.subjectCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{lecture.roomNumber}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{lecture.subjectName}</h4>
                  <p className="text-[11px] text-slate-500">Instructor: {lecture.facultyName}</p>
                </div>

                <span className="text-xs font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start sm:self-center">
                  {lecture.timeSlot}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Exam Marks Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Marks</h3>
                  <p className="text-[11px] text-slate-400">Evaluated courses</p>
                </div>
              </div>
              <Link
                to="/student/marks"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Full report
              </Link>
            </div>

            <div className="space-y-3">
              {myMarks.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  No evaluated subjects yet for this term.
                </div>
              ) : (
                myMarks.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rec.subjectName}</p>
                      <p className="font-mono text-[10px] text-slate-500">
                        Int: {rec.internalMarks}/30 • Ext: {rec.externalMarks}/70
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {rec.grade} ({rec.totalMarks}/100)
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/student/marks"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition block"
          >
            Download Semester Grade Card
          </Link>
        </div>
      </div>
    </div>
  );
};
