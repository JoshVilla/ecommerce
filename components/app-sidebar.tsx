"use client";
import React, { useState } from "react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { DoorOpen } from "lucide-react";
import { persistor } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { IAdmin, IUser } from "@/utils/types";
import Link from "next/link";
import { clearMilktea } from "@/redux/slices/milkteaSlice";
import { clearUser } from "@/redux/slices/userSlice";
import { clearAdmin } from "@/redux/slices/adminSlice";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navMain: {
    title: string;
    items: {
      title: string;
      url: string;
    }[];
  }[];
  state: IUser | IAdmin;
};

export function AppSidebar({ navMain, state, ...props }: AppSidebarProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await persistor.purge();
      dispatch(clearAdmin());
      dispatch(clearUser());
      dispatch(clearMilktea());
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoadingLogout(false);
    }
  };

  const renderName = () => {
    if ("firstname" in state) {
      const middleInitial = state.middlename ? `${state.middlename.charAt(0)}.` : "";
      return `${state.firstname} ${middleInitial} ${state.lastname}`;
    }
    return state.username;
  };

  return (
      <Sidebar {...props}>
        <SidebarHeader>
          <VersionSwitcher
              versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta1"]}
              defaultVersion="1.0.1"
          />
        </SidebarHeader>
        <SidebarContent>
          {navMain.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={pathname === item.url}>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {state?.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">{renderName()}</div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="hover:scale-105 transition">
                  <DoorOpen />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your session and return you to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    {loadingLogout ? "Logging out..." : "Logout"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  );
}
