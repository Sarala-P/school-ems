import React, { useState, useMemo } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Users, Phone, Mail, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { parents as initialParents, students, getStudentName } from '../../data/fakeData';

export default function ManageParents() {
  const [parentList, setParentList] = useState(initialParents);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    childrenIds: [],
    status: 'active',
  };
  const [formData, setFormData] = useState(initialFormData);

  const filteredParents = useMemo(() => {
    return parentList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.phone && p.phone.includes(searchTerm)) ||
        (p.occupation && p.occupation.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [parentList, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildToggle = (studentId) => {
    setFormData((prev) => {
      const exists = prev.childrenIds.includes(studentId);
      const updated = exists
        ? prev.childrenIds.filter((id) => id !== studentId)
        : [...prev.childrenIds, studentId];
      return { ...prev, childrenIds: updated };
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Parent Name and Phone are required');
      return;
    }
    const newParent = { ...formData, id: Date.now() };
    setParentList([newParent, ...parentList]);
    setIsAddModalOpen(false);
    toast.success('Parent account registered successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setParentList((prev) =>
      prev.map((p) => (p.id === selectedParent.id ? { ...formData, id: p.id } : p))
    );
    setIsEditModalOpen(false);
    toast.success('Parent account updated!');
  };

  const handleDeleteConfirm = () => {
    setParentList((prev) => prev.filter((p) => p.id !== selectedParent.id));
    toast.success('Parent record removed.');
  };

  const openEdit = (p) => {
    setSelectedParent(p);
    setFormData({
      name: p.name,
      email: p.email,
      phone: p.phone,
      address: p.address || '',
      occupation: p.occupation || '',
      childrenIds: p.childrenIds || [],
      status: p.status || 'active',
    });
    setIsEditModalOpen(true);
  };

  const openDelete = (p) => {
    setSelectedParent(p);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      header: 'Parent Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400">{row.occupation}</p>
          </div>
        </div>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone Number', accessor: 'phone' },
    {
      header: 'Linked Children',
      accessor: 'childrenIds',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {row.childrenIds && row.childrenIds.length > 0 ? (
            row.childrenIds.map((cId) => (
              <span key={cId} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                {getStudentName(cId)}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">None linked</span>
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
          <h1 className="text-2xl font-bold text-gray-800">Parents & Guardians</h1>
          <p className="text-sm text-gray-500">Manage parent portal accounts and linked student connections</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add Parent
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by parent name, phone, occupation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">{filteredParents.length} parent records</span>
      </div>

      <DataTable
        columns={columns}
        data={filteredParents}
        currentPage={currentPage}
        itemsPerPage={8}
        onPageChange={setCurrentPage}
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openEdit(row)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
              title="Edit Profile"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => openDelete(row)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Parent Account" size="lg">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Parent / Guardian Name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Ramesh Verma" />
            <FormInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ramesh@gmail.com" />
            <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="9876543210" />
            <FormInput label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} placeholder="e.g. Architect" />
          </div>
          <FormInput label="Residential Address" type="textarea" rows={2} name="address" value={formData.address} onChange={handleInputChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link Children / Students</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg border">
              {students.map((stu) => (
                <label key={stu.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.childrenIds.includes(stu.id)}
                    onChange={() => handleChildToggle(stu.id)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>{stu.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-orange-600 rounded-lg hover:bg-orange-700 font-medium">Save Parent</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Parent Details" size="lg">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Parent Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <FormInput label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
            <FormInput label="Status" type="select" name="status" value={formData.status} onChange={handleInputChange} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
          </div>
          <FormInput label="Address" type="textarea" rows={2} name="address" value={formData.address} onChange={handleInputChange} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link Children</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg border">
              {students.map((stu) => (
                <label key={stu.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.childrenIds.includes(stu.id)}
                    onChange={() => handleChildToggle(stu.id)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <span>{stu.name}</span>
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
        title="Delete Parent Account"
        message={`Are you sure you want to delete "${selectedParent?.name}"?`}
      />
    </div>
  );
}
