"use client";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { Separator } from "@/components/ui/separator";
import { Info, Loader2, Plus } from "lucide-react";

import React, { useEffect, useState } from "react";
import MilkteaList from "./milteaList";
import { TAG_CATEGORY } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import { getTaggedMilktea } from "@/service/api";

interface IProduct {
  id: string;
  name: string;
}

const TaggedProducts = () => {
  const [newProductsData, setNewProductsData] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState([]);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tagMilktea"],
    queryFn: () => getTaggedMilktea({}),
  });

  useEffect(() => {
    if (data?.data?.length) {
      const newProduct = data.data.find(
        (item: any) => item.category === TAG_CATEGORY.NEW_PRODUCT
      );
      const bestSeller = data.data.find(
        (item: any) => item.category === TAG_CATEGORY.BEST_SELLER
      );
      const promo = data.data.find(
        (item: any) => item.category === TAG_CATEGORY.PROMO_DISCOUNT
      );

      setNewProductsData(newProduct?.milkteaIds || []);
      setBestSellerData(bestSeller?.milkteaIds || []);
      setPromoDiscount(promo?.milkteaIds || []);
    }
  }, [data]);

  const renderList = (data: IProduct[]) => {
    if (isLoading) {
      return (
        <div className="flex gap-2 items-center justify-center my-10">
          <Loader2 className="animate-spin" width={20} /> Getting Data
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-gray-500 text-center my-10 text-sm">
          No Product Added
        </div>
      );
    }

    return (
      <div className="my-4 space-y-3">
        {data.map((product: IProduct) => (
          <div key={product.id ?? product.name}>{product.name}</div>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <TitlePage title="Tagged Products" hasBack />
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-5 gap-4">
          <div className="row-span-2 p-4">
            <div className="flex items-center justify-between mb-2">
              {" "}
              <div>
                <div className="text-xl font-bold">New Products</div>
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  <Info width={15} /> Include products under the “New Products”
                  section.
                </span>
              </div>
              <MilkteaList
                refetch={refetch}
                category={TAG_CATEGORY.NEW_PRODUCT}
                defaultItems={newProductsData}
              />
            </div>
            <Separator />
            {renderList(newProductsData)}
          </div>
          <div className="row-span-2 p-4">
            <div className="flex items-center justify-between mb-2">
              {" "}
              <div>
                <div className="text-xl font-bold">Best Seller</div>
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  <Info width={15} /> Include products under the “Best Seller”
                  section.
                </span>
              </div>
              <MilkteaList
                refetch={refetch}
                category={TAG_CATEGORY.BEST_SELLER}
                defaultItems={bestSellerData}
              />
            </div>
            <Separator />
            {renderList(bestSellerData)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TaggedProducts;
