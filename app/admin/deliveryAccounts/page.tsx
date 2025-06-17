"use client";

import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import React from "react";
import AddAccount from "./addAccount";
import { useQuery } from "@tanstack/react-query";
import { getDeliveryAccount } from "@/service/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteAccount from "./deleteAccount";

const page = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: () => getDeliveryAccount({}),
  });

  const list = data?.data || [];

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={1} className="text-center">
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin" />
              <span className="ml-2">Loading...</span>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (list.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={1} className="text-center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    return list.map((deliver: any, index: number) => (
      <TableRow key={index}>
        <TableCell>{deliver.username}</TableCell>

        <TableCell className="flex gap-2 ">
          <DeleteAccount refetch={refetch} id={deliver._id} />
        </TableCell>
      </TableRow>
    ));
  };
  return (
    <Container>
      <TitlePage title="Delivery Accounts" />
      <div className="my-6 space-y-4">
        <AddAccount refetch={refetch} />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default page;
