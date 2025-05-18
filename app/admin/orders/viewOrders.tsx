import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IMyOrders } from "@/utils/types";

interface Props {
  orders: IMyOrders[];
}
const ViewOrders = ({ orders }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="text-xs cursor-pointer text-sky-500"
        >
          View Orders
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List of Orders</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {orders.map((order) => (
            <div className="text-xs text-gray-600" key={order.id}>
              <div>{`${order.quantity}x ${order.product}`}</div>
              <div>{order.description}</div>
              <div className="font-bold">P{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {/* <DialogFooter>
          <Button type="submit" size="sm">
            Ok
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrders;
