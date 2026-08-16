import React from 'react';
import {
  CalendarCheck,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentAttendancePage: React.FC = () => {
  const { user } = useAuth();
  const { students, subjects } = useData();

  const currentStudent = students.find((s) => s.email === user?.email) || students[0];
  const overallRate = currentStudent?.attendance || 92;

  // Mock subject-wise attendance breakdown
  const subjectAttendance = subjects.map((sub, idx) => {
    const totalClasses = 45;
    const variations = [42, 40, 38, 44, 39];
    const attended = variations[idx % variations.length];
    const rate = Math.round((attended / totalClasses) * 100);
    return {
      id: sub.id,
      code: sub.code,
      name: sub.name,
      faculty: sub.facultyName,
      totalClasses,
      attended,
      rate,
      isEligible: rate >= 75
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Attendance Telemetry
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed lecture attendance records, subject percentages, and semester exam clearance status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Cumulative Attendance</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">{overallRate}%</p>
          <p className="text-xs text-slate-500 mt-2">Overall across all enrolled subjects</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Mandatory Eligibility Cutoff</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">75%</p>
          <p className="text-xs text-slate-500 mt-2">Required for final semester exams</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Clearance Status</p>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle className="w-7 h-7 text-emerald-600" />
            <span className="text-xl font-extrabold text-emerald-700">Eligible</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Hall ticket approved</p>
        </div>
      </div>

      {/* Subject-Wise Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Subject-wise Attendance Breakdown</h3>
          <span className="text-xs text-slate-400">{subjectAttendance.length} Current Modules</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="py-3.5 px-4">Subject Code & Title</th>
                <th className="py-3.5 px-4">Instructor</th>
                <th className="py-3.5 px-4 text-center">Classes Held</th>
                <th className="py-3.5 px-4 text-center">Attended</th>
                <th className="py-3.5 px-4">Percentage</th>
                <th className="py-3.5 px-4 text-right">Exam Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {subjectAttendance.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{sub.name}</p>
                      <p className="font-mono text-[10px] text-indigo-600 font-semibold">{sub.code}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{sub.faculty}</td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-700">{sub.totalClasses}</td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-700">{sub.attended}</td>
                  <td className="py-3 px-4">
                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className={`font-bold ${sub.rate >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {sub.rate}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            sub.rate >= 85 ? 'bg-emerald-500' : sub.rate >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${sub.rate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.isEligible
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {sub.isEligible ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-rose-500" />}
                      {sub.isEligible ? 'Eligible' : 'Shortage'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
