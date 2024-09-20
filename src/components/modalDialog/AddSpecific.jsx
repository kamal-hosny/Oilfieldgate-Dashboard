import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../store/modal/modalSlice';
import { createMaterialCategory } from '../../store/materialCategory/act/actCreateMaterialCategory';
import { createCategory } from '../../store/category/act/actCreateCategory';
import { createBrand } from '../../store/brand/act/actCreateBrand';
import { createCondition } from '../../store/condition/act/actCreateCondition'; // Missing import
import { getAllMaterialCategories } from '../../store/materialCategory/act/actGetAllMaterialCategories';
import { getAllCategories } from '../../store/category/act/actGetAllCategories';
import { getAllBrands } from '../../store/brand/act/actGetAllBrands';
import { getAllConditions } from '../../store/condition/act/actGetAllConditions';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const AddSpecific = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { type } = useSelector((state) => state?.modal || {});

    const onSubmit = (data) => {
        if (!type) {
            console.warn("Type is missing.");
            return;
        }
        const actions = {
            "Material Category": () =>
                dispatch(createMaterialCategory({ name: data.name }))
                    .then(() => {
                        dispatch(getAllMaterialCategories());
                        toast.success("Material category created successfully!");
                    })
                    .catch((error) => {
                        console.error("Error creating material category:", error);
                        toast.error("Failed to create material category. Please try again.");
                    }),

            Category: () =>
                dispatch(createCategory({ name: data.name }))
                    .then(() => {
                        dispatch(getAllCategories());
                        toast.success("Category created successfully!");
                    })
                    .catch((error) => {
                        console.error("Error creating category:", error);
                        toast.error("Failed to create category. Please try again.");
                    }),

            Brand: () =>
                dispatch(createBrand({ name: data.name }))
                    .then(() => {
                        dispatch(getAllBrands());
                        toast.success("Brand created successfully!");
                    })
                    .catch((error) => {
                        console.error("Error creating brand:", error);
                        toast.error("Failed to create brand. Please try again.");
                    }),

            Condition: () =>
                dispatch(createCondition({ name: data.name }))
                    .then(() => {
                        dispatch(getAllConditions());
                        toast.success("Condition created successfully!");
                    })
                    .catch((error) => {
                        console.error("Error creating condition:", error);
                        toast.error("Failed to create condition. Please try again.");
                    }),
        };

        const createAction = actions[type];

        if (createAction) {
            createAction().finally(() => dispatch(closeModal()));
        } else {
            console.warn("Unknown type:", type);
            dispatch(closeModal());
        }
    };

    const cancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2">
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Add Specific
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form className="w-full gap-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div>Are you sure you want to add this specific item?</div>
                    <input
                        {...register('name', { required: 'This field is required' })}
                        className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="bg-green-700 hover:bg-green-900 transition-all text-white px-4 py-2 rounded"
                            >
                                Add
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

export default AddSpecific;
