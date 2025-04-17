"use client";
import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash } from "lucide-react";
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

export interface INewMilktea extends IMilktea {
  _id: string;
}

const Page = () => {
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["milktea"],
    queryFn: () => getMilktea({}),
  });

  const tableHeader = ["Name", "Description", "Actions"];
  return (
    <div>
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
                {tableHeader.map((header: string, idx: number) => (
                  <TableHead key={idx}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((milktea: INewMilktea) => (
                <TableRow key={milktea._id}>
                  <TableCell>{milktea.name}</TableCell>
                  <TableCell>{milktea.description}</TableCell>
                  <TableCell>
                    <DeleteMilktea refetch={refetch} record={milktea} />
                    <Button
                      variant="ghost"
                      className="cursor-pointer hover:underline"
                    >
                      <Pencil className="text-blue-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
