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
  AttendanceRecord
} from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-aiml',
    code: 'AIML',
    name: 'Artificial Intelligence & Machine Learning',
    headOfDepartment: 'Dr. Rajesh Sharma',
    studentsCount: 360,
    facultyCount: 18,
    coursesCount: 4,
    description: 'Premier department specializing in Deep Learning, Computer Vision, NLP, and Robotics Engineering.',
    establishedYear: 2020,
    email: 'hod.aiml@college.edu',
    iconName: 'Cpu'
  },
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    headOfDepartment: 'Dr. Meera Nambiar',
    studentsCount: 720,
    facultyCount: 35,
    coursesCount: 8,
    description: 'Flagship engineering department covering Software Systems, Cloud Computing, Distributed Networks, and Cyber Security.',
    establishedYear: 1998,
    email: 'hod.cse@college.edu',
    iconName: 'Terminal'
  },
  {
    id: 'dept-it',
    code: 'IT',
    name: 'Information Technology',
    headOfDepartment: 'Dr. Anand Verma',
    studentsCount: 480,
    facultyCount: 22,
    coursesCount: 6,
    description: 'Focusing on enterprise application architectures, Web Technologies, Database Management, and IoT.',
    establishedYear: 2004,
    email: 'hod.it@college.edu',
    iconName: 'Globe'
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    headOfDepartment: 'Dr. Sunita Deshmukh',
    studentsCount: 520,
    facultyCount: 26,
    coursesCount: 5,
    description: 'Pioneering research in VLSI Design, Embedded Systems, Wireless Communications, and Signal Processing.',
    establishedYear: 2001,
    email: 'hod.ece@college.edu',
    iconName: 'Radio'
  },
  {
    id: 'dept-mech',
    code: 'MECH',
    name: 'Mechanical Engineering',
    headOfDepartment: 'Dr. Vikramaditya Rao',
    studentsCount: 400,
    facultyCount: 20,
    coursesCount: 5,
    description: 'Advanced manufacturing, Thermodynamics, CAD/CAM, Automotive design, and Mechatronics.',
    establishedYear: 1995,
    email: 'hod.mech@college.edu',
    iconName: 'Wrench'
  },
  {
    id: 'dept-civil',
    code: 'CIVIL',
    name: 'Civil Engineering',
    headOfDepartment: 'Dr. K. S. Ramanujam',
    studentsCount: 320,
    facultyCount: 16,
    coursesCount: 4,
    description: 'Structural engineering, Smart City Infrastructure, Geo-technical analysis, and Environmental engineering.',
    establishedYear: 1992,
    email: 'hod.civil@college.edu',
    iconName: 'Building2'
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 'fac-1',
    facultyId: 'FAC202101',
    name: 'Dr. Rajesh Sharma',
    email: 'faculty@college.com',
    phone: '+1 (555) 234-5678',
    department: 'Artificial Intelligence & Machine Learning',
    designation: 'Professor & HOD',
    qualification: 'Ph.D in Machine Learning (Stanford Post-Doc)',
    subject: 'Neural Networks & Deep Learning',
    status: 'Active',
    joiningDate: '2020-06-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-2',
    facultyId: 'FAC201804',
    name: 'Dr. Meera Nambiar',
    email: 'meera.nambiar@college.edu',
    phone: '+1 (555) 345-6789',
    department: 'Computer Science & Engineering',
    designation: 'Professor & HOD',
    qualification: 'Ph.D in Distributed Systems (IIT Madras)',
    subject: 'Cloud Computing & Distributed Systems',
    status: 'Active',
    joiningDate: '2018-03-10',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-3',
    facultyId: 'FAC201912',
    name: 'Prof. David Wilson',
    email: 'david.wilson@college.edu',
    phone: '+1 (555) 456-7890',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    qualification: 'M.Tech, MS in Cybersecurity (Carnegie Mellon)',
    subject: 'Data Structures & Algorithms',
    status: 'Active',
    joiningDate: '2019-07-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-4',
    facultyId: 'FAC202203',
    name: 'Dr. Priya Sengupta',
    email: 'priya.sengupta@college.edu',
    phone: '+1 (555) 567-8901',
    department: 'Information Technology',
    designation: 'Assistant Professor',
    qualification: 'Ph.D in Database Technologies',
    subject: 'Database Management Systems & SQL',
    status: 'Active',
    joiningDate: '2022-01-15',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-5',
    facultyId: 'FAC201708',
    name: 'Dr. Sunita Deshmukh',
    email: 'sunita.deshmukh@college.edu',
    phone: '+1 (555) 678-9012',
    department: 'Electronics & Communication Engineering',
    designation: 'Professor & HOD',
    qualification: 'Ph.D in Microelectronics (Georgia Tech)',
    subject: 'VLSI Design & Embedded Systems',
    status: 'Active',
    joiningDate: '2017-08-01',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-6',
    facultyId: 'FAC202011',
    name: 'Prof. Kevin Patterson',
    email: 'kevin.patterson@college.edu',
    phone: '+1 (555) 789-0123',
    department: 'Mechanical Engineering',
    designation: 'Associate Professor',
    qualification: 'M.S. in Robotics & CAD Engineering',
    subject: 'Thermodynamics & Robotics',
    status: 'On Leave',
    joiningDate: '2020-11-05',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    studentId: 'STU2023001',
    name: 'Aarav Patel',
    email: 'student@college.com',
    phone: '+1 (555) 101-2001',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    attendance: 92,
    status: 'Active',
    enrollmentDate: '2023-08-10',
    cgpa: 8.95,
    address: '42 Campus View Road, Tech Enclave',
    parentName: 'Suresh Patel',
    parentPhone: '+1 (555) 909-3001',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-2',
    studentId: 'STU2023002',
    name: 'Emily Zhang',
    email: 'emily.zhang@student.college.edu',
    phone: '+1 (555) 101-2002',
    department: 'Artificial Intelligence & Machine Learning',
    year: 3,
    semester: 5,
    attendance: 96,
    status: 'Active',
    enrollmentDate: '2023-08-10',
    cgpa: 9.40,
    address: '108 Horizon Heights, Innovation Park',
    parentName: 'Wei Zhang',
    parentPhone: '+1 (555) 909-3002',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-3',
    studentId: 'STU2023003',
    name: 'Michael Chang',
    email: 'michael.c@student.college.edu',
    phone: '+1 (555) 101-2003',
    department: 'Information Technology',
    year: 2,
    semester: 3,
    attendance: 84,
    status: 'Active',
    enrollmentDate: '2024-08-12',
    cgpa: 7.85,
    address: '15 Maple Grove, University Blvd',
    parentName: 'David Chang',
    parentPhone: '+1 (555) 909-3003',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-4',
    studentId: 'STU2023004',
    name: 'Sophia Rodriguez',
    email: 'sophia.r@student.college.edu',
    phone: '+1 (555) 101-2004',
    department: 'Electronics & Communication Engineering',
    year: 4,
    semester: 7,
    attendance: 89,
    status: 'Active',
    enrollmentDate: '2022-08-15',
    cgpa: 8.60,
    address: '77 Silicon Square, North Wing',
    parentName: 'Elena Rodriguez',
    parentPhone: '+1 (555) 909-3004',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-5',
    studentId: 'STU2023005',
    name: 'Rohan Gupta',
    email: 'rohan.g@student.college.edu',
    phone: '+1 (555) 101-2005',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    attendance: 71,
    status: 'Active',
    enrollmentDate: '2023-08-10',
    cgpa: 6.90,
    address: '23 College Green, Hostel Block C',
    parentName: 'Vikram Gupta',
    parentPhone: '+1 (555) 909-3005',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-6',
    studentId: 'STU2023006',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@student.college.edu',
    phone: '+1 (555) 101-2006',
    department: 'Artificial Intelligence & Machine Learning',
    year: 2,
    semester: 3,
    attendance: 94,
    status: 'Active',
    enrollmentDate: '2024-08-12',
    cgpa: 9.10,
    address: '88 Lakecrest Residency, East Wing',
    parentName: 'Raghavan Iyer',
    parentPhone: '+1 (555) 909-3006',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-7',
    studentId: 'STU2023007',
    name: 'James Reynolds',
    email: 'james.r@student.college.edu',
    phone: '+1 (555) 101-2007',
    department: 'Mechanical Engineering',
    year: 4,
    semester: 7,
    attendance: 87,
    status: 'Active',
    enrollmentDate: '2022-08-15',
    cgpa: 8.25,
    address: '19 Industrial Ave, Tech Zone',
    parentName: 'Mark Reynolds',
    parentPhone: '+1 (555) 909-3007',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std-8',
    studentId: 'STU2023008',
    name: 'Fatima Al-Mansoor',
    email: 'fatima.m@student.college.edu',
    phone: '+1 (555) 101-2008',
    department: 'Civil Engineering',
    year: 1,
    semester: 1,
    attendance: 98,
    status: 'Active',
    enrollmentDate: '2025-08-01',
    cgpa: 9.50,
    address: '54 Scholars Park, Central Campus',
    parentName: 'Tariq Al-Mansoor',
    parentPhone: '+1 (555) 909-3008',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-1',
    courseId: 'BTECH-AIML',
    name: 'B.Tech in Artificial Intelligence & Machine Learning',
    department: 'Artificial Intelligence & Machine Learning',
    duration: '4 Years',
    totalSemesters: 8,
    headFaculty: 'Dr. Rajesh Sharma',
    credits: 160,
    status: 'Active',
    description: 'Comprehensive 4-year degree in modern Artificial Intelligence, Machine Learning algorithms, Computer Vision, and Neural Networks.',
    feesPerYear: 8500
  },
  {
    id: 'crs-2',
    courseId: 'BTECH-CSE',
    name: 'B.Tech in Computer Science & Engineering',
    department: 'Computer Science & Engineering',
    duration: '4 Years',
    totalSemesters: 8,
    headFaculty: 'Dr. Meera Nambiar',
    credits: 160,
    status: 'Active',
    description: 'Core computing curriculum covering Data Structures, Operating Systems, Compilers, Distributed Systems, and Web Engineering.',
    feesPerYear: 8000
  },
  {
    id: 'crs-3',
    courseId: 'BTECH-IT',
    name: 'B.Tech in Information Technology',
    department: 'Information Technology',
    duration: '4 Years',
    totalSemesters: 8,
    headFaculty: 'Dr. Anand Verma',
    credits: 160,
    status: 'Active',
    description: 'Enterprise IT solutions, Cloud Architecture, Mobile Applications, and Information Security.',
    feesPerYear: 7800
  },
  {
    id: 'crs-4',
    courseId: 'BTECH-ECE',
    name: 'B.Tech in Electronics & Communication Engineering',
    department: 'Electronics & Communication Engineering',
    duration: '4 Years',
    totalSemesters: 8,
    headFaculty: 'Dr. Sunita Deshmukh',
    credits: 160,
    status: 'Active',
    description: 'Modern electronics, Semiconductor devices, RF communication, Digital Signal Processing, and IoT systems.',
    feesPerYear: 7500
  },
  {
    id: 'crs-5',
    courseId: 'MTECH-AI',
    name: 'M.Tech in Advanced Artificial Intelligence',
    department: 'Artificial Intelligence & Machine Learning',
    duration: '2 Years',
    totalSemesters: 4,
    headFaculty: 'Dr. Rajesh Sharma',
    credits: 80,
    status: 'Active',
    description: 'Postgraduate research program focusing on Generative AI, LLMs, Autonomous Robotics, and Reinforcement Learning.',
    feesPerYear: 9500
  },
  {
    id: 'crs-6',
    courseId: 'BTECH-MECH',
    name: 'B.Tech in Mechanical Engineering',
    department: 'Mechanical Engineering',
    duration: '4 Years',
    totalSemesters: 8,
    headFaculty: 'Dr. Vikramaditya Rao',
    credits: 160,
    status: 'Active',
    description: 'Thermal engineering, Advanced Robotics, Automation, and Smart Manufacturing Technologies.',
    feesPerYear: 7200
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    code: 'CS501',
    name: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    facultyId: 'FAC201912',
    facultyName: 'Prof. David Wilson',
    type: 'Theory'
  },
  {
    id: 'sub-2',
    code: 'CS502',
    name: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    facultyId: 'FAC202203',
    facultyName: 'Dr. Priya Sengupta',
    type: 'Theory'
  },
  {
    id: 'sub-3',
    code: 'AI503',
    name: 'Neural Networks & Deep Learning',
    department: 'Artificial Intelligence & Machine Learning',
    semester: 5,
    credits: 4,
    facultyId: 'FAC202101',
    facultyName: 'Dr. Rajesh Sharma',
    type: 'Theory'
  },
  {
    id: 'sub-4',
    code: 'CS504',
    name: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 3,
    facultyId: 'FAC201804',
    facultyName: 'Dr. Meera Nambiar',
    type: 'Theory'
  },
  {
    id: 'sub-5',
    code: 'CS505P',
    name: 'Full-Stack Web Development Lab',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 2,
    facultyId: 'FAC201912',
    facultyName: 'Prof. David Wilson',
    type: 'Practical'
  },
  {
    id: 'sub-6',
    code: 'EC506',
    name: 'Embedded Systems & IoT',
    department: 'Electronics & Communication Engineering',
    semester: 5,
    credits: 4,
    facultyId: 'FAC201708',
    facultyName: 'Dr. Sunita Deshmukh',
    type: 'Theory'
  }
];

