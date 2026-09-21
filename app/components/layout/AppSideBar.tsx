import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/app/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/80 bg-sidebar">
      <SidebarHeader className="border-b border-border/60 px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-sm font-bold">F</span>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">Finança</p>
            <p className="text-xs text-muted-foreground">
              Open Finance · controle total
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}
