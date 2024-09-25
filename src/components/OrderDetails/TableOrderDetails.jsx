import React, { memo } from 'react';
import { openModal } from '../../store/modal/modalSlice';
import { useDispatch } from 'react-redux';
import formatDate from '../../util/formatDate';

// Define table headers
const TABLE_HEAD = [
  "RFQ #",
  "RFQ Date",
  "Customer",
  "Status",
  "OG Invoice#",
  "Customer PO#",
  "Payment Date",
  "Payment AED",
  "Payment Reference",
  "Shipping status",
  "DN#",
  "Comments",
  "",
];

const TableOrderDetails = memo(({ orderData }) => {

  const dispatch = useDispatch()

  return (
    <div className='grid text-center'>

      <table className="w-full overflow-hidden text-lef border-colorBorder border-2">
        <thead className='font-bold'>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-3"
              >
                <span className="font-medium  leading-none opacity-70 w-20 whitespace-nowrap">
                  {head}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="!text-sm">
          {orderData && (
            <tr key={orderData._id}>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                { orderData._id || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {formatDate(orderData["RFQ Date"]) || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData.Customer || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData.Status || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["OG Invoice"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["Customer PO"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["Payment Date"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["Payment AED"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["Payment Reference"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData["Shipping status"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData.DN || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {orderData.Comments || "_"}
              </td>
              <td className="px-3 whitespace-nowrap py-2 flex items-center gap-3 justify-center h-full">
                <button
                  className="text-green-600 hover:text-green-900 ml-2 cursor-pointer"
                  onClick={() => dispatch(openModal({ name: "EditOrder", product: orderData}))}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => dispatch(openModal({ name: "DeleteOrder", product: orderData }))}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
});

export default TableOrderDetails;
