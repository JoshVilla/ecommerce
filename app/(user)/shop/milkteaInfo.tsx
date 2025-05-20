"use client";
import React, { useMemo, useState } from "react";
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
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearMyOrders, addToMyOrders } from "@/redux/slices/myOrdersSlice";
import { v4 as uuidv4 } from "uuid";

interface Props {
  record: INewMilktea;
}

const MilkteaInfo = ({ record }: Props) => {
  const dispatch = useDispatch();
  const [btnSizeActive, setBtnSizeActive] = useState<number | null>(null);
  const [btnSugarLevelActive, setBtnSugarLevelActive] = useState<number | null>(
    null
  );
  const [btnAddonsActive, setBtnAddonsActive] = useState<number | null>(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const [openSheet, setOpenSheet] = useState(false);
  const [order, setOrder] = useState<any>({});

  const totalAmount = useMemo(() => {
    if (order) {
      const subtotal = Object.values(order).reduce(
        (sum: number, value: any) =>
          typeof value === "number" ? sum + value : sum,
        0
      );
      return subtotal * quantityCount;
    }
    return 0;
  }, [order, quantityCount]);

  const errorMessage = () => {
    if (btnSizeActive === null) toast.warning("Please add size");
    if (btnSugarLevelActive === null) toast.warning("Please add sugar level");
  };

  const addToCart = () => {
    if (btnSizeActive === null || btnSugarLevelActive === null) {
      errorMessage();
      return;
    }

    const finalOrder = {
      ...order,
      quantity: quantityCount,
      total: totalAmount,
      product: record.name,
      description: `Size: ${order.size}, Addons: ${
        order.addon || "None"
      }, Sugar: ${order.sugar}`,
      image: record.imageUrl,
      id: uuidv4(),
    };

    console.log("Order added to cart:", finalOrder);
    toast.success("Added to cart!");
    dispatch(addToMyOrders(finalOrder));
  };

  return (
    <Sheet
      open={openSheet}
      onOpenChange={(open) => {
        if (!open) {
          setBtnSizeActive(null);
          setBtnSugarLevelActive(null);
          setBtnAddonsActive(null);
          setQuantityCount(1);
          setOrder({});
        }
        setOpenSheet(open);
      }}
    >
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className="cursor-pointer"
          onClick={() => setOpenSheet(true)}
        >
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="overflow-auto">
          <SheetTitle>{record.name}</SheetTitle>
          <SheetDescription>{record.description}</SheetDescription>

          <div className="space-y-4">
            <Image
              src={record.imageUrl}
              width={150}
              height={150}
              alt={record.name}
              className="mx-auto my-4 rounded-md"
            />

            <div>
              <div>Quantity:</div>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => {
                    if (quantityCount > 1) {
                      setQuantityCount((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <span>{quantityCount}</span>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => setQuantityCount((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <div className="mb-2">Size:</div>
              <div className="space-x-3">
                {record.sizes.map((size, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={btnSizeActive === index ? "default" : "outline"}
                    onClick={() => {
                      setBtnSizeActive(index);
                      setOrder((prev: any) => ({
                        ...prev,
                        size: size.size,
                        sizePrice: Number(size.price),
                      }));
                    }}
                  >
                    {size.size.charAt(0)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2">Sugar Level:</div>
              <div className="space-x-3">
                {record.sugarLevel.map((sugar, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={
                      btnSugarLevelActive === index ? "default" : "outline"
                    }
                    onClick={() => {
                      setBtnSugarLevelActive(index);
                      setOrder((prev: any) => ({
                        ...prev,
                        sugar: sugar,
                        sugarPrice: 0,
                      }));
                    }}
                  >
                    {sugar}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div>Addons:</div>
              <div className="space-x-3">
                {record.addons.map((addon, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={btnAddonsActive === index ? "default" : "outline"}
                    onClick={() => {
                      if (btnAddonsActive === index) {
                        setBtnAddonsActive(null);
                        setOrder((prev: any) => {
                          const updated = { ...prev };
                          delete updated.addon;
                          delete updated.addonPrice;
                          return updated;
                        });
                      } else {
                        setBtnAddonsActive(index);
                        setOrder((prev: any) => ({
                          ...prev,
                          addon: addon.name,
                          addonPrice: Number(addon.price),
                        }));
                      }
                    }}
                  >
                    {addon.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="font-bold text-lg">
              Total: ₱{totalAmount.toFixed(2)}
            </div>
          </div>
        </SheetHeader>

        <SheetFooter>
          <Button onClick={() => dispatch(clearMyOrders())}>
            <ShoppingCart className="mr-2" /> Clear
          </Button>
          <Button onClick={addToCart}>
            <ShoppingCart className="mr-2" /> Add to cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MilkteaInfo;
