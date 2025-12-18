"use client";
import React, { useMemo, useState } from "react";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders, IUser, IUserAddress, IUserState } from "@/utils/types";
import { Check, Info, MapPin, Phone, Scroll, Trash2 } from "lucide-react";
import {
  clearMyOrders,
  removeOrder,
  updateQuantity,
} from "@/redux/slices/myOrdersSlice";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ORDER_STATUS, PAYMENT_SERVICE } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { setOrder } from "@/service/api";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [paymentServiceCode, setPaymentServiceCode] = useState(0);
  const addressState = useSelector(
    (state: RootState) => (state.user.user as IUserState).address
  ) as IUserAddress;
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const userPhone = userState.phone;
  const orderList = useSelector(
    (state: RootState) => state.myOrders.myOrders as IMyOrders[]
  );

  const user = useSelector((state: RootState) => state.user.user as IUser);
  const userName = `${user.firstname} ${user.middlename.charAt(0)} ${
    user.lastname
  }`;
  const userId = user?._id;
  const dispatch = useDispatch();

  const handleRemoveOrder = (id: string) => {
    dispatch(removeOrder(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, newQuantity }));
    }
  };

  const grandTotal: number = useMemo(() => {
    let total = 0;
    orderList.forEach((order: IMyOrders) => {
      total += order.total;
    });
    return total;
  }, [orderList]);

  const orderMutation = useMutation({
    mutationFn: setOrder,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        dispatch(clearMyOrders());
        router.push("/shop/myOrders");
      } else {
        toast.error(data.message);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handlePlaceOrder = () => {
    let params: any = {
      customerId: userId,
      customerName: userName,
      total: grandTotal + 20,
      orderStatus: ORDER_STATUS.CONFIRMING,
      orderList,
      paymentServiceMode:
        paymentServiceCode === 0 ? PAYMENT_SERVICE.PICKUP : PAYMENT_SERVICE.COD,
    };

    if (paymentServiceCode !== 0) {
      params.address = user.address;
    }

    orderMutation.mutate(params);
  };

  const renderList = () => {
    return orderList.length > 0 ? (
      <AnimatePresence>
        {orderList.map((order: IMyOrders, idx: number) => (
          <motion.div
            key={order.id} // use stable key
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            className="flex gap-4 mb-4"
          >
            <Image
              src={order.image}
              alt="milktea"
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="space-y-2 w-80">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg">{order.product}</div>
                <div
                  className="text-red-500 cursor-pointer hover:scale-110"
                  onClick={() => handleRemoveOrder(order.id)}
                >
                  <Trash2 height={20} />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    handleQuantityChange(order.id, order.quantity - 1)
                  }
                  disabled={order.quantity <= 1}
                >
                  <ArrowLeft />
                </Button>
                <span>{order.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    handleQuantityChange(order.id, order.quantity + 1)
                  }
                >
                  <ArrowRight />
                </Button>
              </div>
              <div className="text-xs text-gray-500">{order.description}</div>
              <div className="font-semibold text-sm text-green-600">
                ₱{order.total.toFixed(2)}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    ) : (
      <div className="text-sm text-gray-500">No Order</div>
    );
  };

  return (
    <Container>
      <TitlePage title="My Cart" hasBack />
      <div className="my-6 space-y-6">
        {renderList()}
        {orderList.length > 0 && (
          <div className=" p-4">
            <div>
              <div className="font-bold mb-4">Choose Service</div>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Pickup */}
                <div
                  className="flex-1 p-2  cursor-pointer"
                  style={{
                    borderBottom:
                      paymentServiceCode === 0
                        ? "4px solid skyBlue"
                        : undefined,
                    borderRadius: 4,
                  }}
                  onClick={() => setPaymentServiceCode(0)}
                >
                  <div className="font-semibold text-sm mb-1">Pickup Order</div>
                  <div className="text-sm text-gray-500 flex gap-2">
                    <MapPin width={15} />
                    <div>
                      <div>{`${addressState.barangay}, ${addressState.city}, ${addressState.province}, ${addressState.region}`}</div>
                      <div>{`${addressState.otherAddress}`}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Info width={15} />
                    <span>{`${addressState.addressInfo}`}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone width={15} />
                    <span>{`${userPhone}`}</span>
                  </div>
                </div>
                {/* Address */}
                <div
                  className="flex-1 p-2  cursor-pointer"
                  style={{
                    borderBottom:
                      paymentServiceCode === 1
                        ? "4px solid skyBlue"
                        : undefined,
                    borderRadius: 4,
                  }}
                  onClick={() => setPaymentServiceCode(1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm mb-1">
                      Cash on Delivery
                    </div>
                    <div
                      className="text-xs text-sky-500 cursor-pointer hover:underline"
                      onClick={() => router.push("/shop/settings")}
                    >
                      Change Address
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex gap-2">
                    <MapPin width={15} />
                    <div>
                      <div>{`${addressState.barangay}, ${addressState.city}, ${addressState.province}, ${addressState.region}`}</div>
                      <div>{`${addressState.otherAddress}`}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Info width={15} />
                    <span>{`${addressState.addressInfo}`}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone width={15} />
                    <span>{`${userPhone}`}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-lg font-bold mt-6">
              Total: P{grandTotal.toFixed(2)}
            </div>
            <div>Delivery Fee: 20</div>
            <Separator />
            <div className="flex items-center justify-between  mt-4">
              <div className="text-lg font-bold">
                Grand Total: {grandTotal + 20}.00
              </div>
              <Button
                className="cursor-pointer"
                onClick={handlePlaceOrder}
                disabled={orderMutation.isPending}
              >
                {orderMutation.isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
