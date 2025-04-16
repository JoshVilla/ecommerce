"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/inputpassword";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/service/api";
import { toast } from "sonner";
import { hashPassword } from "@/utils/asyncHelpers";
import { verifyToken } from "@/utils/nonAsyncHelpers";

// Define the Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error("Login failed. Please try again.");
    },
  });

  const onSubmit = async (data: FormData) => {
    // Call the login mutation with the form data
    loginMutation.mutate(data);
  };

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[30%] ">
      <div className="text-2xl font-bold mb-10">Login</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <Input
            className="h-8"
            placeholder="Enter Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input using InputPassword Component */}
        <InputPassword
          register={register}
          errors={errors}
          name="password"
          placeholder="Enter Password"
        />

        {/* Submit Button */}
        <Button className="mt-4 cursor-pointer w-full" size="sm" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Page;
