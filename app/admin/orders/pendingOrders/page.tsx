"use client";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrders, getPendingOrder, updateOrderStatus } from "@/service/api";
import { ORDER_STATUS } from "@/utils/constant";
import { IMyOrders, IOrder, IUserState } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { paymentServiceText } from "@/utils/nonAsyncHelpers";
import RenderOrderStatusBadge from "@/components/orderStatus";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { motion } from "framer-motion";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";
import PaginationComponent from "@/components/pagination";

const ORDER_STATUS_DELIVER_OPTIONS = [
  { value: ORDER_STATUS.CONFIRMING, label: "Confirming" },
  { value: ORDER_STATUS.PREPARING, label: "Preparing" },
  { value: ORDER_STATUS.DELIVERING, label: "Delivering" },
  { value: ORDER_STATUS.DELIVERED, label: "Delivered" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancel" },
];

const ORDER_STATUS_PICKUP_OPTIONS = [
  { value: ORDER_STATUS.CONFIRMING, label: "Confirming" },
  { value: ORDER_STATUS.PREPARING, label: "Preparing" },
  { value: ORDER_STATUS.DELIVERED, label: "Ready to Pickup" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancel" },
];

const ORDER_STATUS_OPTIONS = (serviceMode: number) =>
  !serviceMode ? ORDER_STATUS_PICKUP_OPTIONS : ORDER_STATUS_DELIVER_OPTIONS;

const Page = () => {
  const { pageState, handlePageStateChange, handleSetInitialPage } =
    usePagination({
      initialItemsPerPage: 6,
    });
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const [pendingOrderData, setPendingOrderData] = useState<IOrder[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", pageState.currentPage],
    queryFn: () =>
      getPendingOrder({
        currentPage: pageState.currentPage,
        itemsPerPage: pageState.itemsPerPage,
      }),
    refetchInterval: 10000,
  });

  const updateMutation = useMutation({
    mutationFn: updateOrderStatus,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleStatusChange = (orderId: string, newStatus: number) => {
    setPendingOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    updateMutation.mutate({ orderId, newStatus });
  };

  useEffect(() => {
    if (data?.data.orders) {
      setPendingOrderData(data.data.orders);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.pagination) {
      handleSetInitialPage(data.data.pagination);
    }
  }, [data?.data?.pagination, handleSetInitialPage]);

  return (
    <Container>
      <TitlePage title="Pending Orders" hasBack />

      {pendingOrderData.length === 0 && !isLoading && (
        <div className="my-4 text-sm text-gray-500">No Pending Orders</div>
      )}
      {isLoading && (
        <div className="my-4 text-sm text-gray-500 animate-pulse">
          Loading orders...
        </div>
      )}

      <div className="my-6 flex items-center flex-wrap gap-8">
        {pendingOrderData.map((order: IOrder, index: number) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-2 w-full md:w-80 p-3 rounded-lg space-y-3"
            key={order._id}
          >
            <div className="flex items-center justify-between">
              <RenderOrderStatusBadge status={order.orderStatus} />
              <Select
                value={order.orderStatus.toString()}
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id as string, parseInt(newStatus))
                }
              >
                <SelectTrigger className="w-[120px] text-sm h-[30px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  <SelectGroup>
                    {ORDER_STATUS_OPTIONS(order.paymentServiceMode).map(
                      (option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="text-xs text-gray-600 space-y-1">
              <div className="font-semibold mb-2">
                {paymentServiceText(order.paymentServiceMode)}
              </div>

              <div>
                <span className="font-semibold">Customer Name:</span>{" "}
                {order.customerName}
              </div>

              {order.address && (
                <div>
                  <span className="font-semibold">Address:</span>{" "}
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
              )}

              <div>
                <div className="font-semibold mt-2">Orders</div>
                <div className="space-y-1">
                  {order.orderList.map((item: IMyOrders, itemIndex: number) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                    >
                      <div>{`${item.quantity}x ${item.product}`}</div>
                      <div>{item.description}</div>
                      <div>{`Total: ₱${item.total.toFixed(2)}`}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm font-semibold text-gray-700">
              {`Grand Total: ₱${order.total.toFixed(2)}`}
            </div>
          </motion.div>
        ))}
        <PaginationComponent
          pageState={pageState}
          onChangePage={handlePageStateChange}
        />
      </div>
    </Container>
  );
};

export default Page;
