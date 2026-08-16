import React from 'react';
import {
  Award,
  Download,
  CheckCircle,
  FileSpreadsheet,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const StudentMarksPage: React.FC = () => {
  const { user } = useAuth();
  const { students, marks } = useData();
  const { showToast } = useToast();

  const currentStudent = students.find((s) => s.email === user?.email) || students[0];
  const myMarks = marks.filter((m) => m.studentId === currentStudent?.studentId);

  const totalPoints = myMarks.reduce((acc, m) => acc + m.totalMarks, 0);
  const averageMarks = myMarks.length > 0 ? Math.round(totalPoints / myMarks.length) : 89;

  const handleDownloadTranscript = () => {
    showToast('Generating official Semester Grade Card Transcript (PDF)...', 'info');
    setTimeout(() => {
      showToast('Official Grade Card Transcript downloaded!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Examinations & Academic Grades
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Internal evaluation scores, university semester exam results, and CGPA reports.
          </p>
        </div>
        <button
          onClick={handleDownloadTranscript}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          <Download className="w-4 h-4" />
          <span>Download Grade Card (PDF)</span>
        </button>
      </div>

      {/* Grade Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Cumulative CGPA</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-indigo-600">
              {currentStudent?.cgpa.toFixed(2) || '8.85'}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 10.0</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">First Class with Distinction</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Average Percentage</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-emerald-600">{averageMarks}%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across all evaluated modules</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Semester Backlogs</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">0</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">All papers cleared successfully</p>
        </div>
      </div>

      {/* Marks & Grades Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Semester 5 Performance Ledger</h3>
          <span className="text-xs text-slate-400 font-medium">Evaluation Standard: 100 Marks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="py-3.5 px-4">Subject Code & Name</th>
                <th className="py-3.5 px-4 text-center">Internal (30)</th>
                <th className="py-3.5 px-4 text-center">Semester Exam (70)</th>
                <th className="py-3.5 px-4 text-center">Total (100)</th>
                <th className="py-3.5 px-4 text-center">Letter Grade</th>
                <th className="py-3.5 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {myMarks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No examination records found for this term.
                  </td>
                </tr>
              ) : (
                myMarks.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{rec.subjectName}</p>
                        <p className="font-mono text-[10px] text-indigo-600">{rec.subjectCode}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700">
                      {rec.internalMarks}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700">
                      {rec.externalMarks}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      {rec.totalMarks}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {rec.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>{rec.result}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
