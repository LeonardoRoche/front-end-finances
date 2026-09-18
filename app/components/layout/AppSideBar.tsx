import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/app/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-0.5 px-4 py-5">
        <p className="text-xl font-bold tracking-tight">Finança</p>
        <p className="text-xs text-muted-foreground">Seu controle de gastos</p>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
