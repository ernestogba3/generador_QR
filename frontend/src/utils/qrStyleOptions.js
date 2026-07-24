// Opciones de estilo compartidas entre la instancia de preview
// y las instancias temporales creadas para cada descarga.
export const qrStyleOptions = {
  width: 280,
  height: 280,
  type: 'svg',
  dotsOptions: {
    color: '#1a1a2e',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
};

// Combina las opciones base con los valores de personalización elegidos
// por el usuario en QRCustomizer (color y forma de los puntos).
// Centralizar esta mezcla aquí evita repetirla en QRPreview (preview y
// descarga la necesitan por igual) y en futuros pasos (fondo, tamaño...).
export const buildQROptions = ({ dotsColor, dotsType }) => ({
  ...qrStyleOptions,
  dotsOptions: {
    ...qrStyleOptions.dotsOptions,
    color: dotsColor,
    type: dotsType,
  },
});