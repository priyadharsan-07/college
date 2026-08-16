import React, { useState } from 'react';
import {
  CalendarCheck,
  Check,
  X,
  Calendar,
  Filter,
  Save,
  Users,
  Search,
  CheckCircle,
  XCircle,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

export const AttendancePage: React.FC = () => {
  const { students, departments, subjects, markAttendance, attendanceRecords } = useData();
  const { showToast } = useToast();

  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || 'Computer Science & Engineering');
  const [selectedYear, setSelectedYear] = useState('3');
  const [selectedSemester, setSelectedSemester] = useState('5');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.code || 'CS501');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // Attendance status mapping for the selected session: { studentId: 'Present' | 'Absent' | 'Late' }
  const [attendanceState, setAttendanceState] = useState<{ [studentId: string]: 'Present' | 'Absent' | 'Late' }>({});

  // Filter students eligible for this department & year
  const eligibleStudents = students.filter(
    (s) => s.department === selectedDept && s.year.toString() === selectedYear
  );

  const filteredStudents = eligibleStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    const nextState: { [studentId: string]: 'Present' | 'Absent' | 'Late' } = {};
    eligibleStudents.forEach((s) => {
      nextState[s.id] = status;
    });
    setAttendanceState(nextState);
    showToast(`Marked all ${eligibleStudents.length} students as ${status}`, 'info');
  };

  const handleSaveAttendance = () => {
    if (eligibleStudents.length === 0) {
      showToast('No students to record attendance for', 'error');
      return;
    }

    const subObj = subjects.find((s) => s.code === selectedSubject);
    const records = eligibleStudents.map((s) => ({
      studentId: s.studentId,
      studentName: s.name,
      status: (attendanceState[s.id] || 'Present') as 'Present' | 'Absent' | 'Late' | 'Excused'
    }));

    markAttendance({
      date: selectedDate,
      department: selectedDept,
      year: Number(selectedYear),
      semester: Number(selectedSemester),
      subjectCode: selectedSubject,
      subjectName: subObj ? subObj.name : 'Data Structures',
      facultyId: subObj ? subObj.facultyId : 'FAC001',
      records
    });
    showToast(`Attendance saved successfully for ${records.length} students!`, 'success');
  };

  const presentCount = eligibleStudents.filter((s) => (attendanceState[s.id] || 'Present') === 'Present').length;
  const absentCount = eligibleStudents.filter((s) => attendanceState[s.id] === 'Absent').length;
  const lateCount = eligibleStudents.filter((s) => attendanceState[s.id] === 'Late').length;
  const currentRate = eligibleStudents.length > 0 ? Math.round((presentCount / eligibleStudents.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Daily Attendance Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Conduct roll-call, mark daily lectures, and update student attendance percentages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAttendance}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter Matrix Configuration */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Select Lecture Session Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s.toString()}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.code}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Live Roll Call Stats & Bulk Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Total Enrolled</p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{eligibleStudents.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-emerald-600">Present Today</p>
            <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{presentCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-rose-600">Absent Today</p>
            <p className="text-xl font-extrabold text-rose-700 mt-0.5">{absentCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-indigo-600">Session Rate</p>
            <p className="text-xl font-extrabold text-indigo-700 mt-0.5">{currentRate}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Student Roll Call Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate in list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll('Present')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll('Absent')}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Department & Year</th>
                <th className="py-3.5 px-4">Historical Rate</th>
                <th className="py-3.5 px-4 text-center">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No students found in {selectedDept} Year {selectedYear}. Try changing the department or year filter above.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => {
                  const currentStatus = attendanceState[std.id] || 'Present';
                  return (
                    <tr key={std.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">
                        {std.studentId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={std.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={std.name}
                            className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{std.name}</p>
                            <p className="text-[11px] text-slate-400">{std.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {std.department} (Yr {std.year})
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold text-[11px] ${
                              std.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {std.attendance}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                std.attendance >= 80
                                  ? 'bg-emerald-500'
                                  : std.attendance >= 75
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${std.attendance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'Present')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                              currentStatus === 'Present'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'Absent')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                              currentStatus === 'Absent'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(std.id, 'Late')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                              currentStatus === 'Late'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Late</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
