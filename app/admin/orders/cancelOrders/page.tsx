"use client";

import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getOrders } from "@/service/api";
import { ORDER_STATUS } from "@/utils/constant";
import { IOrder, IPagination } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RenderOrderStatusBadge from "@/components/orderStatus";
import ViewOrders from "./viewOrders";
import PaginationComponent from "@/components/Pagination";

const Page = () => {
  const [pageState, setPageState] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 5,
  });

  const { data, isLoading } = useQuery<{
    data: { orders: IOrder[]; pagination: IPagination };
  }>({
    queryKey: ["order", pageState],
    queryFn: () =>
      getOrders({
        currentPage: pageState.currentPage,
        limit: pageState.itemsPerPage,
      }),
    enabled: !!pageState.currentPage,
  });

  const orders = data?.data?.orders ?? [];

  useEffect(() => {
    if (data?.data?.pagination) {
      setPageState((prev) => ({
        ...prev,
        totalPages: data.data.pagination.totalPages,
        totalItems: data.data.pagination.totalItems,
      }));
    }
  }, [data]);

  const tableHeaders = ["Customer Name", "Status", "Actions"];

  const cancelledOrderList = useMemo(() => {
    return orders.filter(
      (order) => order.orderStatus === ORDER_STATUS.CANCELLED
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
        <div className="my-2">
          <PaginationComponent
            pageState={pageState}
            onChangeLimit={(limit) => {
              console.log(limit);
              setPageState((prev) => ({
                ...prev,
                itemsPerPage: limit,
              }));
            }}
            onChangePage={(page) => {
              setPageState((prev) => ({
                ...prev,
                currentPage: page,
              }));
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
