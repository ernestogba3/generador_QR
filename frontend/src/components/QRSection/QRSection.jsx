// QRSection.jsx - ACTUALIZADO
// Ahora usa useFormValidation para obtener isFormValid
// Y lo pasa como prop a QRPreview

import styles from './QRSection.module.css';
import { QRForm } from '../QRForm/QRForm';
import { QRPreview } from '../QRPreview/QRPreview';
import { QRCustomizer } from '../QRCustomizer/QRCustomizer';
import { useQRCustomization } from '../../hooks/useQRCustomization';
import { useFormValidation } from '../../hooks/useFormValidation'; {/* ✅ IMPORTAMOS el hook */}

export const QRSection = ({
  category,
  onCategoryChange,
  formData,
  onFormChange,
  format,
  onFormatChange,
}) => {
  const {
    customization,
    updateCustomization,
    resetCustomization,
    isDefaultCustomization,
  } = useQRCustomization();

  // ✅ NUEVO: Usamos useFormValidation para obtener isFormValid
  // El hook chequea si todos los campos obligatorios son válidos
  const { isFormValid } = useFormValidation(category, formData);

  return (
    <section className={styles.qrSection}>
      <div className={styles.qrContainer}>

        <div className={styles.previewWrapper}>
          {/* ✅ Pasamos isFormValid como prop a QRPreview */}
          <QRPreview
            category={category}
            formData={formData}
            format={format}
            onFormatChange={onFormatChange}
            customization={customization}
            isFormValid={isFormValid}
          />
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formWrapper}>
            <QRForm
              category={category}
              onCategoryChange={onCategoryChange}
              formData={formData}
              onFormChange={onFormChange}
            />
          </div>

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