import React, { memo } from 'react';
import { Button } from '@material-tailwind/react';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal/modalSlice';
import XlsxOneOrder from './xlsx/XlsxOneOrder';
import { Tooltip as ReactTooltip } from "react-tooltip";

const InformationOneOrderHeader = ({orderData}) => {
  const dispatch = useDispatch()


  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-bold text-colorText1 text-sm">
          kamal
        </span>
        <span className="text-colorText2 text-xs">
          ixon
        </span>
      </div>
      <span className="text-colorText1 flex gap-2 font-bold">
        <XlsxOneOrder orderData={orderData} />
        <Button       data-tooltip-id="User-Details"
      data-tooltip-content="User Details" onClick={() => dispatch(openModal('UserDetails'))} className="bg-mainColor hover:bg-mainColorHover rounded-lg p-2">
          <PersonIcon />
        </Button>
        <ReactTooltip
      id="User-Details"
      place="top"
      effect="solid"
    />
      </span>
    </div>
  );
};

export default memo(InformationOneOrderHeader);
