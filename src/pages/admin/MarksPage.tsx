import React, { useState } from 'react';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MarkRecord } from '../../types';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const MarksPage: React.FC = () => {
  const { marks, students, subjects, addMarkRecord, updateMarkRecord, deleteMarkRecord } = useData();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<MarkRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    internalMarks: 25,
    externalMarks: 60,
    semester: 5
  });

  const calculateGradeAndResult = (internal: number, external: number) => {
    const total = internal + external;
    let grade = 'F';
    let result: 'Pass' | 'Fail' = 'Fail';

    if (total >= 90) grade = 'A+';
    else if (total >= 80) grade = 'A';
    else if (total >= 70) grade = 'B+';
    else if (total >= 60) grade = 'B';
    else if (total >= 50) grade = 'C';
    else if (total >= 40) grade = 'D';

    if (total >= 40 && external >= 25) {
      result = 'Pass';
    }

    return { total, grade, result };
  };

  const handleOpenAdd = () => {
    setEditingMark(null);
    const initialStd = students[0];
    const initialSub = subjects[0];
    setFormData({
      studentId: initialStd?.studentId || 'STU2023001',
      studentName: initialStd?.name || 'Aarav Patel',
      subjectCode: initialSub?.code || 'CS501',
      subjectName: initialSub?.name || 'Data Structures & Algorithms',
      internalMarks: 26,
      externalMarks: 62,
      semester: 5
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (record: MarkRecord) => {
    setEditingMark(record);
    setFormData({
      studentId: record.studentId,
      studentName: record.studentName,
      subjectCode: record.subjectCode,
      subjectName: record.subjectName,
      internalMarks: record.internalMarks,
      externalMarks: record.externalMarks,
      semester: record.semester
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const internal = Number(formData.internalMarks);
    const external = Number(formData.externalMarks);
    const { total, grade, result } = calculateGradeAndResult(internal, external);

    if (editingMark) {
      updateMarkRecord(editingMark.id, {
        ...formData,
        internalMarks: internal,
        externalMarks: external,
        totalMarks: total,
        grade,
        result,
        semester: Number(formData.semester)
      });
    } else {
      addMarkRecord({
        ...formData,
        internalMarks: internal,
        externalMarks: external,
        totalMarks: total,
        grade,
        result,
        semester: Number(formData.semester)
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteMarkRecord(id);
    setDeleteConfirmId(null);
  };

  const filteredMarks = marks.filter((m) => {
    const matchesSearch =
      m.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || m.subjectCode === selectedSubject;
    const matchesStatus = selectedStatus === 'All' || m.result === selectedStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const exportCSV = () => {
    const headers = 'Student ID,Student Name,Subject Code,Subject Name,Internal (30),External (70),Total (100),Grade,Result\n';
    const rows = filteredMarks
      .map(
        (m) =>
          `"${m.studentId}","${m.studentName}","${m.subjectCode}","${m.subjectName}",${m.internalMarks},${m.externalMarks},${m.totalMarks},"${m.grade}","${m.result}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'apex_gradebook_evaluations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Gradebook to CSV', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Marks & Gradebook
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Student marks records, internal assessments, semester finals, and grade computation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Enter Marks</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              <option value="All">All Results</option>
              <option value="Pass">Pass Only</option>
              <option value="Fail">Fail Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Student ID & Name</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4 text-center">Internal (30)</th>
                <th className="py-3.5 px-4 text-center">External (70)</th>
                <th className="py-3.5 px-4 text-center">Total (100)</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-4 text-center">Result</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredMarks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No marks records match your search.
                  </td>
                </tr>
              ) : (
                filteredMarks.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{rec.studentName}</p>
                        <p className="font-mono text-[11px] text-indigo-600 font-semibold">{rec.studentId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{rec.subjectName}</p>
                      <span className="font-mono text-[10px] text-slate-400 font-medium">({rec.subjectCode})</span>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700">
                      {rec.internalMarks}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-700">
                      {rec.externalMarks}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-extrabold text-slate-900 text-sm">{rec.totalMarks}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs">
                        {rec.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          rec.result === 'Pass'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {rec.result === 'Pass' ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3 text-rose-500" />}
                        {rec.result}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(rec)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit Marks"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(rec.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMark ? 'Update Evaluation Marks' : 'Record Student Marks'}
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Student <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.studentId}
                onChange={(e) => {
                  const std = students.find((s) => s.studentId === e.target.value);
                  setFormData({
                    ...formData,
                    studentId: e.target.value,
                    studentName: std ? std.name : formData.studentName
                  });
                }}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.studentId}>
                    {s.name} ({s.studentId}) - {s.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.subjectCode}
                onChange={(e) => {
                  const sub = subjects.find((s) => s.code === e.target.value);
                  setFormData({
                    ...formData,
                    subjectCode: e.target.value,
                    subjectName: sub ? sub.name : formData.subjectName
                  });
                }}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.code}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Internal Assessment (Max 30)
              </label>
              <input
                type="number"
                min={0}
                max={30}
                required
                value={formData.internalMarks}
                onChange={(e) => setFormData({ ...formData, internalMarks: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                External / Final Exam (Max 70)
              </label>
              <input
                type="number"
                min={0}
                max={70}
                required
                value={formData.externalMarks}
                onChange={(e) => setFormData({ ...formData, externalMarks: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Real-time Preview Calculation Box */}
            <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Calculated Total</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {Number(formData.internalMarks) + Number(formData.externalMarks)} / 100
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Expected Grade</span>
                <span className="font-bold text-indigo-600 text-sm">
                  {calculateGradeAndResult(Number(formData.internalMarks), Number(formData.externalMarks)).grade}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Result Verdict</span>
                <span
                  className={`font-bold ${
                    calculateGradeAndResult(Number(formData.internalMarks), Number(formData.externalMarks)).result === 'Pass'
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}
                >
                  {calculateGradeAndResult(Number(formData.internalMarks), Number(formData.externalMarks)).result}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition"
            >
              {editingMark ? 'Update Marks' : 'Save Marks'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Marks Entry"
        maxWidth="sm"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Are you sure?</h4>
            <p className="text-xs text-slate-500 mt-1">
              This will remove the student grade evaluation from the official record.
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
