const statusColorMap = {
  active: 'bg-green-100 text-green-700',
  present: 'bg-green-100 text-green-700',
  available: 'bg-green-100 text-green-700',
  'in-stock': 'bg-green-100 text-green-700',
  completed: 'bg-green-100 text-green-700',
  returned: 'bg-green-100 text-green-700',
  passed: 'bg-green-100 text-green-700',
  approved: 'bg-green-100 text-green-700',

  inactive: 'bg-red-100 text-red-700',
  absent: 'bg-red-100 text-red-700',
  maintenance: 'bg-red-100 text-red-700',
  overdue: 'bg-red-100 text-red-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-red-100 text-red-700',

  leave: 'bg-amber-100 text-amber-700',
  pending: 'bg-amber-100 text-amber-700',
  upcoming: 'bg-amber-100 text-amber-700',
  'low-stock': 'bg-amber-100 text-amber-700',
  late: 'bg-amber-100 text-amber-700',

  issued: 'bg-blue-100 text-blue-700',
  ongoing: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status }) {
  const normalized = status?.toLowerCase().trim() || '';
  const colors = statusColorMap[normalized] || 'bg-gray-100 text-gray-700';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors}`}
    >
      {status}
    </span>
  );
}
