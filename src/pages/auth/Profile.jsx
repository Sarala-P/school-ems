import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Edit3, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    updateProfile(form);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-blue-100 text-blue-700',
      principal: 'bg-purple-100 text-purple-700',
      teacher: 'bg-green-100 text-green-700',
      parent: 'bg-orange-100 text-orange-700',
      student: 'bg-teal-100 text-teal-700',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your account details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header with avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-bold shadow-md">
              {getInitials(user?.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${getRoleBadgeColor(user?.role)}`}>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <div className="flex justify-end mb-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase">Full Name</p>
                {editing ? (
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-800 font-medium mt-0.5">{user?.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase">Email Address</p>
                {editing ? (
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-800 font-medium mt-0.5">{user?.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase">Phone Number</p>
                {editing ? (
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-800 font-medium mt-0.5">{user?.phone || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Role (read-only) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase">Role</p>
                <p className="text-sm text-gray-800 font-medium mt-0.5">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
              </div>
            </div>

            {/* Username (read-only) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-400 uppercase">Username</p>
                <p className="text-sm text-gray-800 font-medium mt-0.5">{user?.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
