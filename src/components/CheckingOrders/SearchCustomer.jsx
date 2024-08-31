import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@material-tailwind/react';

const SearchCustomer = () => {
  return (
    <div className='flex items-center pb-4'>
        <input type="search" name="" id="" className="border-colorBorder rounded-s-md border-2 p-2 w-full focus:outline-mainColorHover" />
        <Button className='p-2 rounded-sm rounded-e-md'>
        <SearchIcon />
        </Button>
    </div>
  )
}

export default SearchCustomer