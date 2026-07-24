import styles from './StyleSelect.module.css';

// Selector visual reutilizable: rejilla de opciones, cada una con
// una mini-preview y una etiqueta. No sabe nada del dominio (QR, dots...);
// quien lo usa le pasa qué dibujar en cada opción mediante `options`.
export const StyleSelect = ({ id, label, options, value, onChange }) => {
  return (
    <div className={styles.styleSelect}>
      <span className={styles.label} id={`${id}-label`}>
        {label}
      </span>

      <div
        className={styles.optionsGrid}
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
            className={`${styles.optionButton} ${
              value === option.value ? styles.selected : ''
            }`}
          >
            <span className={styles.preview}>{option.preview}</span>
            <span className={styles.optionLabel}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};