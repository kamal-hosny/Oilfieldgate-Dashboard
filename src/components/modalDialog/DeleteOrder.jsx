import React, { useCallback } from 'react';
import { closeModal } from '../../store/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../../store/order/act/actDeleteOrder';
import { getUserOrders } from '../../store/usersOrder/act/actGetUserOrders';
import { toast } from 'react-toastify';
import { deleteOrderUserOrder } from '../../store/usersOrder/act/actDeleteOrderUserOrder';
import { useNavigate, useLocation, useParams } from 'react-router-dom'; // Import these hooks

const DeleteOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get current location
  const order = useSelector((state) => state?.modal?.product);
  const {id} = useParams()


  const confirmLog = useCallback(
    (e) => {
      e.preventDefault();
      if (!order?._id) {
        toast.error('Order ID is missing.');
        return;
      }
      dispatch(deleteOrderUserOrder(order))
        .unwrap()
        .then(() => {
          if (order?._id) {
            dispatch(getUserOrders(id));
          }
          toast.success('Order deleted successfully!');
          // Check if you're on the specific order-details route
          if (location.pathname.startsWith('/checking-orders/order-details')) {
            navigate(-1); // Go back one step
          }
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
          toast.error(error.message || 'Failed to delete order.');
        });

      dispatch(closeModal());
    },
    [dispatch, order, order?._id, navigate, location.pathname] // Add navigate and location.pathname to the dependencies
  );

  const cancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <div className="fixed flex flex-col border-colorBorder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] justify-center items-center rounded-lg w-96 bg-sectionColor border-2">
      <div className="modal-head w-full p-5 text-lg font-semibold justify-center text-center text-colorText1">
        Delete Order
      </div>
      <div className="modal-body w-full flex justify-start gap-2 p-3 border-y-2 border-colorBorder">
        <form className="w-full grid grid-cols gap-2">
          <div>Are you sure to delete the Order?</div>
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

export default DeleteOrder;
