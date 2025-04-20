"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 👉 ShadCN UI components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Loader2, Trash } from "lucide-react";
import { editMilktea, getMilktea } from "@/service/api";
import { toast } from "sonner";
import { LoadingPage } from "@/components/loadingPage";
import TitlePage from "@/components/titlePage";
import { motion } from "framer-motion";

const formSchema = z.object({
  image: z.any().optional(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  sugarLevel: z
    .array(z.number())
    .min(1, "At least one sugar level is required"),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1),
        ml: z.string().min(1),
        price: z.string().min(1),
      })
    )
    .optional(),
  addons: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
      })
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditMilkteaPage() {
  const { id } = useParams<{ id: string }>();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      sugarLevel: [],
      sizes: [],
      addons: [],
    },
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control: form.control, name: "sizes" });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({ control: form.control, name: "addons" });

  const sugarOptions = [0, 25, 50, 75];

  const { data, isLoading } = useQuery({
    queryKey: ["milktea", id],
    queryFn: () => getMilktea(id),
    enabled: !!id,
    select: (res) => res.data[0], // directly access the record
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        description: data.description,
        sugarLevel: data.sugarLevel || [],
        sizes: data.sizes || [],
        addons: data.addons || [],
      });
      if (data.imageUrl) setPreview(data.imageUrl);
    }
  }, [data, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const updateMutation = useMutation({
    mutationFn: editMilktea,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      if (data.image instanceof File) formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("sugarLevel", JSON.stringify(data.sugarLevel));
      formData.append("sizes", JSON.stringify(data.sizes || []));
      formData.append("addons", JSON.stringify(data.addons || []));
      formData.append("id", id);

      updateMutation.mutate(formData);
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoading) return <LoadingPage />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <TitlePage title="Edit Milk Tea" hasBack />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 w-40 h-40 object-cover"
                    />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sugarLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sugar Level</FormLabel>
                  <FormControl>
                    <div className="flex gap-4 flex-wrap">
                      {sugarOptions.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value.includes(option)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, option]
                                : field.value.filter((v) => v !== option);
                              field.onChange(newValue);
                            }}
                          />
                          <Label>{option}%</Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Sizes */}
            <div className="space-y-2">
              <h2 className="font-semibold text-lg">Sizes</h2>
              {sizeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...form.register(`sizes.${index}.size`)}
                    placeholder="Size"
                  />
                  <Input
                    {...form.register(`sizes.${index}.ml`)}
                    placeholder="ml"
                  />
                  <Input
                    {...form.register(`sizes.${index}.price`)}
                    placeholder="Price"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => removeSize(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => appendSize({ size: "", ml: "", price: "" })}
              >
                + Add Size
              </Button>
            </div>

            {/* Add-ons */}
            <div className="space-y-2">
              <h2 className="font-semibold text-lg">Add-ons</h2>
              {addonFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...form.register(`addons.${index}.name`)}
                    placeholder="Addon"
                  />
                  <Input
                    {...form.register(`addons.${index}.price`)}
                    placeholder="Price"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => removeAddon(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => appendAddon({ name: "", price: "" })}
              >
                + Add Add-on
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span>Updating...</span>
                </span>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
