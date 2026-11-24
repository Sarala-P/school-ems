import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, GraduationCap, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { students as initialStudents, classes, parents, getClassDisplayName, getParentName } from '../../data/fakeData';

export default function ManageStudents() {
  const [studentList, setStudentList] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form state
  const initialFormData = {
    admissionNo: '',
    name: '',
    dob: '',
    gender: 'Male',
    classId: '',
    rollNo: '',
    address: '',
    phone: '',
    parentId: '',
    email: '',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  const [formData, setFormData] = useState(initialFormData);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return studentList.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.phone && s.phone.includes(searchTerm));
      const matchesClass = selectedClass ? String(s.classId) === selectedClass : true;
      return matchesSearch && matchesClass;
    });
  }, [studentList, searchTerm, selectedClass]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.admissionNo || !formData.classId) {
      toast.error('Please fill required fields (Name, Admission No, Class)');
      return;
    }

    const newStudent = {
      ...formData,
      id: Date.now(),
      classId: Number(formData.classId),
      parentId: formData.parentId ? Number(formData.parentId) : 1,
      rollNo: Number(formData.rollNo) || studentList.length + 1,
    };

    setStudentList([newStudent, ...studentList]);
    setIsAddModalOpen(false);
    setFormData(initialFormData);
    toast.success('Student added successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.classId) {
      toast.error('Please fill required fields');
      return;
    }

    setStudentList((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...formData,
              id: s.id,
              classId: Number(formData.classId),
              parentId: Number(formData.parentId) || s.parentId,
              rollNo: Number(formData.rollNo) || s.rollNo,
            }
          : s
      )
    );
    setIsEditModalOpen(false);
    toast.success('Student updated successfully!');
  };

  const handleDeleteConfirm = () => {
    setStudentList((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    toast.success('Student record removed.');
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      admissionNo: student.admissionNo,
      name: student.name,
      dob: student.dob || '',
      gender: student.gender || 'Male',
      classId: String(student.classId),
      rollNo: student.rollNo || '',
      address: student.address || '',
      phone: student.phone || '',
      parentId: String(student.parentId || ''),
      email: student.email || '',
      admissionDate: student.admissionDate || '',
      status: student.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const openDeleteDialog = (student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const classOptions = classes.map((c) => ({
    value: String(c.id),
    label: `${c.name} - ${c.section}`,
  }));

  const parentOptions = parents.map((p) => ({
    value: String(p.id),
    label: `${p.name} (${p.phone})`,
  }));

  const columns = [
    {
      header: 'Student',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400">Adm: {row.admissionNo}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Class & Sec',
      accessor: 'classId',
      render: (row) => (
        <span className="font-medium text-gray-700">{getClassDisplayName(row.classId)}</span>
      ),
    },
    {
      header: 'Roll No',
      accessor: 'rollNo',
      render: (row) => <span className="text-gray-600 font-mono">#{row.rollNo}</span>,
    },
    {
      header: 'Gender',
      accessor: 'gender',
      render: (row) => <span className="text-gray-600">{row.gender}</span>,
    },
    {
      header: 'Parent / Guardian',
      accessor: 'parentId',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-800">{getParentName(row.parentId)}</p>
          <p className="text-xs text-gray-400">{row.phone}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Directory</h1>
          <p className="text-sm text-gray-500">Manage student admissions, profiles, and class enrollments</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Student
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, adm no, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Classes</option>
            {classOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {(searchTerm || selectedClass) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('');
              }}
              className="text-xs text-blue-600 hover:underline whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        currentPage={currentPage}
        itemsPerPage={8}
        onPageChange={setCurrentPage}
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openViewModal(row)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEditModal(row)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition"
              title="Edit Student"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => openDeleteDialog(row)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete Student"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Student" size="lg">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Admission Number"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleInputChange}
              required
              placeholder="e.g. STU2026045"
            />
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Aarav Sharma"
            />
            <FormInput
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <FormInput
              label="Gender"
              type="select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <FormInput
              label="Class & Section"
              type="select"
              name="classId"
              value={formData.classId}
              onChange={handleInputChange}
              required
              options={classOptions}
            />
            <FormInput
              label="Roll Number"
              name="rollNo"
              type="number"
              value={formData.rollNo}
              onChange={handleInputChange}
              placeholder="e.g. 15"
            />
            <FormInput
              label="Parent / Guardian"
              type="select"
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
              options={parentOptions}
            />
            <FormInput
              label="Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 9876543210"
            />
            <FormInput
              label="Student Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. aarav@schoolems.com"
            />
            <FormInput
              label="Admission Date"
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleInputChange}
            />
          </div>
          <FormInput
            label="Home Address"
            type="textarea"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Full residential address"
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            >
              Save Student
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Record" size="lg">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Admission Number"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleInputChange}
              required
              disabled
            />
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <FormInput
              label="Gender"
              type="select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <FormInput
              label="Class & Section"
              type="select"
              name="classId"
              value={formData.classId}
              onChange={handleInputChange}
              required
              options={classOptions}
            />
            <FormInput
              label="Roll Number"
              name="rollNo"
              type="number"
              value={formData.rollNo}
              onChange={handleInputChange}
            />
            <FormInput
              label="Parent / Guardian"
              type="select"
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
              options={parentOptions}
            />
            <FormInput
              label="Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormInput
              label="Student Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormInput
              label="Enrollment Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive / Suspended' },
              ]}
            />
          </div>
          <FormInput
            label="Home Address"
            type="textarea"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            >
              Update Record
            </button>
          </div>
        </form>
      </Modal>

      {/* View Student Details Modal */}
      {selectedStudent && (
        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Student Profile" size="md">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h3>
                <p className="text-sm text-blue-700 font-medium">{getClassDisplayName(selectedStudent.classId)}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-blue-200 font-mono">
                    Roll #{selectedStudent.rollNo}
                  </span>
                  <StatusBadge status={selectedStudent.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Admission No</p>
                <p className="font-semibold text-gray-800 font-mono">{selectedStudent.admissionNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="font-semibold text-gray-800">{selectedStudent.dob || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-semibold text-gray-800">{selectedStudent.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Admission Date</p>
                <p className="font-semibold text-gray-800">{selectedStudent.admissionDate || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Parent / Guardian</p>
                <p className="font-semibold text-gray-800">{getParentName(selectedStudent.parentId)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact Number</p>
                <p className="font-semibold text-gray-800">{selectedStudent.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-semibold text-gray-800">{selectedStudent.email || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Residential Address</p>
                <p className="font-semibold text-gray-800">{selectedStudent.address || 'N/A'}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        message={`Are you sure you want to remove student "${selectedStudent?.name}" (${selectedStudent?.admissionNo})? This action cannot be undone.`}
      />
    </div>
  );
}
