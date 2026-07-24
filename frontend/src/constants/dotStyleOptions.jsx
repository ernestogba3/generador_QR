// Define las 6 formas de punto que soporta qr-code-styling, cada una
// con una mini-preview SVG (3x3 puntos) que aproxima visualmente su
// aspecto. No es una réplica exacta del render real del QR — es solo
// una referencia suficiente para que el usuario elija con criterio.

const GRID_POSITIONS = [0, 1, 2];

// Dibuja una rejilla 3x3. `mode` decide la forma de cada celda:
// - 'circle' / 'square' / 'rounded' / 'extra-rounded' → todas las celdas iguales
// - 'classy' / 'classy-rounded' → alterna cuadrado y rombo (checkerboard)
const MiniGrid = ({ mode }) => {
  const shapeFor = (row, col) => {
    const isAlternate = (row + col) % 2 === 1;

    if (mode === 'classy') return isAlternate ? 'diamond-sharp' : 'square-sharp';
    if (mode === 'classy-rounded') return isAlternate ? 'diamond-soft' : 'square-soft';
    return mode; // circle | square | rounded | extra-rounded
  };

  return (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      {GRID_POSITIONS.map((row) =>
        GRID_POSITIONS.map((col) => {
          const shape = shapeFor(row, col);
          const x = col * 12 + 2;
          const y = row * 12 + 2;
          const size = 8;
          const cx = x + size / 2;
          const cy = y + size / 2;

          if (shape === 'circle') {
            return <circle key={`${row}-${col}`} cx={cx} cy={cy} r={size / 2} fill="#1a1a2e" />;
          }

          const isDiamond = shape.startsWith('diamond');
          const rx = { square: 0, rounded: 3, 'extra-rounded': 4, 'square-sharp': 0, 'square-soft': 2, 'diamond-sharp': 1, 'diamond-soft': 2 }[shape];
          const rotation = isDiamond ? `rotate(45 ${cx} ${cy})` : undefined;

          return (
            <rect
              key={`${row}-${col}`}
              x={x} y={y} width={size} height={size}
              rx={rx} fill="#1a1a2e"
              transform={rotation}
            />
          );
        })
      )}
    </svg>
  );
};

export const DOT_STYLE_OPTIONS = [
  { value: 'square', label: 'Cuadrado', preview: <MiniGrid mode="square" /> },
  { value: 'dots', label: 'Puntos', preview: <MiniGrid mode="circle" /> },
  { value: 'rounded', label: 'Redondeado', preview: <MiniGrid mode="rounded" /> },
  { value: 'extra-rounded', label: 'Extra redondeado', preview: <MiniGrid mode="extra-rounded" /> },
  { value: 'classy', label: 'Elegante', preview: <MiniGrid mode="classy" /> },
  { value: 'classy-rounded', label: 'Elegante redondeado', preview: <MiniGrid mode="classy-rounded" /> },
];