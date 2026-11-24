import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({ columns, data, currentPage = 1, itemsPerPage = 10, onPageChange, renderActions }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (renderActions ? 1 : 0)} className="px-4 py-8 text-center text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr key={row.id || rowIdx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderActions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of {data.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
