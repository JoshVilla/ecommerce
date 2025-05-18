"use client";
import MilkteaInfo from "@/app/(user)/shop/milkteaInfo";
import { INewMilktea } from "@/app/admin/products/page";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
interface Props {
  data: INewMilktea;
}
const MilkTeaCard = ({ data }: Props) => {
  return (
    <React.Fragment>
      <div>
        <motion.div
          className="border h-50 w-40 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="object-cover rounded"
          />
        </motion.div>
        <div className="mt-4 font-semibold">{data.name}</div>
        <div className="text-gray-500 text-xs line-clamp-2 overflow-hidden">
          {data.description}
        </div>
      </div>

      <div className="mt-4 space-x-3">
        <MilkteaInfo record={data} />
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Heart />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default MilkTeaCard;
