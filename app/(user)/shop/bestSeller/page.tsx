"use client";

import { INewMilktea } from "@/app/admin/products/page";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getMilktea, getTaggedMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import MilkTeaCard from "@/components/milkteaCard";
import { TAG_CATEGORY } from "@/utils/constant";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getTaggedMilktea({ category: TAG_CATEGORY.BEST_SELLER }),
  });

  const milkteas = data?.data[0].milkteaIds ?? [];

  return (
    <Container>
      <TitlePage title="Best Seller" />
      <div className="my-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex items-center gap-6 flex-wrap">
            {milkteas.map(
              (milktea: INewMilktea, index: number): ReactNode => (
                <motion.div
                  key={milktea._id}
                  className="w-40 h-80 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <MilkTeaCard data={milktea} />
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
