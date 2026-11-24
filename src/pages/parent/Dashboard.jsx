import React from 'react';
import { Users, GraduationCap, ClipboardList, Award, Calendar, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { parents, students, classes, announcements, getClassDisplayName } from '../../data/fakeData';

export default function ParentDashboard() {
  const { user } = useAuth();
  const parent = parents.find((p) => p.id === (user?.parentId || 1)) || parents[0];

  const myChildren = students.filter((s) => parent.childrenIds?.includes(s.id));

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Parent Guardian Portal
          </span>
          <h1 className="text-2xl font-bold">Welcome, {parent.name}</h1>
          <p className="text-amber-100 text-sm mt-1">
            Guardian of {myChildren.map((c) => c.name).join(' & ')} • Academic Year 2026-27
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/my-children"
            className="px-4 py-2 bg-white text-orange-700 font-semibold rounded-lg text-sm hover:bg-orange-50 transition shadow-sm"
          >
            My Wards ({myChildren.length})
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 bg-orange-900/60 text-white font-semibold rounded-lg text-sm hover:bg-orange-900 transition"
          >
            Contact School
          </Link>
        </div>
      </div>

      {/* Ward Cards */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 text-lg">My Children Academic Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myChildren.map((child) => (
            <div
              key={child.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">
                      {child.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{child.name}</h4>
                      <p className="text-xs text-orange-700 font-medium">{getClassDisplayName(child.classId)}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono font-bold">
                    Roll #{child.rollNo}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-4">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Attendance</p>
                    <p className="font-bold text-emerald-600 text-sm mt-0.5">95%</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Last Exam</p>
                    <p className="font-bold text-blue-600 text-sm mt-0.5">Grade A</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="font-bold text-gray-800 text-xs mt-1 capitalize">{child.status}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link to="/academics" className="text-orange-600 font-semibold hover:underline flex items-center gap-1">
                  View Full Report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/attendance" className="text-gray-500 hover:text-gray-800">
                  Attendance Logs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Circulars for Parents */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 text-base mb-3">Notices for Parents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {announcements
            .filter((a) => a.targetRoles?.includes('parent'))
            .slice(0, 4)
            .map((a) => (
              <div key={a.id} className="p-3 bg-amber-50/40 rounded-lg border border-amber-100">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-gray-800 truncate">{a.title}</h4>
                  <StatusBadge status={a.priority} />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{a.message}</p>
                <span className="block text-[10px] text-gray-400 mt-2">{a.date}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
