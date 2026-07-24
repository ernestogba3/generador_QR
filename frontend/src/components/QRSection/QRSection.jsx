import styles from './QRSection.module.css';
import { QRForm } from '../QRForm/QRForm';
import { QRPreview } from '../QRPreview/QRPreview';
import { QRCustomizer } from '../QRCustomizer/QRCustomizer';
import { useQRCustomization } from '../../hooks/useQRCustomization';

export const QRSection = ({
  category,
  onCategoryChange,
  formData,
  onFormChange,
  format,
  onFormatChange,
}) => {
  const { dotsColor, setDotsColor, dotsType, setDotsType } = useQRCustomization();

  return (
    <section className={styles.qrSection}>
      <div className={styles.qrContainer}>

        <div className={styles.previewWrapper}>
          <QRPreview
            category={category}
            formData={formData}
            format={format}
            onFormatChange={onFormatChange}
            dotsColor={dotsColor}
            dotsType={dotsType}
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
              dotsColor={dotsColor}
              onDotsColorChange={setDotsColor}
              dotsType={dotsType}
              onDotsTypeChange={setDotsType}
            />
          </div>
        </div>

      </div>
    </section>
  );
};