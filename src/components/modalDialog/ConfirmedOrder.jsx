import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doneOrder } from '../../store/order/act/actDoneOrder';
import { closeModal } from '../../store/modal/modalSlice';
import { getUserOrders } from '../../store/usersOrder/act/actGetUserOrders';

const ConfirmedOrder = () => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state?.modal?.product);

    const confirmLog = useCallback((event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Avoid modifying UI immediately; update only on success
        dispatch(doneOrder(_id))
            .unwrap()
            .then(() => {
                window.location.reload(); 
                toast.success('Order confirmed successfully!');
            })
            .catch((error) => {
                console.error('Error confirming order: Please choose the product', error);
                // Keep the data visible and show an error message
                toast.error(error.message || 'Failed to confirm the order.');
            });
    }, [dispatch, _id]);

    const cancel = useCallback((event) => {
        event.preventDefault(); // Prevent default refresh
        dispatch(closeModal());
    }, [dispatch]);

    return (
        <div
            className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-[400px] bg-sectionColor border-2`}
        >
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Order Status Confirmation
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form className="w-full flex flex-col gap-2">
                    <div className=' w-full'>
                        Do you agree to confirm the order approval?
                    </div>
                    <div className="col-span-2 flex gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button
                                type="button" // This prevents form submission and page refresh
                                className="bg-green-700 hover:bg-green-900 text-white px-3 py-2 rounded-sm"
                                onClick={confirmLog}
                            >
                                Agree
                            </button>
                            <button
                                type="button" // This prevents form submission and page refresh
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

export default ConfirmedOrder;
