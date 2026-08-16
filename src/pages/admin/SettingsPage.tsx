import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Calendar,
  Percent,
  Shield,
  RotateCcw,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';

export const SettingsPage: React.FC = () => {
  const { resetDemoData } = useData();
  const { showToast } = useToast();

  const [collegeName, setCollegeName] = useState('Apex Institute of Technology & Management');
  const [collegeCode, setCollegeCode] = useState('AITM-089');
  const [academicYear, setAcademicYear] = useState('2025 - 2026');
  const [currentTerm, setCurrentTerm] = useState('Fall Semester');
  const [minAttendance, setMinAttendance] = useState(75);
  const [gradingSystem, setGradingSystem] = useState('10-Point Scale (CGPA)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Institutional portal configurations updated successfully!', 'success');
  };

  const handleResetConfirm = () => {
    resetDemoData();
    setIsResetModalOpen(false);
    showToast('Demo data successfully reset to clean seed baseline!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System & Institutional Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure academic calendar, grading schemes, minimum attendance criteria, and seed database state.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* College Identity Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <span>Institution Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institution Code
              </label>
              <input
                type="text"
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Accreditation & Affiliation
              </label>
              <input
                type="text"
                disabled
                value="NAAC 'A++' Grade • Autonomous University"
                className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Academic Rules */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base pb-3 border-b border-slate-100">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span>Academic Session & Regulations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Active Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Term
              </label>
              <select
                value={currentTerm}
                onChange={(e) => setCurrentTerm(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Fall Semester">Fall Semester (Odd Semesters)</option>
                <option value="Spring Semester">Spring Semester (Even Semesters)</option>
                <option value="Summer Term">Summer Accelerated Term</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum Attendance Mandate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={minAttendance}
                  onChange={(e) => setMinAttendance(Number(e.target.value))}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                />
                <span className="absolute right-3.5 top-2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grading Methodology
              </label>
              <select
                value={gradingSystem}
                onChange={(e) => setGradingSystem(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                <option value="10-Point Scale (CGPA)">10-Point Scale (Standard CGPA)</option>
                <option value="4.0 GPA Scale">4.0 GPA International Standard</option>
                <option value="Percentage Scale">Percentage Scoring (Out of 100%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Configurations</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Demo Data"
        maxWidth="sm"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Reset to Default Mock State?</h4>
            <p className="text-xs text-slate-500 mt-1">
              This will erase any custom students, faculty, or mark alterations and reseed with the initial dataset.
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleResetConfirm}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
