"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { INewMilktea } from "@/app/admin/products/page";
import Image from "next/image";
interface Props {
  record: INewMilktea;
}
const MilkteaInfo = ({ record }: Props) => {
  const [btnSizeActive, setBtnSizeActive] = useState(0);
  const [btnSugarLevelActive, setBtnSugarLevelActive] = useState(0);
  const [btnAddonsActive, setBtnAddonsActive] = useState<number | null>(null);
  return (
    <Sheet
      onOpenChange={(open) => {
        setBtnSizeActive(0);
        setBtnSugarLevelActive(0);
      }}
    >
      <SheetTrigger asChild>
        <Button size="sm" variant="default" className="cursor-pointer">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{record.name}</SheetTitle>
          <SheetDescription>{record.description}</SheetDescription>
          <div>
            <div className="space-y-4">
              <Image
                src={record.imageUrl}
                width={150}
                height={150}
                alt={record.name}
                className="mx-auto my-4"
              />
              <div>
                <div className="mb-2">Size:</div>
                <div className="space-x-3">
                  {record.sizes.map((size, index: number) => (
                    <Button
                      size="sm"
                      variant={btnSizeActive === index ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setBtnSizeActive(index)}
                    >
                      {size.size.charAt(0)}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2">Sugar Level:</div>
                <div className="space-x-3">
                  {record.sugarLevel.map((sugar, index: number) => (
                    <Button
                      size="sm"
                      variant={
                        btnSugarLevelActive === index ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => setBtnSugarLevelActive(index)}
                    >
                      {sugar}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div>Addons:</div>
                <div className="space-x-3">
                  {record.addons.map((addon, index: number) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={
                        btnAddonsActive === index ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => {
                        setBtnAddonsActive((prev) =>
                          prev === index ? null : index
                        );
                      }}
                    >
                      {addon.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MilkteaInfo;
