import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { TimetableSlot } from '../../types';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimetablePage: React.FC = () => {
  const { timetable, departments, subjects, faculty, addTimetableSlot, updateTimetableSlot, deleteTimetableSlot } = useData();
  const { showToast } = useToast();

  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [selectedDept, setSelectedDept] = useState<string>(departments[0]?.name || 'Computer Science & Engineering');
  const [selectedSemester, setSelectedSemester] = useState<string>('5');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    day: 'Monday',
    timeSlot: '09:00 AM - 10:00 AM',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    facultyName: 'Dr. Alan Turing',
    roomNumber: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5
  });

  const handleOpenAdd = () => {
    setEditingSlot(null);
    const sub = subjects[0];
    const fac = faculty[0];
    setFormData({
      day: activeDay,
      timeSlot: '09:00 AM - 10:00 AM',
      subjectCode: sub?.code || 'CS501',
      subjectName: sub?.name || 'Data Structures & Algorithms',
      facultyName: fac?.name || 'Assigned Faculty',
      roomNumber: 'Room 302',
      department: selectedDept,
      semester: Number(selectedSemester)
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setFormData({
      day: slot.day,
      timeSlot: slot.timeSlot,
      subjectCode: slot.subjectCode,
      subjectName: slot.subjectName,
      facultyName: slot.facultyName,
      roomNumber: slot.roomNumber,
      department: slot.department,
      semester: slot.semester
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlot) {
      updateTimetableSlot(editingSlot.id, {
        ...formData,
        semester: Number(formData.semester)
      });
    } else {
      addTimetableSlot({
        ...formData,
        semester: Number(formData.semester)
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteTimetableSlot(id);
    setDeleteConfirmId(null);
  };

  // Filter slots for the current selected day, department & semester
  const activeDaySlots = timetable.filter(
    (t) =>
      t.day === activeDay &&
      t.department === selectedDept &&
      t.semester.toString() === selectedSemester
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Schedule & Timetable
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Weekly class schedule, lecture halls, professor assignments, and lab periods.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lecture Slot</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Department:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s.toString()}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {activeDaySlots.length} lectures scheduled on {activeDay}
        </span>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DAYS.map((day) => {
          const count = timetable.filter(
            (t) => t.day === day && t.department === selectedDept && t.semester.toString() === selectedSemester
          ).length;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeDay === day
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{day}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeDay === day ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timetable Lecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeDaySlots.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200/80">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No classes scheduled for {activeDay}</h4>
            <p className="text-xs text-slate-400 mt-1">
              Click "+ Add Lecture Slot" to create period schedules.
            </p>
          </div>
        ) : (
          activeDaySlots.map((slot) => (
            <div
              key={slot.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.timeSlot}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(slot)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(slot.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mt-2">
                  {slot.subjectName}
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  Code: {slot.subjectCode}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <p className="flex items-center gap-2 text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium">{slot.facultyName}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.roomNumber}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{slot.department}</span>
                <span>Semester {slot.semester}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSlot ? 'Edit Timetable Slot' : 'Add Lecture Slot'}
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Day of Week
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Time Slot
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 AM - 11:00 AM"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject
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
                Assigned Professor
              </label>
              <input
                type="text"
                value={formData.facultyName}
                onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lecture Room / Lab
              </label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:border-indigo-500"
              />
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
              {editingSlot ? 'Save Changes' : 'Add Slot'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Timetable Slot"
        maxWidth="sm"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Are you sure?</h4>
            <p className="text-xs text-slate-500 mt-1">
              This lecture slot will be removed from the class schedule.
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
