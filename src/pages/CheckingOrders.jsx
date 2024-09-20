import React, { useContext } from "react";
import "react-tooltip/dist/react-tooltip.css";
import InformationAbouTheRequest from "../components/CheckingOrders/InformationAbouTheRequest";
import InformationHeader from "../components/CheckingOrders/InformationHeader";
import Orders from "../components/CheckingOrders/Orders";
import { useParams } from "react-router-dom";
import { AllStateContext } from "../context/AllStateContext";
import FullSizeCheckingOrders from "../components/CheckingOrders/FullSizeCheckingOrders";
import MobileSizeCheckingOrders from "../components/CheckingOrders/MobileSizeCheckingOrders";

const CheckingOrders = () => {
  const { mobileSize} = useContext(AllStateContext);


  return (
   <>
   {mobileSize? <MobileSizeCheckingOrders/>  :  <FullSizeCheckingOrders /> }
   </>
  );
};

export default CheckingOrders;
