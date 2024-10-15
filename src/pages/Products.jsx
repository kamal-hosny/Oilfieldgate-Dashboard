import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/products/DataTable";
import { Pagination } from "../components/products/Pagination";
import { DrawerDefault } from "../components/products/DrawerDefault";
import SearchProducts from "../components/products/SearchProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/products/act/actGetAllProducts";
import { Button } from "@material-tailwind/react";
import XlsxProducts from "../components/products/XlsxProducts";
import { debounce } from "lodash";
import { AllStateContext } from "../context/AllStateContext";
import withGuard from "../util/withGuard";

const Products = () => {
  const { pageNumber, setPageNumber } = useContext(AllStateContext);
  const dispatch = useDispatch();

  // filters
  const [filterValues, setFilterValues] = useState({
    materialCategory: null,
    category: null,
    brand: null,
    condition: null,
  });

  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(10);

  // Debounced fetching function, stable across renders
  const debouncedFetchProducts = useCallback(
    debounce((pageNumber, term, filterValues, limit) => {
      dispatch(
        getAllProducts({
          materialCategory: filterValues.materialCategory,
          category: filterValues.category,
          brand: filterValues.brand,
          condition: filterValues.condition,
          search: term,
          page: pageNumber,
          limit,
        })
      );
    }, 500),
    [dispatch]
  );

  // Effect to fetch products when dependencies change
  useEffect(() => {
    debouncedFetchProducts(pageNumber, term, filterValues, limit);
  }, [pageNumber, term, filterValues, limit, debouncedFetchProducts]);

  // Reset page number when filters or search term change
  useEffect(() => {
    setPageNumber(1);
  }, [term, filterValues, setPageNumber, limit]);

  // get productData from api 
  const productData = useSelector((state) => state?.allProducts);
  const meta = productData?.records?.meta;

  return (
    <div className="grid h-[1000px]">
    <div className="flex flex-col gap-4">
      <div className="title text-lg font-semibold text-colorText1">Products</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-end flex-col justify-end w-full gap-4">
          <div className="flex gap-2 flex-row-reverse">
            <Link to="create">
              <Button className="bg-mainColor hover:bg-mainColorHover transition rounded-md text-white">
                Add product
              </Button>
            </Link>
            <XlsxProducts productData={productData} />
          </div>
          <div className="flex items-center justify-center">
            <SearchProducts term={term} setTerm={setTerm} />
            <DrawerDefault filterValues={filterValues} setFilterValues={setFilterValues} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <Pagination lastPage={meta?.last_page} currentPage={pageNumber} setCurrentPage={setPageNumber} />
        <select
          className="border-black border p-2 w-fit rounded-md focus:outline-mainColorHover"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="99999">All</option>
        </select>
      </div>
      <DataTable productData={productData} />
    </div>
    </div>
  );
};

export default withGuard(React.memo(Products));
