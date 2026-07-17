// QRForm.jsx es el contenedor del formulario completo.
// Agrupa CategorySelector y FormFields dentro de una tarjeta.
// También tendrá el botón de limpiar formulario.

import styles from './QRForm.module.css';
import { CategorySelector } from '../CategorySelector/CategorySelector';
import { FormFields } from '../FormFields/FormFields';

export const QRForm = ({ category, onCategoryChange, formData, onFormChange }) => {

  // Limpia todos los datos del formulario
  const handleClear = () => {
    onFormChange({});
  };

  return (
    <div className={styles.qrForm}>

      {/* Título de la tarjeta */}
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Personaliza tu QR</h2>
        {/* Botón limpiar solo visible si hay datos en el formulario */}
        {Object.keys(formData).length > 0 && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            type="button"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Selector de categoría */}
      <CategorySelector
        category={category}
        onCategoryChange={onCategoryChange}
      />

      {/* Campos dinámicos según categoría */}
      <FormFields
        category={category}
        formData={formData}
        onFormChange={onFormChange}
      />

    </div>
  );
};