export const INITIAL_EXAMINATIONS: Examination[] = [
  {
    id: 'exam-1',
    name: 'Mid-Semester Examinations Fall 2026',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    date: '2026-09-10',
    time: '10:00 AM - 01:00 PM',
    roomNumber: 'Hall A-301',
    status: 'Upcoming',
    totalMarks: 50,
    passingMarks: 20
  },
  {
    id: 'exam-2',
    name: 'Mid-Semester Examinations Fall 2026',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    date: '2026-09-12',
    time: '10:00 AM - 01:00 PM',
    roomNumber: 'Hall A-302',
    status: 'Upcoming',
    totalMarks: 50,
    passingMarks: 20
  },
  {
    id: 'exam-3',
    name: 'Mid-Semester Examinations Fall 2026',
    subjectCode: 'AI503',
    subjectName: 'Neural Networks & Deep Learning',
    department: 'Artificial Intelligence & Machine Learning',
    semester: 5,
    date: '2026-09-15',
    time: '02:00 PM - 05:00 PM',
    roomNumber: 'Auditorium Lab 1',
    status: 'Upcoming',
    totalMarks: 50,
    passingMarks: 20
  },
  {
    id: 'exam-4',
    name: 'Practical Examination Spring 2026',
    subjectCode: 'CS505P',
    subjectName: 'Full-Stack Web Development Lab',
    department: 'Computer Science & Engineering',
    semester: 5,
    date: '2026-08-05',
    time: '09:00 AM - 12:00 PM',
    roomNumber: 'Computer Lab 4',
    status: 'Completed',
    totalMarks: 50,
    passingMarks: 25
  },
  {
    id: 'exam-5',
    name: 'End-Semester Theory Exam Spring 2026',
    subjectCode: 'CS504',
    subjectName: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    date: '2026-08-01',
    time: '10:00 AM - 01:00 PM',
    roomNumber: 'Hall B-205',
    status: 'Completed',
    totalMarks: 100,
    passingMarks: 40
  }
];

