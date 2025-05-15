"use client";
import React from "react";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LeftArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/left-arrow";
import { RightArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/right-arrow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders } from "@/utils/types";
import { Trash2 } from "lucide-react";
import { removeOrder, updateQuantity } from "@/redux/slices/myOrdersSlice";

const Page = () => {
    const orderList = useSelector(
        (state: RootState) => state.myOrders.myOrders as IMyOrders[]
    );

    const dispatch = useDispatch();

    const handleRemoveOrder = (id: string) => {
        dispatch(removeOrder(id));
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id, newQuantity }));
        }
    };

    return (
        <Container>
            <TitlePage title="My Orders" hasBack />
            <div className="my-6 space-y-6">
                {orderList.map((order: IMyOrders, idx: number) => (
                    <div className="flex gap-4" key={idx}>
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
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Page;
