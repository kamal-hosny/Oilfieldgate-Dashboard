import React from 'react'
import { Outlet } from 'react-router-dom'
import VerticalNavbar from '../components/VerticalNavbar'
import HorizontalNavbar from '../components/HorizontalNavbar'

const Layout = () => {
  return (
    <>
    <div className="flex h-full  w-full'">
    <VerticalNavbar />
    <div className='w-full '>
      <HorizontalNavbar />
    <div className='p-4'>
    <Outlet />
    </div>
    </div>
    </div>
    
    </>
  )
}

export default Layout