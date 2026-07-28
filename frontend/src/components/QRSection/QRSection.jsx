// QRSection.jsx - REFACTORIZADO
// Sección principal que orquesta: formulario, validación, preview y personalización

import styles from './QRSection.module.css';
import { QRForm } from '../QRForm/QRForm';
import { QRPreview } from '../QRPreview/QRPreview';
import { QRCustomizer } from '../QRCustomizer/QRCustomizer';
import { useQRCustomization } from '../../hooks/useQRCustomization';
import { useFormValidation } from '../../hooks/useFormValidation';

export const QRSection = ({
  category,
  onCategoryChange,
  formData,
  onFormChange,
  format,
  onFormatChange,
}) => {
  // Hook de personalización: maneja colores, tamaños, estilos
  const {
    customization,
    updateCustomization,
    resetCustomization,
    isDefaultCustomization,
  } = useQRCustomization();

  // Hook de validación: chequea si el formulario es válido
  const { isFormValid } = useFormValidation(category, formData);

  return (
    <section className={styles.qrSection}>
      <div className={styles.qrContainer}>

        {/* COLUMNA IZQUIERDA: Vista previa del QR */}
        <div className={styles.previewWrapper}>
          <QRPreview
            category={category}
            formData={formData}
            format={format}
            onFormatChange={onFormatChange}
            customization={customization}
            isFormValid={isFormValid}
          />
        </div>

        {/* COLUMNA DERECHA: Formulario y personalización */}
        <div className={styles.formColumn}>
          
          {/* Formulario: categoría + campos dinámicos */}
          <div className={styles.formWrapper}>
            <QRForm
              category={category}
              onCategoryChange={onCategoryChange}
              formData={formData}
              onFormChange={onFormChange}
            />
          </div>

          {/* Personalización: colores, tamaños, estilos */}
          <div className={styles.customizerWrapper}>
            <QRCustomizer
              customization={customization}
              onCustomizationChange={updateCustomization}
              onReset={resetCustomization}
              showReset={!isDefaultCustomization}
            />
          </div>

        </div>

      </div>
    </section>
  );
};