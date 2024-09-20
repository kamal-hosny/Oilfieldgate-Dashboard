import React, { useCallback, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar/HorizontalNavbar';
import ModalManager from '../util/ModalManger';
import { AllStateContext } from '../context/AllStateContext';
import ToastNotification from '../components/UI/ToastNotification';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../store/category/act/actGetAllCategories';
import { getAllBrands as fetchAllBrands } from '../store/brand/act/actGetAllBrands';
import { getAllConditions } from '../store/condition/act/actGetAllConditions';
import { getAllMaterialCategories } from '../store/materialCategory/act/actGetAllMaterialCategories';

const Layout = () => {
  const { mobileSize, openMenu } = useContext(AllStateContext);
  const dispatch = useDispatch();

  // Fetch categories, brands, conditions, and material categories on component mount
  const fetchCategories = useCallback(() => dispatch(getAllCategories()), [dispatch]);
  const fetchBrands = useCallback(() => dispatch(fetchAllBrands()), [dispatch]);
  const fetchConditions = useCallback(() => dispatch(getAllConditions()), [dispatch]);
  const fetchMaterialCategories = useCallback(() => dispatch(getAllMaterialCategories()), [dispatch]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchConditions();
    fetchMaterialCategories();
  }, [fetchCategories, fetchBrands, fetchConditions, fetchMaterialCategories]);

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
