import React, { useState } from 'react';
import { Download, FileText, BarChart3, Users, BookOpen, ClipboardList, Bus, Library, Package, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';
import { students, staff, classes, books, vehicles, inventory, attendance, examResults } from '../../data/fakeData';

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('students');

  const reportCategories = [
    { id: 'students', label: 'Student Demographics', icon: Users, count: `${students.length} Records` },
    { id: 'staff', label: 'Faculty & Staff Report', icon: Users, count: `${staff.length} Teachers` },
    { id: 'attendance', label: 'Daily Attendance Report', icon: ClipboardList, count: `${attendance.length} Logs` },
    { id: 'exams', label: 'Examination & Marks Report', icon: FileText, count: `${examResults.length} Scores` },
    { id: 'library', label: 'Library Circulation Report', icon: Library, count: `${books.length} Titles` },
    { id: 'transport', label: 'Fleet & Transit Report', icon: Bus, count: `${vehicles.length} Vehicles` },
    { id: 'inventory', label: 'Inventory & Stock Report', icon: Package, count: `${inventory.length} Assets` },
  ];

  const handleExport = (type) => {
    toast.success(`Exporting ${selectedCategory} report as ${type.toUpperCase()}... File generated.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Generate, review, and export institutional performance metrics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm transition shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-medium text-sm transition shadow-sm"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Category Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {reportCategories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                isSelected
                  ? 'bg-blue-50 border-blue-600 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-gray-800'}`}>
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.count}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Report Data Display Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h3 className="text-lg font-bold text-gray-800 capitalize">{selectedCategory} Detailed Table</h3>
          <span className="text-xs text-gray-400">Showing current term snapshot</span>
        </div>

        {selectedCategory === 'students' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Adm No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Admission Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.slice(0, 10).map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{s.admissionNo}</td>
                    <td className="p-3 font-semibold text-gray-800">{s.name}</td>
                    <td className="p-3">{s.gender}</td>
                    <td className="p-3 text-gray-500">{s.phone}</td>
                    <td className="p-3 text-gray-500">{s.admissionDate}</td>
                    <td className="p-3 capitalize text-emerald-600 font-semibold">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'staff' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Emp ID</th>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Qualification</th>
                  <th className="p-3">Joining Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{t.employeeId}</td>
                    <td className="p-3 font-semibold text-gray-800">{t.name}</td>
                    <td className="p-3">{t.designation}</td>
                    <td className="p-3 text-gray-500">{t.email}</td>
                    <td className="p-3 text-gray-500">{t.qualification}</td>
                    <td className="p-3 text-gray-500">{t.joiningDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'attendance' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Record ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Class ID</th>
                  <th className="p-3">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendance.slice(0, 10).map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">#{a.id}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3 font-mono">STU_{a.studentId}</td>
                    <td className="p-3">Class #{a.classId}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs capitalize font-bold ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'exams' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Result ID</th>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Subject ID</th>
                  <th className="p-3">Marks Obtained</th>
                  <th className="p-3">Max Marks</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {examResults.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">#{r.id}</td>
                    <td className="p-3">Student #{r.studentId}</td>
                    <td className="p-3">Subject #{r.subjectId}</td>
                    <td className="p-3 font-bold text-gray-800">{r.marksObtained}</td>
                    <td className="p-3 text-gray-500">{r.totalMarks}</td>
                    <td className="p-3 font-bold text-blue-600">{r.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'library' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Book ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Total Copies</th>
                  <th className="p-3">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{b.bookId}</td>
                    <td className="p-3 font-semibold text-gray-800">{b.title}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3">{b.totalQuantity}</td>
                    <td className="p-3 font-bold text-emerald-600">{b.availableQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'transport' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Reg No</th>
                  <th className="p-3">Vehicle Type</th>
                  <th className="p-3">Driver Name</th>
                  <th className="p-3">Driver Contact</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-semibold text-blue-700">{v.vehicleNo}</td>
                    <td className="p-3">{v.type} ({v.capacity} seats)</td>
                    <td className="p-3 font-semibold text-gray-800">{v.driverName}</td>
                    <td className="p-3 text-gray-500">{v.driverPhone}</td>
                    <td className="p-3 capitalize font-bold text-emerald-600">{v.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory === 'inventory' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-3">Item Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Available Stock</th>
                  <th className="p-3">Total Qty</th>
                  <th className="p-3">Supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-800">{inv.name}</td>
                    <td className="p-3">{inv.category}</td>
                    <td className="p-3 font-bold text-emerald-600">{inv.availableStock}</td>
                    <td className="p-3 text-gray-500">{inv.quantity}</td>
                    <td className="p-3 text-gray-500">{inv.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
