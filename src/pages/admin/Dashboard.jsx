import React from 'react';
import { Users, GraduationCap, UserCheck, BookOpen, BookMarked, UserCog, Calendar, TrendingUp, Bell } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { dashboardStats, classWiseStudentData, monthlyAttendanceData, announcements } from '../../data/fakeData';
import { Link } from 'react-router-dom';

const GENDER_DATA = [
  { name: 'Male Students', value: dashboardStats.maleStudents, color: '#3b82f6' },
  { name: 'Female Students', value: dashboardStats.femaleStudents, color: '#ec4899' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Administrator Portal
          </span>
          <h1 className="text-2xl font-bold">Welcome back, System Administrator</h1>
          <p className="text-blue-100 text-sm mt-1">
            Overview of school activities, staff performance, and academic metrics for Academic Year 2026-27.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/students"
            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg text-sm hover:bg-blue-50 transition shadow-sm"
          >
            + Add Student
          </Link>
          <Link
            to="/teachers"
            className="px-4 py-2 bg-blue-800/60 text-white font-semibold rounded-lg text-sm hover:bg-blue-800 transition"
          >
            + Add Staff
          </Link>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Students"
          value={dashboardStats.totalStudents}
          icon={GraduationCap}
          color="blue"
          subtitle="Enrolled this term"
        />
        <StatCard
          title="Total Teachers"
          value={dashboardStats.totalTeachers}
          icon={UserCog}
          color="green"
          subtitle="Teaching faculty"
        />
        <StatCard
          title="Total Parents"
          value={dashboardStats.totalParents}
          icon={Users}
          color="purple"
          subtitle="Guardian accounts"
        />
        <StatCard
          title="Total Classes"
          value={dashboardStats.totalClasses}
          icon={BookOpen}
          color="orange"
          subtitle="Class 1 to 10"
        />
        <StatCard
          title="Total Subjects"
          value={dashboardStats.totalSubjects}
          icon={BookMarked}
          color="teal"
          subtitle="Curriculum"
        />
        <StatCard
          title="Total Staff"
          value={dashboardStats.totalStaff}
          icon={UserCheck}
          color="indigo"
          subtitle="Teaching & Support"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class-wise Student Strength */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Class-wise Student Strength</h3>
              <p className="text-xs text-gray-400">Total enrollment breakdown per standard</p>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">2026 Batch</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classWiseStudentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="class" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="students" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-base mb-1">Student Gender Ratio</h3>
            <p className="text-xs text-gray-400 mb-4">Active enrolled students</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GENDER_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                  >
                    {GENDER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Boys</p>
              <p className="text-lg font-bold text-blue-700">{dashboardStats.maleStudents}</p>
            </div>
            <div className="bg-pink-50 p-2 rounded-lg">
              <p className="text-xs text-pink-600 font-medium">Girls</p>
              <p className="text-lg font-bold text-pink-700">{dashboardStats.femaleStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Monthly Attendance & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Monthly Attendance Trends (%)</h3>
              <p className="text-xs text-gray-400">School-wide overall student presence</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Present
              </span>
              <span className="flex items-center gap-1 text-rose-500 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span> Absent
              </span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="absent" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-gray-800 text-base">Recent Notices</h3>
            </div>
            <Link to="/announcements" className="text-xs text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 4).map((notice) => (
              <div key={notice.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50/50 transition">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">{notice.title}</h4>
                  <StatusBadge status={notice.priority} />
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{notice.message}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                  <span>{notice.author}</span>
                  <span>{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
