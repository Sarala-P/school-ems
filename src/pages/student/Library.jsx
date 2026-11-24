import React from 'react';
import { BookOpen, Library as LibraryIcon, Clock, CheckCircle } from 'lucide-react';
import { books, bookIssues } from '../../data/fakeData';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

export default function StudentLibrary() {
  const { user } = useAuth();
  const studentId = user?.studentId || 1;

  const myIssuedBooks = bookIssues.filter((i) => i.studentId === studentId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Library & Issued Books</h1>
        <p className="text-sm text-gray-500">View borrowed book titles, return due dates, and explore the school catalog</p>
      </div>

      {/* My Issued Books Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" /> Currently Borrowed Books ({myIssuedBooks.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myIssuedBooks.map((issue) => {
            const book = books.find((b) => b.id === issue.bookId);
            return (
              <div key={issue.id} className="p-4 bg-teal-50/40 rounded-xl border border-teal-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{book?.title || 'Library Book'}</h4>
                    <StatusBadge status={issue.status} />
                  </div>
                  <p className="text-xs text-gray-500">By {book?.author} • Category: {book?.category}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-teal-100/60 flex items-center justify-between text-xs text-gray-500">
                  <span>Issued on: {issue.issueDate}</span>
                  <span className="font-bold text-teal-800">Due: {issue.dueDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Catalog Books */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <LibraryIcon className="w-5 h-5 text-blue-600" /> Recommended Library Books
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {books.slice(0, 6).map((b) => (
            <div key={b.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="font-bold text-sm text-gray-900 truncate">{b.title}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{b.author}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 text-xs">
                <span className="text-gray-400">{b.category}</span>
                <span className="text-emerald-600 font-semibold">{b.availableQuantity} in stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
