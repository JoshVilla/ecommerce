import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BadgePercent, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { INewMilktea } from "./page";
import { useMutation } from "@tanstack/react-query";
import { addMilkteaDiscount, removeMilkteaDiscount } from "@/service/api";

interface Props {
  record: INewMilktea;
  refetch: () => void;
}

const SaleMilktea = ({ record, refetch }: Props) => {
  const { sizes, saledPrizes, saleAmount } = record;
  const [isOpen, setIsOpen] = useState(false);
  const [newPrices, setNewPrices] = useState(
    record.saledPrizes || record.sizes
  );
  const [discountPercent, setDiscountPercent] = useState<number | null>(
    record.saleAmount ?? null
  );

  const addMutation = useMutation({
    mutationFn: addMilkteaDiscount,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();
        handleClose();
      } else {
        toast.error(data.message || "Failed to apply discount");
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeMilkteaDiscount,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();
        handleClose();
      } else {
        toast.error(data.message || "Failed to remove discount");
      }
    },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    const params = {
      discountedPrizes: newPrices,
      saleAmount: discountPercent,
      milkteaId: record._id,
    };
    addMutation.mutate(params);
  };

  // Recalculate prices based on the discount
  useEffect(() => {
    const updatedPrices = sizes.map((size) => {
      const originalPrice =
        typeof size.price === "number" ? size.price : parseFloat(size.price);
      const discounted =
        discountPercent && discountPercent > 0 && discountPercent <= 100
          ? (originalPrice * (1 - discountPercent / 100)).toFixed(2)
          : originalPrice.toFixed(2);

      return {
        ...size,
        price: discounted,
      };
    });

    setNewPrices(updatedPrices);
  }, [discountPercent, sizes]);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setNewPrices(saledPrizes || sizes);
      setDiscountPercent(typeof saleAmount === "number" ? saleAmount : null);
    }
  }, [isOpen, saledPrizes, sizes, saleAmount]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer hover:underline">
          <BadgePercent className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Discount for the Product</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="text-md font-bold">Current Prices: </div>
              <section className="flex gap-4">
                {sizes.map((size, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span>
                      {size.size}: ₱{size.price}
                    </span>
                  </div>
                ))}
              </section>

              <div className="text-md font-bold mt-6">New Prices: </div>
              <section className="flex gap-4">
                {newPrices.map((size, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span>
                      {size.size}: ₱{size.price}
                    </span>
                  </div>
                ))}
              </section>

              <div className="mt-6">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium mb-2"
                >
                  Discount Percentage (0-100)
                </label>
                <Input
                  id="discount"
                  className="h-8"
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent ?? ""}
                  onChange={(e) =>
                    setDiscountPercent(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                />
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="mt-4 flex gap-2">
            {record.isSale && (
              <Button
                className="cursor-pointer"
                size="sm"
                variant="destructive"
                disabled={removeMutation.isPending || addMutation.isPending}
                onClick={() => removeMutation.mutate({ milkteaId: record._id })}
              >
                {removeMutation.isPending ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin" />
                    Removing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <X className="mr-1 w-4 h-4" />
                    Remove Discount
                  </span>
                )}
              </Button>
            )}
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handleSave}
              disabled={
                !discountPercent ||
                discountPercent <= 0 ||
                discountPercent > 100 ||
                removeMutation.isPending ||
                addMutation.isPending
              }
            >
              {addMutation.isPending ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <BadgePercent className="mr-1 w-4 h-4" />
                  Save Discount
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SaleMilktea;
