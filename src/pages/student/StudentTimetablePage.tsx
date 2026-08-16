import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const StudentTimetablePage: React.FC = () => {
  const { user } = useAuth();
  const { timetable, students } = useData();

  const currentStudent = students.find((s) => s.email === user?.email) || students[0];
  const [activeDay, setActiveDay] = useState('Monday');

  const dept = currentStudent?.department || 'Computer Science & Engineering';
  const semester = currentStudent?.semester || 5;

  const daySlots = timetable.filter(
    (t) => t.day === activeDay && t.department === dept && t.semester === semester
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Weekly Lecture Schedule
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {dept} • Semester {semester} Class Timetable
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DAYS.map((day) => {
          const count = timetable.filter(
            (t) => t.day === day && t.department === dept && t.semester === semester
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

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daySlots.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200/80">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No lectures scheduled for {activeDay}</h4>
            <p className="text-xs text-slate-400 mt-1">Self-study / Library periods allocated.</p>
          </div>
        ) : (
          daySlots.map((slot) => (
            <div
              key={slot.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                    {slot.subjectCode}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.timeSlot}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {slot.subjectName}
                </h3>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{slot.facultyName}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.roomNumber}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
