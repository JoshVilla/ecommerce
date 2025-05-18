"use client";

import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getOrders } from "@/service/api";
import { ORDER_STATUS } from "@/utils/constant";
import { IOrder } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RenderOrderStatusBadge from "@/components/orderStatus";
import ViewOrders from "./viewOrders";

const Page = () => {
  const { data, isLoading } = useQuery<{ data: IOrder[] }>({
    queryKey: ["order"],
    queryFn: () => getOrders({}),
  });

  const orders = data?.data ?? [];

  const tableHeaders = ["Customer Name", "Status", "Actions"];

  const cancelledOrderList = useMemo(() => {
    return orders.filter(
      (order) => order.orderStatus === ORDER_STATUS.DELIVERED
    );
  }, [orders]);

  if (isLoading) {
    return (
      <Container>
        <TitlePage title="Cancelled Orders" />
        <div className="my-6">Loading...</div>
      </Container>
    );
  }

  const renderTableRows = () => {
    if (cancelledOrderList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No cancelled orders found
          </TableCell>
        </TableRow>
      );
    }

    return cancelledOrderList.map((order) => (
      <TableRow key={order._id}>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell>
          <RenderOrderStatusBadge status={order.orderStatus} />
        </TableCell>
        <TableCell>
          <ViewOrders orders={order.orderList} />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Container>
      <TitlePage title="Cancelled Orders" />
      <div className="my-6">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header: string, idx: number) => (
                <TableHead key={`${header}${idx}`}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default Page;
