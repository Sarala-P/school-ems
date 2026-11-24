import React, { useState } from 'react';
import { Plus, Package, AlertTriangle, ArrowUpRight, ArrowDownLeft, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import FormInput from '../../components/common/FormInput';
import StatusBadge from '../../components/common/StatusBadge';
import { inventory as initialInventory } from '../../data/fakeData';

export default function ManageInventory() {
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [filterLowStock, setFilterLowStock] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockActionType, setStockActionType] = useState('in'); // 'in' or 'out'
  const [stockAmount, setStockAmount] = useState(10);

  const initialForm = {
    name: '',
    category: 'Stationery',
    quantity: 100,
    availableStock: 100,
    purchaseDate: new Date().toISOString().split('T')[0],
    supplier: '',
    price: 50,
    status: 'in-stock',
  };
  const [formData, setFormData] = useState(initialForm);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Item name is required');
      return;
    }
    const newItem = {
      ...formData,
      id: Date.now(),
      quantity: Number(formData.quantity),
      availableStock: Number(formData.availableStock),
      price: Number(formData.price),
    };
    setInventoryList([newItem, ...inventoryList]);
    setIsAddModalOpen(false);
    toast.success('Inventory item registered!');
  };

  const handleStockAdjust = (e) => {
    e.preventDefault();
    const qty = Number(stockAmount);
    if (!qty || qty <= 0) {
      toast.error('Enter a valid quantity');
      return;
    }

    setInventoryList((prev) =>
      prev.map((item) => {
        if (item.id === selectedItem.id) {
          const newStock =
            stockActionType === 'in' ? item.availableStock + qty : item.availableStock - qty;
          if (newStock < 0) {
            toast.error('Cannot remove more than available stock');
            return item;
          }
          const updatedStatus = newStock <= 5 ? 'low-stock' : 'in-stock';
          toast.success(
            `Stock ${stockActionType === 'in' ? 'replenished' : 'dispatched'} successfully!`
          );
          return { ...item, availableStock: newStock, status: updatedStatus };
        }
        return item;
      })
    );
    setIsStockModalOpen(false);
  };

  const handleDelete = () => {
    setInventoryList(inventoryList.filter((i) => i.id !== selectedItem.id));
    toast.success('Inventory record deleted');
  };

  const displayedList = filterLowStock
    ? inventoryList.filter((i) => i.availableStock <= 5 || i.status === 'low-stock')
    : inventoryList;

  const columns = [
    {
      header: 'Item Name & Category',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-400">{row.category} • Supplier: {row.supplier}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Available Stock',
      accessor: 'availableStock',
      render: (row) => (
        <div>
          <span className={`font-bold ${row.availableStock <= 5 ? 'text-rose-600' : 'text-gray-800'}`}>
            {row.availableStock} Units
          </span>
          <p className="text-xs text-gray-400">Total purchased: {row.quantity}</p>
        </div>
      ),
    },
    {
      header: 'Unit Price',
      accessor: 'price',
      render: (row) => <span className="font-mono text-xs">₹{row.price}</span>,
    },
    { header: 'Purchase Date', accessor: 'purchaseDate' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Assets & Inventory</h1>
          <p className="text-sm text-gray-500">Track supplies, classroom equipment, stock replenishment, and storage</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
              filterLowStock
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filterLowStock ? 'Showing Low Stock' : 'Filter Low Stock'}
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={displayedList}
        itemsPerPage={8}
        renderActions={(row) => (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedItem(row);
                setStockActionType('in');
                setIsStockModalOpen(true);
              }}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
              title="Stock In (+)"
            >
              <ArrowDownLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedItem(row);
                setStockActionType('out');
                setIsStockModalOpen(true);
              }}
              className="p-1.5 text-orange-600 hover:bg-orange-50 rounded"
              title="Stock Out (-)"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedItem(row);
                setIsDeleteDialogOpen(true);
              }}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Inventory Item" size="md">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <FormInput label="Item Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="e.g. Science Microscopes" />
          <FormInput label="Category" type="select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} options={[{ value: 'Stationery', label: 'Stationery' }, { value: 'Furniture', label: 'Furniture' }, { value: 'Electronics', label: 'Electronics' }, { value: 'Lab', label: 'Lab Equipment' }, { value: 'Sports', label: 'Sports Kit' }]} />
          <FormInput label="Initial Quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value, availableStock: e.target.value })} />
          <FormInput label="Unit Price (INR)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
          <FormInput label="Supplier Name" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} placeholder="e.g. EduEquip Corp" />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm text-white bg-amber-600 rounded-lg hover:bg-amber-700 font-medium">Save Item</button>
          </div>
        </form>
      </Modal>

      {/* Stock Adjustment Modal */}
      <Modal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} title={`Stock ${stockActionType === 'in' ? 'In (Replenish)' : 'Out (Dispatch)'}`} size="sm">
        <form onSubmit={handleStockAdjust} className="space-y-4">
          <p className="text-sm text-gray-600">
            Item: <span className="font-semibold text-gray-900">{selectedItem?.name}</span> (Current: {selectedItem?.availableStock} units)
          </p>
          <FormInput
            label={`Quantity to ${stockActionType === 'in' ? 'Add' : 'Deduct'}`}
            type="number"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
            required
          />
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={() => setIsStockModalOpen(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
            <button
              type="submit"
              className={`px-5 py-2 text-sm text-white rounded-lg font-medium ${
                stockActionType === 'in' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              Confirm Adjustment
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to remove ${selectedItem?.name}?`}
      />
    </div>
  );
}
