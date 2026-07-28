// TextFields.jsx - REFACTORIZADO
// Ahora agrega validación usando el custom hook useFormValidation
// Valida que el campo de texto no esté vacío (es obligatorio)

// ✅ Importamos el hook de validación
import { useFormValidation } from '../../hooks/useFormValidation';
import styles from './FormFields.module.css';

export const TextFields = ({ formData, onFormChange }) => {

  // ✅ Usamos el custom hook para gestionar validación
  // El hook recibe:
  //   - 'text': la categoría (debe coincidir con las validaciones del hook)
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores (ej: { text: 'Este campo es obligatorio' })
  //   - touched: objeto con los campos que han sido tocados (blur)
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('text', formData);

  // Helper: mostramos el error solo si el campo fue tocado Y hay error
  const showError = touched.text && errors.text;

  // Manejador de cambio: actualiza el formData cuando el usuario escribe en el textarea
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
          Texto <span className={styles.required}>*</span>
        </label>
        
        {/* Textarea para texto largo */}
        <textarea
          id="text"
          value={formData.text || ''}
          onChange={handleChange}
          onBlur={() => handleBlur('text')}
          placeholder="Escribe aquí tu mensaje..."
          className={`${styles.textarea} ${showError ? styles.inputError : ''}`}
          maxLength={500}        
        />
        
        {/* Mostrar error si existe */}
        {showError && (
          <span className={styles.error}>
            {errors.text}
          </span>
        )}
        
        {/* Contador de caracteres */}
        <span className={styles.hint}>
          {formData.text?.length || 0}/500 caracteres
        </span>
      </div>

    </div>
  );
};