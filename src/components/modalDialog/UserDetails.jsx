import React from 'react'
import CustomerData from '../CheckingOrders/CustomerData'

const UserDetails = () => {
  return (
    <div
    className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[16] justify-center items-center rounded-lg w-96 bg-sectionColor border-2 `}
>
    <div className=" modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
    Customer Details 
    </div>
    <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
    <CustomerData />
    </div>
</div>
  )
}

export default UserDetails