import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products/act/actGetAllProducts";
import SearchAddProduct from "../OrderDetails/SearchAddProduct";
import { Button } from "@material-tailwind/react";
import Loading from "../UI/Loading";
import { debounce } from "lodash";
import { addItem } from "../../store/cloneOrderProduct/cloneOrderProductSlice";
import { toast } from 'react-toastify';

const AddProduct = React.memo(() => {
  const dispatch = useDispatch();

  const { records, loading, error } = useSelector(
    (state) => state?.allProducts
  );

  const { isOpen } = useSelector((state) => state?.modal);
  
  // تأكد من وجود الحقل items داخل cloneOrderProduct في الـ Redux
  const currentOrderItems = useSelector((state) => state.cloneOrderProduct?.items) || []; 

  // التحقق من وجود currentOrderItems
  useEffect(() => {
    console.log("Current Order Items:", currentOrderItems);
  }, [currentOrderItems]);

  const allProducts = records?.data?.data;
  const [term, setTerm] = useState("");

  // Debounced fetching of products
  const fetchAllProducts = useCallback(
    debounce(() => {
      if (isOpen) {
        dispatch(
          getAllProducts({
            materialCategory: null,
            category: null,
            brand: null,
            condition: null,
            search: term,
            page: 1,
            limit: 50,
          })
        );
      }
    }, 700),
    [dispatch, isOpen, term]
  );

  // Trigger fetching products when modal is open or term changes
  useEffect(() => {
    fetchAllProducts();
    // Cleanup the debounce function to prevent memory leaks
    return () => {
      fetchAllProducts.cancel();
    };
  }, [isOpen, fetchAllProducts]);

  const addProductToCart = (product) => {
    // تحقق من إذا كانت currentOrderItems تحتوي على المنتج
    const isProductInOrder = currentOrderItems.some(item => item._id === product?._id);

    if (isProductInOrder) {
      toast.warn("The product is already in the order!"); // عرض رسالة تحذيرية
    } else {
      // إذا لم يكن المنتج موجودًا، أضفه إلى الطلب
      dispatch(addItem({
        _id: product?._id,
        image: product?.mainImg?.url,
        product_name: product?.data?.product_name,
        price: product?.data?.price,
        model_number: product?.data?.model_number,
        Dimension: product?.data?.Dimension,
        Unit_of_Measurement: product?.data?.Unit_of_Measurement,
        condition: product?.data?.condition,
        brand: product?.data?.brand,
        weight: product?.data?.weight,
        size: product?.data?.size,
        HNS_code: product?.data?.HNS_code,
        material_Category: product?.data?.material_Category,
        instock: product?.data?.instock,
        Description: product?.data?.Description,
        Currency: product?.data?.Currency,
        Quantity: 1
      }));
    }
  };

  return (
    <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-10/12 bg-sectionColor border-2">
      <div className="modal-head w-full p-5 text-lg font-semibold text-center text-colorText1">
        Add Product
      </div>
      <div className="modal-body flex flex-col gap-4 w-full p-3 border-y-2 border-colorBorder">
        <div className="search">
          <SearchAddProduct term={term} setTerm={setTerm} />
        </div>
        <Loading loading={loading} error={error}>
          <div className="cards grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-96">
            {allProducts && allProducts.map((product) => {
              return (
                <div
                  key={product?._id}
                  className="card flex flex-col items-center p-4 border border-colorBorder rounded-lg shadow-lg bg-white"
                >
                  <div className="image w-20 h-20 mb-2">
                    <img
                      className="object-cover w-full h-full rounded"
                      src={product?.mainImg?.url || "https://via.placeholder.com/80"}
                      alt={product?.name || "Product Image"}
                    />
                  </div>
                  <div className="info text-center">
                    <div className="name text-sm font-semibold mb-1">
                      {product?.data?.product_name || "No Name"}
                    </div>
                    <div className="model_number text-xs text-gray-500 mb-1">
                      Model: {product?.data?.model_number || "N/A"}
                    </div>
                    <div className="description text-xs text-gray-700 mb-2">
                      {product?.data?.Dimension || "No description available."}
                    </div>
                    <div className="instock text-xs font-semibold text-green-600">
                      {product?.data?.instock ? `In Stock: ${product?.data?.instock}` : "Out of Stock"}
                    </div>
                    <div className="flex gap-2 justify-center mt-2">
                      <Button className="p-2 rounded-sm">
                        view
                      </Button>
                      <Button className="p-2 rounded-sm" onClick={() => { addProductToCart(product) }}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Loading>
      </div>
    </div>
  );
});

export default AddProduct;
