// qrGenerator.js convierte los datos del formulario en el string
// correcto para cada tipo de QR.
// Cada tipo de QR tiene un formato específico que los móviles reconocen.

// URL: simplemente la URL
export const generateURL = (formData) => {
  return formData.url || '';
};

// Texto: simplemente el texto
export const generateText = (formData) => {
  return formData.text || '';
};

// Email: formato mailto:
// mailto:email@ejemplo.com?subject=Asunto&body=Mensaje
export const generateEmail = (formData) => {
  const { email, subject, message } = formData;
  if (!email) return '';
  let mailto = `mailto:${email}`;
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (message) params.push(`body=${encodeURIComponent(message)}`);
  if (params.length > 0) mailto += `?${params.join('&')}`;
  return mailto;
};

// Teléfono: formato tel:
// tel:+34600000000
export const generatePhone = (formData) => {
  const { phone } = formData;
  if (!phone) return '';
  return `tel:${phone}`;
};

// SMS: formato smsto:
// smsto:+34600000000:Mensaje
export const generateSMS = (formData) => {
  const { phone, message } = formData;
  if (!phone) return '';
  return `smsto:${phone}:${message || ''}`;
};

// WiFi: formato WIFI:
// WIFI:T:WPA;S:NombreRed;P:Contraseña;;
export const generateWiFi = (formData) => {
  const { ssid, password, security } = formData;
  if (!ssid) return '';
  return `WIFI:T:${security || 'WPA'};S:${ssid};P:${password || ''};;`;
};

// vCard: formato VCARD
// Es el más complejo porque tiene muchos campos
export const generateVCard = (formData) => {
  const { firstName, lastName, phone, email, company, jobTitle, website } = formData;
  if (!firstName) return '';

  // Construimos la vCard línea a línea
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName || ''};${firstName};;;`,
    `FN:${firstName} ${lastName || ''}`.trim(),
  ];

  if (phone)    lines.push(`TEL:${phone}`);
  if (email)    lines.push(`EMAIL:${email}`);
  if (company)  lines.push(`ORG:${company}`);
  if (jobTitle) lines.push(`TITLE:${jobTitle}`);
  if (website)  lines.push(`URL:${website}`);

  lines.push('END:VCARD');

  return lines.join('\n');
};

// Función principal que decide qué generador usar según la categoría
export const generateQRValue = (category, formData) => {
  switch (category) {
    case 'url':   return generateURL(formData);
    case 'text':  return generateText(formData);
    case 'email': return generateEmail(formData);
    case 'phone': return generatePhone(formData);
    case 'sms':   return generateSMS(formData);
    case 'wifi':  return generateWiFi(formData);
    case 'vcard': return generateVCard(formData);
    default:      return '';
  }
};