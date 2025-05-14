"use client";

import { INewMilktea } from "@/app/admin/products/page";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { Button } from "@/components/ui/button";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MilkteaInfo from "./milkteaInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders } from "@/utils/types";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const state = useSelector(
    (state: RootState) => state.myOrders.myOrders as IMyOrders[]
  );
  const [countOrders, setCountOrders] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getMilktea({}),
  });

  const milkteas = data?.data ?? [];

  useEffect(() => {
    setCountOrders(state.length);
  }, [state]);

  return (
    <Container>
      <TitlePage title="All Products" />
      <div className="my-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            {milkteas.map((milktea: INewMilktea) => (
              <div key={milktea._id} className="w-40 h-72">
                <div className="border h-50 w-40 relative">
                  <Image
                    src={milktea.imageUrl}
                    alt={milktea.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="mt-4">{milktea.name}</div>
                <div className="text-gray-500 text-xs line-clamp-2 overflow-hidden">
                  {milktea.description}
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

      {/* Cart Widget */}
      <Button className="absolute bottom-0 right-4">
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          <Badge className="absolute -top-2 -right-3 px-1.5 py-0 text-xs rounded-full bg-white text-black">
            {countOrders}
          </Badge>
        </div>
      </Button>
    </Container>
  );
};

export default Page;
