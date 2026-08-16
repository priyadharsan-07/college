import React, { useState, useEffect } from 'react';
import { Search, User, BookOpen, GraduationCap, Calendar, Bell, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { students, faculty, courses, examinations, notices } = useData();
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedStudents = trimmed
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.studentId.toLowerCase().includes(trimmed) ||
          s.department.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchedFaculty = trimmed
    ? faculty.filter(
        (f) =>
          f.name.toLowerCase().includes(trimmed) ||
          f.facultyId.toLowerCase().includes(trimmed) ||
          f.subject.toLowerCase().includes(trimmed) ||
          f.department.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchedCourses = trimmed
    ? courses.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.courseId.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchedExams = trimmed
    ? examinations.filter(
        (e) =>
          e.subjectName.toLowerCase().includes(trimmed) ||
          e.subjectCode.toLowerCase().includes(trimmed) ||
          e.name.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchedNotices = trimmed
    ? notices.filter(
        (n) =>
          n.title.toLowerCase().includes(trimmed) ||
          n.description.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const hasResults =
    matchedStudents.length > 0 ||
    matchedFaculty.length > 0 ||
    matchedCourses.length > 0 ||
    matchedExams.length > 0 ||
    matchedNotices.length > 0;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const getBasePath = () => {
    if (role === 'admin') return '/admin';
    if (role === 'faculty') return '/faculty';
    return '/student';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search students, faculty, courses, exams, announcements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-200 rounded border border-slate-300">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {!trimmed ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Type keywords like <span className="font-semibold text-indigo-600">"Aarav"</span>, <span className="font-semibold text-indigo-600">"Neural"</span>, <span className="font-semibold text-indigo-600">"Exam"</span>, or <span className="font-semibold text-indigo-600">"CSE"</span>
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <button
                  onClick={() => setQuery('Student')}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition"
                >
                  Students
                </button>
                <button
                  onClick={() => setQuery('Faculty')}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition"
                >
                  Faculty
                </button>
                <button
                  onClick={() => setQuery('Exam')}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 font-medium transition"
                >
                  Exams
                </button>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              No matching records found for "{query}"
            </div>
          ) : (
            <div className="space-y-4">
              {/* Students */}
              {matchedStudents.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Students
                  </h4>
                  <div className="space-y-1">
                    {matchedStudents.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleNavigate(`${getBasePath()}/students`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center text-xs shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900">
                              {s.name} <span className="text-xs text-slate-400">({s.studentId})</span>
                            </p>
                            <p className="text-xs text-slate-500">{s.department} • Year {s.year}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty */}
              {matchedFaculty.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Faculty
                  </h4>
                  <div className="space-y-1">
                    {matchedFaculty.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleNavigate(`${getBasePath()}/faculty`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-xs shrink-0">
                            {f.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900">
                              {f.name}
                            </p>
                            <p className="text-xs text-slate-500">{f.subject} • {f.department}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {matchedCourses.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Courses
                  </h4>
                  <div className="space-y-1">
                    {matchedCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleNavigate(`${getBasePath()}/courses`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left transition group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900">
                            {c.name}
                          </p>
                          <p className="text-xs text-slate-500">{c.department} • {c.duration}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Exams */}
              {matchedExams.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Examinations
                  </h4>
                  <div className="space-y-1">
                    {matchedExams.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => handleNavigate(`${getBasePath()}/examinations`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left transition group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900">
                            {e.subjectName} ({e.subjectCode})
                          </p>
                          <p className="text-xs text-slate-500">{e.date} • {e.time} • {e.roomNumber}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {matchedNotices.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5" /> Notices
                  </h4>
                  <div className="space-y-1">
                    {matchedNotices.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => handleNavigate(`${getBasePath()}/notices`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left transition group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900 line-clamp-1">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500">{n.date} • By {n.postedBy}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
