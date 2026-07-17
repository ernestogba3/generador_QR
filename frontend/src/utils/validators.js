// validators.js contiene todas las funciones de validación
// de los campos del formulario.

// Valida que un campo no esté vacío
export const isRequired = (value) => {
  return value && value.trim().length > 0;
};

// Valida formato de URL
export const isValidURL = (value) => {
  if (!value) return false;
  const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return urlRegex.test(value);
};

// Valida formato de email con regex
export const isValidEmail = (value) => {
  if (!value) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

// Valida que un teléfono solo tenga números
// El código de país se maneja por separado con el desplegable
export const isValidPhone = (value) => {
  if (!value) return false;
  const phoneRegex = /^[0-9]{6,12}$/;
  return phoneRegex.test(value);
};

// Mensajes de error para cada validación
export const ERROR_MESSAGES = {
  required:     'Este campo es obligatorio',
  invalidURL:   'Introduce una URL válida. Ejemplo: https://ejemplo.com',
  invalidEmail: 'Introduce un email válido. Ejemplo: nombre@correo.com',
  invalidPhone: 'Introduce solo números, sin espacios ni guiones',
};