import React from 'react';
import { Bus, MapPin, Phone, User, Clock, ShieldCheck } from 'lucide-react';
import { routes, vehicles } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';

export default function StudentTransport() {
  const { user } = useAuth();
  const studentId = user?.studentId || 1;

  // Find student's assigned route
  const assignedRoute = routes.find((r) => r.studentIds.includes(studentId)) || routes[0];
  const vehicle = vehicles.find((v) => v.id === assignedRoute.vehicleId) || vehicles[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My School Transportation</h1>
        <p className="text-sm text-gray-500">Commute details, assigned bus vehicle, driver contact, and scheduled pickup stops</p>
      </div>

      {/* Bus and Driver Information Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <Bus className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase">Designated School Vehicle</span>
              <h2 className="text-2xl font-bold text-gray-900 font-mono">{vehicle.vehicleNo}</h2>
              <p className="text-xs text-gray-400">{vehicle.type} • Capacity: {vehicle.capacity} seats</p>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> GPS Tracked & Verified
          </div>
        </div>

        {/* Driver Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-gray-50 p-3.5 rounded-xl">
            <p className="text-xs text-gray-400">Driver Name</p>
            <p className="font-bold text-gray-800 text-sm mt-0.5">{vehicle.driverName}</p>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl">
            <p className="text-xs text-gray-400">Emergency Phone</p>
            <p className="font-bold text-gray-800 text-sm mt-0.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" /> {vehicle.driverPhone}
            </p>
          </div>
          <div className="bg-gray-50 p-3.5 rounded-xl">
            <p className="text-xs text-gray-400">Commercial License</p>
            <p className="font-bold text-gray-800 text-sm mt-0.5 font-mono">{vehicle.driverLicense}</p>
          </div>
        </div>
      </div>

      {/* Route Stops Sequence */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{assignedRoute.name}</h3>
            <p className="text-xs text-gray-400">Estimated distance: {assignedRoute.distance}</p>
          </div>
        </div>

        <div className="space-y-4">
          {assignedRoute.stops.map((stop, idx) => {
            const isDestination = idx === assignedRoute.stops.length - 1;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${isDestination ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                    {idx + 1}
                  </div>
                  {!isDestination && <div className="w-0.5 h-8 bg-gray-200 my-1"></div>}
                </div>
                <div className="pt-1">
                  <p className="font-bold text-sm text-gray-900">{stop}</p>
                  <p className="text-xs text-gray-400">
                    {isDestination ? 'Final Drop at School Campus' : `Designated Pickup Point #${idx + 1}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
