// ui/layouts/background-layout/BackgroundLayout.tsx

import { cn } from "@/shared/utils";
import { Image } from "@/ui/atoms";
import type { BackgroundLayoutProps } from "./BackgroundLayout.types";
import {
  getWrapperClasses,
  getContentWrapperClasses,
  getOverlayClasses,
} from "./BackgroundLayout.helpers";

export const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  children,
  imageSrc,
  imageAlt = "Background",
  mode = "full-screen",
  contentAlign = "center",
  overlayVariant = "none",
  overlayClassName,
  wrapperClassName,
  contentClassName,
  className,
  ...props
}) => {
  const wrapperClasses = getWrapperClasses(mode, wrapperClassName);
  const contentWrapperClasses = getContentWrapperClasses(
    mode,
    contentAlign,
    contentClassName
  );
  const overlayClasses = getOverlayClasses(overlayVariant, overlayClassName);

  return (
    <div className={cn(wrapperClasses, className)} {...props}>
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fullSize
          fit="cover"
          showSkeleton
          skeletonVariant="pulse"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {overlayVariant !== "none" && (
        <div className={overlayClasses} aria-hidden="true" />
      )}

      <div className={contentWrapperClasses}>{children}</div>
    </div>
  );
};

export default BackgroundLayout;
