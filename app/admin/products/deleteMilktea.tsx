import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { IMilktea } from "@/models/milkteaModel";
import { useMutation } from "@tanstack/react-query";
import { deleteMilktea } from "@/service/api";
import { toast } from "sonner";

interface Props {
  record: IMilktea & { _id: string };
  refetch: () => void;
}

function DeleteMilktea({ record, refetch }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteMilktea,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        refetch();
        setOpenDialog(false); // ✅ Only closes when successful
      } else {
        toast.error("Product deletion failed");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("An unexpected error occurred");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: record._id });
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer hover:underline">
          <Trash className="text-red-400" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteMilktea;
