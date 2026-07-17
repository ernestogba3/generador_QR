// EmailFields.jsx muestra los campos para generar un QR de email.
// Valida el formato del email con regex al perder el foco.

import { useState } from 'react';
import { isValidEmail, ERROR_MESSAGES } from '../../utils/validators';
import styles from './FormFields.module.css';

export const EmailFields = ({ formData, onFormChange }) => {

  // Controlamos el foco de cada campo por separado
  const [touched, setTouched] = useState({
    email: false,
  });

  // Validación del email
  const isEmailValid = isValidEmail(formData.email || '');
  const showEmailError = touched.email && !isEmailValid && formData.email;

  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  // Marcamos el campo como tocado al perder el foco
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Campo email con validación */}
      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="ejemplo@correo.com"
          className={`${styles.input} ${showEmailError ? styles.inputError : ''}`}
        />
        {showEmailError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidEmail}
          </span>
        )}
      </div>

      {/* Campo asunto (opcional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="subject" className={styles.label}>
          Asunto <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject || ''}
          onChange={(e) => handleChange('subject', e.target.value)}
          placeholder="Asunto del email"
          className={styles.input}
        />
      </div>

      {/* Campo mensaje (opcional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="message" className={styles.label}>
          Mensaje <span className={styles.optional}>(opcional)</span>
        </label>
        <textarea
          id="message"
          value={formData.message || ''}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Escribe aquí el mensaje..."
          className={styles.textarea}
          maxLength={300}
        />
        <span className={styles.hint}>
          {formData.message?.length || 0}/300 caracteres
        </span>
      </div>

    </div>
  );
};