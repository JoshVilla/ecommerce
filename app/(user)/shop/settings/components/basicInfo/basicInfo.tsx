"use client";

import { RootState } from "@/redux/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IUserState } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { updateUserAccount } from "@/service/api";
import { toast } from "sonner";
import { fetchUserInfo, setUser } from "@/redux/slices/userSlice";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middlename: z.string().optional(),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  birthdate: z.string().min(1, {
    message: "Birthdate is required.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
});

const BasicInfo = () => {
  const dispatch = useDispatch();
  const userState = useSelector(
    (state: RootState) => state.user.user as IUserState
  );
  const userId = userState._id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: userState?.firstname || "",
      middlename: userState?.middlename || "",
      lastname: userState?.lastname || "",
      email: userState?.email || "",
      birthdate: userState?.birthdate || "",
      phone: userState?.phone || "",
      gender:
        userState?.gender === "male" || userState?.gender === "female"
          ? userState.gender
          : undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUserAccount,
    onSuccess: (data) => {
      if (data.isSuccess) {
        dispatch(fetchUserInfo(userId) as any);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = {
      userId,
      userInfos: values,
    };

    updateMutation.mutate(params);
  }

  return (
    <div className="space-y-6">
      <div className="text-lg font-bold">Basic Information</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your middle name (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cellphone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your cellphone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BasicInfo;
