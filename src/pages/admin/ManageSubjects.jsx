import React, { useState } from 'react';
import { Plus, Search, BookMarked, User, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import { subjects as initialSubjects, staff, classes, getTeacherName } from '../../data/fakeData';

export default function ManageSubjects() {
  const [subjectList, setSubjectList] = useState(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const initialFormData = {
    name: '',
    code: '',
    teacherIds: [],
    classIds: [],
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeacherToggle = (teacherId) => {
    setFormData((prev) => {
      const exists = prev.teacherIds.includes(teacherId);
      const updated = exists ? prev.teacherIds.filter((id) => id !== teacherId) : [...prev.teacherIds, teacherId];
      return { ...prev, teacherIds: updated };
    });
  };

  const handleClassToggle = (classId) => {
    setFormData((prev) => {
      const exists = prev.classIds.includes(classId);
      const updated = exists ? prev.classIds.filter((id) => id !== classId) : [...prev.classIds, classId];
      return { ...prev, classIds: updated };
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      toast.error('Subject Name and Code are required');
      return;
    }
    const newSub = { ...formData, id: Date.now() };
    setSubjectList([newSub, ...subjectList]);
    setIsAddModalOpen(false);
    toast.success('Subject added to curriculum!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSubjectList((prev) =>
      prev.map((s) => (s.id === selectedSubject.id ? { ...formData, id: s.id } : s))
    );
    setIsEditModalOpen(false);
    toast.success('Subject updated!');
  };

  const handleDeleteConfirm = () => {
    setSubjectList((prev) => prev.filter((s) => s.id !== selectedSubject.id));
    toast.success('Subject removed.');
  };

  const openEdit = (sub) => {
    setSelectedSubject(sub);
    setFormData({
      name: sub.name,
      code: sub.code,
      teacherIds: sub.teacherIds || [],
      classIds: sub.classIds || [],
    });
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      header: 'Subject & Code',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
            {row.code.slice(0, 3)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400 font-mono">Code: {row.code}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Subject Faculty',
      accessor: 'teacherIds',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.teacherIds?.map((tId) => (
            <span key={tId} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-100">
              {getTeacherName(tId)}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Applicable Classes',
      accessor: 'classIds',
      render: (row) => (
        <span className="text-xs text-gray-600 font-medium">
          Taught in {row.classIds?.length || 0} classes
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Curriculum Subjects</h1>
          <p className="text-sm text-gray-500">Manage academic courses, subject codes, and faculty assignments</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search subject or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">{subjectList.length} subjects in catalog</span>
      </div>

      <DataTable
        columns={columns}
        data={subjectList.filter((s) =>
          `${s.name} ${s.code}`.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        currentPage={currentPage}
        itemsPerPage={8}
        onPageChange={setCurrentPage}
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEdit(row)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
              title="Edit Subject"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedSubject(row);
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Subject" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput label="Subject Name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Sanskrit" />
          <FormInput label="Subject Code" name="code" value={formData.code} onChange={handleInputChange} required placeholder="e.g. SKT" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Teachers</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50 rounded border">
              {staff.map((t) => (
                <label key={t.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.teacherIds.includes(t.id)}
                    onChange={() => handleTeacherToggle(t.id)}
                    className="rounded text-teal-600"
                  />
                  <span>{t.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 font-medium">Add Subject</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Subject Details" size="md">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <FormInput label="Subject Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <FormInput label="Subject Code" name="code" value={formData.code} onChange={handleInputChange} required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Teachers</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50 rounded border">
              {staff.map((t) => (
                <label key={t.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.teacherIds.includes(t.id)}
                    onChange={() => handleTeacherToggle(t.id)}
                    className="rounded text-teal-600"
                  />
                  <span>{t.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Update</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Subject"
        message={`Are you sure you want to remove ${selectedSubject?.name}?`}
      />
    </div>
  );
}
