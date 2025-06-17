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
import { useMutation } from "@tanstack/react-query";
import { deleteDeliveryAccount, removeAdmin } from "@/service/api";
import { toast } from "sonner";

interface Props {
  id: any;
  refetch: () => void;
}
const DeleteAccount = ({ id, refetch }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteDeliveryAccount,
    onSuccess: (data) => {
      if (data.isSuccess) {
        refetch();
        toast.success(data.message);
        setOpenDialog(false);
      } else {
        toast.error("Account deletion failed");
      }
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id });
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setOpenDialog(true)}
          variant="ghost"
          size="sm"
          className="cursor-pointer hover:scale-105 transition"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccount;
