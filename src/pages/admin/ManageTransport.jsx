import React, { useState } from 'react';
import { Plus, Bus, MapPin, Phone, User, Trash2, Edit, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { vehicles as initialVehicles, routes as initialRoutes, students, getStudentName } from '../../data/fakeData';

export default function ManageTransport() {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicleList, setVehicleList] = useState(initialVehicles);
  const [routeList, setRouteList] = useState(initialRoutes);

  // Modals
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Vehicle form
  const initialVehicleForm = {
    vehicleNo: '',
    type: 'Bus',
    capacity: 40,
    driverName: '',
    driverPhone: '',
    driverLicense: '',
    routeId: '',
    status: 'active',
  };
  const [vehicleForm, setVehicleForm] = useState(initialVehicleForm);

  // Route form
  const initialRouteForm = {
    name: '',
    stops: '',
    distance: '',
    vehicleId: '',
    studentIds: [],
  };
  const [routeForm, setRouteForm] = useState(initialRouteForm);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!vehicleForm.vehicleNo || !vehicleForm.driverName) {
      toast.error('Vehicle Number and Driver Name are required');
      return;
    }
    const newVehicle = {
      ...vehicleForm,
      id: Date.now(),
      capacity: Number(vehicleForm.capacity),
    };
    setVehicleList([newVehicle, ...vehicleList]);
    setIsVehicleModalOpen(false);
    setVehicleForm(initialVehicleForm);
    toast.success('Vehicle registered successfully!');
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    if (!routeForm.name) {
      toast.error('Route Name is required');
      return;
    }
    const newRoute = {
      ...routeForm,
      id: Date.now(),
      stops: routeForm.stops ? routeForm.stops.split(',').map((s) => s.trim()) : [],
      vehicleId: Number(routeForm.vehicleId) || 1,
    };
    setRouteList([newRoute, ...routeList]);
    setIsRouteModalOpen(false);
    setRouteForm(initialRouteForm);
    toast.success('Route created successfully!');
  };

  const handleDelete = () => {
    if (deleteTarget.type === 'vehicle') {
      setVehicleList(vehicleList.filter((v) => v.id !== deleteTarget.id));
      toast.success('Vehicle removed');
    } else {
      setRouteList(routeList.filter((r) => r.id !== deleteTarget.id));
      toast.success('Route deleted');
    }
  };

  const vehicleColumns = [
    {
      header: 'Vehicle Reg. No',
      accessor: 'vehicleNo',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 font-mono">{row.vehicleNo}</p>
            <p className="text-xs text-gray-400">{row.type} • Capacity: {row.capacity}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Driver Details',
      accessor: 'driverName',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.driverName}</p>
          <p className="text-xs text-gray-400">{row.driverPhone}</p>
        </div>
      ),
    },
    { header: 'License No', accessor: 'driverLicense' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const routeColumns = [
    {
      header: 'Route Name',
      accessor: 'name',
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.distance}</p>
        </div>
      ),
    },
    {
      header: 'Stops Covered',
      accessor: 'stops',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-sm">
          {row.stops.map((stop, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
              {stop}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Assigned Vehicle',
      accessor: 'vehicleId',
      render: (row) => {
        const veh = vehicleList.find((v) => v.id === row.vehicleId);
        return <span className="font-mono text-xs font-semibold text-blue-700">{veh?.vehicleNo || 'Unassigned'}</span>;
      },
    },
    {
      header: 'Commuters',
      accessor: 'studentIds',
      render: (row) => <span className="text-xs font-medium text-gray-700">{row.studentIds?.length || 0} Students</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transport & Fleet Management</h1>
          <p className="text-sm text-gray-500">Manage school buses, van fleet, transit routes, and student commuters</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'vehicles' ? (
            <button
              onClick={() => setIsVehicleModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </button>
          ) : (
            <button
              onClick={() => setIsRouteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Transit Route
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'vehicles'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Fleet Vehicles ({vehicleList.length})
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'routes'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Transit Routes ({routeList.length})
        </button>
      </div>

      {activeTab === 'vehicles' ? (
        <DataTable
          columns={vehicleColumns}
          data={vehicleList}
          itemsPerPage={6}
          renderActions={(row) => (
            <button
              onClick={() => {
                setDeleteTarget({ type: 'vehicle', id: row.id, name: row.vehicleNo });
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        />
      ) : (
        <DataTable
          columns={routeColumns}
          data={routeList}
          itemsPerPage={6}
          renderActions={(row) => (
            <button
              onClick={() => {
                setDeleteTarget({ type: 'route', id: row.id, name: row.name });
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        />
      )}

      {/* Add Vehicle Modal */}
      <Modal isOpen={isVehicleModalOpen} onClose={() => setIsVehicleModalOpen(false)} title="Register Fleet Vehicle" size="md">
        <form onSubmit={handleAddVehicle} className="space-y-4">
          <FormInput label="Registration Number" name="vehicleNo" value={vehicleForm.vehicleNo} onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleNo: e.target.value })} required placeholder="e.g. DL-01-AB-9999" />
          <FormInput label="Vehicle Type" type="select" value={vehicleForm.type} onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })} options={[{ value: 'Bus', label: 'Bus' }, { value: 'Mini Bus', label: 'Mini Bus' }, { value: 'Van', label: 'Van' }]} />
          <FormInput label="Passenger Capacity" type="number" value={vehicleForm.capacity} onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: e.target.value })} />
          <FormInput label="Driver Name" value={vehicleForm.driverName} onChange={(e) => setVehicleForm({ ...vehicleForm, driverName: e.target.value })} required placeholder="e.g. Ramesh Singh" />
          <FormInput label="Driver Phone" value={vehicleForm.driverPhone} onChange={(e) => setVehicleForm({ ...vehicleForm, driverPhone: e.target.value })} placeholder="9876543200" />
          <FormInput label="Driver License No" value={vehicleForm.driverLicense} onChange={(e) => setVehicleForm({ ...vehicleForm, driverLicense: e.target.value })} placeholder="DL-XXXXX" />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsVehicleModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Save Vehicle</button>
          </div>
        </form>
      </Modal>

      {/* Add Route Modal */}
      <Modal isOpen={isRouteModalOpen} onClose={() => setIsRouteModalOpen(false)} title="Create New Transit Route" size="md">
        <form onSubmit={handleAddRoute} className="space-y-4">
          <FormInput label="Route Name" value={routeForm.name} onChange={(e) => setRouteForm({ ...routeForm, name: e.target.value })} required placeholder="e.g. Route E - East Delhi" />
          <FormInput label="Pickup / Drop Stops (comma-separated)" type="textarea" rows={3} value={routeForm.stops} onChange={(e) => setRouteForm({ ...routeForm, stops: e.target.value })} placeholder="Stop 1, Stop 2, Stop 3, School" />
          <FormInput label="Total Route Distance" value={routeForm.distance} onChange={(e) => setRouteForm({ ...routeForm, distance: e.target.value })} placeholder="e.g. 18 km" />
          <FormInput
            label="Assigned Vehicle"
            type="select"
            value={routeForm.vehicleId}
            onChange={(e) => setRouteForm({ ...routeForm, vehicleId: e.target.value })}
            options={vehicleList.map((v) => ({ value: String(v.id), label: `${v.vehicleNo} (${v.driverName})` }))}
          />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsRouteModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">Create Route</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
