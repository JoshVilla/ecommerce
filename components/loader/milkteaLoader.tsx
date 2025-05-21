import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MilkteaLoader = () => {
  return (
    <div className="border h-50 w-40 relative">
      <Skeleton className="h-50 w-full bg-gray-300" />
      <Skeleton className="h-4 mt-4 w-full bg-gray-300" />
      <Skeleton className="h-2 mt-2 w-2/3 bg-gray-300" />
      <Skeleton className="h-2 mt-1 w-1/3 bg-gray-300" />
      <div className=" mt-4 flex items-center gap-3">
        <Skeleton className="h-8 w-8 bg-gray-300 rounded-md" />
        <Skeleton className="h-8 w-8 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default MilkteaLoader;
