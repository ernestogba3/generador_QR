import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { generateQRValue } from '../../utils/qrGenerator';
import { downloadQR, generateFilename } from '../../utils/downloadFile';
import { FormatSelector } from '../FormatSelector/FormatSelector';
import styles from './QRPreview.module.css';

export const QRPreview = ({ category, formData, format, onFormatChange }) => {

  const qrRef = useRef(null);
  const qrInstance = useRef(null);

  const qrValue = generateQRValue(category, formData);
  const hasValue = qrValue.trim().length > 0;

  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: 280,
      height: 280,
      type: 'svg',
      dotsOptions: {
        color: '#1a1a2e',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        type: 'dot',
      },
    });

    if (qrRef.current) {
      qrInstance.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (qrInstance.current && hasValue) {
      qrInstance.current.update({ data: qrValue });
    }
  }, [qrValue, hasValue]);

  // Descarga el QR en el formato seleccionado
  const handleDownload = async () => {
    const filename = generateFilename(category, formData);
    await downloadQR(qrInstance.current, format, filename);
  };

  return (
    <div className={styles.qrPreview}>

      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>Vista previa</h2>
      </div>

      <div className={styles.previewArea}>
        <div
          ref={qrRef}
          className={styles.qrCanvas}
          style={{ display: hasValue ? 'flex' : 'none' }}
        />

        {!hasValue && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📱</span>
            <p className={styles.emptyText}>
              Rellena el formulario para generar tu QR
            </p>
          </div>
        )}
      </div>

      {/* FormatSelector con botón de descarga */}
      <FormatSelector
        format={format}
        onFormatChange={onFormatChange}
        onDownload={handleDownload}
        hasValue={hasValue}
      />

    </div>
  );
};