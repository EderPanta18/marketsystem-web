// src/core/config/assets.config.ts

// Tipo opcional para tener claves seguras
type AppImageKey = "muniLogo";

type AppImageConfig = {
  key: AppImageKey;
  src: string;
  alt: string;
};

const IMAGES_BASE_PATH = "/assets/images";

// Mapa principal de imágenes
export const APP_IMAGES: Record<AppImageKey, AppImageConfig> = {
  muniLogo: {
    key: "muniLogo",
    src: `${IMAGES_BASE_PATH}/muni-logo.png`,
    alt: "Logo del municipio",
  },
};
