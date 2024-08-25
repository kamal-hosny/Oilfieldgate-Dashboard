import React from 'react'
import { Card, Typography } from "@material-tailwind/react";

// Define table headers
const TABLE_HEAD = [
  "RFQ #", "RFQ Date", "Customer", "Status", 
  "OG Invoice#", "Customer PO#", "Payment Date", 
  "Payment AED", "Payment Reference", "Shipping status", 
  "DN#", "Comments", ""
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
  comments: ""
};

const RequestTableData = () => {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.rfq}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.date}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.customer}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.status}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.ogInvoice}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.customerPO}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.paymentDate}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.paymentAED}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.paymentReference}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.shippingStatus}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.dn}</td>
            <td className="p-4 border-b border-blue-gray-50">{TABLE_ROW.comments}</td>
            <td className="p-4 border-b border-blue-gray-50 flex gap-4">
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Edit
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Delete
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

export default RequestTableData;
