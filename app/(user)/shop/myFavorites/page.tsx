"use client";
import { INewMilktea } from "@/app/admin/products/page";
import MilkTeaCard from "@/components/milkteaCard";
import TitlePage from "@/components/titlePage";
import { RootState } from "@/redux/store/store";
import { getMyFavorites } from "@/service/api";
import { IUserState } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const customerId = userState?._id;

  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getMyFavorites({ customerId }),
  });

  const favorites = data?.data?.favorites || [];

  console.log(favorites);

  if (isLoading) return <p>Loading...</p>;

  if (favorites.length === 0) return <p>No favorites</p>;
  return (
    <div>
      <TitlePage title="My Favorites" />
      <div className="flex items-center gap-6 flex-wrap my-6">
        {favorites.map(
          (favorite: INewMilktea, index: number): ReactNode => (
            <motion.div
              key={favorite._id}
              className="w-40 h-80 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <MilkTeaCard data={favorite} />
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
