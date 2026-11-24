import React, { useState } from 'react';
import { BookOpen, Users, GraduationCap, CheckCircle } from 'lucide-react';
import { classes, staff, students, getClassDisplayName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';

export default function MyClasses() {
  const { user } = useAuth();
  const staffMember = staff.find((s) => s.id === (user?.staffId || 1)) || staff[0];

  const assignedClassIds = staffMember.assignedClasses || [1, 9, 17];
  const myClasses = classes.filter((c) => assignedClassIds.includes(c.id));
  const [selectedClassId, setSelectedClassId] = useState(myClasses[0]?.id || 17);

  const classStudents = students.filter((s) => s.classId === selectedClassId);

  const studentColumns = [
    {
      header: 'Roll No',
      accessor: 'rollNo',
      render: (row) => <span className="font-mono font-bold text-gray-700">#{row.rollNo}</span>,
    },
    {
      header: 'Student Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">Adm: {row.admissionNo}</p>
        </div>
      ),
    },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Contact', accessor: 'phone' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Assigned Classes</h1>
        <p className="text-sm text-gray-500">Student enrollment lists, roll rosters, and section details</p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myClasses.map((cls) => {
          const isSelected = selectedClassId === cls.id;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-5 rounded-xl border text-left transition ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-2 ring-emerald-500'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {cls.section}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {cls.studentCount} Students
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{cls.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Section {cls.section} • Class Teacher</p>
            </button>
          );
        })}
      </div>

      {/* Selected Class Student Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            Student Roster — {getClassDisplayName(selectedClassId)}
          </h3>
          <span className="text-xs text-gray-500 font-medium">{classStudents.length} Students Listed</span>
        </div>
        <DataTable columns={studentColumns} data={classStudents} itemsPerPage={8} />
      </div>
    </div>
  );
}
