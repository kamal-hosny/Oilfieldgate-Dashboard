import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/products/DataTable";
import { Pagination } from "../components/products/Pagination";
import { DrawerDefault } from "../components/products/DrawerDefault";
import SearchProducts from "../components/products/SearchProducts";
import usePrevState from "../context/prevState";
import { getAllCategories } from "../store/category/act/actGetAllCategories";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/products/act/actGetAllProducts";
import { Button } from "@material-tailwind/react";
import XlsxProducts from "../components/products/XlsxProducts";
import { debounce } from 'lodash';


const Products = () => {
  const dispatch = useDispatch();

  // filters
  const [filterValues, setFilterValues] = useState({
    materialCategory: null,
    category: null,
    brand: null,
    condition: null,
  });

  const [term, setTerm] = useState("");
  const prevTerm = usePrevState(term);

  const fetchProducts = useCallback(
    debounce(() => {
      dispatch(
        getAllProducts({
          materialCategory: filterValues.materialCategory,
          category: filterValues.category,
          brand: filterValues.brand,
          condition: filterValues.condition,
        })
      );
    }, 500), 
    [dispatch, filterValues ] // Include term in the dependencies
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productData = useSelector((state) => state?.allProducts);

  return (
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
      <Pagination />
      <DataTable productData={productData} />
    </div>
  );
};

export default React.memo(Products);
