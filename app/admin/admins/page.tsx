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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IAdmin } from "@/models/adminModel";
import { Loader2, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";
import SearchFormWithParams from "@/components/SearchFormWithParams";
import DeleteAdmin from "./deleteAdmin";

const Page = () => {
  const [dataAdmin, setDataAdmin] = useState<IAdmin[]>([]);
  const [searchParams, setSearchParams] = useState({});
  const tableHeaders: string[] = ["Username", "Status", "Actions"];

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["admins", searchParams],
    queryFn: () => getAdmin(searchParams),
  });

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

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
          <DeleteAdmin id={admin._id} refetch={refetch} />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TitlePage title="List of Admins" />
      <div className="mt-6">
        <AddAdmin refetch={refetch} />
        <SearchFormWithParams
          searchProps={searchProps}
          onSearch={handleSearch}
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
    </motion.div>
  );
};

export default Page;
