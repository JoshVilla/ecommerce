"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/inputpassword";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/service/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setAdmin } from "@/redux/slices/adminSlice";

// Define the Zod schema for validation
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

function AdminLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        router.push("/admin");
        dispatch(setAdmin(data.admin));
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: FormData) => {
    // Call the login mutation with the form data
    loginMutation.mutate(data);
  };

  return (
    <motion.div
      className="w-full "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <Input
            className="h-8"
            placeholder="Enter Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
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
        <Button
          disabled={loginMutation.isPending}
          className="mt-4 cursor-pointer w-full"
          size="sm"
          type="submit"
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default AdminLogin;
