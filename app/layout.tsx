import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSideBar";
import { QueryProvider } from "./providers/query-provider";

const GeistFont = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Finança", template: "%s · Finança" },
  description: "Seu controle de gastos",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistFont.variable} h-full`}>
      <body
        className={`${GeistFont.variable} bg-background-page h-full antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="min-w-0 flex-1 p-4 md:p-6">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
                <SidebarTrigger className="md:hidden" />
                {children}
              </div>
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
