import styles from './ColorPicker.module.css';

// Selector de color reutilizable. Hoy lo usamos para el color de los
// puntos del QR; en el Paso 2 de esta misma sesión lo reutilizaremos
// tal cual para el color de fondo, sin tocar este archivo.
export const ColorPicker = ({ id, label, color, onChange }) => {
  return (
    <div className={styles.colorPicker}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.controls}>
        <input
          type="color"
          id={id}
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className={styles.swatch}
        />
        <span className={styles.hexValue}>{color}</span>
      </div>
    </div>
  );
};