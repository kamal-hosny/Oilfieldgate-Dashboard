import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const XlsxSingleOrders = () => {
  return (
    <div>
    <Button
        className="bg-green-600 flex items-center gap-2 py-2"
    >
        <InsertDriveFileIcon />
        Export to XLSX
    </Button>
</div>
  )
}

export default XlsxSingleOrders