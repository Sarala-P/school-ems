import React, { useState } from 'react';
import { Plus, BookMarked, Calendar, CheckCircle, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { assignments as initialAssignments, subjects, classes, staff, getSubjectName, getClassDisplayName } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';

export default function TeacherAssignments() {
  const { user } = useAuth();
  const [assignmentList, setAssignmentList] = useState(initialAssignments);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const initialForm = {
    title: '',
    subjectId: '1',
    classId: '17',
    description: '',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    status: 'active',
  };
  const [formData, setFormData] = useState(initialForm);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Title and instructions are required');
      return;
    }
    const newAssignment = {
      ...formData,
      id: Date.now(),
      subjectId: Number(formData.subjectId),
      classId: Number(formData.classId),
      teacherId: user?.staffId || 1,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAssignmentList([newAssignment, ...assignmentList]);
    setIsAddModalOpen(false);
    setFormData(initialForm);
    toast.success('Assignment published to students!');
  };

  const handleDelete = () => {
    setAssignmentList(assignmentList.filter((a) => a.id !== selectedAssignment.id));
    toast.success('Assignment deleted');
  };

  const columns = [
    {
      header: 'Assignment Title',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.title}</p>
            <p className="text-xs text-gray-400 max-w-xs truncate">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Subject & Class',
      accessor: 'subjectId',
      render: (row) => (
        <div>
          <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs">
            {getSubjectName(row.subjectId)}
          </span>
          <p className="text-xs text-gray-400 mt-1">{getClassDisplayName(row.classId)}</p>
        </div>
      ),
    },
    { header: 'Submission Due Date', accessor: 'dueDate' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homework & Assignments Desk</h1>
          <p className="text-sm text-gray-500">Create, dispatch, and review class course assignments and project submissions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <DataTable
        columns={columns}
        data={assignmentList}
        itemsPerPage={8}
        renderActions={(row) => (
          <button
            onClick={() => {
              setSelectedAssignment(row);
              setIsDeleteDialogOpen(true);
            }}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
            title="Delete Assignment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Publish Class Assignment" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput label="Assignment Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Science Chapter 4 Quiz" />
          <FormInput
            label="Subject"
            type="select"
            value={formData.subjectId}
            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            options={subjects.map((s) => ({ value: String(s.id), label: s.name }))}
          />
          <FormInput
            label="Target Class"
            type="select"
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            options={classes.map((c) => ({ value: String(c.id), label: `${c.name} - ${c.section}` }))}
          />
          <FormInput label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
          <FormInput label="Instructions & Details" type="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required placeholder="Provide assignment instructions..." />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 font-medium">Publish Assignment</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Assignment"
        message={`Delete assignment "${selectedAssignment?.title}"?`}
      />
    </div>
  );
}
