import React from 'react';
import { useSelector } from 'react-redux';

const CustomerData = () => {
  const data = useSelector(state => state?.allUsers?.record?.data);
  console.log(data);

  // Check if data exists and show custom messages if data is missing
  const contactData = data ? {
    contactName: data.contactName && !data.contactName.startsWith('req.body') ? data.contactName : "Name not available",
    lastName: data.lastName && !data.lastName.startsWith('req.body') && data.lastName ,
    companyName: data.companyName && !data.companyName.startsWith('req.body') ? data.companyName : "Company name not available",
    email: data.email && !data.email.startsWith('req.body') ? data.email : "Email not available",
    phoneNumber: data.phoneNumber && !data.phoneNumber.startsWith('req.body') ? data.phoneNumber : "Phone number not available",
    country: data.country && !data.country.startsWith('req.body') ? data.country : "Country not available",
  } : null;

  return (
    <div className="flex w-full">
      <div className="w-full max-w-md">
        {contactData ? (
          <div className="overflow-hidden border border-gray-300 rounded-sm">
            <table className="min-w-full divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-300 text-gray-900">
                <tr className="hover:bg-gray-100">
                  <th className="px-6 py-4 text-start text-xs font-medium bg-gray-100 text-gray-700">
                    Contact Name
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {contactData.contactName} {contactData.lastName}
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
        ) : (
          <div className="p-4 text-center text-red-600">
            No data available at the moment
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerData;
