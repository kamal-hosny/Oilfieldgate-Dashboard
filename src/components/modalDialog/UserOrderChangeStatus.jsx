import React, {  useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeModal } from '../../store/modal/modalSlice';
import { updateStatusUserOrder } from "../../store/usersOrder/act/actUpdateStatusUserOrder";
import { toast } from 'react-toastify';
import { getAllUsersOrders } from "../../store/usersOrder/act/actGetAllUsersOrder";

const UserOrderChangeStatus = React.memo(() => {
    const { _idOrder, statusOrder } = JSON.parse(localStorage.getItem("orderDataClicked"));
    // console.log(_idOrder, statusOrder);


    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { status: statusOrder }  // Initialize form with the correct statusOrder
    });

    const onSubmit = useCallback((formData) => {
        dispatch(updateStatusUserOrder({
            id: _idOrder,
            Status: formData.status
        }))
        .unwrap()
        .then(() => {
            // Update the local storage with the new status
            localStorage.setItem("orderDataClicked", JSON.stringify({ _idOrder, statusOrder: formData.status }));
            
            dispatch(getAllUsersOrders())

        
            toast.success("Updated successfully!");
            dispatch(closeModal());
        }).catch((error) => {
            console.error("Error updating order status:", error);
            toast.error("Failed to update status!");
            dispatch(closeModal());
        });
    }, [ dispatch, _idOrder]);
    
    
    const cancel = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    return (
        <div
            className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2`}
        >
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Track all orders
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1 col-span-3">
                        <label className="text-colorText1">Status:</label>
                        <select
                            {...register("status", { required: true })}
                            className="border-colorBorder border-2 p-2 w-full focus:outline-mainColorHover"
                        >
                            <option value="">Select Status</option>
                            <option value="viewed">Viewed</option>
                            <option value="processing">Processing</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {errors.status && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>

                    <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded-sm">
                                Change
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-3 py-2 rounded-sm"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default UserOrderChangeStatus;
