import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modal/modalSlice";
import { deleteMaterialCategory } from "../../store/materialCategory/act/actDeleteMaterialCategory";
import { deleteCategory } from "../../store/category/act/actDeleteCategory"; 
import { deleteBrand } from "../../store/brand/act/actDeleteBrand"; 
import { deleteCondition } from "../../store/condition/act/actDeleteCondition"; 
import { getAllCategories } from "../../store/category/act/actGetAllCategories";
import { getAllMaterialCategories } from "../../store/materialCategory/act/actGetAllMaterialCategories";
import { getAllConditions } from "../../store/condition/act/actGetAllConditions";
import { getAllBrands } from "../../store/brand/act/actGetAllBrands";
import { toast } from 'react-toastify';

const DeleteSpecific = () => {
  const dispatch = useDispatch();
  const { product, type } = useSelector((state) => state?.modal || {});

  const confirmLog = (e) => {
    e.preventDefault();

    if (!product || !type) {
      console.warn("Product or type is missing.");
      return;
    }

    const actions = {
      "Material Category": () =>
        dispatch(deleteMaterialCategory(product._id))
          .then(() => {
            dispatch(getAllMaterialCategories());
            toast.success("Material category deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting material category:", error);
            toast.error(error.message);
          }),

      Category: () =>
        dispatch(deleteCategory(product._id))
          .then(() => {
            dispatch(getAllCategories());
            toast.success("Category deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            toast.error(error.message);
          }),

      Brand: () =>
        dispatch(deleteBrand(product._id))
          .then(() => {
            dispatch(getAllBrands());
            toast.success("Brand deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting brand:", error);
            toast.error(error.message);
          }),

      Condition: () =>
        dispatch(deleteCondition(product._id))
          .then(() => {
            dispatch(getAllConditions());
            toast.success("Condition deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting condition:", error);
            toast.error(error.message);
          }),
    };

    const deleteAction = actions[type];

    if (deleteAction) {
      deleteAction().finally(() => dispatch(closeModal()));
    } else {
      console.warn("Unknown type:", type);
      dispatch(closeModal());
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2">
      <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Delete Specific
      </div>
      <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form className="w-full grid grid-cols gap-2">
          <div>
            <p>
              Are you sure you want to delete{" "}
              <b className="text-red-700">{product?.name || "this item"}</b>?
            </p>
          </div>
          <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
            <div className="flex items-center gap-2">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteSpecific;
