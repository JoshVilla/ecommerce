"use client";

import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

// Interfaces
export interface SearchOption {
  value: string | number | boolean;
  label: string;
}

export interface SearchProp {
  type: "input" | "select";
  name: string;
  placeholder?: string;
  options?: SearchOption[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => string | number | boolean;
}

interface SearchFormProps<T> {
  searchProps: SearchProp[];
  api: (params?: any) => Promise<{ data: T[] }>;
  result: (data: T[]) => void;
}

// Create a dynamic schema based on searchProps
const createFormSchema = (searchProps: SearchProp[]) => {
  const schemaObj: Record<string, z.ZodType<any>> = {};
  searchProps.forEach((prop) => {
    if (prop.type === "input") {
      schemaObj[prop.name] = z.string().optional();
    } else {
      schemaObj[prop.name] = z
        .union([z.string(), z.number(), z.boolean()])
        .optional();
    }
  });
  return z.object(schemaObj);
};

const SearchForm = <T,>({ api, result, searchProps }: SearchFormProps<T>) => {
  const formSchema = createFormSchema(searchProps);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchMutation = useMutation({
    mutationFn: api,
    onSuccess: (data) => {
      result(data.data);
      setLoadingSearch(false);
    },
    onError: (error) => {
      console.error(error);
      setLoadingSearch(false);
    },
  });

  const handleSearch = (params: FormValues) => {
    setLoadingSearch(true);
    searchMutation.mutate(params);
  };

  const handleReset = () => {
    form.reset();
    searchProps.forEach((prop) => {
      if (prop.type === "select") {
        form.setValue(prop.name, "");
      }
    });
    api().then((res) => result(res.data));
  };

  return (
    <div className="my-6">
      <Form {...form}>
        <form
          className="flex items-center gap-5 flex-wrap"
          onSubmit={form.handleSubmit(handleSearch)}
        >
          {searchProps.map((prop, idx) =>
            prop.type === "input" ? (
              <FormField
                key={idx}
                control={form.control}
                name={prop.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={prop.placeholder}
                        className="w-60"
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(
                            prop.onChange ? prop.onChange(e) : e.target.value
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                key={idx}
                control={form.control}
                name={prop.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const parsedValue =
                            value === "true"
                              ? true
                              : value === "false"
                              ? false
                              : isNaN(Number(value))
                              ? value
                              : Number(value);
                          field.onChange(parsedValue);
                        }}
                        value={field.value?.toString() || ""}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {prop.options?.map((option) => (
                              <SelectItem
                                key={option.value.toString()}
                                value={option.value.toString()}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button type="submit" size="sm" className="flex gap-1 items-center">
            {loadingSearch ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <SearchIcon className="w-4 h-4" />
            )}
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
