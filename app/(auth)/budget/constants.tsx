import {
  Car,
  Clapperboard,
  HeartPulse,
  ShoppingCart,
  Tv,
} from "lucide-react";

export const budgetCategories = [
  {
    amount: 620,
    title: "Alimentação",
    icon: <ShoppingCart size={20} />,
    totalAmount: 800,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    amount: 210,
    title: "Transporte",
    icon: <Car size={20} />,
    totalAmount: 500,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    amount: 480,
    title: "Lazer",
    icon: <Clapperboard size={20} />,
    totalAmount: 400,
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    amount: 90,
    title: "Saúde",
    icon: <HeartPulse size={20} />,
    totalAmount: 300,
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    amount: 39,
    title: "Assinaturas",
    icon: <Tv size={20} />,
    totalAmount: 100,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];
