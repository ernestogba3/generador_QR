// qrGenerator.js - REFACTORIZADO
// Convierte los datos del formulario en strings QR
// Cada tipo de QR tiene un formato específico que los móviles reconocen

// ============================================
// HELPERS: Funciones auxiliares reutilizables
// ============================================

// Helper para generar URLs telefónicas
// Evita duplicación entre tel: y smsto:
const generatePhoneFormat = (phone, prefix = 'tel:', suffix = '') => {
  // Si no hay teléfono, devuelve vacío
  if (!phone) return '';
  // Construye: prefix + phone + suffix
  // Ejemplo: 'tel:' + '+34600000000' = 'tel:+34600000000'
  return `${prefix}${phone}${suffix}`;
};

// ============================================
// GENERADORES: Uno por cada tipo de QR
// ============================================

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
  
  // Construir parámetros opcionales
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (message) params.push(`body=${encodeURIComponent(message)}`);
  
  // Agregar parámetros a la URL si existen
  if (params.length > 0) mailto += `?${params.join('&')}`;
  
  return mailto;
};

// Teléfono: formato tel:
// tel:+34600000000
// ✅ REFACTORIZADO: Usa el helper generatePhoneFormat
export const generatePhone = (formData) => {
  return generatePhoneFormat(formData.phone);
};

// SMS: formato smsto:
// smsto:+34600000000:Mensaje
// ✅ REFACTORIZADO: Usa el helper generatePhoneFormat
// El suffix incluye ':' + mensaje (opcional)
export const generateSMS = (formData) => {
  const message = formData.message || '';
  // Pasamos suffix como ':' + mensaje
  return generatePhoneFormat(
    formData.phone,
    'smsto:',
    message ? `:${message}` : ''
  );
};

// WiFi: formato WIFI:
// WIFI:T:WPA;S:NombreRed;P:Contraseña;;
export const generateWiFi = (formData) => {
  const { ssid, password, security } = formData;
  if (!ssid) return '';
  
  // Construir string WiFi con los parámetros
  return `WIFI:T:${security || 'WPA'};S:${ssid};P:${password || ''};;`;
};

// vCard: formato VCARD
// Es el más complejo porque tiene muchos campos
// Formato estándar para contactos
export const generateVCard = (formData) => {
  const { firstName, lastName, phone, email, company, jobTitle, website } = formData;
  
  // Si no hay nombre, no se puede crear vCard
  if (!firstName) return '';

  // Construimos la vCard línea a línea (formato estándar)
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName || ''};${firstName};;;`,
    `FN:${firstName} ${lastName || ''}`.trim(),
  ];

  // Agregar campos opcionales si existen
  if (phone)    lines.push(`TEL:${phone}`);
  if (email)    lines.push(`EMAIL:${email}`);
  if (company)  lines.push(`ORG:${company}`);
  if (jobTitle) lines.push(`TITLE:${jobTitle}`);
  if (website)  lines.push(`URL:${website}`);

  lines.push('END:VCARD');

  // Unir todas las líneas con saltos de línea
  return lines.join('\n');
};

// ============================================
// FUNCIÓN PRINCIPAL: Router de generadores
// ============================================

// generateQRValue decide qué generador usar según la categoría
// Devuelve el string correcto para cada tipo de QR
export const generateQRValue = (category, formData) => {
  switch (category) {
    case 'url':   return generateURL(formData);
    case 'text':  return generateText(formData);
    case 'email': return generateEmail(formData);
    case 'phone': return generatePhone(formData);  // ✅ Ahora usa el helper
    case 'sms':   return generateSMS(formData);    // ✅ Ahora usa el helper
    case 'wifi':  return generateWiFi(formData);
    case 'vcard': return generateVCard(formData);
    default:      return '';
  }
};