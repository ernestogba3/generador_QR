// URLFields.jsx - REFACTORIZADO
// Ahora usa el custom hook useFormValidation para toda la validación
// La lógica se centraliza en un único lugar en lugar de duplicarla en cada componente

// ✅ Importamos el hook de validación
import { useFormValidation } from '../../hooks/useFormValidation';
import styles from './FormFields.module.css';

export const URLFields = ({ formData, onFormChange }) => {

  // ✅ Usamos el custom hook para gestionar validación y estado de "tocado"
  // El hook recibe:
  //   - 'url': la categoría (debe coincidir con las validaciones del hook)
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores (ej: { url: 'La URL no es válida' })
  //   - touched: objeto con los campos que han sido tocados (blur)
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('url', formData);

  // Helper: mostramos el error solo si el campo fue tocado Y hay error
  const showError = touched.url && errors.url;

  // Manejador de cambio: actualiza el formData cuando el usuario escribe en el input
  const handleChange = (e) => {
    onFormChange({
      ...formData,
      url: e.target.value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      <div className={styles.fieldGroup}>
        <label htmlFor="url" className={styles.label}>
          URL <span className={styles.required}>*</span>
        </label>
        
        {/* Input de URL */}
        <input
          id="url"
          type="url"
          value={formData.url || ''}
          onChange={handleChange}
          onBlur={() => handleBlur('url')}
          placeholder="https://ejemplo.com"
          className={`${styles.input} ${showError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showError && (
          <span className={styles.error}>
            {errors.url}
          </span>
        )}
        
        {/* Hint/ayuda al usuario */}
        <span className={styles.hint}>
          Introduce la URL completa incluyendo https://
        </span>
      </div>

    </div>
  );
};