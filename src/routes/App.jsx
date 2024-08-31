import { useState } from 'react'
import '../index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import Products from '../pages/Products'
import Layout from '../Layout/Layout'
import CheckingOrders from '../pages/CheckingOrders'
import { AllStateProvider } from '../context/AllStateContext'
import CreateProducts from '../pages/CreateProducts'
import EditProducts from '../pages/EditProducts'

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
          element: (<EditProducts />),
        },
        {
          path: 'checking-orders',
          element: <CheckingOrders />
        }
      ]
    }

  ])
  return (
    <>
      <AllStateProvider>
        <RouterProvider router={Routing} />
      </AllStateProvider>
    </>
  )
}

export default App
