// FormatSelector.jsx muestra el desplegable para elegir el formato
// de descarga del QR y los botones de generar y descargar.
// Se comunica con QRPreview mediante props para acceder a la instancia del QR.

import styles from './FormatSelector.module.css';

// Formatos disponibles para descargar
const FORMATS = [
  { id: 'png', label: 'PNG', description: 'Recomendado para web' },
  { id: 'svg', label: 'SVG', description: 'Recomendado para imprimir' },
  { id: 'jpg', label: 'JPG', description: 'Compatible con todo' },
//   { id: 'pdf', label: 'PDF', description: 'Para documentos' },
];

export const FormatSelector = ({ format, onFormatChange, onDownload, hasValue }) => {

  const handleFormatChange = (e) => {
    onFormatChange(e.target.value);
  };

  return (
    <div className={styles.formatSelector}>

      {/* Desplegable de formatos */}
      <div className={styles.fieldGroup}>
        <label htmlFor="format" className={styles.label}>
          Formato de descarga
        </label>
        <select
          id="format"
          value={format}
          onChange={handleFormatChange}
          className={styles.select}
          disabled={!hasValue}    // Deshabilitado si no hay QR generado
        >
          {FORMATS.map(f => (
            <option key={f.id} value={f.id}>
              {f.label} — {f.description}
            </option>
          ))}
        </select>
      </div>

      {/* Botón descargar */}
      <button
        className={styles.downloadButton}
        onClick={onDownload}
        disabled={!hasValue}      // Deshabilitado si no hay QR generado
        type="button"
      >
        ⬇️ Descargar QR
      </button>

      {/* Mensaje cuando no hay QR generado */}
      {!hasValue && (
        <p className={styles.hint}>
          Rellena el formulario para poder descargar el QR
        </p>
      )}

    </div>
  );
};