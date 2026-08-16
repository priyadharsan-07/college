import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentsPage } from './pages/admin/StudentsPage';
import { FacultyPage } from './pages/admin/FacultyPage';
import { DepartmentsPage } from './pages/admin/DepartmentsPage';
import { CoursesPage } from './pages/admin/CoursesPage';
import { SubjectsPage } from './pages/admin/SubjectsPage';
import { AttendancePage } from './pages/admin/AttendancePage';
import { ExaminationsPage } from './pages/admin/ExaminationsPage';
import { MarksPage } from './pages/admin/MarksPage';
import { FeesPage } from './pages/admin/FeesPage';
import { TimetablePage } from './pages/admin/TimetablePage';
import { EventsPage } from './pages/admin/EventsPage';
import { NoticesPage } from './pages/admin/NoticesPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

// Faculty Pages
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyClassesPage } from './pages/faculty/FacultyClassesPage';
import { FacultyProfilePage } from './pages/faculty/FacultyProfilePage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentMarksPage } from './pages/student/StudentMarksPage';
import { StudentFeesPage } from './pages/student/StudentFeesPage';
import { StudentTimetablePage } from './pages/student/StudentTimetablePage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<DashboardLayout allowedRoles={['admin']} />}>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="faculty" element={<FacultyPage />} />
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="examinations" element={<ExaminationsPage />} />
                <Route path="marks" element={<MarksPage />} />
                <Route path="fees" element={<FeesPage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="notices" element={<NoticesPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Faculty Portal Routes */}
              <Route path="/faculty" element={<DashboardLayout allowedRoles={['faculty', 'admin']} />}>
                <Route index element={<FacultyDashboard />} />
                <Route path="classes" element={<FacultyClassesPage />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="marks" element={<MarksPage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="notices" element={<NoticesPage />} />
                <Route path="profile" element={<FacultyProfilePage />} />
              </Route>

              {/* Student Portal Routes */}
              <Route path="/student" element={<DashboardLayout allowedRoles={['student', 'admin']} />}>
                <Route index element={<StudentDashboard />} />
                <Route path="attendance" element={<StudentAttendancePage />} />
                <Route path="courses" element={<StudentCoursesPage />} />
                <Route path="marks" element={<StudentMarksPage />} />
                <Route path="fees" element={<StudentFeesPage />} />
                <Route path="timetable" element={<StudentTimetablePage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="notices" element={<NoticesPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
