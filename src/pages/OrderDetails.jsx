import React, { useCallback, useEffect, useState } from 'react';
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
import _ from 'lodash'; // يستخدم للمقارنة بين الكائنات
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isDataChanged, setIsDataChanged] = useState(false); // لتتبع ما إذا كانت البيانات قد تغيّرت

  const OneOrderData = useSelector((state) => state?.AllOrders?.record?.data);
  const OneOrderCart = OneOrderData?.cart;

  const CloneOrderData = useSelector((state) => state.cloneOrderProduct.orderData); // الوصول إلى البيانات المستنسخة

  // استدعاء طلب للحصول على طلب واحد
  const fetchOneOrder = useCallback(() => {
    dispatch(getOneOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchOneOrder();
  }, [fetchOneOrder]);

  // حفظ بيانات الطلب في Redux عندما تتوفر
  useEffect(() => {
    if (OneOrderCart) {
      dispatch(setCloneOrderData(OneOrderCart));
    }
  }, [OneOrderCart, dispatch]);

  // التحقق مما إذا كانت البيانات قد تغيّرت
  useEffect(() => {
    if (!_.isEqual(OneOrderCart, CloneOrderData)) {
      setIsDataChanged(true); // البيانات مختلفة، الزر مفعل
    } else {
      setIsDataChanged(false); // البيانات مطابقة، الزر معطل
    }
  }, [OneOrderCart, CloneOrderData]);

  // تعديل بيانات السلة
  const fetchEditCart = useCallback(() => {
    if (isDataChanged) {
      dispatch(editOrderCart({
        "_id": id,
        "cart": CloneOrderData
      }))
      .then(() => {
        toast.success("Updated successfully!");
        dispatch(getOneOrder(id));
      })
      .catch((error) => {
        console.error("Error updating:", error);
        toast.error("Error updating the order. Please try again.");
      });
    }
  }, [dispatch, id, CloneOrderData, isDataChanged]);

  return (
    <div className='flex flex-col gap-4 h-full'>
      <ArrowBack />
      <div className='bg-white grid'>
        <InformationOneOrderHeader />
        <div className='p-4 grid gap-4 overflow-x-auto'>
          <TableOrderDetails orderData={OneOrderData} />
          <div className='flex justify-between gap-2 lg:flex-row flex-col'>
            <span className='flex-[3]'>
              <TableOrderCards orderData={CloneOrderData} />
            </span>
            <span className='flex-1'>
              <PricingTable orderData={CloneOrderData} />
            </span>
          </div>
        </div>
      </div>
      <Button onClick={fetchEditCart} className='w-fit' disabled={!isDataChanged}>
      Save changes
      </Button>
    </div>
  );
};

export default OrderDetails;
