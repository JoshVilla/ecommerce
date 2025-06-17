"use client";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getOrders } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/utils/types";
import RenderOrderStatusBadge from "@/components/orderStatus";
import ViewOrders from "./viewOrders";
import { formattedDate } from "@/utils/nonAsyncHelpers";
import SearchFormWithParams from "@/components/SearchFormWithParams";
import { searchProps } from "./searchProps";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CustomPaginationComponent from "@/components/pagination";

const Page = () => {
  const router = useRouter();
  const {
    pageState,
    handlePageStateChange,
    handleResetPage,
    handleSetInitialPage,
  } = usePagination({
    initialItemsPerPage: 5,
  });
  const [searchParams, setSearchParams] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["orders", pageState.currentPage, searchParams],
    queryFn: () =>
      getOrders({
        ...searchParams,
        currentPage: pageState.currentPage,
        itemsPerPage: pageState.itemsPerPage,
      }),
  });

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination;

  useEffect(() => {
    if (pagination) {
      handleSetInitialPage(pagination);
    }
  }, [pagination]);

  const tableHeader = [
    "Customer Name",
    "Service",
    "Status",
    "Ordered Last",
    "Actions",
  ];

  const renderTableRows = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeader.length}>Loading...</TableCell>
        </TableRow>
      );
    }
    if (orders.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeader.length} className="text-gray-500">
            No orders found
          </TableCell>
        </TableRow>
      );
    }

    return orders.map((order: IOrder) => (
      <TableRow key={order._id}>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {order.paymentServiceMode ? "Cash on Delivery" : "Pickup"}
        </TableCell>
        <TableCell>
          <RenderOrderStatusBadge
            status={order.orderStatus}
            paymentService={order.paymentServiceMode}
          />
        </TableCell>
        <TableCell>{formattedDate(order.createdAt)}</TableCell>
        <TableCell>
          <ViewOrders orders={order.orderList} />
        </TableCell>
      </TableRow>
    ));
  };

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  return (
    <Container>
      <TitlePage title="All Orders" />
      <div>
        <Button
          variant="default"
          size="sm"
          className="mt-6 cursor-pointer"
          onClick={() => router.push("/admin/orders/pendingOrders")}
        >
          Pending Orders
        </Button>
        <SearchFormWithParams
          searchProps={searchProps}
          onSearch={handleSearch}
          onReset={() => handleResetPage()}
        />
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((header: string) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
        <div>
          <CustomPaginationComponent
            pageState={pageState}
            onChangePage={(page) => handlePageStateChange(page)}
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
