"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { INewMilktea } from "../page";
import { useMutation } from "@tanstack/react-query";
import { updateTaggedMilktea } from "@/service/api";
import { toast } from "sonner";

interface ISelecetedMilktea {
  id: string;
  name: string;
}

interface Props {
  category: number;
  defaultItems: ISelecetedMilktea[];
  refetch: () => void;
}

const MilkteaList = ({ category, defaultItems, refetch }: Props) => {
  const milkteas = useSelector(
    (state: RootState) => state.milktea.milktea as INewMilktea[]
  );

  const [selectedMilkteaIds, setSelectedMilkteaIds] = useState<
    ISelecetedMilktea[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleSelection = (milktea: INewMilktea) => {
    setSelectedMilkteaIds((prev) => {
      const exists = prev.find((item) => item.id === milktea._id);
      if (exists) {
        return prev.filter((item) => item.id !== milktea._id);
      } else {
        return [...prev, { id: milktea._id, name: milktea.name }];
      }
    });
  };

  const selectedIdSet = useMemo(() => {
    return new Set(selectedMilkteaIds.map((item) => item.id));
  }, [selectedMilkteaIds]);

  const isSelected = (id: string) => selectedIdSet.has(id);

  const handleShowDialog = (open: boolean) => {
    if (!open) {
      setSelectedMilkteaIds(defaultItems || []);
      setOpenDialog(false);
    }
    setOpenDialog(open);
  };

  const updateMutation = useMutation({
    mutationFn: updateTaggedMilktea,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        setOpenDialog(false);
        refetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = async () => {
    try {
      const params = {
        milkteaIds: selectedMilkteaIds,
        category,
      };

      updateMutation.mutate(params);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectedMilkteaIds(defaultItems);
  }, [defaultItems]);

  return (
    <Dialog open={openDialog} onOpenChange={(open) => handleShowDialog(open)}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>List of Milkteas</DialogTitle>
          <DialogDescription>
            Pick milkteas you want to include.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 mt-4">
          {milkteas.map((item) => (
            <li
              key={item._id}
              onClick={() => toggleSelection(item)}
              className={`flex items-center justify-between cursor-pointer hover:scale-105 transition-all ${
                isSelected(item._id) ? "text-sky-500" : ""
              }`}
            >
              <span>{item.name}</span>
              {isSelected(item._id) && <Check width={15} />}
            </li>
          ))}
        </ul>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => handleShowDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="cursor-pointer"
            size="sm"
            onClick={onSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilkteaList;
