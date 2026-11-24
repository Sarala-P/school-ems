import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, School, Mail, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { principals as initialPrincipals } from '../../data/fakeData';

export default function ManagePrincipals() {
  const [principalsList, setPrincipalsList] = useState(initialPrincipals);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPrincipal, setSelectedPrincipal] = useState(null);

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    joiningDate: new Date().toISOString().split('T')[0],
    address: '',
    status: 'active',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required');
      return;
    }
    const newPrincipal = { ...formData, id: Date.now() };
    setPrincipalsList([newPrincipal, ...principalsList]);
    setIsAddModalOpen(false);
    toast.success('Principal profile created successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPrincipalsList((prev) =>
      prev.map((p) => (p.id === selectedPrincipal.id ? { ...formData, id: p.id } : p))
    );
    setIsEditModalOpen(false);
    toast.success('Principal profile updated!');
  };

  const handleDeleteConfirm = () => {
    setPrincipalsList((prev) => prev.filter((p) => p.id !== selectedPrincipal.id));
    toast.success('Principal profile removed.');
  };

  const openEdit = (p) => {
    setSelectedPrincipal(p);
    setFormData({ ...p });
    setIsEditModalOpen(true);
  };

  const openDelete = (p) => {
    setSelectedPrincipal(p);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      header: 'Principal Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400">{row.qualification}</p>
          </div>
        </div>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Contact', accessor: 'phone' },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Joining Date', accessor: 'joiningDate' },
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
          <h1 className="text-2xl font-bold text-gray-800">School Principals</h1>
          <p className="text-sm text-gray-500">Manage administrative executive heads and leadership credentials</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> Add Principal
        </button>
      </div>

      <DataTable
        columns={columns}
        data={principalsList.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        currentPage={currentPage}
        itemsPerPage={5}
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register School Principal" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Dr. John Doe" />
          <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="principal@schoolems.com" />
          <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543211" />
          <FormInput label="Qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="Ph.D. in Education" />
          <FormInput label="Experience" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="15 years" />
          <FormInput label="Date of Joining" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
          <FormInput label="Address" type="textarea" rows={2} name="address" value={formData.address} onChange={handleInputChange} />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 font-medium">Save Principal</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Principal Profile" size="md">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
          <FormInput label="Qualification" name="qualification" value={formData.qualification} onChange={handleInputChange} />
          <FormInput label="Experience" name="experience" value={formData.experience} onChange={handleInputChange} />
          <FormInput label="Status" type="select" name="status" value={formData.status} onChange={handleInputChange} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} />
          <FormInput label="Address" type="textarea" rows={2} name="address" value={formData.address} onChange={handleInputChange} />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 font-medium">Update</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Principal"
        message={`Are you sure you want to delete profile for ${selectedPrincipal?.name}?`}
      />
    </div>
  );
}
