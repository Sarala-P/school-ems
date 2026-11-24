import React, { useState } from 'react';
import { Plus, Search, BookOpen, User, Users, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import { classes as initialClasses, staff, getTeacherName } from '../../data/fakeData';

export default function ManageClasses() {
  const [classList, setClassList] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const initialFormData = {
    name: 'Class 1',
    section: 'A',
    classTeacherId: '',
    studentCount: 0,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      ...formData,
      id: Date.now(),
      classTeacherId: Number(formData.classTeacherId) || 1,
      studentCount: Number(formData.studentCount) || 30,
    };
    setClassList([newClass, ...classList]);
    setIsAddModalOpen(false);
    toast.success('Class & Section added successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setClassList((prev) =>
      prev.map((c) =>
        c.id === selectedClass.id
          ? {
              ...formData,
              id: c.id,
              classTeacherId: Number(formData.classTeacherId),
              studentCount: Number(formData.studentCount),
            }
          : c
      )
    );
    setIsEditModalOpen(false);
    toast.success('Class details updated!');
  };

  const handleDeleteConfirm = () => {
    setClassList((prev) => prev.filter((c) => c.id !== selectedClass.id));
    toast.success('Class deleted.');
  };

  const openEdit = (c) => {
    setSelectedClass(c);
    setFormData({
      name: c.name,
      section: c.section,
      classTeacherId: String(c.classTeacherId),
      studentCount: c.studentCount,
    });
    setIsEditModalOpen(true);
  };

  const teacherOptions = staff.map((t) => ({
    value: String(t.id),
    label: `${t.name} (${t.designation})`,
  }));

  const columns = [
    {
      header: 'Class & Section',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
            {row.section}
          </div>
          <span className="font-semibold text-gray-900">{row.name} - Section {row.section}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Class Teacher',
      accessor: 'classTeacherId',
      render: (row) => (
        <span className="font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md text-xs">
          {getTeacherName(row.classTeacherId)}
        </span>
      ),
    },
    {
      header: 'Total Enrolled Students',
      accessor: 'studentCount',
      render: (row) => <span className="font-semibold text-gray-700">{row.studentCount} Students</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Classes & Sections</h1>
          <p className="text-sm text-gray-500">Configure academic grades, sections, and assign designated class teachers</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add Class / Section
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search class or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">{classList.length} active class sections</span>
      </div>

      <DataTable
        columns={columns}
        data={classList.filter((c) =>
          `${c.name} ${c.section}`.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        currentPage={currentPage}
        itemsPerPage={8}
        onPageChange={setCurrentPage}
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEdit(row)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
              title="Edit Class"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedClass(row);
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete Class"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Class & Section" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput
            label="Class Standard"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Class 11"
            required
          />
          <FormInput
            label="Section"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            placeholder="e.g. A, B, C"
            required
          />
          <FormInput
            label="Designated Class Teacher"
            type="select"
            name="classTeacherId"
            value={formData.classTeacherId}
            onChange={handleInputChange}
            options={teacherOptions}
          />
          <FormInput
            label="Initial Capacity / Student Count"
            type="number"
            name="studentCount"
            value={formData.studentCount}
            onChange={handleInputChange}
          />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Create Class</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Class Details" size="md">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <FormInput label="Class Standard" name="name" value={formData.name} onChange={handleInputChange} required />
          <FormInput label="Section" name="section" value={formData.section} onChange={handleInputChange} required />
          <FormInput label="Class Teacher" type="select" name="classTeacherId" value={formData.classTeacherId} onChange={handleInputChange} options={teacherOptions} />
          <FormInput label="Enrolled Students" type="number" name="studentCount" value={formData.studentCount} onChange={handleInputChange} />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Update Class</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Class"
        message={`Are you sure you want to delete ${selectedClass?.name} - Section ${selectedClass?.section}?`}
      />
    </div>
  );
}
