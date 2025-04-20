"use client";
import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMilktea } from "@/models/milkteaModel";
import DeleteMilktea from "./deleteMilktea";
import { motion } from "framer-motion";

export interface INewMilktea extends IMilktea {
  _id: string;
}

const Page = () => {
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["milktea"],
    queryFn: () => getMilktea({}),
  });

  const tableHeaders = ["Name", "Description", "Actions"];

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

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    return data?.data?.map((milktea: INewMilktea) => (
      <TableRow key={milktea._id}>
        <TableCell>{milktea.name}</TableCell>
        <TableCell>{milktea.description}</TableCell>
        <TableCell>
          <DeleteMilktea refetch={refetch} record={milktea} />
          <Button
            variant="ghost"
            className="cursor-pointer hover:underline"
            onClick={() =>
              router.push(`/admin/products/editMilktea/${milktea._id}`)
            }
          >
            <Pencil className="text-blue-400" />
          </Button>
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
      <TitlePage title="Products" />
      <div className="mt-6">
        <Button
          variant="link"
          onClick={() => router.push("/admin/products/addProduct")}
          className="hover:underline cursor-pointer"
        >
          <Plus />
          Add Product
        </Button>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header: string, idx: number) => (
                  <TableHead key={idx}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
