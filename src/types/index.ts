export type Role = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  phone?: string;
  studentId?: string;
  facultyId?: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  attendance: number; // percentage e.g. 88
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  avatar?: string;
  enrollmentDate: string;
  cgpa: number;
  address?: string;
  parentName?: string;
  parentPhone?: string;
}

export interface Faculty {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string; // e.g. "Associate Professor", "HOD", "Assistant Professor"
  qualification: string; // e.g. "Ph.D in AI, M.Tech"
  subject: string;
  status: 'Active' | 'On Leave' | 'Retired';
  joiningDate: string;
  avatar?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  headOfDepartment: string;
  studentsCount: number;
  facultyCount: number;
  coursesCount: number;
  description: string;
  establishedYear: number;
  email: string;
  iconName?: string;
}

export interface Course {
  id: string;
  courseId: string;
  name: string;
  department: string;
  duration: string; // e.g. "4 Years", "2 Years"
  totalSemesters: number;
  headFaculty: string;
  credits: number;
  status: 'Active' | 'Archived';
  description: string;
  feesPerYear: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  facultyId: string;
  facultyName: string;
  type: 'Theory' | 'Practical' | 'Elective';
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  department: string;
  year: number;
  semester: number;
  subjectCode: string;
  subjectName: string;
  facultyId: string;
  records: {
    studentId: string;
    studentName: string;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
  }[];
}

export interface Examination {
  id: string;
  name: string; // e.g. "Mid-Term Exam Spring 2026", "End-Semester Theory Exam"
  examName?: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 01:00 PM"
  roomNumber: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  totalMarks: number;
  passingMarks: number;
}

export interface MarkRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string; // "A+", "A", "B+", "B", "C", "F"
  status: 'Pass' | 'Fail';
  result?: 'Pass' | 'Fail';
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  year: number;
  semester: number;
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  paymentStatus: 'Paid' | 'Partially Paid' | 'Pending';
  status?: 'Paid' | 'Partially Paid' | 'Pending';
  lastPaymentDate?: string;
  paymentDate?: string;
  invoiceNumber: string;
  receiptNo?: string;
  transactions: {
    id: string;
    amount: number;
    date: string;
    method: string;
    reference: string;
  }[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | string;
  time: string; // e.g. "09:00 AM - 10:00 AM"
  timeSlot?: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  facultyId?: string;
  room: string;
  roomNumber?: string;
  department: string;
  semester: number;
  type?: 'Lecture' | 'Lab' | 'Tutorial' | string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: 'Academic' | 'Cultural' | 'Sports' | 'Technical' | 'Workshop' | string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  organizer: string;
  image?: string;
  poster?: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  postedBy: string;
  role?: 'Admin' | 'Faculty' | 'Dean' | string;
  priority: 'High' | 'Medium' | 'Low';
  targetAudience: 'All' | 'Students' | 'Faculty' | 'Department' | 'Staff' | string;
  department?: string;
  attachmentUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  facultyName: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  submissionsCount: number;
  totalStudents: number;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  status: 'Submitted' | 'Graded' | 'Late';
  marksAwarded?: number;
  feedback?: string;
  fileAttachment?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'alert' | 'success';
  read: boolean;
  link?: string;
}
