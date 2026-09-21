import type { Metadata } from "next";
import { ConnectionsPageContent } from "./components/ConnectionsPageContent";

export const metadata: Metadata = { title: "Conexões" };

export default function ConnectionsPage() {
  return <ConnectionsPageContent />;
}
