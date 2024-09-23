import React, { memo } from 'react';

const DataTime = ({ time }) => {
  const formattedDate = new Date(time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  console.log(formattedDate); // To see the formatted date in the console

  return (
    <div className='dataTime flex justify-center'>
      <span className='bg-[rgba(0,0,0,0.77)] text-xs p-3 rounded-lg text-colorText2'>
        {formattedDate}
      </span>
    </div>
  );
};

export default memo(DataTime);
