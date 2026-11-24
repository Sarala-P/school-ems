import React from 'react';
import { Users, GraduationCap, Phone, MapPin, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';
import { parents, students, classes, examResults, attendance, getClassDisplayName, getSubjectName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function MyChildren() {
  const { user } = useAuth();
  const parent = parents.find((p) => p.id === (user?.parentId || 1)) || parents[0];
  const myChildren = students.filter((s) => parent.childrenIds?.includes(s.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Children / Wards</h1>
        <p className="text-sm text-gray-500">Monitor academic performance, attendance records, and enrollment details</p>
      </div>

      <div className="space-y-6">
        {myChildren.map((child) => {
          const childResults = examResults.filter((r) => r.studentId === child.id);
          const childAttendance = attendance.filter((a) => a.studentId === child.id);

          return (
            <div key={child.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-orange-50/20">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-2xl shadow">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                    <p className="text-sm text-orange-700 font-medium">{getClassDisplayName(child.classId)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Admission No: {child.admissionNo} • Roll #{child.rollNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={child.status} />
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Examination Scores */}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-600" /> Recent Examination Grades
                  </h4>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                        <tr>
                          <th className="p-2.5">Subject</th>
                          <th className="p-2.5">Marks</th>
                          <th className="p-2.5">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {childResults.slice(0, 4).map((res) => (
                          <tr key={res.id}>
                            <td className="p-2.5 font-medium text-gray-800">{getSubjectName(res.subjectId)}</td>
                            <td className="p-2.5 font-bold text-gray-700">{res.marksObtained} / {res.totalMarks}</td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded font-bold">
                                {res.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Attendance Summary */}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" /> Attendance Ledger Log
                  </h4>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 text-gray-600 uppercase border-b">
                        <tr>
                          <th className="p-2.5">Date</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {childAttendance.slice(0, 4).map((att) => (
                          <tr key={att.id}>
                            <td className="p-2.5 font-mono text-gray-600">{att.date}</td>
                            <td className="p-2.5">
                              <StatusBadge status={att.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
