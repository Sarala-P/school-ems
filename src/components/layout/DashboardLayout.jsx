import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useAuth } from '../../contexts/AuthContext';

const pathTitles = {
  '/dashboard': 'Dashboard',
  '/principals': 'Principals',
  '/students': 'Students',
  '/teachers': 'Teachers & Staff',
  '/parents': 'Parents',
  '/classes': 'Classes',
  '/subjects': 'Subjects',
  '/attendance': 'Attendance',
  '/examinations': 'Examinations',
  '/timetable': 'Timetable',
  '/transport': 'Transport',
  '/library': 'Library',
  '/inventory': 'Inventory',
  '/announcements': 'Announcements',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/my-classes': 'My Classes',
  '/assignments': 'Assignments',
  '/my-profile': 'My Profile',
  '/exams-results': 'Exams & Results',
  '/my-children': 'My Children',
  '/academics': 'Academics',
  '/contact': 'Contact School',
};

function getPageTitle(pathname) {
  // Exact match first
  if (pathTitles[pathname]) return pathTitles[pathname];

  // Try matching the first segment
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const base = '/' + segments[0];
    if (pathTitles[base]) return pathTitles[base];
  }

  return 'Dashboard';
}

export default function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // collapsed on mobile means hidden
  const [isMobile, setIsMobile] = useState(false);

  const role = user?.role || 'admin';
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleMobileMenuClick = () => {
    if (isMobile) {
      setSidebarCollapsed(false);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const handleMobileNavigate = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        role={role}
        onNavigate={handleMobileNavigate}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <TopNav title={pageTitle} onMenuClick={handleMobileMenuClick} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
