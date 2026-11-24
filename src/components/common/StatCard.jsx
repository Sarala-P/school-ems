import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    pink: 'bg-pink-50 text-pink-600 border-pink-200',
  };

  const iconBgClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    teal: 'bg-teal-100 text-teal-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${colorClasses[color] || colorClasses.blue}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${iconBgClasses[color] || iconBgClasses.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
