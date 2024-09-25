import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExcelJS from 'exceljs';
import { Button } from "@material-tailwind/react";
import { saveAs } from 'file-saver';

const XlsxProducts = ({ productData }) => {
    const data = productData?.records?.data?.data;

    // Cache for image URLs to base64
    const imageCache = {};

    // Function to convert image URL to base64 with caching
    const imageUrlToBase64 = async (url) => {
        if (imageCache[url]) {
            return imageCache[url];
        }
        const response = await fetch(url);
        const blob = await response.blob();
        const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        imageCache[url] = base64;
        return base64;
    };

    // Function to export data to Excel
    const exportToExcel = async () => {
        if (data && data.length > 0) {
            const fileName = 'products_data.xlsx';
            const currentTime = new Date().toLocaleString();

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Products');

            worksheet.addRow([`File Name: ${fileName}`, `Extracted at: ${currentTime}`]);
            const titleRow = worksheet.getRow(1);
            titleRow.font = { bold: true, size: 10, color: { argb: "0c0c0c" } };
            titleRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f3f3f3' } };
            titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

            const headers = [
                'Model Number', 'HNS Code', 'Product Name', 'Price', 'Currency',
                'Material Ref No', 'Dimension', 'UOM', 'Condition',
                'Categories', 'Supply Availability', 'Brand', 'Weight', 'Size',
                'Description', 'Document', 'Main Image', 'Additional Images'
            ];

            worksheet.addRow(headers);
            const headerRow = worksheet.getRow(2);
            headerRow.font = { bold: true, size: 11, color: { argb: "ffffff" } };
            headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '284d56' } };
            headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

            worksheet.columns = [
                { width: 15 }, { width: 15 }, { width: 20 }, { width: 10 }, { width: 10 },
                { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 20 },
                { width: 15 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 20 },
                { width: 20 }, { width: 40 }, { width: 40 }
            ];

            for (const item of data) {
                const rowData = [
                    item.data.model_number || '',
                    item.data.HNS_code || '',
                    item.data.product_name || '',
                    item.data.price || '',
                    item.data.Currency || 'AED',
                    item.data.material_Category || 'N/A',
                    item.data.Dimension || 'N/A',
                    item.data.Unit_of_Measurement || 'N/A',
                    item.data.condition || 'N/A',
                    item.data.Category || 'Uncategorized',
                    item.data.instock ? 'In Stock' : 'Out of Stock',
                    item.data.brand || 'N/A',
                    item.data.weight || 'N/A',
                    item.data.size || 'N/A',
                    item.data.Description || 'N/A',
                    item.data.document || 'N/A',
                ];

                const row = worksheet.addRow(rowData);
                row.alignment = { horizontal: 'center', vertical: 'middle' }; // Center-align all rows

                // Handle image conversion in parallel for better performance
                const imagePromises = [];

                if (item.mainImg?.url) {
                    imagePromises.push(imageUrlToBase64(item.mainImg.url).then(base64Image => {
                        const imageId = workbook.addImage({
                            base64: base64Image.replace(/^data:image\/(png|jpeg);base64,/, ''),
                            extension: 'jpeg',
                        });
                        worksheet.addImage(imageId, {
                            tl: { col: 16, row: row.number - 1 },
                            ext: { width: 100, height: 100 }
                        });
                    }).catch(error => console.error('Error converting main image:', error)));
                }

                if (item.imgs?.length > 0) {
                    item.imgs.forEach((img, index) => {
                        imagePromises.push(imageUrlToBase64(img.url).then(base64Image => {
                            const imageId = workbook.addImage({
                                base64: base64Image.replace(/^data:image\/(png|jpeg);base64,/, ''),
                                extension: 'jpeg',
                            });
                            worksheet.addImage(imageId, {
                                tl: { col: 17 + index, row: row.number - 1 },
                                ext: { width: 100, height: 100 },
                            });
                        }).catch(error => console.error(`Error converting image ${index + 1}:`, error)));
                    });
                }

                await Promise.all(imagePromises); // Wait for all images to be processed
            }

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, fileName);
        } else {
            console.log("No data available to export");
        }
    };

    return (
        <div>
            <Button
                className="bg-green-600 flex items-center gap-2 py-2"
                onClick={exportToExcel}
            >
                <InsertDriveFileIcon />
                Export to XLSX
            </Button>
        </div>
    );
};

export default XlsxProducts;
