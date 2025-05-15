// app/admin/layout.tsx
"use client";

import { usePathname } from "next/navigation";
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
import React from "react";
import { navMain } from "./sidebarProps";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store/store";
import {IAdmin} from "@/utils/types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useSelector((state: RootState) => state.admin.admin as IAdmin);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments[0] === "admin" ? segments.slice(1) : segments;

  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} state={state} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((segment, index) => {
                const href =
                  "/admin/" + breadcrumbs.slice(0, index + 1).join("/");
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
        </header>
        <div className="p-4 h-full bg-[#fff]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
