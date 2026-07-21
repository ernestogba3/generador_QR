// Opciones de estilo compartidas entre la instancia de preview
// y las instancias temporales creadas para cada descarga.
// Centralizarlas aquí evita que preview y descarga puedan desincronizarse.
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