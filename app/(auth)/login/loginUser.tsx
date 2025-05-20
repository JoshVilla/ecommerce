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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserInfo, setUser } from "@/redux/slices/userSlice";
import { motion } from "framer-motion";
import { fetchFavorites } from "@/redux/slices/favoriteSlices";

// Define the Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

function UserLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const fetchAllData = async (userId: string) => {
    try {
      await Promise.all([
        dispatch(fetchUserInfo(userId) as any),
        dispatch(fetchFavorites(userId) as any),
      ]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data. Please try again.");
    }
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        router.push("/shop");
        fetchAllData(data.user._id);
      } else {
        toast.error(data.message);
      }
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
    <motion.div
      className="w-full "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 cursor-pointer hover:underline">
            Forgot your password?
          </div>
          <div className="text-sm text-gray-700 ">
            Dont have an account?
            <span
              className="cursor-pointer hover:underline text-gray-950"
              onClick={() => router.push("/signup")}
            >
              {" "}
              Sign up
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="mt-4 cursor-pointer w-full"
          disabled={loginMutation.isPending}
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

export default UserLogin;
