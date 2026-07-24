import styles from './StyleSelect.module.css';

// Selector visual reutilizable: rejilla de opciones, cada una con
// una mini-preview y una etiqueta. No sabe nada del dominio (QR, dots...);
// quien lo usa le pasa qué dibujar en cada opción mediante `options`.
// `compact`: oculta la etiqueta de texto (queda solo como tooltip/aria-label),
// para grids con muchas opciones donde el texto no cabe bien.
export const StyleSelect = ({ id, label, options, value, onChange, compact = false }) => {
  return (
    <div className={styles.styleSelect}>
      <span className={styles.label} id={`${id}-label`}>
        {label}
      </span>

      <div
        className={`${styles.optionsGrid} ${compact ? styles.compact : ''}`}
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={`${styles.optionButton} ${compact ? styles.compactButton : ''} ${
              value === option.value ? styles.selected : ''
            }`}
          >
            <span className={styles.preview}>{option.preview}</span>
            {!compact && <span className={styles.optionLabel}>{option.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};