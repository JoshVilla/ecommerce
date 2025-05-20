"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import TitlePage from "@/components/titlePage";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addMilktea } from "@/service/api";
import { Loader2, Trash } from "lucide-react";
import { motion } from "framer-motion";

// Zod schema
const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file?.size > 0, "Image is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  sugarLevel: z
    .array(z.number())
    .min(1, "At least one sugar level is required"),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        ml: z.string().min(1, "ml is required"),
        price: z.string().min(1, "Price is required"),
      })
    )
    .optional(),
  addons: z
    .array(
      z.object({
        name: z.string().min(1, "Addon name is required"),
        price: z.string().min(1, "Price is required"),
      })
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: "",
      description: "",
      sugarLevel: [],
      sizes: [{ size: "", ml: "", price: "" }],
      addons: [{ name: "", price: "" }],
    },
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control: form.control,
    name: "sizes",
  });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control: form.control,
    name: "addons",
  });

  const validateImageFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image.");
      return false;
    }
    if (file.size > maxSize) {
      toast.error("The image size exceeds 5MB.");
      return false;
    }
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateImageFile(file)) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      event.target.value = "";
      setPreview(null);
      //@ts-ignore
      form.setValue("image", undefined);
    }
  };

  const addMilkteaMutation = useMutation({
    mutationFn: addMilktea,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        form.reset();
        form.clearErrors();
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    },
    onError: (error) => {
      toast.error("Failed to add product. Please try again.");
      console.error("Error:", error);
    },
  });

  const sugarOptions = [0, 25, 50, 75];

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("sugarLevel", JSON.stringify(data.sugarLevel));
      formData.append("sizes", JSON.stringify(data.sizes || []));
      formData.append("addons", JSON.stringify(data.addons || []));

      addMilkteaMutation.mutate(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TitlePage title="Add Product" hasBack />
      <div className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-6"
          >
            <div className="flex-1 space-y-6">
              {/* Image Upload */}
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          {...fieldProps}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file && validateImageFile(file)) {
                              onChange(file);
                            } else {
                              event.target.value = "";
                            }
                          }}
                        />
                        <p className="text-sm text-gray-500">
                          Accepted formats: JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {preview && (
                <div className="mt-4">
                  <p>Image Preview:</p>
                  <img
                    src={preview}
                    alt="Image Preview"
                    className="max-w-full h-auto rounded-md"
                  />
                </div>
              )}

              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Wintermelon Milk Tea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short description..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sugar Level */}
              <FormField
                control={form.control}
                name="sugarLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Sugar Levels</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        {sugarOptions.map((option) => (
                          <div key={option} className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value.includes(option)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, option]);
                                } else {
                                  field.onChange(
                                    field.value.filter((v) => v !== option)
                                  );
                                }
                              }}
                            />
                            <Label>{option}% Sugar</Label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 space-y-8">
              {/* Sizes */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Sizes</h3>
                {sizeFields.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <Input
                      placeholder="Size"
                      {...form.register(`sizes.${index}.size`)}
                    />
                    <Input
                      placeholder="ml"
                      {...form.register(`sizes.${index}.ml`)}
                    />
                    <Input
                      placeholder="Price"
                      {...form.register(`sizes.${index}.price`)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => removeSize(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  size="sm"
                  onClick={() => appendSize({ size: "", ml: "", price: "" })}
                >
                  + Add Size
                </Button>
              </div>

              {/* Addons */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Add-ons</h3>
                {addonFields.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <Input
                      placeholder="Addon name"
                      {...form.register(`addons.${index}.name`)}
                    />
                    <Input
                      placeholder="Price"
                      {...form.register(`addons.${index}.price`)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => removeAddon(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => appendAddon({ name: "", price: "" })}
                >
                  + Add Addon
                </Button>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  size="sm"
                  disabled={addMilkteaMutation.isPending}
                >
                  {addMilkteaMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      Adding...
                    </div>
                  ) : (
                    "Add Product"
                  )}
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    form.reset();
                    form.clearErrors();
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
