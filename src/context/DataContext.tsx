import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Student,
  Faculty,
  Department,
  Course,
  Subject,
  Examination,
  MarkRecord,
  FeeRecord,
  TimetableSlot,
  CollegeEvent,
  Notice,
  Assignment,
  StudentSubmission,
  AttendanceRecord,
  NotificationItem
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_SUBJECTS,
  INITIAL_EXAMINATIONS,
  INITIAL_MARKS,
  INITIAL_FEES,
  INITIAL_TIMETABLE,
  INITIAL_EVENTS,
  INITIAL_NOTICES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ATTENDANCE_RECORDS
} from '../data/seedData';
import { useToast } from './ToastContext';

interface DataContextType {
  students: Student[];
  faculty: Faculty[];
  departments: Department[];
  courses: Course[];
  subjects: Subject[];
  examinations: Examination[];
  marks: MarkRecord[];
  fees: FeeRecord[];
  timetable: TimetableSlot[];
  events: CollegeEvent[];
  notices: Notice[];
  assignments: Assignment[];
  submissions: StudentSubmission[];
  attendanceRecords: AttendanceRecord[];
  notifications: NotificationItem[];

  // Student CRUD
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Faculty CRUD
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, updated: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;

  // Department CRUD
  addDepartment: (department: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, updated: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;

  // Course CRUD
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Subject CRUD
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, updated: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Examination CRUD
  addExamination: (exam: Omit<Examination, 'id'>) => void;
  updateExamination: (id: string, updated: Partial<Examination>) => void;
  deleteExamination: (id: string) => void;

  // Marks CRUD
  addMarkRecord: (mark: Omit<MarkRecord, 'id'>) => void;
  updateMarkRecord: (id: string, updated: Partial<MarkRecord>) => void;
  deleteMarkRecord: (id: string) => void;

  // Fees
  recordFeePayment: (feeId: string, amount: number, method: string) => void;
  addFeeRecord: (fee: Omit<FeeRecord, 'id' | 'transactions'>) => void;
  updateFeeRecord: (id: string, updated: Partial<FeeRecord>) => void;

  // Timetable
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  updateTimetableSlot: (id: string, updated: Partial<TimetableSlot>) => void;
  deleteTimetableSlot: (id: string) => void;

  // Events
  addEvent: (event: Omit<CollegeEvent, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<CollegeEvent>) => void;
  deleteEvent: (id: string) => void;

  // Notices
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, updated: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;

  // Attendance
  saveAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;

  // Assignments
  addAssignment: (assignment: Omit<Assignment, 'id' | 'submissionsCount'>) => void;
  submitAssignment: (assignmentId: string, studentId: string, studentName: string, fileName?: string) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Reset
  resetAllDemoData: () => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage('cms_students', INITIAL_STUDENTS)
  );
  const [faculty, setFaculty] = useState<Faculty[]>(() =>
    loadFromStorage('cms_faculty', INITIAL_FACULTY)
  );
  const [departments, setDepartments] = useState<Department[]>(() =>
    loadFromStorage('cms_departments', INITIAL_DEPARTMENTS)
  );
  const [courses, setCourses] = useState<Course[]>(() =>
    loadFromStorage('cms_courses', INITIAL_COURSES)
  );
  const [subjects, setSubjects] = useState<Subject[]>(() =>
    loadFromStorage('cms_subjects', INITIAL_SUBJECTS)
  );
  const [examinations, setExaminations] = useState<Examination[]>(() =>
    loadFromStorage('cms_examinations', INITIAL_EXAMINATIONS)
  );
  const [marks, setMarks] = useState<MarkRecord[]>(() =>
    loadFromStorage('cms_marks', INITIAL_MARKS)
  );
  const [fees, setFees] = useState<FeeRecord[]>(() =>
    loadFromStorage('cms_fees', INITIAL_FEES)
  );
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() =>
    loadFromStorage('cms_timetable', INITIAL_TIMETABLE)
  );
  const [events, setEvents] = useState<CollegeEvent[]>(() =>
    loadFromStorage('cms_events', INITIAL_EVENTS)
  );
  const [notices, setNotices] = useState<Notice[]>(() =>
    loadFromStorage('cms_notices', INITIAL_NOTICES)
  );
  const [assignments, setAssignments] = useState<Assignment[]>(() =>
    loadFromStorage('cms_assignments', INITIAL_ASSIGNMENTS)
  );
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() =>
    loadFromStorage('cms_submissions', [
      {
        id: 'subm-1',
        assignmentId: 'asg-1',
        studentId: 'STU2023001',
        studentName: 'Aarav Patel',
        submissionDate: '2026-08-11',
        status: 'Graded',
        marksAwarded: 19,
        feedback: 'Excellent clean implementation and thorough time-complexity analysis.'
      }
    ])
  );
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() =>
    loadFromStorage('cms_attendance_records', INITIAL_ATTENDANCE_RECORDS)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage('cms_notifications', [
      {
        id: 'notif-1',
        title: 'Exam Hall Tickets Released',
        message: 'Mid-semester exam schedules and hall allocations are now live.',
        time: '10 mins ago',
        type: 'info',
        read: false
      },
      {
        id: 'notif-2',
        title: 'Fee Payment Received',
        message: 'Your tuition payment of $8,000 for Fall 2026 was verified.',
        time: '2 hours ago',
        type: 'success',
        read: false
      },
      {
        id: 'notif-3',
        title: 'Attendance Reminder',
        message: 'Maintain above 75% attendance to qualify for semester finals.',
        time: '1 day ago',
        type: 'alert',
        read: true
      }
    ])
  );

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cms_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cms_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('cms_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('cms_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('cms_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('cms_examinations', JSON.stringify(examinations));
  }, [examinations]);

  useEffect(() => {
    localStorage.setItem('cms_marks', JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem('cms_fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('cms_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('cms_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('cms_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('cms_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('cms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('cms_attendance_records', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('cms_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Students CRUD
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`
    };
    setStudents((prev) => [newStudent, ...prev]);
    // Also create initial fee record
    const newFee: FeeRecord = {
      id: `fee-${Date.now()}`,
      studentId: newStudent.studentId,
      studentName: newStudent.name,
      department: newStudent.department,
      year: newStudent.year,
      semester: newStudent.semester,
      totalFees: 8000,
      paidAmount: 0,
      pendingAmount: 8000,
      paymentStatus: 'Pending',
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      transactions: []
    };
    setFees((prev) => [newFee, ...prev]);
    showToast(`Student ${newStudent.name} registered successfully!`, 'success');
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    showToast('Student information updated', 'success');
  };

  const deleteStudent = (id: string) => {
    const target = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Student ${target?.name || ''} removed`, 'info');
  };

  // Faculty CRUD
  const addFaculty = (data: Omit<Faculty, 'id'>) => {
    const newFac: Faculty = {
      ...data,
      id: `fac-${Date.now()}`
    };
    setFaculty((prev) => [newFac, ...prev]);
    showToast(`Faculty ${newFac.name} added successfully!`, 'success');
  };

  const updateFaculty = (id: string, updated: Partial<Faculty>) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
    showToast('Faculty profile updated', 'success');
  };

  const deleteFaculty = (id: string) => {
    const target = faculty.find((f) => f.id === id);
    setFaculty((prev) => prev.filter((f) => f.id !== id));
    showToast(`Faculty ${target?.name || ''} removed`, 'info');
  };

  // Department CRUD
  const addDepartment = (data: Omit<Department, 'id'>) => {
    const newDept: Department = {
      ...data,
      id: `dept-${Date.now()}`
    };
    setDepartments((prev) => [...prev, newDept]);
    showToast(`Department ${newDept.name} created!`, 'success');
  };

  const updateDepartment = (id: string, updated: Partial<Department>) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
    showToast('Department details updated', 'success');
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    showToast('Department deleted', 'info');
  };

  // Courses CRUD
  const addCourse = (data: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...data,
      id: `crs-${Date.now()}`
    };
    setCourses((prev) => [...prev, newCourse]);
    showToast(`Course ${newCourse.name} added!`, 'success');
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Course updated', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('Course removed', 'info');
  };

  // Subject CRUD
  const addSubject = (data: Omit<Subject, 'id'>) => {
    const newSub: Subject = {
      ...data,
      id: `sub-${Date.now()}`
    };
    setSubjects((prev) => [...prev, newSub]);
    showToast(`Subject ${newSub.code} added!`, 'success');
  };

  const updateSubject = (id: string, updated: Partial<Subject>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    showToast('Subject updated', 'success');
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast('Subject deleted', 'info');
  };

  // Exam CRUD
  const addExamination = (data: Omit<Examination, 'id'>) => {
    const newExam: Examination = {
      ...data,
      id: `exam-${Date.now()}`
    };
    setExaminations((prev) => [newExam, ...prev]);
    showToast(`Exam scheduled for ${newExam.subjectName}`, 'success');
  };

  const updateExamination = (id: string, updated: Partial<Examination>) => {
    setExaminations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
    showToast('Examination schedule updated', 'success');
  };

  const deleteExamination = (id: string) => {
    setExaminations((prev) => prev.filter((e) => e.id !== id));
    showToast('Exam schedule deleted', 'info');
  };

  // Marks CRUD
  const addMarkRecord = (data: Omit<MarkRecord, 'id'>) => {
    const newMark: MarkRecord = {
      ...data,
      id: `mrk-${Date.now()}`
    };
    setMarks((prev) => [newMark, ...prev]);
    showToast(`Marks added for ${newMark.studentName}`, 'success');
  };

  const updateMarkRecord = (id: string, updated: Partial<MarkRecord>) => {
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
    showToast('Student result updated', 'success');
  };

  const deleteMarkRecord = (id: string) => {
    setMarks((prev) => prev.filter((m) => m.id !== id));
    showToast('Mark record removed', 'info');
  };

  // Fees
  const recordFeePayment = (feeId: string, amount: number, method: string) => {
    setFees((prev) =>
      prev.map((f) => {
        if (f.id === feeId) {
          const newPaid = f.paidAmount + amount;
          const newPending = Math.max(0, f.totalFees - newPaid);
          const newStatus =
            newPending === 0
              ? 'Paid'
              : newPaid > 0
              ? 'Partially Paid'
              : 'Pending';

          const newTxn = {
            id: `txn-${Date.now()}`,
            amount,
            date: new Date().toISOString().split('T')[0],
            method,
            reference: `TXN_${Math.random().toString(36).substring(2, 9).toUpperCase()}`
          };

          return {
            ...f,
            paidAmount: newPaid,
            pendingAmount: newPending,
            paymentStatus: newStatus,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            transactions: [newTxn, ...(f.transactions || [])]
          };
        }
        return f;
      })
    );
    showToast(`Fee payment of $${amount.toLocaleString()} processed successfully!`, 'success');
  };

  const addFeeRecord = (fee: Omit<FeeRecord, 'id' | 'transactions'>) => {
    const newFee: FeeRecord = {
      ...fee,
      id: `fee-${Date.now()}`,
      transactions: []
    };
    setFees((prev) => [newFee, ...prev]);
    showToast('New fee invoice generated', 'success');
  };

  const updateFeeRecord = (id: string, updated: Partial<FeeRecord>) => {
    setFees((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
    showToast('Fee record updated', 'success');
  };

  // Timetable
  const addTimetableSlot = (data: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...data,
      id: `tt-${Date.now()}`
    };
    setTimetable((prev) => [...prev, newSlot]);
    showToast('Timetable slot added', 'success');
  };

  const updateTimetableSlot = (id: string, updated: Partial<TimetableSlot>) => {
    setTimetable((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    showToast('Timetable schedule updated', 'success');
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
    showToast('Slot removed from timetable', 'info');
  };

  // Events
  const addEvent = (data: Omit<CollegeEvent, 'id'>) => {
    const newEvent: CollegeEvent = {
      ...data,
      id: `evt-${Date.now()}`
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published!`, 'success');
  };

  const updateEvent = (id: string, updated: Partial<CollegeEvent>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
    showToast('Event details updated', 'success');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed', 'info');
  };

  // Notices
  const addNotice = (data: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...data,
      id: `not-${Date.now()}`
    };
    setNotices((prev) => [newNotice, ...prev]);

    // Also add to global notifications
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: newNotice.title,
      message: newNotice.description.slice(0, 80) + '...',
      time: 'Just now',
      type: newNotice.priority === 'High' ? 'alert' : 'info',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Circular notice published!`, 'success');
  };

  const updateNotice = (id: string, updated: Partial<Notice>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
    showToast('Notice circular updated', 'success');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Notice deleted', 'info');
  };

  // Attendance
  const saveAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `att-${Date.now()}`
    };
    setAttendanceRecords((prev) => [newRecord, ...prev]);

    // Update individual students' attendance percentage based on this record
    recordData.records.forEach((rec) => {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.studentId === rec.studentId) {
            // Adjust attendance percentage slightly for simulation
            const delta = rec.status === 'Present' ? 0.5 : -1.5;
            const updatedAtt = Math.min(100, Math.max(40, Math.round((s.attendance + delta) * 10) / 10));
            return { ...s, attendance: updatedAtt };
          }
          return s;
        })
      );
    });

    showToast(`Attendance marked for ${recordData.records.length} students`, 'success');
  };

  // Assignments
  const addAssignment = (data: Omit<Assignment, 'id' | 'submissionsCount'>) => {
    const newAsg: Assignment = {
      ...data,
      id: `asg-${Date.now()}`,
      submissionsCount: 0
    };
    setAssignments((prev) => [newAsg, ...prev]);
    showToast(`Assignment "${newAsg.title}" assigned`, 'success');
  };

  const submitAssignment = (
    assignmentId: string,
    studentId: string,
    studentName: string,
    fileName = 'Assignment_Solution.pdf'
  ) => {
    const newSubmission: StudentSubmission = {
      id: `subm-${Date.now()}`,
      assignmentId,
      studentId,
      studentName,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      fileAttachment: fileName
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, submissionsCount: a.submissionsCount + 1 }
          : a
      )
    );
    showToast('Assignment submitted successfully!', 'success');
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, status: 'Graded', marksAwarded: marks, feedback }
          : s
      )
    );
    showToast('Grade and feedback saved!', 'success');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Reset demo
  const resetAllDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setFaculty(INITIAL_FACULTY);
    setDepartments(INITIAL_DEPARTMENTS);
    setCourses(INITIAL_COURSES);
    setSubjects(INITIAL_SUBJECTS);
    setExaminations(INITIAL_EXAMINATIONS);
    setMarks(INITIAL_MARKS);
    setFees(INITIAL_FEES);
    setTimetable(INITIAL_TIMETABLE);
    setEvents(INITIAL_EVENTS);
    setNotices(INITIAL_NOTICES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setAttendanceRecords(INITIAL_ATTENDANCE_RECORDS);

    localStorage.removeItem('cms_students');
    localStorage.removeItem('cms_faculty');
    localStorage.removeItem('cms_departments');
    localStorage.removeItem('cms_courses');
    localStorage.removeItem('cms_subjects');
    localStorage.removeItem('cms_examinations');
    localStorage.removeItem('cms_marks');
    localStorage.removeItem('cms_fees');
    localStorage.removeItem('cms_timetable');
    localStorage.removeItem('cms_events');
    localStorage.removeItem('cms_notices');
    localStorage.removeItem('cms_assignments');
    localStorage.removeItem('cms_submissions');
    localStorage.removeItem('cms_attendance_records');
    localStorage.removeItem('cms_notifications');

    showToast('System data reset to initial demo state!', 'success');
  };

  return (
    <DataContext.Provider
      value={{
        students,
        faculty,
        departments,
        courses,
        subjects,
        examinations,
        marks,
        fees,
        timetable,
        events,
        notices,
        assignments,
        submissions,
        attendanceRecords,
        notifications,

        addStudent,
        updateStudent,
        deleteStudent,

        addFaculty,
        updateFaculty,
        deleteFaculty,

        addDepartment,
        updateDepartment,
        deleteDepartment,

        addCourse,
        updateCourse,
        deleteCourse,

        addSubject,
        updateSubject,
        deleteSubject,

        addExamination,
        updateExamination,
        deleteExamination,

        addMarkRecord,
        updateMarkRecord,
        deleteMarkRecord,

        recordFeePayment,
        addFeeRecord,
        updateFeeRecord,

        addTimetableSlot,
        updateTimetableSlot,
        deleteTimetableSlot,

        addEvent,
        updateEvent,
        deleteEvent,

        addNotice,
        updateNotice,
        deleteNotice,

        saveAttendance,
        markAttendance: saveAttendance,

        addAssignment,
        submitAssignment,
        gradeSubmission,

        markNotificationAsRead,
        markAllNotificationsAsRead,

        resetAllDemoData,
        resetDemoData: resetAllDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
