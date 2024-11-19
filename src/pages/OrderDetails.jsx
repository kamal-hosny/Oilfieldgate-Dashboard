import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBack from '../components/UI/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import TableOrderDetails from '../components/OrderDetails/TableOrderDetails';
import TableOrderCards from '../components/OrderDetails/TableOrderCards';
import InformationOneOrderHeader from '../components/OrderDetails/InformationOneOrderHeader';
import PricingTable from '../components/OrderDetails/PricingTable';
import { getOneOrder } from '../store/order/act/actGetOneOrder';
import { setCloneOrderData } from '../store/cloneOrderProduct/cloneOrderProductSlice';
import { Button } from '@material-tailwind/react';
import { editOrderCart } from '../store/orderCart/act/actEditOrderCart';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getOneUser } from '../store/user/act/actGetOneUser';
import Loading from '../components/UI/Loading';
import { openModal } from '../store/modal/modalSlice';
import withGuard from '../util/withGuard';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // احصل على الـ id من الـ URL

  const [isDataChanged, setIsDataChanged] = useState(false);
  // const { records, loading, error } = productData;
  const OneOrderData = useSelector((state) => state?.AllOrders?.record?.data);
  const LoadingOneOrderData = useSelector((state) => state?.AllOrders?.loading)
  const ErrorOneOrderData = useSelector((state) => state?.AllOrders?.error)
  


  const OneOrderCart = useMemo(() => OneOrderData?.cart, [OneOrderData?.cart]);
  const CloneOrderData = useSelector((state) => state.cloneOrderProduct.orderData);

  // Fetch one order only when 'id' changes or it's needed
  const fetchOneOrder = useCallback(() => {
    if (id) { // تأكد من وجود id 
      dispatch(getOneOrder(id)); // اجلب بيانات الطلب بناءً على id
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchOneOrder(); // استدعاء الجلب عند كل تغيير في الـ id
  }, [fetchOneOrder, id]);

  // Set clone order data only if cart exists
  useEffect(() => {
    if (OneOrderCart) {
      dispatch(setCloneOrderData(OneOrderCart));
    }
  }, [OneOrderCart, dispatch]);

  // Check if data has changed and only update when necessary
  useEffect(() => {
    setIsDataChanged(!_.isEqual(OneOrderCart, CloneOrderData));
  }, [OneOrderCart, CloneOrderData]);

  // Fetch user data if 'Customer' exists and it hasn't been fetched yet
  const fetchOneUser = useCallback(() => {
    if (OneOrderData?.Customer) {
      dispatch(getOneUser(OneOrderData.Customer));
    }
  }, [dispatch, OneOrderData?.Customer]);

  useEffect(() => {
    fetchOneUser();
  }, [fetchOneUser, OneOrderData?.Customer]);

  // Edit cart and save changes when necessary
  const fetchEditCart = useCallback(() => {
    if (isDataChanged) {
      dispatch(editOrderCart({
        _id: id,
        cart: CloneOrderData,
      }))
        .then(() => {
          toast.success('Updated successfully!');
          fetchOneOrder();
        })
        .catch((error) => {
          console.error('Error updating:', error);
          toast.error('Error updating the order. Please try again.');
        });
    }
  }, [dispatch, id, CloneOrderData, isDataChanged, fetchOneOrder]);

  const isDone = OneOrderData?.done
  console.log(isDone);

  return (
    <Loading classStyle="h-screen" className="" loading={LoadingOneOrderData} error={ErrorOneOrderData} >
    <div className=' h-screen'>
      <span className='mb-4 block'>
      <ArrowBack />
      </span>
      <div className='bg-white grid'>
        <InformationOneOrderHeader orderData={OneOrderData} />
        <div className='p-4 grid gap-4 overflow-x-auto'>
          <TableOrderDetails orderData={OneOrderData} />
          {CloneOrderData?.length > 0 ? (
            <div className='flex justify-between gap-2 lg:flex-row flex-col'>
              <span className='flex-[3]'>
                <TableOrderCards orderData={CloneOrderData} isDone={isDone} />
              </span>
              <span className='flex-1'>
                <PricingTable orderData={CloneOrderData || []} />
              </span>
            </div>
          ) : (
            <div>Please add products</div>
          )}
        </div>
      </div>
     <div className='flex gap-2'>
      {!isDone && (
        <>
         <Button onClick={fetchEditCart} className='w-fit' disabled={!isDataChanged}>
        Save changes
      </Button>
      <Button  onClick={() => dispatch(openModal({name: "AddProduct"}))}>
        Add Product
      </Button>
        </>
      )}
    
     </div>
    </div>
    </Loading>
  );
};

export default withGuard(OrderDetails);
