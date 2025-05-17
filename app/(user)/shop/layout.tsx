// app/admin/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { navMain } from "./sidebarProps";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { IMyOrders, IUser } from "@/utils/types";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { clearUser } from "@/redux/slices/userSlice";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userState = useSelector((state: RootState) => state.user.user as IUser);
  const state = useSelector(
    (state: RootState) => state.myOrders.myOrders as IMyOrders[]
  );
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments[0] === "shop" ? segments.slice(1) : segments;

  const [countMyOrders, setCountMyOrders] = useState(0);

  const goToMyOrders = () => router.push("/shop/myCart");

  useEffect(() => {
    setCountMyOrders(state.length);
  }, [state]);

  // useEffect(() => {
  //   if (Object.keys(userState).length === 0) {
  //     dispatch(clearUser());
  //     router.push("/");
  //   }
  // }, [userState, dispatch, router]);

  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} state={userState} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((segment, index) => {
                  const href =
                    "/shop/" + breadcrumbs.slice(0, index + 1).join("/");
                  const isLast = index === breadcrumbs.length - 1;

                  const label = segment
                    .replace(/([A-Z])/g, " $1")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase());

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <Button className="cursor-pointer" onClick={goToMyOrders}>
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                <Badge className="absolute -top-2 -right-3 px-1.5 py-0 text-xs rounded-full bg-white text-black">
                  {countMyOrders}
                </Badge>
              </div>
            </Button>
          </div>
        </header>
        <div className="p-4 h-full bg-[#fff]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
