import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, UserCog, Mail, Phone, BookOpen, BookMarked } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { staff as initialStaff, subjects, classes, getSubjectName, getClassDisplayName } from '../../data/fakeData';

export default function ManageTeachers() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Form state
  const initialFormData = {
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    designation: 'Teacher',
    qualification: '',
    assignedSubjects: [],
    assignedClasses: [],
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  const [formData, setFormData] = useState(initialFormData);

  const filteredStaff = useMemo(() => {
    return staffList.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.phone && s.phone.includes(searchTerm))
    );
  }, [staffList, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxArrayToggle = (field, id) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      return { ...prev, [field]: updated };
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.email) {
      toast.error('Please enter name, employee ID, and email');
      return;
    }

    const newStaff = {
      ...formData,
      id: Date.now(),
    };

    setStaffList([newStaff, ...staffList]);
    setIsAddModalOpen(false);
    setFormData(initialFormData);
    toast.success('Staff member registered successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill required fields');
      return;
    }

    setStaffList((prev) =>
      prev.map((s) => (s.id === selectedStaff.id ? { ...formData, id: s.id } : s))
    );
    setIsEditModalOpen(false);
    toast.success('Staff record updated!');
  };

  const handleDeleteConfirm = () => {
    setStaffList((prev) => prev.filter((s) => s.id !== selectedStaff.id));
    toast.success('Staff record removed.');
  };

  const openEditModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      employeeId: staffMember.employeeId,
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone || '',
      address: staffMember.address || '',
      designation: staffMember.designation || 'Teacher',
      qualification: staffMember.qualification || '',
      assignedSubjects: staffMember.assignedSubjects || [],
      assignedClasses: staffMember.assignedClasses || [],
      joiningDate: staffMember.joiningDate || '',
      status: staffMember.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsViewModalOpen(true);
  };

  const openDeleteDialog = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      header: 'Faculty Member',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400 font-mono">ID: {row.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Designation',
      accessor: 'designation',
      render: (row) => (
        <div>
          <span className="font-medium text-gray-800">{row.designation}</span>
          <p className="text-xs text-gray-400">{row.qualification}</p>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'email',
      render: (row) => (
        <div>
          <p className="text-xs text-gray-800">{row.email}</p>
          <p className="text-xs text-gray-400">{row.phone}</p>
        </div>
      ),
    },
    {
      header: 'Assigned Subjects',
      accessor: 'assignedSubjects',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {row.assignedSubjects?.length > 0 ? (
            row.assignedSubjects.map((subId) => (
              <span key={subId} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                {getSubjectName(subId)}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">None</span>
          )}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Faculty & Staff Directory</h1>
          <p className="text-sm text-gray-500">Manage teachers, assignments, designations, and school personnel</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Staff
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filteredStaff.length}</span> staff members
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredStaff}
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
              title="Edit Staff"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => openDeleteDialog(row)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete Staff"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Faculty / Staff" size="lg">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              required
              placeholder="e.g. EMP009"
            />
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Dr. Ramesh Gupta"
            />
            <FormInput
              label="Official Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="e.g. ramesh@schoolems.com"
            />
            <FormInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 9876543299"
            />
            <FormInput
              label="Designation"
              type="select"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              options={[
                { value: 'Senior Teacher', label: 'Senior Teacher' },
                { value: 'Teacher', label: 'Teacher' },
                { value: 'Assistant Teacher', label: 'Assistant Teacher' },
                { value: 'Lab Assistant', label: 'Lab Assistant' },
                { value: 'Librarian', label: 'Librarian' },
                { value: 'Sports Instructor', label: 'Sports Instructor' },
              ]}
            />
            <FormInput
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              placeholder="e.g. M.Sc, B.Ed"
            />
            <FormInput
              label="Date of Joining"
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
          </div>

          <FormInput
            label="Residential Address"
            type="textarea"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          {/* Assign Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Teaching Subjects</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {subjects.map((sub) => (
                <label key={sub.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.assignedSubjects.includes(sub.id)}
                    onChange={() => handleCheckboxArrayToggle('assignedSubjects', sub.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{sub.name}</span>
                </label>
              ))}
            </div>
          </div>

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
              className="px-5 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 font-medium"
            >
              Save Faculty Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Staff Record" size="lg">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
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
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormInput
              label="Designation"
              type="select"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              options={[
                { value: 'Senior Teacher', label: 'Senior Teacher' },
                { value: 'Teacher', label: 'Teacher' },
                { value: 'Assistant Teacher', label: 'Assistant Teacher' },
                { value: 'Lab Assistant', label: 'Lab Assistant' },
                { value: 'Librarian', label: 'Librarian' },
                { value: 'Sports Instructor', label: 'Sports Instructor' },
              ]}
            />
            <FormInput
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
            />
            <FormInput
              label="Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive / On Leave' },
              ]}
            />
          </div>

          <FormInput
            label="Address"
            type="textarea"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Subjects</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {subjects.map((sub) => (
                <label key={sub.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.assignedSubjects.includes(sub.id)}
                    onChange={() => handleCheckboxArrayToggle('assignedSubjects', sub.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{sub.name}</span>
                </label>
              ))}
            </div>
          </div>

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
              Update Faculty
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      {selectedStaff && (
        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Faculty Profile" size="md">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow">
                {selectedStaff.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedStaff.name}</h3>
                <p className="text-sm text-emerald-800 font-medium">{selectedStaff.designation}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                    {selectedStaff.employeeId}
                  </span>
                  <StatusBadge status={selectedStaff.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Qualification</p>
                <p className="font-semibold text-gray-800">{selectedStaff.qualification || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date of Joining</p>
                <p className="font-semibold text-gray-800">{selectedStaff.joiningDate || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Official Email</p>
                <p className="font-semibold text-gray-800">{selectedStaff.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-semibold text-gray-800">{selectedStaff.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Assigned Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedStaff.assignedSubjects?.map((id) => (
                    <span key={id} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                      {getSubjectName(id)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Assigned Classes</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedStaff.assignedClasses?.map((id) => (
                    <span key={id} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                      {getClassDisplayName(id)}
                    </span>
                  ))}
                </div>
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
        title="Remove Staff Member"
        message={`Are you sure you want to delete "${selectedStaff?.name}" (${selectedStaff?.employeeId})? This will unassign all their classes and subjects.`}
      />
    </div>
  );
}
