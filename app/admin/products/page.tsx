"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Pencil, Plus, Tag } from "lucide-react";

import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMilktea } from "@/service/api";
import { IMilktea } from "@/models/milkteaModel";
import { setMilktea } from "@/redux/slices/milkteaSlice";

import DeleteMilktea from "./deleteMilktea";
import SaleMilktea from "./saleMilktea";

export interface INewMilktea extends IMilktea {
  _id: string;
}

const tableHeaders = ["Name", "Description", "Sale", "Actions"];

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["milktea"],
    queryFn: () => getMilktea({}),
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setMilktea(data.data));
    }
  }, [data, dispatch]);

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

    if (!data || data.data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} className="text-center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    return data.data.map((milktea: INewMilktea) => (
      <TableRow key={milktea._id}>
        <TableCell>{milktea.name}</TableCell>

        <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">
          {milktea.description}
        </TableCell>

        <TableCell>
          {milktea.isSale ? (
            <Badge>Discounted</Badge>
          ) : (
            <Badge variant="secondary">Not Discounted</Badge>
          )}
        </TableCell>

        <TableCell className="flex items-center gap-2">
          <DeleteMilktea refetch={refetch} record={milktea} />

          <Button
            variant="ghost"
            size="icon"
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

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TitlePage title="Products" />

      <div className="mt-6 space-y-4">
        <div className="flex gap-2">
          <Button
            variant="link"
            size="sm"
            onClick={() => router.push("/admin/products/addProduct")}
          >
            <Plus />
            Add Product
          </Button>

          <Button
            variant="link"
            size="sm"
            onClick={() => router.push("/admin/products/taggedProducts")}
          >
            <Tag />
            Tagged Products
          </Button>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block p-2">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, idx) => (
                  <TableHead key={idx}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-3">
          {!isLoading &&
            data?.data?.map((milktea: INewMilktea) => (
              <Card key={milktea._id} className="p-4">
                <h3 className="font-semibold">{milktea.name}</h3>
                {milktea.isSale ? (
                  <Badge>Discounted</Badge>
                ) : (
                  <Badge variant="secondary">Not Discounted</Badge>
                )}
                <p className="text-sm text-muted-foreground truncate">
                  {milktea.description}
                </p>

                <div className="flex gap-2">
                  <DeleteMilktea refetch={refetch} record={milktea} />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      router.push(
                        `/admin/products/editMilktea/${milktea._id}`
                      )
                    }
                  >
                    <Pencil className="text-blue-400" />
                  </Button>

                  <SaleMilktea record={milktea} refetch={refetch} />
                </div>
              </Card>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
