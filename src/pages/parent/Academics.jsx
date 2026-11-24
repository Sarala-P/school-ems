import React, { useState } from 'react';
import { Award, BookOpen, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { parents, students, examResults, subjects, getSubjectName, getClassDisplayName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';

export default function ParentAcademics() {
  const { user } = useAuth();
  const parent = parents.find((p) => p.id === (user?.parentId || 1)) || parents[0];
  const myChildren = students.filter((s) => parent.childrenIds?.includes(s.id));

  const [selectedChildId, setSelectedChildId] = useState(myChildren[0]?.id || 1);

  const selectedChild = students.find((s) => s.id === selectedChildId);
  const scores = examResults.filter((r) => r.studentId === selectedChildId);

  const chartData = scores.map((s) => ({
    subject: getSubjectName(s.subjectId),
    marks: s.marksObtained,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Marks & Progress</h1>
          <p className="text-sm text-gray-500">Track subject proficiency, assessment grades, and term evaluation</p>
        </div>

        {myChildren.length > 1 && (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200">
            <span className="text-xs font-semibold text-gray-500">Select Ward:</span>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm font-bold text-orange-700 bg-white"
            >
              {myChildren.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marks Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">
              Marks Statement for {selectedChild?.name} ({getClassDisplayName(selectedChild?.classId)})
            </h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Marks</th>
                <th className="p-3">Max</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scores.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">{getSubjectName(s.subjectId)}</td>
                  <td className="p-3 font-bold text-orange-700">{s.marksObtained}</td>
                  <td className="p-3 text-gray-400">{s.totalMarks}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
                      {s.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Subject Performance Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="marks" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
