"use client";

import { INewMilktea } from "@/app/admin/products/page";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getTaggedMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { motion } from "framer-motion";
import MilkTeaCard from "@/components/milkteaCard";
import { ANIMATION_CONFIG, LOADER_COUNT, TAG_CATEGORY } from "@/utils/constant";
import MilkteaLoader from "@/components/loader/milkteaLoader";

const ProductGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-6 flex-wrap">{children}</div>
);

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["new-products"],
    queryFn: () => getTaggedMilktea({ category: TAG_CATEGORY.NEW_PRODUCT }),
  });

  const milkteas = data?.data[0]?.milkteaIds ?? [];

  return (
    <Container>
      <TitlePage title="New Products" />
      <div className="my-10">
        <ProductGrid>
          {isLoading
            ? Array.from({ length: LOADER_COUNT }).map((_, index) => (
                <MilkteaLoader key={`loader-${index}`} />
              ))
            : milkteas.map((milktea: INewMilktea, index: number) => (
                <motion.div
                  key={milktea._id}
                  className="w-40 h-80 flex flex-col justify-between"
                  {...ANIMATION_CONFIG}
                  transition={{
                    ...ANIMATION_CONFIG.transition,
                    delay: index * 0.1,
                  }}
                >
                  <MilkTeaCard data={milktea} />
                </motion.div>
              ))}
        </ProductGrid>
      </div>
    </Container>
  );
};

export default Page;
