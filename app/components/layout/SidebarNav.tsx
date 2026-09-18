"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { AppSideBarTitles } from "./constants";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-1">
      {AppSideBarTitles.map((item) => (
        <SidebarMenuItem key={item.Link}>
          <SidebarMenuButton
            render={<Link href={item.Link} />}
            isActive={pathname.startsWith(item.Link)}
            className="h-10 data-active:bg-primary/10 data-active:text-primary"
          >
            {item.Icon}
            <span>{item.Title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
