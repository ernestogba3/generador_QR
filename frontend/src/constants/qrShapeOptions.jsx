import { MiniQRPreview } from '../components/MiniQRPreview/MiniQRPreview';

// Etiquetas legibles para cada valor que acepta qr-code-styling.
const SHAPE_LABELS = {
  square: 'Cuadrado',
  dot: 'Punto',
  dots: 'Puntos',
  rounded: 'Redondeado',
  'extra-rounded': 'Extra redondeado',
  classy: 'Elegante',
  'classy-rounded': 'Elegante redondeado',
};

// Construye la lista de opciones para un StyleSelect, generando la
// preview en vivo con MiniQRPreview. `previewProp` indica qué prop de
// MiniQRPreview hay que variar (dotsType, cornersSquareType o
// cornersDotType), para que la miniatura muestre la pieza correcta.
const buildShapeOptions = (values, previewProp) =>
  values.map((value) => ({
    value,
    label: SHAPE_LABELS[value],
    preview: <MiniQRPreview {...{ [previewProp]: value }} />,
  }));

// dotsOptions.type NO admite 'dot', solo estas 6.
export const DOT_STYLE_OPTIONS = buildShapeOptions(
  ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'],
  'dotsType'
);

// cornersSquareOptions.type SÍ admite las 6 anteriores + 'dot'.
export const CORNER_SQUARE_STYLE_OPTIONS = buildShapeOptions(
  ['square', 'dot', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'],
  'cornersSquareType'
);

// cornersDotOptions.type admite el mismo conjunto de 7.
export const CORNER_DOT_STYLE_OPTIONS = buildShapeOptions(
  ['square', 'dot', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'],
  'cornersDotType'
);