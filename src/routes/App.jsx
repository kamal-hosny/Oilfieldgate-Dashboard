import { useState } from 'react';
import '../index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import Products from '../pages/Products';
import Layout from '../Layout/Layout';
import CheckingOrders from '../pages/CheckingOrders';
import { AllStateProvider } from '../context/AllStateContext';
import CreateProducts from '../pages/CreateProducts';
import EditProducts from '../pages/EditProducts';
import CreateSpecific from '../pages/CreateSpecific';
import ToastNotification from '../components/UI/ToastNotification';
import CoMobileSize from '../mobile/CoMobileSize';

function App() {
  const Routing = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: 'products/create',
          element: <CreateProducts />,
        },
        {
          path: 'products/edit',
          element: <EditProducts />,
        },
        {
          path: 'checking-orders/:id?',
          element: <CheckingOrders />,
        },
        {
          path: 'checking-orders/co-mobile-size/:id?',
          element: <CoMobileSize />,
        },
        {
          path: 'create-specific',
          element: <CreateSpecific />
        }
      ]
    }
  ]);

  return (
    <>
      <AllStateProvider>
        <ToastNotification />
        <RouterProvider router={Routing} />
      </AllStateProvider>
    </>
  );
}

export default App;
