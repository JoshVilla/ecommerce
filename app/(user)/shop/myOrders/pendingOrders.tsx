"use client";
import OrderProgressStepperDelivery from "@/components/orderProgressStepperDelivery";
import OrderProgressStepperPickup from "@/components/orderProgressStepperPickUp";
import { RootState } from "@/redux/store/store";
import { getPendingOrder, updateOrderStatus } from "@/service/api";
import { ORDER_STATUS, PAYMENT_SERVICE } from "@/utils/constant";
import { IMyOrders, IOrder } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { usePagination } from "@/hooks/usePagination";
import CustomPagination from "@/components/customPagination";
//@ts-ignore

const OrderItem = ({ item }: { item: IMyOrders }) => (
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
  <button
    className="flex items-center gap-2 border bg-red-400 rounded-lg px-2 cursor-pointer hover:bg-red-500"
    onClick={() => onCancel(orderId)}
  >
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
    <span className="text-xs text-white">Cancel Order</span>
  </button>
);

const OrderCard = ({
  order,
  onCancel,
}: {
  order: IOrder;
  onCancel: (id: string) => void;
}) => (
  <div className="border rounded-lg p-4 shadow-sm">
    {order.paymentServiceMode === PAYMENT_SERVICE.PICKUP ? (
      <OrderProgressStepperPickup orderStatus={order.orderStatus} />
    ) : (
      <OrderProgressStepperDelivery orderStatus={order.orderStatus} />
    )}

    <div className="flex md:flex-row flex-col gap-4">
      <div className="flex-1">
        <div className="text-md text-gray-700 font-bold">Orders</div>
        <div className="space-y-2">
          {order.orderList.map((item, index) => (
            <OrderItem key={`${order._id}-item-${index}`} item={item} />
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
      {order.paymentServiceMode === PAYMENT_SERVICE.COD && order.address && (
        <div className="flex-1">
          <div className="text-md text-gray-700 font-bold">Address</div>
          <div className="text-xs text-gray-500">
            {[
              order.address.otherAddress,
              order.address.barangay,
              order.address.city,
              order.address.province,
              order.address.region,
              order.address.addressInfo,
            ]
              .filter(Boolean)
              .join(", ")}
          </div>
        </div>
      )}
    </div>
  </div>
);

const PendingOrders = () => {
  const { pageState, handlePageStateChange, handleSetInitialPage } =
    usePagination({
      initialItemsPerPage: 5,
    });

  const customerId = useSelector((state: RootState) => {
    const user = state.user.user;
    if (!user || typeof user !== "object") return "";
    return ("_id" in user ? user._id : "") ?? "";
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pending-orders", customerId, pageState.currentPage],
    queryFn: () =>
      getPendingOrder({
        currentPage: pageState.currentPage,
        itemsPerPage: pageState.itemsPerPage,
      }),
    refetchInterval: 10000,
    enabled: Boolean(customerId),
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
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleCancelOrder = (orderId: string) => {
    updateOrderStatusMutation.mutate({
      orderId,
      newStatus: ORDER_STATUS.CANCELLED,
    });
  };

  useEffect(() => {
    if (data?.data?.pagination) {
      handleSetInitialPage(data.data.pagination);
    }
  }, [data?.data?.pagination, handleSetInitialPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders</div>;
  if (!data?.data?.orders) return null;

  const activeOrders = data.data.orders;

  return (
    <div className="space-y-4">
      {activeOrders.map((order: IOrder) => (
        <OrderCard key={order._id} order={order} onCancel={handleCancelOrder} />
      ))}
      <CustomPagination
        pageState={pageState}
        onChangePage={handlePageStateChange}
      />
    </div>
  );
};

export default PendingOrders;
