import type { Metadata } from "next";
import { fetchConnections, safeServerFetch } from "@/app/lib/api/queries";
import { ConnectionsPageContent } from "./components/ConnectionsPageContent";

export const metadata: Metadata = { title: "Conexões" };

export default async function ConnectionsPage() {
  const initialConnections = await safeServerFetch(fetchConnections);

  return (
    <ConnectionsPageContent initialConnections={initialConnections} />
  );
}
