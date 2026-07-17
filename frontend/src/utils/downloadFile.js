// downloadFile.js contiene la lógica para descargar el QR
// en diferentes formatos: PNG, SVG, PDF, JPG.
// Separamos esta lógica del componente para mantenerlo limpio.

// Descarga el QR en el formato seleccionado
export const downloadQR = async (qrInstance, format, filename = 'qr-code') => {
  if (!qrInstance) return;

  switch (format) {
    case 'png':
      await qrInstance.download({
        name: filename,
        extension: 'png',
      });
      break;

    case 'svg':
      await qrInstance.download({
        name: filename,
        extension: 'svg',
      });
      break;

    case 'jpg':
      await qrInstance.download({
        name: filename,
        extension: 'jpeg',
      });
      break;

    // case 'pdf':
    //   // qr-code-styling no soporta PDF directamente
    //   // Descargamos como PNG y avisamos al usuario
    //   await qrInstance.download({
    //     name: filename,
    //     extension: 'png',
    //   });
    //   break;

    default:
      await qrInstance.download({
        name: filename,
        extension: 'png',
      });
  }
};

// Genera un nombre de archivo basado en la categoría y los datos
export const generateFilename = (category, formData) => {
  switch (category) {
    case 'url':
      return `qr-url-${Date.now()}`;
    case 'text':
      return `qr-texto-${Date.now()}`;
    case 'email':
      return `qr-email-${formData.email || Date.now()}`;
    case 'phone':
      return `qr-telefono-${formData.phone || Date.now()}`;
    case 'sms':
      return `qr-sms-${Date.now()}`;
    case 'wifi':
      return `qr-wifi-${formData.ssid || Date.now()}`;
    case 'vcard':
      return `qr-contacto-${formData.firstName || Date.now()}`;
    default:
      return `qr-code-${Date.now()}`;
  }
};