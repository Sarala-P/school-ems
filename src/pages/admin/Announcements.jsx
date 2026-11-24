import React, { useState } from 'react';
import { Plus, Bell, Calendar, User, Filter, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { announcements as initialAnnouncements } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';

export default function Announcements() {
  const { user } = useAuth();
  const [announcementList, setAnnouncementList] = useState(initialAnnouncements);
  const [filterPriority, setFilterPriority] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const initialForm = {
    title: '',
    message: '',
    priority: 'medium',
    targetRoles: ['student', 'teacher', 'parent'],
  };
  const [formData, setFormData] = useState(initialForm);

  const handleRoleToggle = (role) => {
    setFormData((prev) => {
      const exists = prev.targetRoles.includes(role);
      const updated = exists
        ? prev.targetRoles.filter((r) => r !== role)
        : [...prev.targetRoles, role];
      return { ...prev, targetRoles: updated };
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast.error('Title and message are required');
      return;
    }
    const newNotice = {
      ...formData,
      id: Date.now(),
      author: user?.name || 'Administrator',
      role: user?.role || 'admin',
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncementList([newNotice, ...announcementList]);
    setIsAddModalOpen(false);
    setFormData(initialForm);
    toast.success('Announcement broadcasted successfully!');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAnnouncementList((prev) =>
      prev.map((a) => (a.id === selectedNotice.id ? { ...formData, id: a.id, author: a.author, date: a.date } : a))
    );
    setIsEditModalOpen(false);
    toast.success('Announcement updated!');
  };

  const handleDelete = () => {
    setAnnouncementList(announcementList.filter((a) => a.id !== selectedNotice.id));
    toast.success('Announcement deleted');
  };

  const openEdit = (a) => {
    setSelectedNotice(a);
    setFormData({
      title: a.title,
      message: a.message,
      priority: a.priority,
      targetRoles: a.targetRoles || [],
    });
    setIsEditModalOpen(true);
  };

  const displayedNotices = announcementList.filter((a) => {
    if (filterPriority === 'all') return true;
    return a.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Notices & Announcements</h1>
          <p className="text-sm text-gray-500">Publish broadcast alerts, academic notices, and circulars to teachers, parents, and students</p>
        </div>
        <button
          onClick={() => {
            setFormData(initialForm);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {/* Filter Priority Bar */}
      <div className="flex gap-2">
        {['all', 'high', 'medium', 'low'].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
              filterPriority === p
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {p === 'all' ? 'All Notices' : `${p} Priority`}
          </button>
        ))}
      </div>

      {/* Grid of Announcement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base">{notice.title}</h3>
                </div>
                <StatusBadge status={notice.priority} />
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{notice.message}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium text-gray-700">
                  <User className="w-3.5 h-3.5 text-gray-400" /> {notice.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {notice.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {notice.targetRoles?.map((r) => (
                    <span key={r} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] uppercase font-bold">
                      {r}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openEdit(notice)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedNotice(notice);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="p-1 text-gray-400 hover:text-rose-600 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Publish Announcement" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Winter Holiday Schedule" />
          <FormInput label="Priority Level" type="select" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} options={[{ value: 'high', label: 'High Priority (Urgent)' }, { value: 'medium', label: 'Medium Priority' }, { value: 'low', label: 'Low / General Information' }]} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
            <div className="flex gap-4 p-2 bg-gray-50 rounded border text-xs">
              {['student', 'teacher', 'parent'].map((r) => (
                <label key={r} className="flex items-center gap-1.5 capitalize cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.targetRoles.includes(r)}
                    onChange={() => handleRoleToggle(r)}
                    className="rounded text-blue-600"
                  />
                  <span>{r}s</span>
                </label>
              ))}
            </div>
          </div>
          <FormInput label="Message Content" type="textarea" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required placeholder="Write the full circular notice here..." />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Publish Now</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Notice" size="md">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <FormInput label="Priority" type="select" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} options={[{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }]} />
          <FormInput label="Message" type="textarea" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Update Notice</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Announcement"
        message={`Delete circular "${selectedNotice?.title}"?`}
      />
    </div>
  );
}
