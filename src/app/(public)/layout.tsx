// app/(public)/layout.tsx

import { BackgroundLayout } from "@/ui/layouts";
import { Image } from "@/ui/atoms";
import { APP_IMAGES } from "@/core/config";

const backgroundImgSrc = "/assets/images/public-bg.png";
const genericMarketImgSrc = "/assets/images/generic-market.png";
const muniLogo = APP_IMAGES.muniLogo;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BackgroundLayout imageSrc={backgroundImgSrc} imageAlt="Fondo de Piura">
      <header className="pointer-events-none absolute inset-x-0 top-12 flex justify-center">
        <div className="flex items-center gap-3 px-4">
          <div className="relative">
            <Image
              src={genericMarketImgSrc}
              alt="Logo mercados"
              width={96}
              height={96}
              fit="contain"
            />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-white text-left drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
            <p>Sistema de Control</p>
            <p>de Mercados</p>
          </div>
        </div>
      </header>

      <main className="w-full px-4">{children}</main>

      <footer className="pointer-events-none absolute inset-x-0 bottom-5 flex px-4 justify-center md:justify-start">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={muniLogo.src}
              alt={muniLogo.alt}
              width={72}
              height={72}
              fit="contain"
            />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-white text-left drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
            <p>Municipalidad Distrital de</p>
            <p>Veintiséis de Octubre</p>
          </div>
        </div>
      </footer>
    </BackgroundLayout>
  );
}
