import React from 'react';
import { Users, GraduationCap, UserCheck, BookOpen, ClipboardList, FileText, Bell, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { dashboardStats, monthlyAttendanceData, subjectPerformanceData, announcements } from '../../data/fakeData';
import { Link } from 'react-router-dom';

export default function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Principal Academic Desk
          </span>
          <h1 className="text-2xl font-bold">Good day, Dr. Rajesh Kumar</h1>
          <p className="text-purple-100 text-sm mt-1">
            Academic supervisor console. Monitoring curriculum progress, faculty attendance, and student performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/attendance"
            className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg text-sm hover:bg-purple-50 transition shadow-sm"
          >
            Review Attendance
          </Link>
          <Link
            to="/announcements"
            className="px-4 py-2 bg-purple-900/60 text-white font-semibold rounded-lg text-sm hover:bg-purple-900 transition"
          >
            Post Circular
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Students" value={dashboardStats.totalStudents} icon={GraduationCap} color="purple" />
        <StatCard title="Teaching Faculty" value={dashboardStats.totalTeachers} icon={Users} color="blue" />
        <StatCard title="Class Sections" value={dashboardStats.totalClasses} icon={BookOpen} color="green" />
        <StatCard title="Present Today" value="92%" icon={ClipboardList} color="teal" subtitle="18 / 20 students" />
        <StatCard title="Active Exams" value="Mid-Term" icon={FileText} color="orange" subtitle="Evaluations on" />
        <StatCard title="Notices Issued" value={announcements.length} icon={Bell} color="indigo" subtitle="Active circulars" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 text-base mb-1">Academic Attendance Stability (%)</h3>
          <p className="text-xs text-gray-400 mb-4">Class attendance trends month by month</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-Wise Academic Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 text-base mb-1">Subject Mastery Benchmark (Avg %)</h3>
          <p className="text-xs text-gray-400 mb-4">Evaluations across all standard sections</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Academic Highlights & Recent Circulars */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 text-base mb-3">Published School Bulletins</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {announcements.slice(0, 4).map((a) => (
            <div key={a.id} className="p-3 bg-purple-50/40 rounded-lg border border-purple-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">{a.title}</h4>
                  <StatusBadge status={a.priority} />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{a.message}</p>
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2">
                <span>By: {a.author}</span>
                <span>{a.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
