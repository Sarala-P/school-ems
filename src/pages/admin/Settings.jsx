import React, { useState } from 'react';
import { Shield, Settings as SettingsIcon, Save, CheckCircle, School } from 'lucide-react';
import toast from 'react-hot-toast';
import FormInput from '../../components/common/FormInput';

const defaultPermissions = {
  admin: { manageUsers: true, manageAcademics: true, manageAttendance: true, viewReports: true, manageFinances: true },
  principal: { manageUsers: true, manageAcademics: true, manageAttendance: true, viewReports: true, manageFinances: false },
  teacher: { manageUsers: false, manageAcademics: true, manageAttendance: true, viewReports: false, manageFinances: false },
  student: { manageUsers: false, manageAcademics: false, manageAttendance: false, viewReports: false, manageFinances: false },
  parent: { manageUsers: false, manageAcademics: false, manageAttendance: false, viewReports: false, manageFinances: false },
};

export default function Settings() {
  const [permissions, setPermissions] = useState(defaultPermissions);
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: 'Delhi Public International School',
    academicYear: '2026-2027',
    affiliationNo: 'CBSE-AFF-987654',
    principalName: 'Dr. Rajesh Kumar',
    contactEmail: 'contact@schoolems.com',
    contactPhone: '+91 11 2345 6789',
    address: '45, MG Road, Institutional Area, New Delhi',
  });

  const handleToggle = (role, perm) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success('School configuration and permissions saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">System Settings & Access Control</h1>
        <p className="text-sm text-gray-500">Configure institutional preferences, academic sessions, and role permissions</p>
      </div>

      {/* School General Info Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">General School Profile</h3>
            <p className="text-xs text-gray-400">Institutional branding and communication coordinates</p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="School Official Name"
              value={schoolSettings.schoolName}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolName: e.target.value })}
              required
            />
            <FormInput
              label="Academic Year"
              value={schoolSettings.academicYear}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, academicYear: e.target.value })}
              required
            />
            <FormInput
              label="Board Affiliation Number"
              value={schoolSettings.affiliationNo}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, affiliationNo: e.target.value })}
            />
            <FormInput
              label="Current Principal"
              value={schoolSettings.principalName}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, principalName: e.target.value })}
            />
            <FormInput
              label="Official Contact Email"
              type="email"
              value={schoolSettings.contactEmail}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, contactEmail: e.target.value })}
            />
            <FormInput
              label="Helpdesk Phone"
              value={schoolSettings.contactPhone}
              onChange={(e) => setSchoolSettings({ ...schoolSettings, contactPhone: e.target.value })}
            />
          </div>
          <FormInput
            label="Campus Address"
            type="textarea"
            rows={2}
            value={schoolSettings.address}
            onChange={(e) => setSchoolSettings({ ...schoolSettings, address: e.target.value })}
          />
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm"
            >
              <Save className="w-4 h-4" /> Save General Settings
            </button>
          </div>
        </form>
      </div>

      {/* Role-Based Permissions Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Role Permissions Matrix</h3>
            <p className="text-xs text-gray-400">Define authorization boundaries for user roles</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-3">Portal Role</th>
                <th className="p-3 text-center">Manage Users</th>
                <th className="p-3 text-center">Manage Academics</th>
                <th className="p-3 text-center">Mark Attendance</th>
                <th className="p-3 text-center">View Reports</th>
                <th className="p-3 text-center">Fleet & Inventory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.keys(permissions).map((role) => (
                <tr key={role} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800 capitalize">{role} Portal</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role].manageUsers}
                      onChange={() => handleToggle(role, 'manageUsers')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role].manageAcademics}
                      onChange={() => handleToggle(role, 'manageAcademics')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role].manageAttendance}
                      onChange={() => handleToggle(role, 'manageAttendance')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role].viewReports}
                      onChange={() => handleToggle(role, 'viewReports')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[role].manageFinances}
                      onChange={() => handleToggle(role, 'manageFinances')}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
