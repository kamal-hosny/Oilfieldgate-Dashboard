import { Button } from '@material-tailwind/react'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { openModal } from '../../store/modal/modalSlice';
import { useDispatch } from 'react-redux';
const DataSettings = () => {
  const dispatch = useDispatch();
  return (

        <span className="flex gap-4 justify-end">
        <Button className="bg-yellow-800 rounded-sm p-2 flex items-center"><span><EditIcon/></span> <span>Edit</span></Button>
        <Button onClick={()=>{dispatch(openModal("DeleteRequest")); }} className="bg-red-800 rounded-sm p-2 flex items-center">
          <span><DeleteIcon/></span> <span>Delete</span></Button>
      </span>

  )
}

export default DataSettings