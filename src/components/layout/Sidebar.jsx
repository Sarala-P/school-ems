import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  Bus,
  Library,
  Package,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  FileText,
  Home,
  BookMarked,
  MessageSquare,
  School,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItemsByRole = {
  admin: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Principals', to: '/principals', icon: School },
    { label: 'Students', to: '/students', icon: Users },
    { label: 'Teachers/Staff', to: '/teachers', icon: UserCog },
    { label: 'Parents', to: '/parents', icon: UserCheck },
    { label: 'Classes', to: '/classes', icon: BookOpen },
    { label: 'Subjects', to: '/subjects', icon: BookMarked },
    { label: 'Transport', to: '/transport', icon: Bus },
    { label: 'Library', to: '/library', icon: Library },
    { label: 'Inventory', to: '/inventory', icon: Package },
    { label: 'Announcements', to: '/announcements', icon: Bell },
    { label: 'Reports', to: '/reports', icon: BarChart3 },
    { label: 'Settings', to: '/settings', icon: Settings },
  ],
  principal: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Students', to: '/students', icon: Users },
    { label: 'Teachers', to: '/teachers', icon: UserCog },
    { label: 'Parents', to: '/parents', icon: UserCheck },
    { label: 'Classes', to: '/classes', icon: BookOpen },
    { label: 'Subjects', to: '/subjects', icon: BookMarked },
    { label: 'Attendance', to: '/attendance', icon: ClipboardList },
    { label: 'Examinations', to: '/examinations', icon: FileText },
    { label: 'Timetable', to: '/timetable', icon: Calendar },
    { label: 'Announcements', to: '/announcements', icon: Bell },
    { label: 'Reports', to: '/reports', icon: BarChart3 },
  ],
  teacher: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Classes', to: '/my-classes', icon: BookOpen },
    { label: 'Students', to: '/students', icon: Users },
    { label: 'Attendance', to: '/attendance', icon: ClipboardList },
    { label: 'Assignments', to: '/assignments', icon: FileText },
    { label: 'Examinations', to: '/examinations', icon: BookMarked },
    { label: 'Timetable', to: '/timetable', icon: Calendar },
    { label: 'Announcements', to: '/announcements', icon: Bell },
  ],
  student: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', to: '/my-profile', icon: Home },
    { label: 'Timetable', to: '/timetable', icon: Calendar },
    { label: 'Attendance', to: '/attendance', icon: ClipboardList },
    { label: 'Exams & Results', to: '/exams-results', icon: FileText },
    { label: 'Assignments', to: '/assignments', icon: BookMarked },
    { label: 'Library', to: '/library', icon: Library },
    { label: 'Transport', to: '/transport', icon: Bus },
    { label: 'Announcements', to: '/announcements', icon: Bell },
  ],
  parent: [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Children', to: '/my-children', icon: Users },
    { label: 'Attendance', to: '/attendance', icon: ClipboardList },
    { label: 'Academics', to: '/academics', icon: BookOpen },
    { label: 'Assignments', to: '/assignments', icon: FileText },
    { label: 'Timetable', to: '/timetable', icon: Calendar },
    { label: 'Announcements', to: '/announcements', icon: Bell },
    { label: 'Transport', to: '/transport', icon: Bus },
    { label: 'Contact School', to: '/contact', icon: MessageSquare },
  ],
};

export default function Sidebar({ collapsed, onToggle, role, onNavigate }) {
  const { user, logout } = useAuth();
  const items = navItemsByRole[role] || navItemsByRole.admin;

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onNavigate}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-gray-800 truncate">
                EduManager
              </span>
            )}
          </div>

          {/* Mobile close */}
          <button
            onClick={onNavigate}
            className="ml-auto lg:hidden p-1 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }
                  ${collapsed ? 'justify-center' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <div className="hidden lg:flex justify-end px-3 py-2 border-t border-gray-100">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* User info */}
        <div className="border-t border-gray-200 p-3 shrink-0">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-blue-700">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400 capitalize truncate">
                  {role}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
