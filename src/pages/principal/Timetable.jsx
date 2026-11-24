import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, User } from 'lucide-react';
import { timetable as initialTimetable, classes, subjects, staff, getSubjectName, getTeacherName } from '../../data/fakeData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];

export default function Timetable() {
  const [selectedClassId, setSelectedClassId] = useState(17); // Default to Class 9A

  const classSchedule = initialTimetable.filter((t) => t.classId === selectedClassId);

  const getSlot = (day, period) => {
    return classSchedule.find((t) => t.day === day && t.period === period);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Academic Timetable</h1>
          <p className="text-sm text-gray-500">Weekly period scheduling, lecture allocations, and teacher assignments</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200">
          <span className="text-xs font-semibold text-gray-500 uppercase">Select Class:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm font-semibold text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - Section {c.section}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Timetable */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-50/70 border-b border-gray-200 text-gray-700">
                <th className="p-4 text-left font-bold w-28 border-r">Day / Period</th>
                {PERIODS.map((p) => (
                  <th key={p} className="p-3 text-center font-bold border-r min-w-[120px]">
                    <div className="text-xs text-blue-600 uppercase font-semibold">Period {p}</div>
                    <div className="text-[11px] text-gray-400 font-normal">
                      {p === 1 && '08:00 - 08:45'}
                      {p === 2 && '08:45 - 09:30'}
                      {p === 3 && '09:30 - 10:15'}
                      {p === 4 && '10:30 - 11:15'}
                      {p === 5 && '11:15 - 12:00'}
                      {p === 6 && '12:45 - 13:30'}
                      {p === 7 && '13:30 - 14:15'}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {DAYS.map((day) => (
                <tr key={day} className="hover:bg-gray-50/60">
                  <td className="p-4 font-bold text-gray-900 border-r bg-gray-50/50">{day}</td>
                  {PERIODS.map((p) => {
                    const slot = getSlot(day, p);
                    return (
                      <td key={p} className="p-2 border-r text-center align-top">
                        {slot ? (
                          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 flex flex-col justify-center min-h-[70px]">
                            <p className="font-bold text-xs text-blue-900 leading-tight">
                              {getSubjectName(slot.subjectId)}
                            </p>
                            <p className="text-[11px] text-blue-600 mt-1 truncate">
                              {getTeacherName(slot.teacherId)}
                            </p>
                          </div>
                        ) : (
                          <div className="h-[70px] flex items-center justify-center text-xs text-gray-300 font-mono">
                            -
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
