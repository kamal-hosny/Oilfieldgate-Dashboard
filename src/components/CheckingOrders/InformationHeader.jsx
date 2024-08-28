import { Button } from '@material-tailwind/react';
import React from 'react';


const InformationHeader = () => {
  return (
    <div className="Information-header p-4 bg-[#eceff1] text-white flex justify-between items-center">
        <span className='font-bold text-colorText1'>
            Kamal hosny
        </span>
      <span className="text-colorText1 font-bold">
        <Button className="bg-mainColor hover:bg-mainColorHover rounded-sm p-3 py-4">Show user details</Button>
      </span>

    </div>
  );
};

export default InformationHeader;