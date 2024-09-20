import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Information from '../components/CheckingOrders/Information';
const CoMobileSize = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className='flex flex-col gap-4'>
            <div 
                className='bg-sectionColor text-colorText1 border-2 hover:bg-sectionColorHover transition-all border-colorBorder w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'
                onClick={handleBackClick}
            >
                <ArrowBackIcon />
            </div>
            <div>
            <Information />
            </div>
        </div>
    );
};

export default CoMobileSize;
