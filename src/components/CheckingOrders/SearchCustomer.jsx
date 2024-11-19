import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@material-tailwind/react';

const SearchCustomer = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className='flex items-center pb-4'>
        <input 
          type="search" 
          placeholder='Search for Customer' 
          className="border-colorBorder rounded-s-md border-2 p-2 w-full focus:outline-mainColorHover text-sm"
          value={searchTerm} 
          onChange={handleSearchChange}
        />
        <Button className='p-2 rounded-sm rounded-e-md'>
          <SearchIcon />
        </Button>
    </div>
  )
}

export default SearchCustomer;
