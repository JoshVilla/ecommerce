"use client";
import TitlePage from "@/components/titlePage";
import { getCustomers } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { IUser } from "@/models/userModel";
import { Loader2 } from "lucide-react";
import { formattedDate } from "@/utils/nonAsyncHelpers";

const page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers({}),
  });

  const tableHeaders = ["Name", "Joined last"];

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

    if (data.data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    return data.data.map((user: IUser, index: number) => (
      <TableRow key={index}>
        <TableCell>{`${user.firstname} ${user.middlename?.charAt(0)}. ${
          user.lastname
        }`}</TableCell>

        <TableCell>{formattedDate(user?.createdAt)}</TableCell>
        {/* <TableCell className="flex gap-2 ">
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
        </TableCell> */}
      </TableRow>
    ));
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TitlePage title="Customers" />
        <div className="mt-6">
          {/* <SearchForm
          api={getAdmin}
          result={setDataAdmin}
          searchProps={searchProps}
        /> */}
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
    </div>
  );
};

export default page;
