"use client";
import MilkteaInfo from "@/app/(user)/shop/milkteaInfo";
import { INewMilktea } from "@/app/admin/products/page";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge, Heart } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMyFavorites, removeMyFavorites } from "@/service/api";
import { IUserState } from "@/utils/types";
import {
  dispatchAddFavorite,
  dispatchRemoveFavorite,
} from "@/redux/slices/favoriteSlices";

interface Props {
  data: INewMilktea;
}

const MilkTeaCard = ({ data }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const customerId = userState?._id;
  const favoriteState = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const [mode, setMode] = useState<"add" | "remove">("add");

  const mutation = useMutation({
    mutationFn: mode === "add" ? addMyFavorites : removeMyFavorites,
    onMutate: async ({ customerId, milkTeaId }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", customerId] });

      const previousFavorites = queryClient.getQueryData([
        "favorites",
        customerId,
      ]);

      queryClient.setQueryData(["favorites", customerId], (old: any) => ({
        ...old,
        favorites: [...(old?.favorites || []), data],
        milkteaIds: [...(old?.milkteaIds || []), milkTeaId],
      }));

      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["favorites", variables.customerId],
        context?.previousFavorites
      );
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.customerId],
      });
    },
  });

  const handleAddFavorite = (milkteaId: string, modeF: "add" | "remove") => {
    setMode(modeF);

    if (!customerId) return;

    if (modeF === "remove") {
      dispatch(dispatchRemoveFavorite(milkteaId));
    } else {
      dispatch(dispatchAddFavorite(milkteaId));
    }

    mutation.mutate({ customerId, milkteaId: milkteaId });
  };

  // Don't render Image component if imageUrl is empty string
  const shouldRenderImage = data.imageUrl !== "";

  return (
    <React.Fragment>
      <div>
        <motion.div
          className="border h-50 w-40 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {shouldRenderImage && (
            <Image
              src={data.imageUrl ?? null}
              alt={data.name}
              fill
              priority
              className="object-cover rounded"
              sizes="(100vw: 100%)"
            />
          )}
        </motion.div>
        <div className=" mt-4 flex flex-col">
          {data.isSale && (
            <div className=" bg-green-500 text-xs px-2 rounded-sm text-white w-[70px]  text-center">{`${data.saleAmount}% OFF`}</div>
          )}
          <div className="font-semibold">{data.name}</div>
          <div className="text-gray-500 text-xs line-clamp-2 overflow-hidden">
            {data.description}
          </div>
        </div>
      </div>

      <div className="mt-4 space-x-3">
        <MilkteaInfo record={data} />
        <Button
          size="sm"
          variant={favoriteState.includes(data._id) ? "destructive" : "outline"}
          className="cursor-pointer"
          onClick={() =>
            handleAddFavorite(
              data._id,
              favoriteState.includes(data._id) ? "remove" : "add"
            )
          }
          disabled={!customerId}
        >
          <Heart />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default MilkTeaCard;
