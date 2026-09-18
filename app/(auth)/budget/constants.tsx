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
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    amount: 210,
    title: "Transporte",
    icon: <Car size={20} />,
    totalAmount: 500,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    amount: 480,
    title: "Lazer",
    icon: <Clapperboard size={20} />,
    totalAmount: 400,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    amount: 90,
    title: "Saúde",
    icon: <HeartPulse size={20} />,
    totalAmount: 300,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    amount: 39,
    title: "Assinaturas",
    icon: <Tv size={20} />,
    totalAmount: 100,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];
