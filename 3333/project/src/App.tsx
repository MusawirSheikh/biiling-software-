import React, { useState, useEffect } from 'react';
import { Calculator, Receipt, Save, Printer, Plus, Trash2 } from 'lucide-react';

interface InvoiceItem {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

function App() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [prevBalance, setPrevBalance] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: '',
        qty: 0,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'qty' || field === 'unitPrice') {
            updatedItem.total = Number(updatedItem.qty) * Number(updatedItem.unitPrice);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = (subtotal * taxPercentage) / 100;
  const grandTotal = subtotal + taxAmount + prevBalance;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (items.length === 0) {
      addItem();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
            <div className="mt-2">
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              />
            </div>
          </div>
          <div className="text-right">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Unit Price</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full border-gray-200 rounded"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                      className="w-20 text-right border-gray-200 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                      className="w-24 text-right border-gray-200 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    {item.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Item
          </button>
        </div>

        <div className="flex justify-end">
          <div className="w-80">
            <div className="flex justify-between mb-2">
              <span>Previous Balance:</span>
              <input
                type="number"
                value={prevBalance}
                onChange={(e) => setPrevBalance(Number(e.target.value))}
                className="w-32 text-right border-gray-200 rounded"
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax Percentage:</span>
              <input
                type="number"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(Number(e.target.value))}
                className="w-32 text-right border-gray-200 rounded"
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax Amount:</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Printer className="w-4 h-4 mr-2" /> Print Invoice
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" /> Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;