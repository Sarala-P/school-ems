import React from 'react';
import { BookOpen, Users, ClipboardList, Calendar, Bell, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { staff, classes, subjects, timetable, assignments, announcements, getClassDisplayName, getSubjectName } from '../../data/fakeData';

export default function TeacherDashboard() {
  const { user } = useAuth();
  // Demo teacher is staffId 1 if not specified
  const staffMember = staff.find((s) => s.id === (user?.staffId || 1)) || staff[0];

  const assignedClassCount = staffMember.assignedClasses?.length || 3;
  const assignedSubjectCount = staffMember.assignedSubjects?.length || 2;

  // Filter teacher's schedule for today (e.g., Monday)
  const todaySchedule = timetable
    .filter((t) => t.teacherId === staffMember.id && t.day === 'Monday')
    .sort((a, b) => a.period - b.period);

  const teacherAssignments = assignments.filter((a) => a.teacherId === staffMember.id);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Teacher Faculty Portal
          </span>
          <h1 className="text-2xl font-bold">Welcome back, {staffMember.name}</h1>
          <p className="text-emerald-100 text-sm mt-1">
            {staffMember.designation} • {staffMember.qualification}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/attendance"
            className="px-4 py-2 bg-white text-emerald-700 font-semibold rounded-lg text-sm hover:bg-emerald-50 transition shadow-sm"
          >
            Mark Daily Attendance
          </Link>
          <Link
            to="/assignments"
            className="px-4 py-2 bg-emerald-900/60 text-white font-semibold rounded-lg text-sm hover:bg-emerald-900 transition"
          >
            + Give Homework
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Classes" value={assignedClassCount} icon={BookOpen} color="green" subtitle="Active sections" />
        <StatCard title="Assigned Subjects" value={assignedSubjectCount} icon={Users} color="blue" subtitle="Mathematics, Hindi" />
        <StatCard title="Active Assignments" value={teacherAssignments.length} icon={ClipboardList} color="orange" subtitle="Pending review" />
        <StatCard title="Lectures Today" value={todaySchedule.length} icon={Calendar} color="purple" subtitle="Monday Schedule" />
      </div>

      {/* Grid: Today's Schedule & Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Today's Class Schedule</h3>
              <p className="text-xs text-gray-400">Periods and classroom allocations</p>
            </div>
            <Link to="/timetable" className="text-xs text-emerald-600 hover:underline font-semibold">
              Full Weekly View
            </Link>
          </div>
          <div className="space-y-3">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex flex-col items-center justify-center font-bold text-xs">
                      <span>P{slot.period}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{getSubjectName(slot.subjectId)}</h4>
                      <p className="text-xs text-gray-500">{getClassDisplayName(slot.classId)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-white px-2.5 py-1 rounded-md border border-emerald-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot.startTime} - {slot.endTime}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">No lectures assigned for today.</p>
            )}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 text-base mb-3">Staff Room Circulars</h3>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-gray-800 truncate">{a.title}</h4>
                  <StatusBadge status={a.priority} />
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{a.message}</p>
                <span className="block text-[10px] text-gray-400 mt-2">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
