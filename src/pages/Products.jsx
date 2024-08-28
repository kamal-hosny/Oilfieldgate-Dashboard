import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../components/products/DataTable'
import { Pagination } from '../components/products/Pagination'
import { DrawerDefault } from '../components/products/DrawerDefault'
import SearchProducts from '../components/products/SearchProducts'
import usePrevState from '../context/prevState';

const Products = () => {
  const [term, setTerm] = useState("");
  const prevTerm = usePrevState(term);

  // useEffect(() => {
  //   if (term === "") {
  //     fetchProducts();
  //   } else if (prevTerm !== term) {
  //     const debounceSearch = setTimeout(fetchProducts, 1000);
  //     setPageNumber(1);
  //     return () => {
  //       clearTimeout(debounceSearch);
  //     };
  //   }
  // }, [term, prevTerm])

  return (
    <div className='flex flex-col gap-4 '>
      
      <div className="title text-lg font-semibold text-colorText1">
      Products
      </div>
      <div className='flex flex-col gap-4'>
      <div className='flex items-end flex-col justify-end w-full gap-4'>
        <Link to="create">
        <button className='bg-mainColor hover:bg-mainColorHover transition p-2 rounded-md text-white'>Add product</button>
        </Link>
        <div className='flex items-center justify-center'><SearchProducts term={term} setTerm={setTerm} />
        <DrawerDefault /></div>
        </div>
      </div>
      <Pagination />
    <DataTable />
    </div>
  )
}

export default Products