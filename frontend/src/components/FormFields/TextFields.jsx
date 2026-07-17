// TextFields.jsx muestra el campo para introducir texto libre.
// Usa un textarea porque el texto puede ser largo.

import styles from './FormFields.module.css';

export const TextFields = ({ formData, onFormChange }) => {

  const handleChange = (e) => {
    onFormChange({
      ...formData,
      text: e.target.value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      <div className={styles.fieldGroup}>
        <label htmlFor="text" className={styles.label}>
          Texto
        </label>
        <textarea
          id="text"
          value={formData.text || ''}
          onChange={handleChange}
          placeholder="Escribe aquí tu mensaje..."
          className={styles.textarea}
          maxLength={500}        
        />
        {/* Contador de caracteres */}
        <span className={styles.hint}>
          {formData.text?.length || 0}/500 caracteres
        </span>
      </div>

    </div>
  );
};