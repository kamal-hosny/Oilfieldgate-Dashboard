import { Button } from '@material-tailwind/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';


const InformationHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
        <span className='font-bold text-colorText1'>
            Kamal hosny
        </span>
      <span className="text-colorText1 font-bold">
        <Button onClick={()=>{dispatch(openModal("UserDetails"))}} className="bg-mainColor hover:bg-mainColorHover rounded-sm p-3 py-4">Show user details</Button>
      </span>

    </div>
  );
};

export default InformationHeader;