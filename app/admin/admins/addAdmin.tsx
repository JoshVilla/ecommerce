import TitlePage from "@/components/titlePage";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // optional icons
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addAdmin } from "@/service/api";
import { toast } from "sonner";
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .min(1, "Password is required"),
  status: z.enum(["admin", "superadmin"]),
});

type FormSchema = z.infer<typeof schema>;

interface AddAdminProps {
  refetch: () => void;
}

const AddAdmin = ({ refetch }: AddAdminProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      status: "admin",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const addAdminMutation = useMutation({
    mutationFn: addAdmin,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Admin added successfully!");
        form.reset();
        setOpenDialog(false);
        refetch();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to add admin. Please try again.");
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Add your logic here to save new admin
    addAdminMutation.mutate(data);
    form.reset();
  };

  useEffect(() => {
    form.reset();
  }, [openDialog]);

  return (
    <div>
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="cursor-pointer">
            New Admin
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Admin</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new admin account.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="admin" />
                          </FormControl>
                          <FormLabel className="font-normal">Admin</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="superadmin" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Super Admin
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="cursor-pointer">
                {addAdminMutation.isPending ? "Creating..." : "Add Admin"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddAdmin;
