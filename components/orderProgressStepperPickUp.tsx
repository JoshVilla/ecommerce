import { ORDER_STATUS } from "@/utils/constant";
import { Check, CheckCircle, ChefHat, PackageCheck } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
interface OrderProgressStepperProps {
  orderStatus: number;
}

const OrderProgressStepperPickup = ({
  orderStatus,
}: OrderProgressStepperProps) => {
  const renderProgressStepper = (value: number) => {
    const stepper = [
      {
        label: "Confirming",
        value: ORDER_STATUS.CONFIRMING,
        icon: <CheckCircle width={16} />,
      },
      {
        label: "Preparing",
        value: ORDER_STATUS.PREPARING,
        icon: <ChefHat width={16} />,
      },
      {
        label: "Ready to pickup",
        value: ORDER_STATUS.DELIVERING,
        icon: <PackageCheck width={16} />,
      },
      {
        label: "Sold",
        value: ORDER_STATUS.DELIVERED,
        icon: <Check width={16} />,
      },
    ];
    return (
      <div className="flex items-center">
        {value !== ORDER_STATUS.CANCELLED ? (
          stepper.map((item, index) => (
            <React.Fragment key={index}>
              <div className="relative flex flex-col gap-2 justify-center items-center p-4">
                {/* Ping effect */}
                <div
                  className={`absolute top-4 h-8 w-8 rounded-full bg-indigo-300 ${
                    value === item.value && value !== ORDER_STATUS.DELIVERED
                      ? "animate-ping"
                      : ""
                  }`}
                />

                {/* Foreground circle */}
                <div
                  className={`relative z-10 rounded-full h-8 w-8 border-2 flex justify-center items-center ${
                    value >= item.value ? "bg-indigo-500" : "bg-white"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      value >= item.value ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                <div className="text-xs text-gray-500">{item.label}</div>
              </div>

              {/* Progress Line */}
              {index !== stepper.length - 1 && (
                <div className="h-1 w-10 bg-indigo-300" />
              )}
            </React.Fragment>
          ))
        ) : (
          <Badge>Cancelled</Badge>
        )}
      </div>
    );
  };
  return renderProgressStepper(orderStatus);
};

export default OrderProgressStepperPickup;
