import React from "react";
import { Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import formatDate from "../../util/formatDate";

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
  "PO Status",
  "",
];

const RequestTableData = ({ allUserOrders }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(allUserOrders);

  return (
    <table className="w-full overflow-hidden text-center">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 whitespace-nowrap"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="!text-sm">
        {allUserOrders?.slice().reverse().map((order) => (
          <tr key={order._id}>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order._id || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {formatDate(order["RFQ Date"]) || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order.Customer || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order.Status || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["OG Invoice#"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["Customer PO#"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["Payment Date"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["Payment AED"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["Payment Reference"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["Shipping status"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order["DN#"] || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order.Comments || "_"}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50 whitespace-nowrap">
              {order?.done ? "Confirmed" : "Not Confirmed"}
            </td>
            <td className="px-3 py-2 flex items-center gap-3 justify-center">
              <button
                onClick={() => navigate(`/checking-orders/order-details/${order._id}`)}
                className="text-blue-600 hover:text-blue-900 cursor-pointer"
              >
                Details
              </button>
              <button
                className="text-red-600 hover:text-red-900"
                onClick={() => dispatch(openModal({ name: "DeleteOrder", product: order }))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestTableData;
