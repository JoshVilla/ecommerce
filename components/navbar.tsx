"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { JwtPayload } from "jsonwebtoken";
import { DoorOpen, ShoppingCart, User } from "lucide-react";

import { getDecodedToken } from "@/utils/nonAsyncHelpers";
import { persistor } from "@/redux/store/store";
import { clearUser } from "@/redux/slices/userSlice";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decoded = getDecodedToken();
    setTokenInfo(decoded);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await persistor.flush();
      await persistor.purge();
      localStorage.removeItem("token");
      setTokenInfo(null);
      dispatch(clearUser());
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDialog(false);
      setLoggingOut(false);
    }
  };

  return (
    <nav className="bg-black py-2 px-6 flex items-center justify-between">
      <div
        className="text-xl text-white font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Bobaville
      </div>

      <div className="text-white">
        {loading ? (
          <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
        ) : tokenInfo?.name ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer hover:underline">
                  Hello, {tokenInfo.name}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <User /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ShoppingCart /> My Cart
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpenDialog(true)}
                >
                  <DoorOpen /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your session and return you to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={handleLogout}
                    disabled={loggingOut}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <Button
            size="sm"
            variant="link"
            className="text-white cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
