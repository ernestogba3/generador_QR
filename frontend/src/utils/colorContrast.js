// Implementa la fórmula de contraste WCAG 2.0: convierte cada color a
// luminancia relativa y calcula la ratio entre el más claro y el más
// oscuro. Los lectores de QR necesitan contraste real entre módulo y
// fondo -- no basta con que los colores "se vean distintos" a simple
// vista, necesitan una diferencia de luminancia suficiente.

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
};

const relativeLuminance = ({ r, g, b }) => {
  const linearize = (channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
};

export const getContrastRatio = (hexA, hexB) => {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
};

// Comprueba el contraste del fondo contra las TRES piezas que pueden
// chocar con él (puntos, marco de esquina, punto de esquina) y se queda
// con el peor caso -- si cualquiera de las tres falla, el QR puede
// fallar al escanear, aunque las otras dos tengan contraste perfecto.
export const getQRScannabilityStatus = (customization) => {
  const ratios = [
    getContrastRatio(customization.dotsColor, customization.backgroundColor),
    getContrastRatio(customization.cornersSquareColor, customization.backgroundColor),
    getContrastRatio(customization.cornersDotColor, customization.backgroundColor),
  ];
  const worst = Math.min(...ratios);

  let level = 'safe';
  if (worst < 3) level = 'unsafe';
  else if (worst < 4.5) level = 'risky';

  return { level, ratio: worst };
};