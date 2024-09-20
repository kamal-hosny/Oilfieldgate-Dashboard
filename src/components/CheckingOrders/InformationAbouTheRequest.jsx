import React from "react";
import { StepperWithContent } from "./Stepper";
import CustomerData from "./CustomerData";
import RequestTableData from "./RequestTableData";
import DataSettings from "./DataSettings";
import DataTime from "./DataTime";

const InformationAbouTheRequest = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className=" InformationAbouTheRequest flex flex-col gap-4
      overflow-x-auto
      ">
        <DataTime />
        <div className="mt-4 ">
          <RequestTableData />
        </div>
      </div>
    </div>
  );
};

export default InformationAbouTheRequest;
