import styles from './RangeSlider.module.css';

// Slider numérico reutilizable con valor visible. No sabe nada del
// dominio (tamaño de QR, margen...); solo un rango, un paso y una unidad
// opcional para mostrar junto al número (px, %, etc.).
export const RangeSlider = ({ id, label, min, max, step = 1, value, onChange, unit = '' }) => {
  return (
    <div className={styles.rangeSlider}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>{label}</label>
        <span className={styles.value}>{value}{unit}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
      />
    </div>
  );
};