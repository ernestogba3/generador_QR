// Este archivo es la "base de datos" de todas las categorías de QR.
// Cada vez que quieras añadir una nueva categoría en el futuro,
// solo tienes que añadir un nuevo objeto a este array.

export const QR_CATEGORIES = [
  {
    id: 'url',        // Identificador único de la categoría
    label: 'URL',     // Texto que verá el usuario en el desplegable
    icon: '🌐',       // Icono visual
    description: 'Enlace a una página web',   // Descripción corta
    fields: ['url'],  // Campos que necesita este tipo de QR
  },
  {
    id: 'text',
    label: 'Texto',
    icon: '📝',
    description: 'Mensaje de texto libre',
    fields: ['text'],
  },
  {
    id: 'email',
    label: 'Email',
    icon: '📧',
    description: 'Abre el cliente de correo',
    fields: ['email', 'subject', 'message'],  // Necesita 3 campos
  },
  {
    id: 'phone',
    label: 'Teléfono',
    icon: '📞',
    description: 'Abre la app de llamadas',
    fields: ['phone'],
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: '💬',
    description: 'Abre la app de mensajes',
    fields: ['phone', 'message'],  // Necesita teléfono y mensaje
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: '📶',
    description: 'Conecta a una red WiFi',
    fields: ['ssid', 'password', 'security'],  // Necesita red, contraseña y seguridad
  },
  {
    id: 'vcard',
    label: 'vCard',
    icon: '👤',
    description: 'Guarda un contacto',
    fields: ['firstName', 'lastName', 'phone', 'email', 'company', 'jobTitle', 'website'],
  },
];

// Este objeto define la categoría que se muestra por defecto al cargar la página.
// Lo separamos aquí para poder cambiarlo fácilmente en el futuro.
export const DEFAULT_CATEGORY = 'url';