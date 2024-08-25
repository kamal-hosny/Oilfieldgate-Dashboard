import React from 'react'
import { StepperWithContent } from './Stepper'
import CustomerData from './CustomerData'
import RequestTableData from './RequestTableData'

const InformationAbouTheRequest = () => {
  return (
    <div className='details flex-[4] p-4 bg-sectionColor h-screen overflow-x-scroll'>
        
        <div className='flex items-start gap-4 flex-col-reverse lg:flex-row flex-1'>
        <CustomerData />
        <span className='flex-1 '>
        <StepperWithContent />
        </span>
        </div>
        <div className='mt-4'>
        <RequestTableData />
        </div>

    </div>
  )
}

export default InformationAbouTheRequest