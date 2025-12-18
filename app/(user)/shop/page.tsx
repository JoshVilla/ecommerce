"use client";

import { INewMilktea } from "@/app/admin/products/page";
import Container from "@/components/container";
import TitlePage from "@/components/titlePage";
import { getMilktea } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import MilkTeaCard from "@/components/milkteaCard";
import MilkteaLoader from "@/components/loader/milkteaLoader";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getMilktea({}),
  });

  const milkteas = data?.data ?? [];

  const countLoader = new Array(6).fill(0);
  return (
    <Container>
      <TitlePage title="All Products" />
      <div className="my-10">
        {isLoading ? (
          <div className="flex items-center gap-6 flex-wrap">
            {countLoader.map((_, index) => (
              <MilkteaLoader key={index} />
            ))}
          </div>
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
