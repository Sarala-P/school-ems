import React, { useState } from 'react';
import { ClipboardList, Calendar, Users, Filter, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { attendance as initialAttendance, staffAttendance, students, staff, classes, getClassDisplayName, getStudentName } from '../../data/fakeData';

export default function AttendanceMonitoring() {
  const [selectedDate, setSelectedDate] = useState('2026-11-10');
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceType, setAttendanceType] = useState('student'); // 'student' or 'staff'
  const [studentRecords, setStudentRecords] = useState(initialAttendance);

  const toggleStudentStatus = (id, newStatus) => {
    setStudentRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success('Attendance status updated');
  };

  const filteredStudentLogs = studentRecords.filter((r) => {
    const matchesDate = r.date === selectedDate;
    const matchesClass = selectedClass ? String(r.classId) === selectedClass : true;
    return matchesDate && matchesClass;
  });

  const presentCount = filteredStudentLogs.filter((r) => r.status === 'present').length;
  const absentCount = filteredStudentLogs.filter((r) => r.status === 'absent').length;
  const leaveCount = filteredStudentLogs.filter((r) => r.status === 'leave').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Monitoring Desk</h1>
          <p className="text-sm text-gray-500">Track and review student and faculty attendance records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAttendanceType('student')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              attendanceType === 'student'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            Student Attendance
          </button>
          <button
            onClick={() => setAttendanceType('staff')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              attendanceType === 'staff'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            Faculty Attendance
          </button>
        </div>
      </div>

      {/* Date & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {attendanceType === 'student' && (
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Class Sections</option>
              {classes.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name} - {c.section}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Counter Pills */}
        <div className="flex gap-2 text-xs font-semibold">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Present: {attendanceType === 'student' ? presentCount : 6}
          </span>
          <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Absent: {attendanceType === 'student' ? absentCount : 1}
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Leave: {attendanceType === 'student' ? leaveCount : 1}
          </span>
        </div>
      </div>

      {/* Attendance Table */}
      {attendanceType === 'student' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudentLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No attendance records for {selectedDate}
                  </td>
                </tr>
              ) : (
                filteredStudentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">{getStudentName(log.studentId)}</td>
                    <td className="p-3 text-gray-600">{getClassDisplayName(log.classId)}</td>
                    <td className="p-3 font-mono text-xs">{log.date}</td>
                    <td className="p-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                        {['present', 'absent', 'leave'].map((st) => (
                          <button
                            key={st}
                            onClick={() => toggleStudentStatus(log.id, st)}
                            className={`px-2 py-0.5 text-xs font-semibold capitalize rounded ${
                              log.status === st
                                ? st === 'present'
                                  ? 'bg-emerald-600 text-white'
                                  : st === 'absent'
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-amber-600 text-white'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
              <tr>
                <th className="p-3">Faculty / Employee Name</th>
                <th className="p-3">Emp ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {staffAttendance
                .filter((r) => r.date === selectedDate)
                .map((log) => {
                  const teacher = staff.find((s) => s.id === log.staffId);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-900">{teacher?.name || 'Staff Member'}</td>
                      <td className="p-3 font-mono text-xs text-gray-500">{teacher?.employeeId}</td>
                      <td className="p-3 font-mono text-xs">{log.date}</td>
                      <td className="p-3">
                        <StatusBadge status={log.status} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
