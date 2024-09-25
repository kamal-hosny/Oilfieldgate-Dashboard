import React from 'react';
import { useNavigate } from 'react-router-dom';

import Information from '../components/CheckingOrders/Information';
import ArrowBack from '../components/UI/ArrowBack';
const CoMobileSize = () => {
    const navigate = useNavigate();


    return (
        <div className='flex flex-col gap-4'>
            <ArrowBack />
            <div className='grid'>
            <Information />
            </div>
        </div>
    );
};

export default CoMobileSize;
