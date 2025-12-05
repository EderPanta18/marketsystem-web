// ui/atoms/icon/icons-map.tsx

import {
  Search,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import type { IconName } from "./Icon.types";

export const ICONS_MAP: Record<IconName, React.ComponentType<any>> = {
  search: Search,
  user: User,
  email: Mail,
  lock: Lock,
  eye: Eye,
  "eye-off": EyeOff,
  alert: AlertCircle,
  check: Check,
  x: X,
  loader: Loader2,
  info: Info,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
};
