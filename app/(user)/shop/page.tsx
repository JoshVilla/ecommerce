"use client";

import { INewMilktea } from "@/app/admin/products/page";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, {ReactNode, useEffect, useState} from "react";
import MilkteaInfo from "./milkteaInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders } from "@/utils/types";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getMilktea({}),
  });

  const milkteas = data?.data ?? [];


  return (
    <Container>
      <TitlePage title="All Products" />
      <div className="my-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            {milkteas.map((milktea: INewMilktea):ReactNode => (
                <div key={milktea._id} className="w-40 h-80 flex flex-col justify-between">
                    <div>
                        <div className="border h-50 w-40 relative">
                            <Image
                                src={milktea.imageUrl}
                                alt={milktea.name}
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mt-4 font-semibold">{milktea.name}</div>
                        <div className="text-gray-500 text-xs line-clamp-2 overflow-hidden">
                            {milktea.description}
                        </div>
                    </div>

                    <div className="mt-4 space-x-3">
                        <MilkteaInfo record={milktea} />
                        <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                        >
                            <Heart />
                        </Button>
                    </div>
                </div>

            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
