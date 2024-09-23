import React, { memo } from 'react';
import { Button } from '@material-tailwind/react';
import PersonIcon from '@mui/icons-material/Person';
import XlsxOrders from './Xlsx/XlsxOrders';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';

const InformationHeader = ({ userData, allUserOrders }) => {
const dispatch = useDispatch()


  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-colorText1 text-sm">
          {userData?.contactName || ''} {userData?.lastName || ''}
        </span>
        <span className="text-colorText2 text-xs">
          {userData?.companyName || ''}
        </span>
      </div>
      <span className="text-colorText1 flex gap-2 font-bold">
      <XlsxOrders userData={userData} allUserOrders={allUserOrders} />
        <Button onClick={() => dispatch(openModal('UserDetails'))} className="bg-mainColor hover:bg-mainColorHover rounded-lg p-2">
          <PersonIcon  />
        </Button>
      </span>
    </div>
  );
};

export default memo(InformationHeader);
