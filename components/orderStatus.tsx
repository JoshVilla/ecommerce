import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS, PAYMENT_SERVICE } from "@/utils/constant";
import React from "react";

const orderStatusDeliveryMap: Record<
  number,
  { text: string; className: string }
> = {
  [ORDER_STATUS.CONFIRMING]: {
    text: "Confirming",
    className: "bg-yellow-100 text-yellow-800",
  },
  [ORDER_STATUS.PREPARING]: {
    text: "Preparing",
    className: "bg-blue-100 text-blue-800",
  },
  [ORDER_STATUS.DELIVERING]: {
    text: "Delivering",
    className: "bg-orange-100 text-orange-800",
  },
  [ORDER_STATUS.DELIVERED]: {
    text: "Delivered",
    className: "bg-green-100 text-green-800",
  },
  [ORDER_STATUS.CANCELLED]: {
    text: "Cancelled",
    className: "bg-red-100 text-red-800",
  },
};

const orderStatusPickUpMap: Record<
  number,
  { text: string; className: string }
> = {
  [ORDER_STATUS.CONFIRMING]: {
    text: "Confirming",
    className: "bg-yellow-100 text-yellow-800",
  },
  [ORDER_STATUS.PREPARING]: {
    text: "Preparing",
    className: "bg-blue-100 text-blue-800",
  },
  [ORDER_STATUS.DELIVERING]: {
    text: "Ready to Pickup",
    className: "bg-green-100 text-green-800",
  },
  [ORDER_STATUS.DELIVERED]: {
    text: "Sold",
    className: "bg-green-100 text-green-800",
  },
};

type Props = {
  status: number;
  paymentService: number;
};

const RenderOrderStatusBadge: React.FC<Props> = ({
  status,
  paymentService,
}) => {
  const orderStatusMap =
    paymentService === PAYMENT_SERVICE.COD
      ? orderStatusDeliveryMap
      : orderStatusPickUpMap;
  const statusInfo = orderStatusMap[status] ?? {
    text: "Unknown",
    className: "bg-gray-200 text-gray-600",
  };

  return (
    <Badge variant="secondary" className={statusInfo.className}>
      {statusInfo.text}
    </Badge>
  );
};

export default RenderOrderStatusBadge;
