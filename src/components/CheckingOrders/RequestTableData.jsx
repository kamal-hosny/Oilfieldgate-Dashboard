import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

// Define a single table row
const TABLE_ROW = {
  rfq: "RFQ-001",
  date: "25/08/2024",
  customer: "Customer A",
  status: "Quoted",
  ogInvoice: "INV-001",
  customerPO: "PO-001",
  paymentDate: "",
  paymentAED: "",
  paymentReference: "",
  shippingStatus: "Pending Material",
  dn: "",
  comments: "",
};

const RequestTableData = () => {
  const dispatch = useDispatch();
  return (
    <Card className="h-full w-full overflow-x-auto">
      <table className="w-full  overflow-hidden text-left">
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
          <tr>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.rfq}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.date}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.customer}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.status}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.ogInvoice}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.customerPO}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.paymentDate}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.paymentAED}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.paymentReference}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.shippingStatus}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.dn}
            </td>
            <td className="px-3 py-2 border-b border-blue-gray-50">
              {TABLE_ROW.comments}
            </td>
            <td className="px-3 py-2 flex items-center gap-3 justify-center h-full">
              <button className="text-blue-600 hover:text-blue-900 ml-2 cursor-pointer">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 ">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default RequestTableData;
