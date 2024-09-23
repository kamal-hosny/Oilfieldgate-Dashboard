import React, { memo } from "react";
import { StepperWithContent } from "./Stepper";
import CustomerData from "./CustomerData";
import RequestTableData from "./RequestTableData";
import DataSettings from "./DataSettings";
import DataTime from "./DataTime";

const InformationAbouTheRequest = ({allUserOrders}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className=" InformationAbouTheRequest flex flex-col gap-4
      overflow-x-auto
      ">
        <div className="mt-4 ">
          <RequestTableData allUserOrders={allUserOrders} />
        </div>
      </div>
    </div>
  );
};

export default memo(InformationAbouTheRequest);
