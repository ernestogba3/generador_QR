import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

// Dato de muestra fijo, deliberadamente muy corto (QR versión 1, 21x21
// módulos). Con un dato largo el QR real tiene demasiados módulos y a
// tamaño icono se vuelve ilegible.
const SAMPLE_DATA = 'QR';
const ICON_SIZE = 40;

// Preview en miniatura que renderiza una instancia real de QRCodeStyling
// con las opciones de estilo indicadas. Se usa dentro de StyleSelect
// para mostrar cómo se ve cada forma de verdad, sin imágenes guardadas.
export const MiniQRPreview = ({
  dotsType = 'square',
  cornersSquareType = 'square',
  cornersDotType = 'square',
}) => {
  const containerRef = useRef(null);
  const qrInstance = useRef(null);

 useEffect(() => {
  const instance = new QRCodeStyling({
    width: ICON_SIZE,
    height: ICON_SIZE,
    type: 'svg',
    data: SAMPLE_DATA,
    margin: 0,
    qrOptions: { errorCorrectionLevel: 'L' },
    dotsOptions: { color: '#1a1a2e', type: dotsType },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#1a1a2e', type: cornersSquareType },
    cornersDotOptions: { color: '#1a1a2e', type: cornersDotType },
  });

  qrInstance.current = instance;

  if (containerRef.current) {
    containerRef.current.innerHTML = ''; // limpia cualquier render anterior antes de añadir el nuevo
    instance.append(containerRef.current);
  }
}, [dotsType, cornersSquareType, cornersDotType]);

  return <span ref={containerRef} aria-hidden="true" />;
};