// ui/molecules/iconButton/IconButton.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type { IconName } from "@/ui/atoms/icon";
import { Button, Icon } from "@/ui/atoms";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "sm",
  colorScheme = "neutral",
  variant = "ghost",
  className,
  ...props
}) => {
  const content =
    typeof icon === "string" ? (
      <Icon name={icon as IconName} size={size} />
    ) : (
      icon
    );

  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      variant={variant}
      className={cn("p-0 h-7 w-7 rounded-full", className)}
      {...props}
    >
      {content}
    </Button>
  );
};

export default IconButton;
