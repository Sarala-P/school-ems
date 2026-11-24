import React, { useState } from 'react';
import { Award, FileText, CheckCircle, BarChart3, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';
import { examinations, examResults, subjects, getSubjectName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';

export default function StudentExamResults() {
  const { user } = useAuth();
  const studentId = user?.studentId || 1;
  const [selectedExamId, setSelectedExamId] = useState('1');

  const myExamScores = examResults.filter(
    (r) => r.studentId === studentId && String(r.examId) === selectedExamId
  );

  const totalObtained = myExamScores.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const totalMax = myExamScores.reduce((acc, curr) => acc + curr.totalMarks, 0);
  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : 0;

  const chartData = myExamScores.map((s) => ({
    subject: getSubjectName(s.subjectId),
    marks: s.marksObtained,
    max: s.totalMarks,
  }));

  const handlePrint = () => {
    toast.success('Generating and downloading Report Card PDF...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Examination Marks & Report Card</h1>
          <p className="text-sm text-gray-500">Review evaluation results, subject performance charts, and grade cards</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm transition shadow-sm"
          >
            <Download className="w-4 h-4" /> Download Report Card
          </button>
        </div>
      </div>

      {/* Select Exam Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-500 uppercase">Assessment Term:</span>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm font-semibold text-teal-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {examinations.map((e) => (
              <option key={e.id} value={String(e.id)}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* Aggregated Score Pill */}
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-xs text-gray-400">Total Score: </span>
            <span className="font-bold text-gray-800">{totalObtained} / {totalMax}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400">Aggregate: </span>
            <span className="font-bold text-teal-600 text-base">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Subject-wise Marks Statement</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Score</th>
                <th className="p-3">Max</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myExamScores.map((score) => (
                <tr key={score.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800">{getSubjectName(score.subjectId)}</td>
                  <td className="p-3 font-bold text-teal-700">{score.marksObtained}</td>
                  <td className="p-3 text-gray-400">{score.totalMarks}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      {score.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Performance Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="marks" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
