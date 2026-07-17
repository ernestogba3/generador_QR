// URLFields.jsx muestra el campo para introducir una URL.
// Valida que la URL tenga formato correcto al perder el foco.

import { useState } from 'react';
import { isValidURL, ERROR_MESSAGES } from '../../utils/validators';
import styles from './FormFields.module.css';

export const URLFields = ({ formData, onFormChange }) => {

  const [touched, setTouched] = useState(false);

  const isValid = isValidURL(formData.url || '');
  const showError = touched && !isValid && formData.url;

  const handleChange = (e) => {
    onFormChange({
      ...formData,
      url: e.target.value
    });
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className={styles.fieldsContainer}>

      <div className={styles.fieldGroup}>
        <label htmlFor="url" className={styles.label}>
          URL <span className={styles.required}>*</span>
        </label>
        <input
          id="url"
          type="url"
          value={formData.url || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://ejemplo.com"
          className={`${styles.input} ${showError ? styles.inputError : ''}`}
        />
        {showError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidURL}
          </span>
        )}
        <span className={styles.hint}>
          Introduce la URL completa incluyendo https://
        </span>
      </div>

    </div>
  );
};