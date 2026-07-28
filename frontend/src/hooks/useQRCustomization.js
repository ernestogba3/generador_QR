// useQRCustomization.js - REFACTORIZADO
// Custom hook que gestiona la personalización del QR
// Centraliza: colores, tamaños, estilos y reset

import { useState, useCallback, useMemo } from 'react'; {/* ✅ Importamos useMemo */}

// Valores por defecto de personalización
// Se usan como referencia para el botón Reset
const DEFAULT_CUSTOMIZATION = {
  dotsColor: '#1a1a2e',
  dotsType: 'rounded',
  cornersSquareColor: '#1a1a2e',
  cornersSquareType: 'extra-rounded',
  cornersDotColor: '#1a1a2e',
  cornersDotType: 'dot',
  backgroundColor: '#ffffff',
  size: 180,
  margin: 0,
};

export const useQRCustomization = () => {
  // Estado que guarda la personalización actual del QR
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);

  // updateCustomization: actualiza solo los campos que cambian
  // useCallback evita que la función se recree en cada render
  // Esto previene re-renders innecesarios en componentes hijos
  const updateCustomization = useCallback((changes) => {
    setCustomization((prev) => ({ ...prev, ...changes }));
  }, []);

  // resetCustomization: vuelve a los valores por defecto de golpe
  // useCallback evita que la función se recree en cada render
  const resetCustomization = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  }, []);

  // ✅ REFACTORIZADO: Ahora usa useMemo
  // isDefaultCustomization: true si nada se ha modificado todavía
  // Lo usa QRCustomizer para decidir si mostrar el botón Reset
  // useMemo evita recalcular en cada render si customization no cambió
  const isDefaultCustomization = useMemo(() => {
    return Object.keys(DEFAULT_CUSTOMIZATION).every(
      (key) => customization[key] === DEFAULT_CUSTOMIZATION[key]
    );
  }, [customization]); {/* Solo se recalcula si customization cambia */}

  return {
    customization,              // Objeto con la personalización actual
    updateCustomization,        // Función para actualizar campos específicos
    resetCustomization,         // Función para volver a los valores por defecto
    isDefaultCustomization,     // Boolean: ¿está en valores por defecto?
  };
};