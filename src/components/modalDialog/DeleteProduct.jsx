import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../store/modal/modalSlice';
import { deleteProduct } from '../../store/products/act/actDeleteProduct';
import { getAllProducts } from '../../store/products/act/actGetAllProducts';
import { toast } from 'react-toastify';

const DeleteProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state?.modal || {});

  const confirmLog = useCallback((e) => {
    e.preventDefault();
    if (!product?._id) {
      toast.error("Product ID is missing.");
      return;
    }
    
    dispatch(deleteProduct(product._id))
      .unwrap()
      .then(() => {
        toast.success("Product deleted successfully!");
        // Fetch updated product list after deletion
        dispatch(getAllProducts());
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error(error.message);
      });
    
    dispatch(closeModal());
  }, [dispatch, product?._id]);

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2">
      <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Delete Product
      </div>
      <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form className="w-full grid grid-cols gap-2">
          <div>
            Are you sure to delete the product?
          </div>
          <div className="col-span-2 flex gap-2 mt-2 items-center">
            <button 
              className="bg-red-700 hover:bg-red-900 transition-all text-white px-4 py-2 rounded" 
              onClick={confirmLog}
            >
              Delete
            </button>
            <button 
              onClick={cancel} 
              className="bg-gray-500 text-white px-3 py-2 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteProduct;
