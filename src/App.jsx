import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/auth/Profile';
import ChangePassword from './pages/auth/ChangePassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManagePrincipals from './pages/admin/ManagePrincipals';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageParents from './pages/admin/ManageParents';
import ManageClasses from './pages/admin/ManageClasses';
import ManageSubjects from './pages/admin/ManageSubjects';
import ManageTransport from './pages/admin/ManageTransport';
import ManageLibrary from './pages/admin/ManageLibrary';
import ManageInventory from './pages/admin/ManageInventory';
import Announcements from './pages/admin/Announcements';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Principal Pages
import PrincipalDashboard from './pages/principal/Dashboard';
import AttendanceMonitoring from './pages/principal/Attendance';
import Examinations from './pages/principal/Examinations';
import Timetable from './pages/principal/Timetable';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import MyClasses from './pages/teacher/MyClasses';
import TeacherAssignments from './pages/teacher/Assignments';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/MyProfile';
import StudentExamResults from './pages/student/ExamResults';
import StudentLibrary from './pages/student/Library';
import StudentTransport from './pages/student/Transport';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import MyChildren from './pages/parent/Children';
import ParentAcademics from './pages/parent/Academics';
import ContactSchool from './pages/parent/ContactSchool';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Smart Role Switchers
const DynamicDashboard = () => {
  const { user } = useAuth();
  switch (user?.role) {
    case 'principal':
      return <PrincipalDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'admin':
    default:
      return <AdminDashboard />;
  }
};

const DynamicAttendance = () => {
  const { user } = useAuth();
  if (user?.role === 'parent') return <MyChildren />;
  if (user?.role === 'student') return <StudentProfile />;
  return <AttendanceMonitoring />;
};

const DynamicTransport = () => {
  const { user } = useAuth();
  if (user?.role === 'student' || user?.role === 'parent') {
    return <StudentTransport />;
  }
  return <ManageTransport />;
};

const DynamicLibrary = () => {
  const { user } = useAuth();
  if (user?.role === 'student') {
    return <StudentLibrary />;
  }
  return <ManageLibrary />;
};

const DynamicAssignments = () => {
  const { user } = useAuth();
  if (user?.role === 'student') {
    return <StudentDashboard />;
  }
  if (user?.role === 'parent') {
    return <ParentAcademics />;
  }
  return <TeacherAssignments />;
};

const DynamicExaminations = () => {
  const { user } = useAuth();
  if (user?.role === 'student') {
    return <StudentExamResults />;
  }
  if (user?.role === 'parent') {
    return <ParentAcademics />;
  }
  return <Examinations />;
};

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DynamicDashboard />} />

        {/* Administration & Staff */}
        <Route path="/principals" element={<ManagePrincipals />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/teachers" element={<ManageTeachers />} />
        <Route path="/parents" element={<ManageParents />} />
        <Route path="/classes" element={<ManageClasses />} />
        <Route path="/subjects" element={<ManageSubjects />} />

        {/* Academics & Operations */}
        <Route path="/attendance" element={<DynamicAttendance />} />
        <Route path="/examinations" element={<DynamicExaminations />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/transport" element={<DynamicTransport />} />
        <Route path="/library" element={<DynamicLibrary />} />
        <Route path="/inventory" element={<ManageInventory />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

        {/* Teacher Specific */}
        <Route path="/my-classes" element={<MyClasses />} />
        <Route path="/assignments" element={<DynamicAssignments />} />

        {/* Student Specific */}
        <Route path="/my-profile" element={<StudentProfile />} />
        <Route path="/exams-results" element={<StudentExamResults />} />

        {/* Parent Specific */}
        <Route path="/my-children" element={<MyChildren />} />
        <Route path="/academics" element={<ParentAcademics />} />
        <Route path="/contact" element={<ContactSchool />} />

        {/* User Account */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>

      {/* Fallback */}
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
