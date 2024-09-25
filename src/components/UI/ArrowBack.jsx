import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';



const ArrowBack = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1); 
};

  return (
<div 
                className='bg-sectionColor text-colorText1 border-2 hover:bg-sectionColorHover transition-all border-colorBorder w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'
                onClick={handleBackClick}
            >
                <ArrowBackIcon />
            </div>
  )
}

export default ArrowBack