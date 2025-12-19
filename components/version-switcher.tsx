"use client"

import * as React from "react"
import {  GalleryVerticalEnd } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="p-2 flex items-center gap-2 bg-">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <span>Admin Management</span>
          </div>
        
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
