import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";

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

const RequestTableData = ({ allUserOrders }) => {
  const dispatch = useDispatch();

console.log(allUserOrders);

  return (
    <Card className="h-full w-full overflow-x-auto">
      <table className="w-full overflow-hidden text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium leading-none opacity-70 w-20"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="!text-sm">
          {allUserOrders?.map((order) => (
            <tr key={order._id}>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["RFQ Date"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order.date || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order.customer || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order.Status || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["OG Invoice"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["Customer PO"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["Payment Date"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["Payment AED"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["Payment Reference"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order["Shipping status"] || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order.DN || "_"}
              </td>
              <td className="px-3 py-2 border-b border-blue-gray-50">
                {order.Comments || "_"}
              </td>
              <td className="px-3 py-2 flex items-center gap-3 justify-center h-full">
                <button
                  className="text-green-600 hover:text-green-900 ml-2 cursor-pointer"
                >
                  Details
                </button>
                <button
                  className="text-blue-600 hover:text-blue-900 ml-2 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => dispatch(openModal({name: "DeleteOrder", product: order}))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default RequestTableData;
