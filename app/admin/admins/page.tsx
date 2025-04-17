"use client";

import TitlePage from "@/components/titlePage";
import React, { useEffect, useState } from "react";

import AddAdmin from "./addAdmin";
import SearchForm from "@/components/searchForm";
import { getAdmin } from "@/service/api";
import { searchProps } from "./searchProps";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IAdmin } from "@/models/adminModel";
import { Loader2, Pencil, Trash } from "lucide-react";

const Page = () => {
  const [dataAdmin, setDataAdmin] = useState<IAdmin[]>([]);
  const tableHeaders: string[] = ["Username", "Status", "Actions"];

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmin({}),
  });

  useEffect(() => {
    if (data) {
      setDataAdmin(data.data);
    }
  }, [data]);

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin" />
              <span className="ml-2">Loading...</span>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (dataAdmin.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    return dataAdmin.map((admin: IAdmin, index: number) => (
      <TableRow key={index}>
        <TableCell>{admin.username}</TableCell>
        <TableCell>{admin.status}</TableCell>
        <TableCell className="flex gap-2 ">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer hover:scale-105 transition"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer hover:scale-105 transition"
          >
            <Trash />
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <TitlePage title="List of Admins" />
      <div className="mt-6">
        <AddAdmin refetch={refetch} />
        <SearchForm
          api={getAdmin}
          result={setDataAdmin}
          searchProps={searchProps}
        />
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
