import { getDecodedToken } from "@/utils/nonAsyncHelpers";
import { JwtPayload } from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store/store";
import { clearUser } from "@/redux/slices/userSlice";
import { stat } from "fs";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decoded = getDecodedToken();
    setTokenInfo(decoded);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await persistor.flush();
      await persistor.purge();
      localStorage.removeItem("token"); // or however you're storing the token
      setTokenInfo(null);
      setOpenDialog(false);
      router.push("/");
      dispatch(clearUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-sky-500 py-2 px-6 flex items-center justify-between">
      <div
        className="text-xl text-white font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Milktea
      </div>
      <div className="text-white">
        {loading ? null : tokenInfo?.name ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer hover:underline">
                Hello, {tokenInfo.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpenDialog(true)}
                >
                  Logout
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
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <Button
            size="sm"
            variant="link"
            className="text-white"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
