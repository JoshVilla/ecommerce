"use client";
import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Tag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { setMilktea } from "@/redux/slices/milkteaSlice";
import SaleMilktea from "./saleMilktea";
import { Badge } from "@/components/ui/badge";

export interface INewMilktea extends IMilktea {
  _id: string;
}

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["milktea"],
    queryFn: () => getMilktea({}),
  });

  const tableHeaders = ["Name", "Description", "Sale", "Actions"];

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
        <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">
          {milktea.description}
        </TableCell>
        <TableCell>
          {milktea.isSale ? (
            <Badge color="blue">Discounted</Badge>
          ) : (
            <Badge variant="secondary">Not Discounted</Badge>
          )}
        </TableCell>
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
          <SaleMilktea record={milktea} refetch={refetch} />
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(setMilktea(data?.data));
  }, [data]);

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
          size="sm"
        >
          <Plus />
          Add Product
        </Button>

        <Button
          variant="link"
          onClick={() => router.push("/admin/products/taggedProducts")}
          className="hover:underline cursor-pointer"
          size="sm"
        >
          <Tag />
          Tagged Products
        </Button>

        <div className="p-2 mt-4">
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
