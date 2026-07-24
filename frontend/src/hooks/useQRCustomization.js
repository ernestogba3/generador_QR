import { useState, useCallback } from 'react';

const DEFAULT_CUSTOMIZATION = {
  dotsColor: '#1a1a2e',
  dotsType: 'rounded',
  cornersSquareColor: '#1a1a2e',
  cornersSquareType: 'extra-rounded',
  cornersDotColor: '#1a1a2e',
  cornersDotType: 'dot',
  backgroundColor: '#ffffff',
  size: 280,
  margin: 0,
};

export const useQRCustomization = () => {
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);

  const updateCustomization = useCallback((changes) => {
    setCustomization((prev) => ({ ...prev, ...changes }));
  }, []);

  // Independiente de updateCustomization: vuelve a los valores por
  // defecto de golpe, sin depender de qué campos se hayan tocado.
  const resetCustomization = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  }, []);

  // true si nada se ha tocado todavía -- lo usa QRCustomizer para
  // decidir si merece la pena mostrar el botón de restablecer.
  const isDefaultCustomization = Object.keys(DEFAULT_CUSTOMIZATION).every(
    (key) => customization[key] === DEFAULT_CUSTOMIZATION[key]
  );

  return {
    customization,
    updateCustomization,
    resetCustomization,
    isDefaultCustomization,
  };
};