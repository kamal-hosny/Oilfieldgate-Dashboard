import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { editMaterialCategory } from '../../store/materialCategory/act/actEditMaterialCategory';
import { editCategory } from '../../store/category/act/actEditCategory';
import { editBrand } from '../../store/brand/act/actEditBrand';
import { editCondition } from '../../store/condition/act/actEditCondition';
import { toast } from 'react-toastify';
import { getAllMaterialCategories } from '../../store/materialCategory/act/actGetAllMaterialCategories';
import { getAllCategories } from '../../store/category/act/actGetAllCategories';
import { getAllBrands } from '../../store/brand/act/actGetAllBrands';
import { getAllConditions } from '../../store/condition/act/actGetAllConditions';

const EditSpecific = () => {
  const dispatch = useDispatch();
  const { product, type } = useSelector((state) => state?.modal || {});
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: product?.name || '',  // Default input value
    }
  });

  const onSubmit = (data) => {
    if (!product || !type) {
      console.warn("Product or type is missing.");
      return;
    }

    const actions = {
      "Material Category": () =>
        dispatch(editMaterialCategory({ id: product._id, name: data.name }))
        .unwrap()  
        .then(() => {
            dispatch(getAllMaterialCategories());
            toast.success("Material category updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating material category:", error);
            toast.error(error.message);
          }),

      Category: () =>
        dispatch(editCategory({ id: product._id, name: data.name }))
        .unwrap()  
        .then(() => {
            dispatch(getAllCategories());
            toast.success("Category updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating category:", error);
            toast.error(error.message);
          }),

      Brand: () =>
        dispatch(editBrand({ id: product._id, name: data.name }))
        .unwrap()  
        .then(() => {
            dispatch(getAllBrands());
            toast.success("Brand updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating brand:", error);
            toast.error(error.message);
          }),

      Condition: () =>
        dispatch(editCondition({ id: product._id, name: data.name }))
        .unwrap()  
        .then(() => {
            dispatch(getAllConditions());
            toast.success("Condition updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating condition:", error);
            toast.error(error.message);
          }),
    };

    const editAction = actions[type];

    if (editAction) {
      editAction().finally(() => dispatch(closeModal()));
    } else {
      console.warn("Unknown type:", type);
      dispatch(closeModal());
    }
  };

  const cancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2`}>
      <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Edit Specific
      </div>
      <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form className="w-full gap-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div>Are you sure to Edit Specific?</div>
          <input
            {...register('name', { required: 'This field is required' })}
            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {/* Buttons */}
          <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-900 transition-all text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                type="button"
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

export default EditSpecific;
