import React, { memo } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@material-tailwind/react';
import ExcelJS from 'exceljs';
import { useSelector } from 'react-redux';
import { Tooltip as ReactTooltip } from "react-tooltip";


const XlsxOneOrder = ({ orderData }) => {
  const userData = useSelector((state) => state?.allUsers?.record?.data);

  // Cache for image URLs to base64
  const imageCache = {};

  // Function to convert image URL to base64 (with caching)
  const convertImageToBase64 = async (imageUrl) => {
    if (imageCache[imageUrl]) {
      return imageCache[imageUrl];
    }
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        imageCache[imageUrl] = reader.result;
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Function to apply consistent row style
  const applyRowStyle = (row) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '78909C' } },
        left: { style: 'thin', color: { argb: '78909C' } },
        bottom: { style: 'thin', color: { argb: '78909C' } },
        right: { style: 'thin', color: { argb: '78909C' } },
      };
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
      if (colNumber % 2 === 0) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E0F2F1' } };
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'B2DFDB' } };
      }
    });
  };

  // Function to apply header style with #37474F color
  const applyHeaderStyle = (headerRow) => {
    headerRow.font = { bold: true, size: 10, color: { argb: 'FFFFFF' }, name: 'Arial Black' };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '37474F' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  };

  const exportToExcel = async () => {
    if (orderData && orderData.cart && orderData.cart.length > 0 && userData) {
      const fileName = 'order_data.xlsx';
      const currentTime = new Date().toLocaleString();

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Order Data');

      // Add header with file name and timestamp
      worksheet.addRow([`File Name: ${fileName}`, `Extracted at: ${currentTime}`]);
      const titleRow = worksheet.getRow(1);
      titleRow.font = { bold: true, size: 10, color: { argb: 'FFFFFF' }, name: 'Calibri' };
      titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E88E5' } };
      titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

      // Add user data
      const userFields = ['User Email', 'Company Name', 'Name', 'Country', 'Phone Number'];
      const userValues = [
        userData.Email,
        userData.companyName,
        userData.contactName + " " + userData.lastName ,
        userData.country,
        userData.phoneNumber,
      ];

      const userHeaderRow = worksheet.addRow(userFields); // Add user field names as headers
      applyHeaderStyle(userHeaderRow); // Apply the header style with color #37474F
      const userRow = worksheet.addRow(userValues); // Add user values in the next row
      applyRowStyle(userRow); // Apply consistent row style

      worksheet.addRow([]); // Empty row for spacing

      // Add order data fields horizontally
      const orderFields = [
        'Order ID', 'Customer', 'Status', 'OG Invoice', 'Payment AED', 
        'Payment Date', 'Shipping Status',
      ];
      const orderHeaderRow = worksheet.addRow(orderFields); // Add field names as headers
      applyHeaderStyle(orderHeaderRow); // Apply the header style with color #37474F
      const orderValues = [
        orderData._id,
        orderData.Customer,
        orderData.Status,
        orderData['OG Invoice'],
        orderData['Payment AED'],
        new Date(orderData['Payment Date']).toLocaleDateString(),
        orderData['Shipping status'],
      ];
      const valueRow = worksheet.addRow(orderValues); // Add order values in the next row
      applyRowStyle(valueRow); // Apply consistent row style

      worksheet.addRow([]); // Empty row for spacing
      worksheet.addRow(['Products']); // Add products section header

      // Add product headers
      const productHeader = ['Product Name', 'Price', 'Quantity', 'Model Number', 'Condition', 'Brand', 'Image'];
      const headerRow = worksheet.addRow(productHeader);
      applyHeaderStyle(headerRow); // Apply the header style with color #37474F

      // Add cart items (products)
      for (const item of orderData.cart) {
        const row = [
          item.product_name,
          item.price,
          item.Quantity,
          item.model_number,
          item.condition,
          item.brand,
        ];

        if (item.image) {
          // Convert image to base64 if available
          const base64Image = await convertImageToBase64(item.image);
          row.push({ text: 'Image', hyperlink: base64Image });
        } else {
          row.push('No Image');
        }

        const productRow = worksheet.addRow(row);
        applyRowStyle(productRow); // Apply consistent row style
      }

      // Save Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
    <Button
      onClick={exportToExcel}
      className="bg-green-600 rounded-md flex items-center gap-2 p-2 w-fit"
      data-tooltip-id="export-excel-order-details"
      data-tooltip-content="Export Excel"
    >
      <InsertDriveFileIcon />
    </Button>
    <ReactTooltip
      id="export-excel-order-details"
      place="top"
      effect="solid"
    />
  </>

  );
};

export default memo(XlsxOneOrder);
