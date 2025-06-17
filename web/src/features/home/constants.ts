import type { LucideIcon } from "lucide-react";
import { Box, Megaphone, Truck, Users } from "lucide-react";

export type RoleKey = "cx" | "product" | "supply" | "marketing";

export const ROLE_ICONS: Record<RoleKey, LucideIcon> = {
  cx: Users,
  product: Box,
  supply: Truck,
  marketing: Megaphone,
};
