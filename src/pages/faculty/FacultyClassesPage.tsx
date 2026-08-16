import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  CalendarCheck,
  Award,
  Clock,
  MapPin,
  Search,
  CheckCircle,
  Download
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export const FacultyClassesPage: React.FC = () => {
  const { subjects, students, timetable } = useData();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.code || 'CS501');

  const currentSubject = subjects.find((s) => s.code === selectedSubject) || subjects[0];
  const enrolledStudents = students.filter(
    (s) => s.department === (currentSubject?.department || 'Computer Science & Engineering')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Assigned Classes & Course Modules
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review syllabus progress, student cohorts, lecture timings, and practical laboratories.
        </p>
      </div>

      {/* Course Subject Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map((sub) => {
          const isSelected = sub.code === selectedSubject;
          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub.code)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  {sub.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {sub.type}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{sub.name}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{sub.department} • Sem {sub.semester}</p>
              <div className="mt-3 pt-2 border-t border-slate-200/50 flex justify-between text-[11px] text-slate-600">
                <span>{sub.credits} Credits</span>
                <span className="font-semibold text-emerald-700">Active Cohort</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Subject Details & Cohort List */}
      {currentSubject && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Active Course Section
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {currentSubject.name} ({currentSubject.code})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentSubject.department} • Semester {currentSubject.semester} • {enrolledStudents.length} Students Registered
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/faculty/attendance"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                Mark Attendance
              </Link>
              <Link
                to="/faculty/marks"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Evaluate Marks
              </Link>
            </div>
          </div>

          {/* Enrolled Students Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Enrolled Student Cohort</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Student ID & Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Attendance Rate</th>
                    <th className="py-3 px-4">CGPA</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {enrolledStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={std.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={std.name}
                            className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{std.name}</p>
                            <p className="font-mono text-[10px] text-indigo-600">{std.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {std.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            std.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {std.attendance}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {std.cgpa.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {std.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
