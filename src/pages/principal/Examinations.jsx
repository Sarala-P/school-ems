import React, { useState } from 'react';
import { Plus, FileText, Award, Calendar, CheckCircle, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { examinations as initialExams, examResults as initialResults, students, subjects, getStudentName, getSubjectName } from '../../data/fakeData';

export default function Examinations() {
  const [activeTab, setActiveTab] = useState('exams');
  const [examsList, setExamsList] = useState(initialExams);
  const [resultsList, setResultsList] = useState(initialResults);
  const [selectedExamId, setSelectedExamId] = useState('1');

  // Modal
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [isAddScoreOpen, setIsAddScoreOpen] = useState(false);

  const [examForm, setExamForm] = useState({
    name: '',
    type: 'mid-term',
    startDate: '',
    endDate: '',
    status: 'upcoming',
  });

  const [scoreForm, setScoreForm] = useState({
    examId: '1',
    studentId: '1',
    subjectId: '1',
    marksObtained: 80,
    totalMarks: 100,
  });

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!examForm.name || !examForm.startDate) {
      toast.error('Exam Name and Start Date required');
      return;
    }
    const newExam = { ...examForm, id: Date.now() };
    setExamsList([newExam, ...examsList]);
    setIsAddExamOpen(false);
    toast.success('Examination session scheduled!');
  };

  const handleAddScore = (e) => {
    e.preventDefault();
    const marks = Number(scoreForm.marksObtained);
    const total = Number(scoreForm.totalMarks);
    let grade = 'A';
    const pct = (marks / total) * 100;
    if (pct >= 90) grade = 'A+';
    else if (pct >= 80) grade = 'A';
    else if (pct >= 70) grade = 'B+';
    else if (pct >= 60) grade = 'B';
    else if (pct >= 50) grade = 'C';
    else grade = 'F';

    const newScore = {
      id: Date.now(),
      examId: Number(scoreForm.examId),
      studentId: Number(scoreForm.studentId),
      subjectId: Number(scoreForm.subjectId),
      marksObtained: marks,
      totalMarks: total,
      grade,
    };
    setResultsList([newScore, ...resultsList]);
    setIsAddScoreOpen(false);
    toast.success('Marks recorded successfully!');
  };

  const examColumns = [
    {
      header: 'Examination Title',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400 capitalize">Type: {row.type.replace('-', ' ')}</p>
          </div>
        </div>
      ),
    },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const filteredResults = resultsList.filter(
    (r) => String(r.examId) === selectedExamId
  );

  const resultColumns = [
    {
      header: 'Student Name',
      accessor: 'studentId',
      render: (row) => (
        <span className="font-semibold text-gray-900">{getStudentName(row.studentId)}</span>
      ),
    },
    {
      header: 'Subject',
      accessor: 'subjectId',
      render: (row) => (
        <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs">
          {getSubjectName(row.subjectId)}
        </span>
      ),
    },
    {
      header: 'Score Obtained',
      accessor: 'marksObtained',
      render: (row) => (
        <span className="font-bold text-gray-800">
          {row.marksObtained} / {row.totalMarks}
        </span>
      ),
    },
    {
      header: 'Assigned Grade',
      accessor: 'grade',
      render: (row) => (
        <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-xs">
          {row.grade}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Examinations & Grade Reports</h1>
          <p className="text-sm text-gray-500">Configure academic terms, test schedules, and student mark entries</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddScoreOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Record Marks
          </button>
          <button
            onClick={() => setIsAddExamOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Exam
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'exams'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Scheduled Examinations ({examsList.length})
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'results'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Marks & Performance Ledgers ({resultsList.length})
        </button>
      </div>

      {activeTab === 'exams' ? (
        <DataTable columns={examColumns} data={examsList} itemsPerPage={6} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 w-fit">
            <span className="text-xs font-semibold text-gray-600 uppercase">Select Term:</span>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold text-purple-700"
            >
              {examsList.map((e) => (
                <option key={e.id} value={String(e.id)}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <DataTable columns={resultColumns} data={filteredResults} itemsPerPage={8} />
        </div>
      )}

      {/* Add Exam Modal */}
      <Modal isOpen={isAddExamOpen} onClose={() => setIsAddExamOpen(false)} title="Create Examination Term" size="md">
        <form onSubmit={handleAddExam} className="space-y-4">
          <FormInput label="Examination Title" value={examForm.name} onChange={(e) => setExamForm({ ...examForm, name: e.target.value })} required placeholder="e.g. Second Term Assessment" />
          <FormInput label="Exam Category" type="select" value={examForm.type} onChange={(e) => setExamForm({ ...examForm, type: e.target.value })} options={[{ value: 'unit-test', label: 'Unit Test' }, { value: 'mid-term', label: 'Mid-Term Exam' }, { value: 'final', label: 'Final Annual Exam' }]} />
          <FormInput label="Commencement Date" type="date" value={examForm.startDate} onChange={(e) => setExamForm({ ...examForm, startDate: e.target.value })} required />
          <FormInput label="Completion Date" type="date" value={examForm.endDate} onChange={(e) => setExamForm({ ...examForm, endDate: e.target.value })} required />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddExamOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 font-medium">Create Exam</button>
          </div>
        </form>
      </Modal>

      {/* Record Score Modal */}
      <Modal isOpen={isAddScoreOpen} onClose={() => setIsAddScoreOpen(false)} title="Record Student Exam Marks" size="md">
        <form onSubmit={handleAddScore} className="space-y-4">
          <FormInput
            label="Examination Session"
            type="select"
            value={scoreForm.examId}
            onChange={(e) => setScoreForm({ ...scoreForm, examId: e.target.value })}
            options={examsList.map((e) => ({ value: String(e.id), label: e.name }))}
          />
          <FormInput
            label="Student"
            type="select"
            value={scoreForm.studentId}
            onChange={(e) => setScoreForm({ ...scoreForm, studentId: e.target.value })}
            options={students.map((s) => ({ value: String(s.id), label: `${s.name} (${s.admissionNo})` }))}
          />
          <FormInput
            label="Subject"
            type="select"
            value={scoreForm.subjectId}
            onChange={(e) => setScoreForm({ ...scoreForm, subjectId: e.target.value })}
            options={subjects.map((s) => ({ value: String(s.id), label: s.name }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Marks Obtained" type="number" value={scoreForm.marksObtained} onChange={(e) => setScoreForm({ ...scoreForm, marksObtained: e.target.value })} required />
            <FormInput label="Maximum Marks" type="number" value={scoreForm.totalMarks} onChange={(e) => setScoreForm({ ...scoreForm, totalMarks: e.target.value })} required />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddScoreOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 font-medium">Save Score</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
