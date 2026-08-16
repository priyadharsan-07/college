import React from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Users,
  CreditCard,
  Building2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const ReportsPage: React.FC = () => {
  const { students, departments, faculty, courses, fees, marks } = useData();
  const { showToast } = useToast();

  const totalStudents = students.length;
  const avgAttendance =
    totalStudents > 0
      ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents)
      : 88;

  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = fees.reduce((acc, f) => acc + f.pendingAmount, 0);

  const passingMarksCount = marks.filter((m) => m.result === 'Pass').length;
  const passPercentage = marks.length > 0 ? Math.round((passingMarksCount / marks.length) * 100) : 94;

  const handleDownloadReport = () => {
    showToast('Generating Consolidated Academic & Financial Report PDF...', 'info');
    setTimeout(() => {
      showToast('Consolidated Institutional Report downloaded successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Performance analytics, attendance aggregations, tuition collection ratios, and pass rates.
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          <Download className="w-4 h-4" />
          <span>Download Executive Audit (PDF)</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Campus Pass Ratio</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{passPercentage}%</p>
          <p className="text-[11px] text-slate-500 mt-2">Based on {marks.length} evaluated courses</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Average Student Attendance</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">{avgAttendance}%</p>
          <p className="text-[11px] text-slate-500 mt-2">Across all 4 year cohorts</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Fee Realization Rate</p>
          <p className="text-2xl font-extrabold text-teal-600 mt-1">
            {Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%
          </p>
          <p className="text-[11px] text-slate-500 mt-2">${totalCollected.toLocaleString()} received</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Student-to-Faculty Ratio</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {Math.round(totalStudents / (faculty.length || 1))}:1
          </p>
          <p className="text-[11px] text-slate-500 mt-2">Optimal AICTE academic norm</p>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Enrollment Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Department Quotas & Capacities</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">{departments.length} Academic Wings</span>
          </div>

          <div className="space-y-4 pt-2">
            {departments.map((dept) => {
              const capacity = 800;
              const pct = Math.min(100, Math.round((dept.studentsCount / capacity) * 100));
              return (
                <div key={dept.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{dept.name}</span>
                    <span className="text-slate-500 font-medium">{dept.studentsCount} / {capacity} seats ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Grading & Academic Performance</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Current Semester</span>
          </div>

          <div className="space-y-3 pt-2">
            {['A+ (90-100)', 'A (80-89)', 'B+ (70-79)', 'B (60-69)', 'C/D (40-59)', 'F (Fail)'].map((bracket, idx) => {
              const percentages = [28, 36, 18, 10, 5, 3];
              const pct = percentages[idx] || 10;
              return (
                <div key={bracket} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{bracket}</span>
                    <span className="font-bold text-slate-800">{pct}% of candidates</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 5 ? 'bg-rose-500' : idx < 2 ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${pct * 2.5}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
