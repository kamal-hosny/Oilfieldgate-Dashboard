import React, { useState } from 'react';

const initialProductData = [
    {
      _id: "1",
      productName: "Pilot Operated Pressure Relief Valve",
      price: 22020.00,
      currency: "AED",
      materialRefNo: "Masstok-I-03207",
      dimension: "3\"-600# x 4\"-150#",
      unitOfMeasurement: "Nos",
      condition: "Unused",
      categories: ["Instrumentation", "Valves"],
      supplyAvailability: 6,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    },
    {
      _id: "2",
      productName: "Hydraulic Check Valve",
      price: 18050.00,
      currency: "AED",
      materialRefNo: "Masstok-I-04567",
      dimension: "2\"-300#",
      unitOfMeasurement: "Nos",
      condition: "Unused",
      categories: ["Hydraulics", "Valves"],
      supplyAvailability: 10,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    },
    {
      _id: "3",
      productName: "Pressure Reducing Valve",
      price: 25000.00,
      currency: "AED",
      materialRefNo: "Masstok-I-08901",
      dimension: "4\"-150#",
      unitOfMeasurement: "Nos",
      condition: "Used",
      categories: ["Pressure Control", "Valves"],
      supplyAvailability: 4,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    },
    {
      _id: "4",
      productName: "Solenoid Valve",
      price: 15000.00,
      currency: "AED",
      materialRefNo: "Masstok-I-05432",
      dimension: "1\"-150#",
      unitOfMeasurement: "Nos",
      condition: "Unused",
      categories: ["Electrical", "Valves"],
      supplyAvailability: 12,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    },
    {
      _id: "5",
      productName: "Ball Valve",
      price: 8000.00,
      currency: "AED",
      materialRefNo: "Masstok-I-06543",
      dimension: "2\"-150#",
      unitOfMeasurement: "Nos",
      condition: "Unused",
      categories: ["Mechanical", "Valves"],
      supplyAvailability: 8,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    },
    {
      _id: "6",
      productName: "Butterfly Valve",
      price: 12000.00,
      currency: "AED",
      materialRefNo: "Masstok-I-07654",
      dimension: "3\"-150#",
      unitOfMeasurement: "Nos",
      condition: "Used",
      categories: ["Mechanical", "Valves"],
      supplyAvailability: 5,
      images: ["https://storage.googleapis.com/masstok/322154/ezgif.com-gif-maker-6.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"]
    }
  ];

const DataTable = () => {
  const [productData, setProductData] = useState(initialProductData);

  return (
    <div className="flex flex-col w-full relative">
      <div className="overflow-x-auto absolute w-full z-2">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-colorText2 rounded-sm">
            <table className="min-w-full divide-y divide-colorText2">
              <thead className="text-colorText2 text-xs font-medium">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start">ID</th>
                  <th scope="col" className="px-6 py-3 text-start">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-start">Price</th>
                  <th scope="col" className="px-6 py-3 text-start">Currency</th>
                  <th scope="col" className="px-6 py-3 text-start">Material Ref No</th>
                  <th scope="col" className="px-6 py-3 text-start">Dimension</th>
                  <th scope="col" className="px-6 py-3 text-start">Unit</th>
                  <th scope="col" className="px-6 py-3 text-start">Condition</th>
                  <th scope="col" className="px-6 py-3 text-start">Categories</th>
                  <th scope="col" className="px-6 py-3 text-start">Availability</th>
                  <th scope="col" className="px-6 py-3 text-start">Image</th>
                  <th scope="col" className="px-6 py-3 text-start">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-colorText2 text-colorText1">
                {productData.map((product, index) => (
                  <tr key={product._id} className="hover:bg-sectionColorHover">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.materialRefNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.dimension}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.unitOfMeasurement}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.condition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.categories.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.supplyAvailability}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <img src={product.images[0]} alt={`product-${product._id}`} className="w-10 h-10 object-cover inline-block mr-2" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-500 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
