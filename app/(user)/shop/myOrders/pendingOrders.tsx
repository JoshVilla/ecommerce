"use client";
import OrderProgressStepper from "@/components/orderProgressStepper";
import { RootState } from "@/redux/store/store";
import { getOrders } from "@/service/api";
import { IOrder, IUserState } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";

const PendingOrders = () => {
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const customerId = userState?._id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders({ customerId }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-4">
        {data?.data?.map((order: IOrder, index: number) => (
          <div className="border-3 rounded-lg p-4" key={index}>
            <OrderProgressStepper orderStatus={order.orderStatus} />
            <div>
              <div className="text-md text-gray-700 font-bold">Orders</div>
              <div className="space-y-2">
                {order.orderList.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs text-gray-500">
                      <div className="font-bold">{`${item.quantity}x ${item.product}`}</div>
                      <div>{item.description}</div>
                      <div>Total: {item.total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="font-bold mt-4 ttext-md">
                Total: {order.total.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
