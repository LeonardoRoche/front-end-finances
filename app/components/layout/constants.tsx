import {
  ArrowRightLeft,
  Landmark,
  LayoutDashboard,
  PieChart,
} from "lucide-react";

export const AppSideBarTitles = [
  {
    Title: "Dashboard",
    Icon: <LayoutDashboard size={16} />,
    Link: "/home",
  },
  {
    Title: "Transações",
    Icon: <ArrowRightLeft size={16} />,
    Link: "/transaction",
  },
  {
    Title: "Orçamentos",
    Icon: <PieChart size={16} />,
    Link: "/budget",
  },
  {
    Title: "Conexões",
    Icon: <Landmark size={16} />,
    Link: "/connections",
  },
];
