import React from 'react';
import Orders from './Orders';
import Information from './Information';

const FullSizeCheckingOrders = () => {
  return (
    <div className="grid grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 gap-4">
      <div className="col-span-2 lg:col-span-1" style={{ height: "calc(100vh - 115px)" }}>
        <Orders />
      </div>
      <div className="col-span-3 lg:col-span-4" style={{ height: "calc(100vh - 115px)" }}>
        <Information />
      </div>
    </div>
  );
};

export default FullSizeCheckingOrders;
