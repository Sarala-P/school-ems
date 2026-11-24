import React, { useState } from 'react';
import { Plus, Library, BookOpen, User, CheckCircle, Clock, AlertTriangle, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { books as initialBooks, bookIssues as initialIssues, students, getStudentName } from '../../data/fakeData';

export default function ManageLibrary() {
  const [activeTab, setActiveTab] = useState('books');
  const [bookList, setBookList] = useState(initialBooks);
  const [issueList, setIssueList] = useState(initialIssues);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const initialBookForm = {
    bookId: '',
    title: '',
    author: '',
    category: 'Textbook',
    isbn: '',
    totalQuantity: 10,
    availableQuantity: 10,
    status: 'available',
  };
  const [bookForm, setBookForm] = useState(initialBookForm);

  const initialIssueForm = {
    bookId: '',
    studentId: '',
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  };
  const [issueForm, setIssueForm] = useState(initialIssueForm);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.bookId) {
      toast.error('Book Title and ID are required');
      return;
    }
    const newBook = {
      ...bookForm,
      id: Date.now(),
      totalQuantity: Number(bookForm.totalQuantity),
      availableQuantity: Number(bookForm.totalQuantity),
    };
    setBookList([newBook, ...bookList]);
    setIsBookModalOpen(false);
    setBookForm(initialBookForm);
    toast.success('Book added to library collection!');
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueForm.bookId || !issueForm.studentId) {
      toast.error('Select both Book and Student');
      return;
    }

    const bId = Number(issueForm.bookId);
    const book = bookList.find((b) => b.id === bId);
    if (!book || book.availableQuantity <= 0) {
      toast.error('No copies available of this book');
      return;
    }

    const newIssue = {
      id: Date.now(),
      bookId: bId,
      studentId: Number(issueForm.studentId),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: issueForm.dueDate,
      returnDate: null,
      status: 'issued',
    };

    setIssueList([newIssue, ...issueList]);
    // Decrease available quantity
    setBookList(
      bookList.map((b) => (b.id === bId ? { ...b, availableQuantity: b.availableQuantity - 1 } : b))
    );
    setIsIssueModalOpen(false);
    toast.success('Book issued to student successfully!');
  };

  const handleReturnBook = (issue) => {
    setIssueList(
      issueList.map((i) =>
        i.id === issue.id
          ? { ...i, status: 'returned', returnDate: new Date().toISOString().split('T')[0] }
          : i
      )
    );
    // Increase available quantity
    setBookList(
      bookList.map((b) =>
        b.id === issue.bookId ? { ...b, availableQuantity: b.availableQuantity + 1 } : b
      )
    );
    toast.success('Book checked in / returned successfully!');
  };

  const handleDeleteBook = () => {
    setBookList(bookList.filter((b) => b.id !== selectedBook.id));
    toast.success('Book record removed from library.');
  };

  const bookColumns = [
    {
      header: 'Book Title & Author',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.title}</p>
            <p className="text-xs text-gray-400">By {row.author} • ISBN: {row.isbn}</p>
          </div>
        </div>
      ),
    },
    { header: 'Book ID', accessor: 'bookId', render: (row) => <span className="font-mono text-xs">{row.bookId}</span> },
    { header: 'Category', accessor: 'category' },
    {
      header: 'Inventory Stock',
      accessor: 'availableQuantity',
      render: (row) => (
        <span className="text-xs font-semibold">
          <span className="text-emerald-600">{row.availableQuantity}</span> / {row.totalQuantity} available
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.availableQuantity > 0 ? 'available' : 'overdue'} />,
    },
  ];

  const issueColumns = [
    {
      header: 'Borrowed Book',
      accessor: 'bookId',
      render: (row) => {
        const book = bookList.find((b) => b.id === row.bookId);
        return <span className="font-semibold text-gray-900">{book?.title || 'Unknown Title'}</span>;
      },
    },
    {
      header: 'Borrower Student',
      accessor: 'studentId',
      render: (row) => (
        <span className="font-medium text-gray-800">{getStudentName(row.studentId)}</span>
      ),
    },
    { header: 'Issue Date', accessor: 'issueDate' },
    { header: 'Due Date', accessor: 'dueDate' },
    {
      header: 'Return Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Library Management System</h1>
          <p className="text-sm text-gray-500">Track book circulation, catalog availability, student borrow logs, and overdue alerts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Issue Book
          </button>
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Book
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('books')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'books'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Catalog ({bookList.length})
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'issues'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Issues & Returns ({issueList.length})
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'overdue'
              ? 'border-rose-600 text-rose-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Overdue Books ({issueList.filter((i) => i.status === 'overdue').length})
        </button>
      </div>

      {activeTab === 'books' && (
        <DataTable
          columns={bookColumns}
          data={bookList}
          itemsPerPage={8}
          renderActions={(row) => (
            <button
              onClick={() => {
                setSelectedBook(row);
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition"
              title="Delete Book"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        />
      )}

      {activeTab === 'issues' && (
        <DataTable
          columns={issueColumns}
          data={issueList}
          itemsPerPage={8}
          renderActions={(row) =>
            row.status !== 'returned' ? (
              <button
                onClick={() => handleReturnBook(row)}
                className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-xs font-semibold transition"
              >
                Mark Returned
              </button>
            ) : (
              <span className="text-xs text-gray-400">Returned on {row.returnDate}</span>
            )
          }
        />
      )}

      {activeTab === 'overdue' && (
        <DataTable
          columns={issueColumns}
          data={issueList.filter((i) => i.status === 'overdue')}
          itemsPerPage={8}
          renderActions={(row) => (
            <button
              onClick={() => handleReturnBook(row)}
              className="px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-xs font-semibold transition"
            >
              Return Now
            </button>
          )}
        />
      )}

      {/* Add Book Modal */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Add Book to Catalog" size="md">
        <form onSubmit={handleAddBook} className="space-y-4">
          <FormInput label="Book ID" value={bookForm.bookId} onChange={(e) => setBookForm({ ...bookForm, bookId: e.target.value })} required placeholder="LIB011" />
          <FormInput label="Book Title" value={bookForm.title} onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })} required placeholder="e.g. Concept of Physics Vol 1" />
          <FormInput label="Author" value={bookForm.author} onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })} required placeholder="H.C. Verma" />
          <FormInput label="Category" type="select" value={bookForm.category} onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })} options={[{ value: 'Textbook', label: 'Textbook' }, { value: 'Science', label: 'Science' }, { value: 'Fiction', label: 'Fiction' }, { value: 'History', label: 'History' }, { value: 'Computer Science', label: 'Computer Science' }]} />
          <FormInput label="ISBN Number" value={bookForm.isbn} onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })} placeholder="978-XXXXXXXXXX" />
          <FormInput label="Total Copies / Quantity" type="number" value={bookForm.totalQuantity} onChange={(e) => setBookForm({ ...bookForm, totalQuantity: e.target.value })} />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsBookModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-medium">Add Book</button>
          </div>
        </form>
      </Modal>

      {/* Issue Book Modal */}
      <Modal isOpen={isIssueModalOpen} onClose={() => setIsIssueModalOpen(false)} title="Issue Book to Student" size="md">
        <form onSubmit={handleIssueSubmit} className="space-y-4">
          <FormInput
            label="Select Book"
            type="select"
            value={issueForm.bookId}
            onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
            required
            options={bookList.filter((b) => b.availableQuantity > 0).map((b) => ({ value: String(b.id), label: `${b.title} (${b.availableQuantity} available)` }))}
          />
          <FormInput
            label="Select Student"
            type="select"
            value={issueForm.studentId}
            onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
            required
            options={students.map((s) => ({ value: String(s.id), label: `${s.name} (${s.admissionNo})` }))}
          />
          <FormInput
            label="Due Date"
            type="date"
            value={issueForm.dueDate}
            onChange={(e) => setIssueForm({ ...issueForm, dueDate: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsIssueModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 font-medium">Issue Book</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteBook}
        title="Remove Book"
        message={`Delete "${selectedBook?.title}" from catalog?`}
      />
    </div>
  );
}
