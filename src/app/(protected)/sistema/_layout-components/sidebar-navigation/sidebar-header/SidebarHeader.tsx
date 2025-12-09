// app/(protected)/sistema/_layout-components/sidebar-navigation/sidebar-header/SidebarHeader.tsx

import { Image } from "@/ui/atoms";
import { APP_IMAGES } from "@/core/config";

const muniLogo = APP_IMAGES.muniLogo;

export const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <Image
        src={muniLogo.src}
        alt={muniLogo.alt}
        width={52}
        height={52}
        rounded="md"
      />
      <div className="leading-tight uppercase text-xl font-extrabold text-blue-900">
        <p>Control de</p>
        <p>Mercados</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
