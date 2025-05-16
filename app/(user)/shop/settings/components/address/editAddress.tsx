import { INewAddress } from "@/utils/types";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  record: INewAddress;
}

const EditAddress = ({ record }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editedAddress, setEditedAddress] = useState<INewAddress>(record);

  const handleChange = (key: keyof INewAddress, value: string) => {
    setEditedAddress((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Call API or mutation here
    console.log("Saving edited address:", editedAddress);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer hover:scale-105 text-blue-500"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Input
            value={editedAddress.otherAddress}
            onChange={(e) => handleChange("otherAddress", e.target.value)}
            placeholder="Purok/Street/House No."
          />
          <Input
            value={editedAddress.addressInfo}
            onChange={(e) => handleChange("addressInfo", e.target.value)}
            placeholder="Additional Info or Landmark"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
