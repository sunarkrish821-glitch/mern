import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { priceFormat } from "../../lib/provider/utilities/helper";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../config/store";
import { getAllProducts } from "../../lib/provider/reducers/product.reducer";
import type { IProductDetail } from "../products/ProductDetail";

import Select from "react-select"
import { type IUserDetail } from "../../types/auth-type";
import axiosInstance from "../../config/apiClient";
import { submitCart, type ISingleCartItem } from "../../lib/provider/reducers/cart.reducer";


export default function CreateOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const [prodOpts, setProdOpts] = useState<Array<{ label: string; value: number }>>();
  
  const [userLists, setUserLists] = useState<Array<{value: number, label: string}>>();
  const [selectedUser, setSelectedUser] = useState<number>()

  const allProducts = useSelector((rootStore: RootState) => {
    return rootStore?.product?.allProducts as Array<IProductDetail>;
  });

  useEffect(() => {
    let allopts: Array<{ label: string; value: number }> = [];
    if (allProducts) {
      allopts = allProducts.map((singleProd) => {
        return { label: singleProd.title, value: singleProd.id };
      });
      setProdOpts(allopts);
    }
  }, [allProducts]);

  // State for order rows
  const [orderRows, setOrderRows] = useState<Array<ISingleCartItem>>([
    // eslint-disable-next-line react-hooks/purity
    { id: Date.now(), product: "", unit: 1, rate: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  // Handlers
  const handleRowChange = (
    idx: number,
    key: string,
    value: string | number,
  ) => {
    setOrderRows((rows) => {
      return rows.map((row, i) => (i === idx ? { ...row, [key]: value } : row));
    });
  };
  const addRow = () => {
    setOrderRows((rows) => [
      ...rows,
      {
        id: Date.now() + Math.random(),
        product: "",
        unit: 1,
        rate: 0,
      },
    ]);
  };
  const removeRow = (idx: number) => {
    setOrderRows((rows) => rows.filter((_, i) => i !== idx));
  };
  // Calculate totals
  const subtotal = orderRows.reduce(
    (acc, row) => acc + Number(row.unit) * Number(row.rate),
    0,
  );
  const tax = (subtotal - Number(discount)) * 0.13;
  const total = subtotal - Number(discount) + Number(tax);

  // for user list
  const getAllUserList = async (search: string='') => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          q: search,
          limit: 208
        }
      }) as {users: Array<IUserDetail>, skip: number, total: number, limit: number}
      const filteredUsers = response.users.map((user:IUserDetail) => {
        return {value: user.id, label: user.firstName+" "+user.lastName}
      })
      setUserLists(filteredUsers)
    } catch(exception) {
      console.log(exception)
    }
  }

  // first load
  useEffect(() => {
    getAllUserList();
    dispatch(getAllProducts({ limit: 198, skip: 0 }));
  }, [dispatch]);

  return (
    <>
      <div className="flex gap-8 w-full">
        {/* First Column: Bill Section/Table (75%) */}
        <div className="w-3/4">
          <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-gray-200">
            <div className="flex w-full justify-between items-center py-3">
              <h2 className="text-2xl font-bold text-teal-900">
                Create Order (Bill)
              </h2>
              <button
                type="button"
                className="px-2 py-1 text-green-700 hover:text-white hover:bg-green-700 border rounded transition w-100"
                title="Add New Line"
                onClick={addRow}
              >
                + Add
              </button>
            </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto mb-4">
                  <thead>
                    <tr className="bg-gray-100 text-teal-900">
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Unit</th>
                      <th className="p-3 text-left">Rate</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderRows.map((row, idx) => (
                      <tr key={row.id} className="border-b">
                        <td className="p-2">
                          {/* Product Search/Input */}
                          <Select
                            options={prodOpts}
                            onChange={(
                              e: { label: string; value: number } | null,
                            ) => {
                              if (e) {
                                handleRowChange(idx, "product", e.value);
                                const selectedProduct:
                                  | Array<IProductDetail>
                                  | undefined = allProducts?.filter(
                                  (row: IProductDetail) => row.id === e.value,
                                );

                                if (selectedProduct) {
                                    handleRowChange(idx,"rate",Math.max(0, selectedProduct[0].price),);
                                }
                                // remove selected products from options
                                    const newOpts = prodOpts?.filter((opt) => opt.value !== e.value);
                                    setProdOpts(newOpts);
                              }
                            }}
                            className="w-full rounded px-2 py-1 focus:ring-2 focus:ring-teal-400"
                          />
                        </td>
                        <td className="p-2">
                          {/* Unit */}
                          <input
                            type="number"
                            min="1"
                            value={row.unit}
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                            onChange={(e) =>
                              handleRowChange(
                                idx,
                                "unit",
                                Math.max(1, +e.target.value),
                              )
                            }
                          />
                        </td>
                        <td className="p-2">
                          <div className="w-24 text-right font-semibold text-teal-900">
                            {priceFormat(Number(row.rate))}
                          </div>
                        </td>
                        <td className="p-2">
                          {/* Total */}
                          <div className="w-24 text-right font-semibold text-teal-900">
                            {priceFormat(Number(row.unit) * Number(row.rate))}
                          </div>
                        </td>
                        <td className="p-2 flex gap-1">
                          {/* Add new row if last row */}
                          {orderRows.length > 1 && (
                            <button
                              type="button"
                              className="size-7 text-red-600 hover:text-white hover:bg-red-700 border rounded-full transition"
                              title="Remove Row"
                              onClick={() => removeRow(idx)}
                            >
                              X
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right font-semibold p-2">
                        Subtotal
                      </td>
                      <td className="text-right p-2">
                        {priceFormat(subtotal)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right font-semibold p-2">
                        Discount
                      </td>
                      <td className="text-right p-2">
                        <input
                          type="number"
                          min="0"
                          value={discount}
                          className="w-20 border border-gray-300 rounded px-2 py-1 text-right"
                          placeholder="0.00"
                          onChange={(e) => setDiscount(Number(e.target.value))}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right font-semibold p-2">
                        Tax(13%)
                      </td>
                      <td className="text-right p-2">{priceFormat(tax)}</td>
                      <td></td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={3}
                        className="text-right font-bold text-lg p-2"
                      >
                        Total
                      </td>
                      <td className="text-right font-bold text-lg p-2 text-teal-900">
                        {priceFormat(total)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
          </div>
        </div>

        {/* Second Column: Customer & Actions (25%) */}
        <div className="w-1/4">
          <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-teal-100 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold text-teal-900 mb-2">
                Customer
              </h3>
              <Select 
                options={userLists} 
                onChange={(e) => {
                  if(e) {
                    setSelectedUser(e.value as number);
                  }
                }}
              />
            </div>
            <button
              onClick={(e: BaseSyntheticEvent) => {
                     e.preventDefault()
                     
                     // ✅ Check if user is selected
                     if(!selectedUser) {
                         alert("Please select a customer first!")
                         return
                     }
                     
                     // ✅ Check if products are selected
                     const hasEmptyProduct = orderRows.some(row => !row.product)
                     if(hasEmptyProduct) {
                         alert("Please select a product for all rows!")
                         return
                     }
                     
                     dispatch(submitCart({
                         cartItems: orderRows, 
                         selectedUser: selectedUser as number
                     }))
                 }}
              className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-teal-700 transition mb-2"
            >
              Place Order
            </button>
            <button className="w-full py-3 bg-indigo-900 text-white rounded-lg font-semibold text-lg shadow hover:bg-indigo-950 transition">
              Pay with Khalti
            </button>
          </div>
        </div>
      </div>
    </>
  );
}