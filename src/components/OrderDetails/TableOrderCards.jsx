import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../../store/cloneOrderProduct/cloneOrderProductSlice';
import formatCurrency from '../../util/formatCurrency';
import { openModal } from '../../store/modal/modalSlice';
import { toast } from 'react-toastify';

const TABLE_HEAD = [
  "Image",
  "Name",
  "Quantity",
  "Price",
  "Total Price",
  "",
];

const TableOrderCards = ({ orderData }) => {


  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, newQuantity }));
    }
  };

  const handleIncreaseQuantity = (id, currentQuantity, instock) => {
    if (currentQuantity < instock) {
      handleUpdateQuantity(id, currentQuantity + 1);
    }else{
      toast.warn("The requested quantity exceeds available stock!");

    }
  };

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(id, currentQuantity - 1);
    }
  };

  // Check if orderData is a valid array
  if (!Array.isArray(orderData) || orderData.length === 0) {
    return (
      <div className='grid'>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className='grid'>
      <table className="w-full text-center h-fit overflow-hidden border-colorBorder border-2">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b whitespace-nowrap border-blue-gray-100 bg-blue-gray-50 p-3"
              >
                <span className="font-medium leading-none opacity-70 w-20">
                  {head}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="!text-sm">
          {orderData.map((x) => (
            <tr key={x._id}>
              <td className="px-3 py-2 border-b border-blue-gray-50 flex justify-center h-full">
                <img
                  src={x.image || "https://via.placeholder.com/50"}
                  alt={x.product_name || "Product Image"}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {x?.product_name || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border border-colorBorder h-8 rounded-l bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleDecreaseQuantity(x._id, x.Quantity)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={x?.Quantity}
                    className=' border-colorBorder border text-center h-8 w-14 focus:outline-mainColorHover'
                    readOnly
                  />
                  <button
                    className="px-2 py-1 border border-colorBorder h-8 rounded-r bg-gray-100 hover:bg-gray-200"
                    onClick={() => handleIncreaseQuantity(x._id, x.Quantity, x.instock)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {formatCurrency(x?.price) || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {formatCurrency(x?.price * x?.Quantity) || "_"}
              </td>
              <td className="px-3 py-2 h-full space-x-4">
                
                <button
                  className="text-green-600 hover:text-green-900"
                  onClick={() => window.open(`https://ogwebsite-ea55a.web.app/productDetails/${x._id}`, '_blank')}
                >
                  View
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => dispatch(openModal({ name: "RemoveOrderProduct", product: x._id }))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrderCards;