export const INITIAL_MARKS: MarkRecord[] = [
  {
    id: 'mrk-1',
    studentId: 'STU2023001',
    studentName: 'Aarav Patel',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    internalMarks: 28,
    externalMarks: 65,
    totalMarks: 93,
    maxMarks: 100,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 'mrk-2',
    studentId: 'STU2023001',
    studentName: 'Aarav Patel',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    internalMarks: 27,
    externalMarks: 61,
    totalMarks: 88,
    maxMarks: 100,
    grade: 'A',
    status: 'Pass'
  },
  {
    id: 'mrk-3',
    studentId: 'STU2023001',
    studentName: 'Aarav Patel',
    subjectCode: 'CS504',
    subjectName: 'Cloud Computing & Distributed Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    internalMarks: 29,
    externalMarks: 63,
    totalMarks: 92,
    maxMarks: 100,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 'mrk-4',
    studentId: 'STU2023002',
    studentName: 'Emily Zhang',
    subjectCode: 'AI503',
    subjectName: 'Neural Networks & Deep Learning',
    department: 'Artificial Intelligence & Machine Learning',
    semester: 5,
    internalMarks: 30,
    externalMarks: 68,
    totalMarks: 98,
    maxMarks: 100,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 'mrk-5',
    studentId: 'STU2023005',
    studentName: 'Rohan Gupta',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    internalMarks: 16,
    externalMarks: 38,
    totalMarks: 54,
    maxMarks: 100,
    grade: 'C',
    status: 'Pass'
  }
];

