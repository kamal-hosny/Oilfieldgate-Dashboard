import React from 'react';

const CustomerData = () => {
  const contactData = {
    _id: "1",
    contactName: "John Doe",
    companyName: "Tech Solutions Ltd.",
    email: "john.doe@techsolutions.com",
    phoneNumber: "+971 55 123 4567",
    country: "UAE",
  };

  return (
    <div className="flex">
      <div className="w-full max-w-md">
        <div className="overflow-hidden border border-gray-300 rounded-sm">
          <table className="min-w-full divide-y divide-gray-300">
            <tbody className="divide-y divide-gray-300 text-gray-900">
              <tr className="hover:bg-gray-100">
              </tr>
              <tr className="hover:bg-gray-100">
                <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                  Contact Name
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contactData.contactName}
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                  Company Name
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contactData.companyName}
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                  Email
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contactData.email}
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                  Phone Number
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contactData.phoneNumber}
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                  Country
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {contactData.country}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerData;
