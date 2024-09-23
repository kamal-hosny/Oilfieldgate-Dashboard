import React, { memo } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@material-tailwind/react';

const XlsxOrders = ({ userData, allUserOrders }) => {
  const handleExport = () => {
    console.log('userData:', userData );
    console.log('allUserOrders:', allUserOrders );
  };

  return (
    <Button
      onClick={handleExport}
      className="bg-green-600 rounded-md flex items-center gap-2 p-2 w-fit"
    >
      <InsertDriveFileIcon />
    </Button>
  );
};

export default memo(XlsxOrders); 
