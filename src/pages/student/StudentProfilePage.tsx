import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Calendar,
  Building2,
  Save,
  CheckCircle,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { students, updateStudent } = useData();
  const { showToast } = useToast();

  const currentStudent = students.find((s) => s.email === user?.email) || students[0];

  const [phone, setPhone] = useState(currentStudent?.phone || '+1 (555) 345-9871');
  const [address, setAddress] = useState('42 University Ridge Ave, Cambridge, MA 02138');
  const [parentName, setParentName] = useState('Rajesh Patel (Father)');
  const [parentPhone, setParentPhone] = useState('+1 (555) 987-1234');
  const [bloodGroup, setBloodGroup] = useState('O+ Positive');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStudent) {
      updateStudent(currentStudent.id, { phone });
    }
    showToast('Student contact details updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Profile & Academic Record
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review institutional enrollment credentials, emergency contacts, and personal information.
        </p>
      </div>

      {/* Profile Overview Card */}
      {currentStudent && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={currentStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt={currentStudent.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{currentStudent.name}</h2>
              <span className="font-mono px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentStudent.studentId}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {currentStudent.department} • Year {currentStudent.year} (Semester {currentStudent.semester})
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-2">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentStudent.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                CGPA: {currentStudent.cgpa.toFixed(2)}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Status: {currentStudent.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contacts & Guardian Details Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Contact & Guardian Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Student Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
            <input
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Emergency Contact</label>
            <input
              type="tel"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Update Details</span>
          </button>
        </div>
      </form>
    </div>
  );
};
