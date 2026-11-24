import React from 'react';
import { GraduationCap, BookOpen, ClipboardList, Award, Calendar, Bell, Clock, Bus, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { students, classes, subjects, timetable, assignments, examResults, announcements, getClassDisplayName, getSubjectName } from '../../data/fakeData';

export default function StudentDashboard() {
  const { user } = useAuth();
  // Default demo student
  const student = students.find((s) => s.id === (user?.studentId || 1)) || students[0];

  const studentClass = classes.find((c) => c.id === student.classId);
  const myAssignments = assignments.filter((a) => a.classId === student.classId);
  const myResults = examResults.filter((r) => r.studentId === student.id);

  // Today's schedule
  const todaySchedule = timetable
    .filter((t) => t.classId === student.classId && t.day === 'Monday')
    .sort((a, b) => a.period - b.period);

  return (
    <div className="space-y-6">
      {/* Student Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Student Academic Space
          </span>
          <h1 className="text-2xl font-bold">Hello, {student.name}!</h1>
          <p className="text-teal-100 text-sm mt-1">
            {getClassDisplayName(student.classId)} • Roll No: #{student.rollNo} • Adm: {student.admissionNo}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/assignments"
            className="px-4 py-2 bg-white text-teal-700 font-semibold rounded-lg text-sm hover:bg-teal-50 transition shadow-sm"
          >
            My Homework ({myAssignments.length})
          </Link>
          <Link
            to="/exams-results"
            className="px-4 py-2 bg-teal-900/60 text-white font-semibold rounded-lg text-sm hover:bg-teal-900 transition"
          >
            Report Card
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Class" value={studentClass ? `${studentClass.name}` : 'Class 9'} icon={GraduationCap} color="teal" subtitle={`Section ${studentClass?.section || 'A'}`} />
        <StatCard title="Attendance Rate" value="94.5%" icon={ClipboardList} color="green" subtitle="Present 38 / 40 days" />
        <StatCard title="Assignments Due" value={myAssignments.length} icon={BookOpen} color="orange" subtitle="Pending tasks" />
        <StatCard title="Latest Term Grade" value="A+" icon={Award} color="purple" subtitle="Mid-Term Exams" />
      </div>

      {/* Grid: Today's Lectures & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Today's Class Schedule (Monday)</h3>
              <p className="text-xs text-gray-400">Class {studentClass?.name} timetable</p>
            </div>
            <Link to="/timetable" className="text-xs text-teal-600 hover:underline font-semibold">
              Full Schedule
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {todaySchedule.slice(0, 6).map((slot) => (
              <div key={slot.id} className="p-3 bg-teal-50/40 rounded-xl border border-teal-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase bg-teal-100 px-2 py-0.5 rounded">
                    Period {slot.period}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm mt-1">{getSubjectName(slot.subjectId)}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 text-base mb-3">Notice Board</h3>
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
