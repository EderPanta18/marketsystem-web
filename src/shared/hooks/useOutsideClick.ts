// shared/hooks/useOutsideClick.ts

"use client";

import { useEffect, useRef } from "react";

export type OutsideClickHandler = (event: MouseEvent | TouchEvent) => void;

export interface UseOutsideClickOptions {
  /**
   * Si es false, el hook no escucha eventos.
   */
  enabled?: boolean;
  /**
   * Ignora clicks hechos con el botón secundario.
   */
  ignoreRightClick?: boolean;
}

/**
 * Hook para detectar clicks/touches fuera de un elemento.
 * Devuelve un ref que debes asignar al contenedor que quieres observar.
 */
export function useOutsideClick<T extends HTMLElement>(
  handler: OutsideClickHandler,
  options: UseOutsideClickOptions = {}
) {
  const { enabled = true, ignoreRightClick = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function handleEvent(event: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (!el) return;

      // Botón derecho
      if (
        ignoreRightClick &&
        event instanceof MouseEvent &&
        event.button === 2
      ) {
        return;
      }

      if (event.target instanceof Node && el.contains(event.target)) {
        return;
      }

      handler(event);
    }

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
    };
  }, [enabled, ignoreRightClick, handler]);

  return ref;
}