export const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'fee-1',
    studentId: 'STU2023001',
    studentName: 'Aarav Patel',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    totalFees: 8000,
    paidAmount: 8000,
    pendingAmount: 0,
    paymentStatus: 'Paid',
    lastPaymentDate: '2026-08-01',
    invoiceNumber: 'INV-2026-0891',
    transactions: [
      {
        id: 'txn-101',
        amount: 8000,
        date: '2026-08-01',
        method: 'Online NetBanking',
        reference: 'TXN_NB_99382109'
      }
    ]
  },
  {
    id: 'fee-2',
    studentId: 'STU2023002',
    studentName: 'Emily Zhang',
    department: 'Artificial Intelligence & Machine Learning',
    year: 3,
    semester: 5,
    totalFees: 8500,
    paidAmount: 5000,
    pendingAmount: 3500,
    paymentStatus: 'Partially Paid',
    lastPaymentDate: '2026-08-02',
    invoiceNumber: 'INV-2026-0892',
    transactions: [
      {
        id: 'txn-102',
        amount: 5000,
        date: '2026-08-02',
        method: 'Credit Card',
        reference: 'TXN_CC_44920192'
      }
    ]
  },
  {
    id: 'fee-3',
    studentId: 'STU2023003',
    studentName: 'Michael Chang',
    department: 'Information Technology',
    year: 2,
    semester: 3,
    totalFees: 7800,
    paidAmount: 0,
    pendingAmount: 7800,
    paymentStatus: 'Pending',
    invoiceNumber: 'INV-2026-0893',
    transactions: []
  },
  {
    id: 'fee-4',
    studentId: 'STU2023004',
    studentName: 'Sophia Rodriguez',
    department: 'Electronics & Communication Engineering',
    year: 4,
    semester: 7,
    totalFees: 7500,
    paidAmount: 7500,
    pendingAmount: 0,
    paymentStatus: 'Paid',
    lastPaymentDate: '2026-07-28',
    invoiceNumber: 'INV-2026-0894',
    transactions: [
      {
        id: 'txn-104',
        amount: 7500,
        date: '2026-07-28',
        method: 'UPI / Google Pay',
        reference: 'TXN_UPI_88291039'
      }
    ]
  },
  {
    id: 'fee-5',
    studentId: 'STU2023005',
    studentName: 'Rohan Gupta',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    totalFees: 8000,
    paidAmount: 4000,
    pendingAmount: 4000,
    paymentStatus: 'Partially Paid',
    lastPaymentDate: '2026-08-05',
    invoiceNumber: 'INV-2026-0895',
    transactions: [
      {
        id: 'txn-105',
        amount: 4000,
        date: '2026-08-05',
        method: 'Bank Wire',
        reference: 'TXN_WIRE_11029384'
      }
    ]
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  {
    id: 'tt-1',
    day: 'Monday',
    time: '09:00 AM - 10:00 AM',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    facultyName: 'Prof. David Wilson',
    facultyId: 'FAC201912',
    room: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-2',
    day: 'Monday',
    time: '10:15 AM - 11:15 AM',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    facultyName: 'Dr. Priya Sengupta',
    facultyId: 'FAC202203',
    room: 'Room 302',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-3',
    day: 'Monday',
    time: '11:30 AM - 01:30 PM',
    subjectCode: 'CS505P',
    subjectName: 'Full-Stack Web Dev Lab',
    facultyName: 'Prof. David Wilson',
    facultyId: 'FAC201912',
    room: 'Lab 4',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lab'
  },
  {
    id: 'tt-4',
    day: 'Tuesday',
    time: '09:00 AM - 10:00 AM',
    subjectCode: 'CS504',
    subjectName: 'Cloud Computing & Distributed Systems',
    facultyName: 'Dr. Meera Nambiar',
    facultyId: 'FAC201804',
    room: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-5',
    day: 'Tuesday',
    time: '10:15 AM - 11:15 AM',
    subjectCode: 'AI503',
    subjectName: 'Neural Networks & Deep Learning',
    facultyName: 'Dr. Rajesh Sharma',
    facultyId: 'FAC202101',
    room: 'Auditorium 2',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-6',
    day: 'Wednesday',
    time: '09:00 AM - 10:00 AM',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    facultyName: 'Prof. David Wilson',
    facultyId: 'FAC201912',
    room: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-7',
    day: 'Wednesday',
    time: '10:15 AM - 11:15 AM',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    facultyName: 'Dr. Priya Sengupta',
    facultyId: 'FAC202203',
    room: 'Room 302',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-8',
    day: 'Thursday',
    time: '09:00 AM - 10:00 AM',
    subjectCode: 'CS504',
    subjectName: 'Cloud Computing & Distributed Systems',
    facultyName: 'Dr. Meera Nambiar',
    facultyId: 'FAC201804',
    room: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-9',
    day: 'Thursday',
    time: '02:00 PM - 03:30 PM',
    subjectCode: 'AI503',
    subjectName: 'Deep Learning Workshop / Tutorial',
    facultyName: 'Dr. Rajesh Sharma',
    facultyId: 'FAC202101',
    room: 'AI Center',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Tutorial'
  },
  {
    id: 'tt-10',
    day: 'Friday',
    time: '09:00 AM - 10:00 AM',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    facultyName: 'Prof. David Wilson',
    facultyId: 'FAC201912',
    room: 'Room 301',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lecture'
  },
  {
    id: 'tt-11',
    day: 'Friday',
    time: '10:15 AM - 12:15 PM',
    subjectCode: 'CS505P',
    subjectName: 'Project Evaluation & Code Review',
    facultyName: 'Prof. David Wilson',
    facultyId: 'FAC201912',
    room: 'Lab 4',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Lab'
  },
  {
    id: 'tt-12',
    day: 'Saturday',
    time: '10:00 AM - 12:00 PM',
    subjectCode: 'SEMINAR',
    subjectName: 'Industry Expert Guest Lecture',
    facultyName: 'Dr. Meera Nambiar',
    facultyId: 'FAC201804',
    room: 'Main Auditorium',
    department: 'Computer Science & Engineering',
    semester: 5,
    type: 'Tutorial'
  }
];

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 'evt-1',
    title: 'TechnoSphere 2026 - Annual National Hackathon',
    date: '2026-09-25',
    time: '09:00 AM - 08:00 PM',
    venue: 'Convention Center & Innovation Lab',
    description: '36-Hour uninterrupted hackathon featuring AI/ML tracks, Blockchain, Cyber Defense, and Web3 with prizes worth $25,000.',
    category: 'Technical',
    status: 'Upcoming',
    organizer: 'Computer Science & Engineering Association',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt-2',
    title: 'International Conference on AI & Autonomous Systems',
    date: '2026-10-14',
    time: '10:00 AM - 05:00 PM',
    venue: 'Main Academic Auditorium',
    description: 'Global researchers and IEEE fellows presenting keynotes on Next-Gen Generative AI, Robotics and Neuromorphic Computing.',
    category: 'Academic',
    status: 'Upcoming',
    organizer: 'Department of AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt-3',
    title: 'Spring Symphony - Inter-College Cultural Fest',
    date: '2026-11-05',
    time: '04:00 PM - 10:00 PM',
    venue: 'Campus Open Air Amphitheatre',
    description: '3-day mega cultural carnival featuring battle of bands, dance troupes, drama contests, food stalls, and celebrity concerts.',
    category: 'Cultural',
    status: 'Upcoming',
    organizer: 'Student Cultural Council',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt-4',
    title: 'Annual Inter-Department Football Tournament',
    date: '2026-08-20',
    time: '07:30 AM - 12:30 PM',
    venue: 'University Sports Complex',
    description: 'Exciting clash between engineering departments for the coveted Chancellor Memorial Cup.',
    category: 'Sports',
    status: 'Upcoming',
    organizer: 'Department of Physical Education',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Submission Deadline for Mid-Semester Exam Hall Tickets',
    description: 'All 3rd and 4th year engineering students must download and print their verified examination hall tickets before September 5th, 2026. Entry into exam halls will be strictly monitored.',
    date: '2026-08-14',
    postedBy: 'Office of the Controller of Examinations',
    role: 'Admin',
    priority: 'High',
    targetAudience: 'Students',
    attachmentUrl: '#'
  },
  {
    id: 'not-2',
    title: 'Campus Placement Drive: Google & Microsoft Registration',
    description: 'Eligible final year students with CGPA >= 7.50 and no standing backlogs can register on the training & placement portal for upcoming Tier-1 campus placement rounds starting next month.',
    date: '2026-08-12',
    postedBy: 'Head of Training & Placement Cell',
    role: 'Admin',
    priority: 'High',
    targetAudience: 'Students'
  },
  {
    id: 'not-3',
    title: 'Faculty Research Grant Proposals for Academic Year 2026-27',
    description: 'Faculty members are invited to submit seed fund research proposals for collaborative interdisciplinary projects under the Institutional Innovation Scheme by August 31st.',
    date: '2026-08-10',
    postedBy: 'Dean - Research & Development',
    role: 'Dean',
    priority: 'Medium',
    targetAudience: 'Faculty'
  },
  {
    id: 'not-4',
    title: 'Fee Payment Reminders for Semester V & VII',
    description: 'Last date for tuition fee payment without late fee surcharge has been extended to August 25th, 2026. Online receipt can be generated immediately via the student portal.',
    date: '2026-08-08',
    postedBy: 'Accounts & Finance Department',
    role: 'Admin',
    priority: 'Medium',
    targetAudience: 'All'
  },
  {
    id: 'not-5',
    title: 'Library Hours Extended for Examination Season',
    description: 'Central Library will operate 24x7 with high-speed Wi-Fi and study rooms available for all enrolled students from August 20th onwards.',
    date: '2026-08-05',
    postedBy: 'Chief Librarian',
    role: 'Admin',
    priority: 'Low',
    targetAudience: 'All'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Implementation of AVL Trees & Red-Black Balanced Trees',
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 5,
    facultyName: 'Prof. David Wilson',
    assignedDate: '2026-08-05',
    dueDate: '2026-08-25',
    maxMarks: 20,
    description: 'Write clean C++ or Java code to implement AVL self-balancing tree with insertion, deletion, and rotation operations. Include benchmark graphs comparing with standard BST.',
    submissionsCount: 42,
    totalStudents: 60
  },
  {
    id: 'asg-2',
    title: 'Design Normalized Schema (3NF/BCNF) for Hospital Management',
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    facultyName: 'Dr. Priya Sengupta',
    assignedDate: '2026-08-07',
    dueDate: '2026-08-28',
    maxMarks: 25,
    description: 'Create ER diagram, relational schema, SQL DDL scripts, and complex queries with indexes for a multi-specialty healthcare database.',
    submissionsCount: 38,
    totalStudents: 60
  },
  {
    id: 'asg-3',
    title: 'Convolutional Neural Network for Medical Image Classification',
    subjectCode: 'AI503',
    subjectName: 'Neural Networks & Deep Learning',
    department: 'Artificial Intelligence & Machine Learning',
    semester: 5,
    facultyName: 'Dr. Rajesh Sharma',
    assignedDate: '2026-08-10',
    dueDate: '2026-09-02',
    maxMarks: 30,
    description: 'Train a ResNet/EfficientNet model with PyTorch to classify chest X-ray scans with >92% test accuracy. Submit Jupyter Notebook and brief analysis report.',
    submissionsCount: 29,
    totalStudents: 50
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-1',
    date: '2026-08-15',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    subjectCode: 'CS501',
    subjectName: 'Data Structures & Algorithms',
    facultyId: 'FAC201912',
    records: [
      { studentId: 'STU2023001', studentName: 'Aarav Patel', status: 'Present' },
      { studentId: 'STU2023005', studentName: 'Rohan Gupta', status: 'Absent' }
    ]
  },
  {
    id: 'att-2',
    date: '2026-08-14',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 5,
    subjectCode: 'CS502',
    subjectName: 'Database Management Systems',
    facultyId: 'FAC202203',
    records: [
      { studentId: 'STU2023001', studentName: 'Aarav Patel', status: 'Present' },
      { studentId: 'STU2023005', studentName: 'Rohan Gupta', status: 'Present' }
    ]
  }
];
