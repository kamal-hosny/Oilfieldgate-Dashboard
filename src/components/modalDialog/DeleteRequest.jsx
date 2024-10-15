import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { closeModal } from '../../store/modal/modalSlice';
import { deleteUserOrder } from '../../store/usersOrder/act/actDeleteUserOrder';
import { getAllUsersOrders } from '../../store/usersOrder/act/actGetAllUsersOrder';
import { toast } from 'react-toastify';

const DeleteRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const { _idOrder } = JSON.parse(localStorage.getItem("orderDataClicked"));

    const confirmLog = useCallback((e) => {
        e.preventDefault();
        if (!_idOrder) return;

        dispatch(deleteUserOrder({ _id: _idOrder }))
            .unwrap()
            .then(() => {
                dispatch(getAllUsersOrders());
                toast.success('Request deleted successfully!');
                dispatch(closeModal());
                navigate('/products'); // Navigate to the 'products' route after successful deletion
            })
            .catch((error) => {
                console.error('Error deleting order:', error);
                toast.error(error.message || 'Failed to delete the request.');
                dispatch(closeModal());
            });
    }, [dispatch, _idOrder, navigate]);

    const cancel = useCallback((e) => {
        e.preventDefault();
        dispatch(closeModal());
    }, [dispatch]);

    return (
        <div className={`fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2`}>
            <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
                Delete Request
            </div>
            <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
                <form className="w-full grid grid-cols gap-2" onSubmit={confirmLog}>
                    <div className='col-span-2'>Are you sure you want to delete this request?</div>
                    <div className="col-span-2 flex justify-between gap-2 mt-2 items-center">
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="bg-red-700 hover:bg-red-900 transition-all text-white px-4 py-2 rounded"
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

export default DeleteRequest;
