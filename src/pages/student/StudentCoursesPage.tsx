import React from 'react';
import {
  BookOpen,
  Award,
  User,
  Download,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const StudentCoursesPage: React.FC = () => {
  const { subjects } = useData();
  const { showToast } = useToast();

  const handleDownloadSyllabus = (subjectCode: string) => {
    showToast(`Downloading syllabus and lab manuals for ${subjectCode}...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Registered Semester Courses
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Curriculum modules, syllabus descriptions, assigned professors, and credit units.
        </p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {sub.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {sub.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {sub.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{sub.department}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{sub.facultyName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{sub.credits} Academic Credits</span>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enrolled</span>
              </span>
              <button
                onClick={() => handleDownloadSyllabus(sub.code)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Syllabus PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
