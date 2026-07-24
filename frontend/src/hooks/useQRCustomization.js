import { useState } from 'react';

// Hook centralizado para toda la personalización visual del QR.
// Hoy solo gestiona color y forma de los puntos (dots), pero a medida
// que avancemos en esta sesión (fondo, tamaño, margen) iremos añadiendo
// más campos aquí — sin tener que tocar los componentes que lo usan.
export const useQRCustomization = () => {
  const [dotsColor, setDotsColor] = useState('#1a1a2e');
  const [dotsType, setDotsType] = useState('rounded');

  return {
    dotsColor,
    setDotsColor,
    dotsType,
    setDotsType,
  };
};