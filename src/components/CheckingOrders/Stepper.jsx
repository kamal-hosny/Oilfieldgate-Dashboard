import React from "react";
import {
  DocumentTextIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0);

  const getStatusColor = (step) => {
    switch (step) {
      case 0:
        return '#f97316'; // quoted
      case 1:
        return '#3b82f6'; // sent
      case 2:
        return '#22c55e'; // approved
      case 3:
        return '#eab308'; // on-hold
      case 4:
        return '#ef4444'; // rejected
      default:
        return '#6b7280'; // default gray
    }
  };

  const getStatusWidth = (step) => {
    switch (step) {
      case 0:
        return 'w-1/12';
      case 1:
        return 'w-3/12';
      case 2:
        return 'w-6/12';
      case 3:
        return 'w-9/12';
      case 4:
        return 'w-full';
      default:
        return '';
    }
  };

  const steps = [
    { label: 'quoted', icon: DocumentTextIcon },
    { label: 'sent', icon: PaperAirplaneIcon },
    { label: 'approved', icon: CheckCircleIcon },
    { label: 'on-hold', icon: PauseCircleIcon },
    { label: 'rejected', icon: XCircleIcon },
  ];

  return (
    <div className=" py-4 w-full">
      <div className="relative flex justify-between items-center">
        <span className="absolute transition-all w-full h-1 bg-[#e6e6e6] top-1/4 -translate-y-1/2"></span>
        <span
          className={`absolute transition-all h-1 ${getStatusWidth(
            activeStep
          )} z-[5] flex top-1/4 -translate-y-1/2`}
          style={{ backgroundColor: getStatusColor(activeStep) }}
        ></span>
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer gap-2 w-[70px] h-[70px] relative z-10"
              onClick={() => setActiveStep(index)}
            >
              <div
                className="p-2 rounded-full"
                style={{
                  backgroundColor:
                    activeStep === index
                      ? getStatusColor(index)
                      : index < activeStep
                      ? "#222222"
                      : "#e3e3e3",
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{
                    color:
                      activeStep === index
                        ? '#fff'
                        : index < activeStep
                        ? '#fff'
                        : '#000',
                  }}
                />
              </div>
              <div className="top-8 w-max text-center">
                <span
                  className={`text-sm font-semibold ${
                    activeStep === index ? '' : 'text-gray-400'
                  }`}
                  style={{
                    color: activeStep === index ? getStatusColor(index) : '',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
