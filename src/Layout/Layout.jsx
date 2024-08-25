import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar/HorizontalNavbar';
import ModalManager from '../util/ModalManger';
import { AllStateContext } from '../context/AllStateContext';

const Layout = () => {
  const { mobileSize, openMenu} = useContext(AllStateContext);
  return (
    <>
      <ModalManager />
      <div className="flex h-full w-full">
        <VerticalNavbar />
        <div className="w-full">
          <HorizontalNavbar />
          <div className={`bg-mainColorBackground`}>
          <div className="p-4">
            <Outlet />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
