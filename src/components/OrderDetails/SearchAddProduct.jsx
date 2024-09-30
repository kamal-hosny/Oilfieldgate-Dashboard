// React
import React from 'react'

const SearchAddProduct = ({term, setTerm}) => {
  return (
    <input value={term} onChange={(e)=>{setTerm(e.target.value)}} placeholder='Search' className="p-2 px-3 rounded-lg border-colorText2 bg-mainColorBackground focus:outline-none focus:border-mainColor text-colorText1 border w-full" type="search" name="" id="" />
  )
}

export default SearchAddProduct
