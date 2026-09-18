import type { Metadata } from "next";
import { HomePageContent } from "./components/HomePageContent";

export const metadata: Metadata = { title: "Visão geral" };

export default function HomePage() {
  return <HomePageContent />;
}
