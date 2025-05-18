"use client";
import OrderProgressStepperDelivery from "@/components/orderProgressStepperDelivery";
import OrderProgressStepperPickup from "@/components/orderProgressStepperPickUp";
import { RootState } from "@/redux/store/store";
import { getOrders, updateOrderStatus } from "@/service/api";
import { ORDER_STATUS, PAYMENT_SERVICE } from "@/utils/constant";
import { IOrder } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const OrderItem = ({ item }: { item: any }) => (
  <div className="text-xs text-gray-500">
    <div className="font-bold">{`${item.quantity}x ${item.product}`}</div>
    <div>{item.description}</div>
    <div>Total: {item.total.toFixed(2)}</div>
  </div>
);

const CancelButton = ({
  orderId,
  onCancel,
}: {
  orderId: string;
  onCancel: (id: string) => void;
}) => (
  <div className="flex items-center gap-2 border bg-red-400 rounded-lg px-2 cursor-pointer hover:bg-red-500">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon width={15} className="text-white" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs text-gray-500">
            Your order can be cancelled anytime before the seller confirms it.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <div className="text-xs text-white" onClick={() => onCancel(orderId)}>
      Cancel Order
    </div>
  </div>
);

const OrderCard = ({
  order,
  onCancel,
}: {
  order: IOrder;
  onCancel: (id: string) => void;
}) => (
  <div className="border-3 rounded-lg p-4">
    {order.paymentServiceMode === PAYMENT_SERVICE.PICKUP ? (
      <OrderProgressStepperPickup orderStatus={order.orderStatus} />
    ) : (
      <OrderProgressStepperDelivery orderStatus={order.orderStatus} />
    )}

    <div>
      <div className="text-md text-gray-700 font-bold">Orders</div>
      <div className="space-y-2">
        {order.orderList.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
      <div className="w-full flex justify-between items-end">
        <div className="font-bold mt-4 text-md">
          Total: {order.total.toFixed(2)}
        </div>
        {order.orderStatus === ORDER_STATUS.CONFIRMING && (
          <CancelButton orderId={order._id as string} onCancel={onCancel} />
        )}
      </div>
    </div>
  </div>
);

const PendingOrders = () => {
  const customerId = useSelector((state: RootState) => {
    const user = state.user.user;
    if (!user || typeof user !== "object") return "";
    return ("_id" in user ? user._id : "") ?? "";
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => getOrders({ customerId }),
    refetchInterval: 10000,
    enabled: !!customerId,
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatusMutation.mutate({
      orderId,
      newStatus: ORDER_STATUS.CANCELLED,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders</div>;
  if (!data?.data) return null;

  const activeOrders = data.data.orders.filter(
    (order: IOrder) =>
      order.orderStatus !== ORDER_STATUS.CANCELLED &&
      order.orderStatus !== ORDER_STATUS.DELIVERED
  );

  console.log(activeOrders, "activeOrders");
  return (
    <div>
      <div className="space-y-4">
        {activeOrders.map((order: IOrder, index: number) => (
          <OrderCard
            key={order._id || index}
            order={order}
            onCancel={handleCancelOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
