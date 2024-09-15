import {
  HandCoins,
  Home,
  LineChart,
  MessageCircleMore,
  Package,
  ShoppingCart,
  UserRoundCog,
  Users,
} from "lucide-react";

export const sellerNavLinks = [
  {
    label: "Dashboard",
    path: "/seller",
    icon: Home,
  },
  {
    label: "Orders",
    path: "/seller/orders",
    icon: ShoppingCart,
    badge: 6,
  },
  {
    label: "Products",
    path: "/seller/products",
    icon: Package,
  },
  {
    label: "Payments",
    path: "/seller/payments",
    icon: HandCoins,
  },
  {
    label: "Chat Support",
    path: "/seller/chat-support",
    icon: MessageCircleMore,
  },
  {
    label: "Profile",
    path: "/seller/profile",
    icon: UserRoundCog,
  },
];

export const adminNavLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: Home,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
    badge: 6,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Customers",
    path: "/admin/products",
    icon: Users,
  },
  {
    label: "Analytics",
    path: "/admin/products",
    icon: LineChart,
  },
];
