import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/app/components/ui/sidebar";

import Link from "next/link";
import { AppSideBarTitles } from "./constants";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-1 px-3 py-4">
        <h2 className="text-5xl font-bold">Finança</h2>
        <h1 className="text-sm font-bold">Seu controle de gastos</h1>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2">
        {AppSideBarTitles.map((Title) => (
          <Link
            key={Title.Title}
            href={Title.Link}
            className="text-sm font-medium flex items-center gap-2  rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors p-3"
          >
            {Title.Icon}
            {Title.Title}
          </Link>
        ))}
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
