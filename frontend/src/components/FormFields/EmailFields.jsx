// EmailFields.jsx
// ANTES: Validación local con useState
// AHORA: Usando el custom hook useFormValidation

import { useFormValidation } from '../../hooks/useFormValidation';
import styles from './FormFields.module.css';

export const EmailFields = ({ formData, onFormChange }) => {

  // Usamos el custom hook para toda la lógica de validación
  // El hook recibe: categoría y datos del formulario
  // Devuelve: errors, isFormValid, touched, handleBlur
  const { errors, touched, handleBlur } = useFormValidation('email', formData);

  // Helpers para mostrar errores específicamente en el email
  // Si el campo fue tocado (blur) Y hay error, mostramos el mensaje
  const showEmailError = touched.email && errors.email;

  // Manejador de cambio: actualiza el formData cuando el usuario escribe
  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Campo email con validación */}
      <div className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        
        {/* Input del email */}
        <input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="ejemplo@correo.com"
          className={`${styles.input} ${showEmailError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showEmailError && (
          <span className={styles.error}>
            {errors.email}
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