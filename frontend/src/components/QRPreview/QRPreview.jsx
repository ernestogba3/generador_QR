// QRPreview.jsx - ACTUALIZADO
// Ahora recibe isFormValid como prop
// El botón Descargar solo se habilita si isFormValid = true

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { generateQRValue } from "../../utils/qrGenerator";
import { downloadQR, generateFilename } from "../../utils/downloadFile";
import { buildQROptions } from "../../utils/qrStyleOptions";
import { FormatSelector } from "../FormatSelector/FormatSelector";
import styles from "./QRPreview.module.css";

export const QRPreview = ({
  category,
  formData,
  format,
  onFormatChange,
  customization,
  isFormValid,
}) => {
  const qrRef = useRef(null);
  const qrInstance = useRef(null);

  const qrValue = generateQRValue(category, formData);
  const hasValue = qrValue.trim().length > 0;

  // ✅ NUEVA LÓGICA: El botón solo está habilitado si:
  // 1. Hay contenido en el QR (hasValue)
  // 2. El formulario es válido (isFormValid)
  // Antes solo chequeaba hasValue, ahora chequea ambas condiciones
  const isDownloadEnabled = hasValue && isFormValid;

  useEffect(() => {
    qrInstance.current = new QRCodeStyling(buildQROptions(customization));
    if (qrRef.current) {
      qrInstance.current.append(qrRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (qrInstance.current && hasValue) {
      qrInstance.current.update({
        data: qrValue,
        width: customization.size,
        height: customization.size,
        margin: customization.margin,
        dotsOptions: { color: customization.dotsColor, type: customization.dotsType },
        backgroundOptions: { color: customization.backgroundColor },
        cornersSquareOptions: {
          color: customization.cornersSquareColor,
          type: customization.cornersSquareType,
        },
        cornersDotOptions: {
          color: customization.cornersDotColor,
          type: customization.cornersDotType,
        },
      });
    }
  }, [qrValue, hasValue, customization]);

  const handleDownload = async () => {
    // ✅ NUEVA VALIDACIÓN: Verificamos isDownloadEnabled antes de descargar
    if (!isDownloadEnabled) return;

    const filename = generateFilename(category, formData);
    const downloadInstance = new QRCodeStyling({
      ...buildQROptions(customization),
      data: qrValue,
    });
    await downloadQR(downloadInstance, format, filename);
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
          style={{ display: hasValue ? "flex" : "none" }}
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

      {/* ✅ Pasamos isDownloadEnabled a FormatSelector */}
      <FormatSelector
        format={format}
        onFormatChange={onFormatChange}
        onDownload={handleDownload}
        hasValue={isDownloadEnabled}
      />
    </div>
  );
};