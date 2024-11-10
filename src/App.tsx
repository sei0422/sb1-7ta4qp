import React, { useState } from 'react';
import { Users, Search, Plus } from 'lucide-react';
import type { Customer } from './types/customer';
import { CustomerTable } from './components/CustomerTable';
import { CustomerForm } from './components/CustomerForm';

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: '山田太郎',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    status: 'active',
    company: '株式会社山田',
    lastContact: '2024-03-15',
    notes: '定期的な連絡を希望',
  },
  {
    id: '2',
    name: '鈴木花子',
    email: 'suzuki@example.com',
    phone: '090-8765-4321',
    status: 'inactive',
    company: '鈴木商事',
    lastContact: '2024-03-10',
    notes: '新規案件について検討中',
  },
];

function App() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customer = {
      ...newCustomer,
      id: Date.now().toString(),
    };
    setCustomers([...customers, customer]);
    setShowForm(false);
  };

  const handleEditCustomer = (updatedCustomer: Omit<Customer, 'id'>) => {
    if (editingCustomer) {
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id ? { ...updatedCustomer, id: c.id } : c
        )
      );
      setEditingCustomer(undefined);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('本当にこの顧客を削除しますか？')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">顧客管理システム</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              新規顧客
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="顧客を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {(showForm || editingCustomer) && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">
                  {editingCustomer ? '顧客情報の編集' : '新規顧客の追加'}
                </h2>
                <CustomerForm
                  customer={editingCustomer}
                  onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingCustomer(undefined);
                  }}
                />
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <CustomerTable
              customers={filteredCustomers}
              onEdit={setEditingCustomer}
              onDelete={handleDeleteCustomer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;