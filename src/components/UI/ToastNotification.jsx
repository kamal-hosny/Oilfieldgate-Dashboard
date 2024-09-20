import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

// دالة لعرض إشعار النجاح
const notifySuccess = () => toast.success("Login successful!");

const ToastNotification = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastNotification;
