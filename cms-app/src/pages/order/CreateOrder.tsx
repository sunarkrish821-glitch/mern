import { useState } from 'react';

export default function CreateOrder() {
    const [items, setItems] = useState([{ product: '', unit: 1, rate: 0, total: 0 }]);
    const [customer, setCustomer] = useState('');

    const addRow = () => {
        setItems([...items, { product: '', unit: 1, rate: 0, total: 0 }]);
    };

    const removeRow = (index: number) => {
        if(items.length === 1) return // prevent removing last row
        const newItems = items.filter((_, i) => i !== index)
        setItems(newItems)
    }

    const updateItem = (index: number, field: string, value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        if (field === 'unit' || field === 'rate') {
            newItems[index].total = newItems[index].unit * newItems[index].rate;
        }
        setItems(newItems);
    };

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = 0;
    const tax = subtotal * 0.1;
    const total = subtotal - discount + tax;

    return (
        <div className="flex h-screen">
            <div className="w-3/4 p-4 bg-white border-r">
                <h2 className="text-2xl font-bold mb-4">Create Order</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">Unit</th>
                            <th className="border border-gray-300 p-2">Rate</th>
                            <th className="border border-gray-300 p-2">Total</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="text"
                                        value={item.product}
                                        onChange={(e) => updateItem(index, 'product', e.target.value)}
                                        className="w-full p-1 border rounded"
                                        placeholder="Search product"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        value={item.unit}
                                        onChange={(e) => updateItem(index, 'unit', parseInt(e.target.value))}
                                        className="w-full p-1 border rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                     <input
                                      type="number"
                                      value={item.rate || ''}
                                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                                      className="w-full p-1 border rounded"
                                      placeholder="0"
                                   />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {item.total.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => removeRow(index)}
                                        disabled={items.length === 1}
                                        className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded text-sm">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="border border-gray-300 p-2 text-right font-bold">Subtotal:</td>
                            <td className="border border-gray-300 p-2">{subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border border-gray-300 p-2 text-right font-bold">Discount:</td>
                            <td className="border border-gray-300 p-2">{discount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border border-gray-300 p-2 text-right font-bold">Tax (10%):</td>
                            <td className="border border-gray-300 p-2">{tax.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td colSpan={4} className="border border-gray-300 p-2 text-right font-bold">Total:</td>
                            <td className="border border-gray-300 p-2 font-bold">{total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                <button onClick={addRow} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    + Add More
                </button>
            </div>

            <div className="w-1/4 p-4 bg-gray-50">
                <h3 className="text-lg font-bold mb-4">Customer</h3>
                <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Search customer"
                />
                <button className="w-full mb-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
                    Place Order
                </button>
                <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
}