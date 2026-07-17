import styles from './QRSection.module.css';
import { QRForm } from '../QRForm/QRForm';
import { QRPreview } from '../QRPreview/QRPreview';

export const QRSection = ({ 
  category,
  onCategoryChange,
  formData,
  onFormChange,
  format,
  onFormatChange,
}) => {

  return (
    <section className={styles.qrSection}>
      <div className={styles.qrContainer}>

        <div className={styles.previewWrapper}>
          <QRPreview
            category={category}
            formData={formData}
            format={format}
            onFormatChange={onFormatChange}
          />
        </div>

        <div className={styles.formWrapper}>
          <QRForm
            category={category}
            onCategoryChange={onCategoryChange}
            formData={formData}
            onFormChange={onFormChange}
          />
        </div>

      </div>
    </section>
  );
};