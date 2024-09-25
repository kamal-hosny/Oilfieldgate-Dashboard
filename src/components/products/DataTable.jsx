import React, { useState, useEffect } from 'react';
import { openModal } from '../../store/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DataTable = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Assuming productData.records.data is your API response
  const { records, loading, error } = productData;

  // Clean data and transform API response to match your initialProductData structure
  const formatProductData = (apiData) => {

    return apiData?.data?.map((item) => ({
      _id: item?._id,
      HNSCode: item.data?.HNS_code ? item.data.HNS_code.replace(/'/g, '') : '-', // Check if HNS_code exists
      productName: item.data?.product_name ? item.data.product_name.replace(/'/g, '') : '-', // Check if product_name exists
      price: item.data?.price || '-', // Fallback to '-' if price is undefined
      currency: item.data?.Currency ? item.data.Currency.replace(/'/g, '') : '-', // Check if Currency exists
      materialRefNo: item.data?.material_Category ? item.data.material_Category.replace(/'/g, '') : '-', // Check if material_Category exists
      dimension: item.data?.Dimension ? item.data.Dimension.replace(/'/g, '') : '-', // Check if Dimension exists
      unitOfMeasurement: item.data?.Unit_of_Measurement ? item.data.Unit_of_Measurement.replace(/'/g, '') : '-', // Check if Unit_of_Measurement exists
      condition: item.data?.condition ? item.data.condition.replace(/'/g, '') : '-', // Check if condition exists
      categories: item.data?.Category ? [item.data.Category] : ['-'], // Check if Category exists
      supplyAvailability: item.data?.instock || false, // Default to false if instock is undefined
      images: item.imgs?.map((img) => img.url) || [], // Ensure image URLs are correct
    }));
  };
  

  // Use formatted data
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (records && records.data) {
      const formattedData = formatProductData(records.data);
      setData(formattedData);
    }
  }, [records]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col w-full relative">
      <div className="overflow-x-auto absolute w-full z-2">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-colorText2 rounded-sm">
            <table className="min-w-full divide-y divide-colorText2 text-center">
              <thead className="text-colorText2 text-xs font-medium">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start">HNSCode</th>
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
                {Data?.map((product) => (
                  <tr key={product._id} className="hover:bg-sectionColorHover">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.HNSCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{product.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.materialRefNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.dimension}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.unitOfMeasurement}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.condition}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.categories.join(", ")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{product.supplyAvailability}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.images.length > 0 && (
                        <img
                          src={product.images[0] || "https://via.placeholder.com/50"}
                          alt={`product-${product._id}`}
                          className="w-10 h-10 object-cover inline-block mr-2"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate("/products/edit")}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(openModal({name: "DeleteProduct", product: product}))}
                        className="text-red-600 hover:text-red-900 "
                      >
                        Delete
                      </button>
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
};

export default DataTable;
