"use client";
import React, { useMemo } from "react";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LeftArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/left-arrow";
import { RightArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders, IUser, IUserAddress, IUserState } from "@/utils/types";
import { Trash2 } from "lucide-react";
import { removeOrder, updateQuantity } from "@/redux/slices/myOrdersSlice";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const addressState = useSelector(
    (state: RootState) => (state.user.user as IUserState).address
  ) as IUserAddress;
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

  const handlePlaceOrder = () => {
    console.log({
      customerId: userId,
      customerName: userName,
      address: user.address,
      total: grandTotal + 20,
      orderList,
    });
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
                  <LeftArrow />
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
                  <RightArrow />
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
      <TitlePage title="My Orders" hasBack />
      <div className="my-6 space-y-6">
        {renderList()}
        {orderList.length > 0 && (
          <div className="border-2 p-4">
            {/* Address */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">Delivery Address</div>
                <div
                  className="text-xs text-sky-500 cursor-pointer hover:underline"
                  onClick={() => router.push("/shop/settings")}
                >
                  Change Address
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {`${addressState.barangay}, ${addressState.city}, ${addressState.province}, ${addressState.region}`}
              </div>
              <div className="text-sm text-gray-500">{`${addressState.otherAddress}`}</div>
              <div className="text-sm text-gray-500">{`${addressState.addressInfo}`}</div>
            </div>

            <Separator />

            <div className="text-lg font-bold mt-6">
              Total: P{grandTotal.toFixed(2)}
            </div>
            <div>Delivery Fee: 20</div>
            <Separator />
            <div className="flex items-center justify-between  mt-4">
              <div className="text-lg font-bold">
                Grand Total: {grandTotal + 20}
              </div>
              <Button className="cursor-pointer" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
