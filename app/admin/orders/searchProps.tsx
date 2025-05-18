import { SearchProp } from "@/components/SearchFormWithParams";
import { ORDER_STATUS, PAYMENT_SERVICE } from "@/utils/constant";

export const searchProps: SearchProp[] = [
  {
    name: "orderStatus",
    type: "select",
    placeholder: "Select Status",
    options: [
      { label: "Confirming", value: ORDER_STATUS.CONFIRMING },
      { label: "Preparing", value: ORDER_STATUS.PREPARING },
      { label: "Delivering", value: ORDER_STATUS.DELIVERING },
      { label: "Delivered", value: ORDER_STATUS.DELIVERED },
      { label: "Cancelled", value: ORDER_STATUS.CANCELLED },
    ],
  },
  {
    name: "paymentServiceMode",
    type: "select",
    placeholder: "Select Service",
    options: [
      { label: "Cash on Delivery", value: PAYMENT_SERVICE.COD },
      { label: "Pickup", value: PAYMENT_SERVICE.PICKUP },
    ],
  },
];
