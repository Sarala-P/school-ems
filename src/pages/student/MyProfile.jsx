import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, GraduationCap, Shield } from 'lucide-react';
import { students, parents, classes, getClassDisplayName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function StudentProfile() {
  const { user } = useAuth();
  const student = students.find((s) => s.id === (user?.studentId || 1)) || students[0];
  const parent = parents.find((p) => p.id === student.parentId) || parents[0];
  const studentClass = classes.find((c) => c.id === student.classId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Student Profile</h1>
        <p className="text-sm text-gray-500">Official student identity card, parent coordinates, and institutional records</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-600 px-6 flex items-end">
          <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg translate-y-8 flex items-center justify-center font-bold text-3xl text-teal-700 border-2 border-white">
            {student.name.charAt(0)}
          </div>
        </div>

        <div className="pt-10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-sm text-teal-700 font-semibold">{getClassDisplayName(student.classId)}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-mono font-bold rounded-lg">
                Roll #{student.rollNo}
              </span>
              <StatusBadge status={student.status} />
            </div>
          </div>

          {/* Student Academic Details */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Academic & Personal Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-xs text-gray-400">Admission Number</p>
                <p className="font-bold text-gray-800 font-mono text-sm">{student.admissionNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="font-semibold text-gray-800 text-sm">{student.dob || '2012-05-15'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-semibold text-gray-800 text-sm">{student.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Student Email</p>
                <p className="font-semibold text-gray-800 text-sm">{student.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact Phone</p>
                <p className="font-semibold text-gray-800 text-sm">{student.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Admission Date</p>
                <p className="font-semibold text-gray-800 text-sm">{student.admissionDate}</p>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Parent / Guardian Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-teal-50/40 p-4 rounded-xl border border-teal-100">
              <div>
                <p className="text-xs text-teal-800 font-medium">Guardian Name</p>
                <p className="font-bold text-gray-900 text-base">{parent.name}</p>
              </div>
              <div>
                <p className="text-xs text-teal-800 font-medium">Occupation</p>
                <p className="font-semibold text-gray-800 text-sm">{parent.occupation}</p>
              </div>
              <div>
                <p className="text-xs text-teal-800 font-medium">Phone</p>
                <p className="font-semibold text-gray-800 text-sm">{parent.phone}</p>
              </div>
              <div>
                <p className="text-xs text-teal-800 font-medium">Email</p>
                <p className="font-semibold text-gray-800 text-sm">{parent.email}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-teal-800 font-medium">Home Address</p>
                <p className="font-semibold text-gray-800 text-sm">{parent.address || student.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
