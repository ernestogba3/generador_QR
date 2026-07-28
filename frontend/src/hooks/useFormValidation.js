// useFormValidation.js
// Custom hook que centraliza TODA la lógica de validación del formulario
// Recibe la categoría y los datos del formulario
// Devuelve: errores, si el formulario es válido, y funciones para controlar el foco

import { useState, useMemo } from 'react';
import {
  isRequired,
  isValidEmail,
  isValidURL,
  isValidPhone,
  ERROR_MESSAGES,
} from '../utils/validators';

// Esta función valida según el tipo de categoría
// Cada categoría tiene sus propias reglas
const validateFormData = (category, formData) => {
  // Objeto que guardará los errores
  // Estructura: { email: 'error', url: 'error', ... }
  const newErrors = {};

  // CATEGORÍA: URL
  if (category === 'url') {
    // El campo 'url' es obligatorio
    if (!isRequired(formData.url)) {
      newErrors.url = ERROR_MESSAGES.required;
    }
    // Si tiene contenido, validar que sea una URL válida
    else if (!isValidURL(formData.url)) {
      newErrors.url = ERROR_MESSAGES.invalidURL;
    }
  }

  // CATEGORÍA: TEXTO
  if (category === 'text') {
    // El campo 'text' es obligatorio
    if (!isRequired(formData.text)) {
      newErrors.text = ERROR_MESSAGES.required;
    }
  }

  // CATEGORÍA: EMAIL
  if (category === 'email') {
    // El campo 'email' es obligatorio
    if (!isRequired(formData.email)) {
      newErrors.email = ERROR_MESSAGES.required;
    }
    // Si tiene contenido, validar que sea un email válido
    else if (!isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.invalidEmail;
    }
  }

  // CATEGORÍA: TELÉFONO
  if (category === 'phone') {
    // El campo 'phone' es obligatorio
    if (!isRequired(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.required;
    }
    // Si tiene contenido, validar que sea un teléfono válido
    else if (!isValidPhone(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.invalidPhone;
    }
  }

  // CATEGORÍA: SMS
  if (category === 'sms') {
    // El campo 'phone' es obligatorio para SMS
    if (!isRequired(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.required;
    }
    // Si tiene contenido, validar que sea un teléfono válido
    else if (!isValidPhone(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.invalidPhone;
    }
  }

  // CATEGORÍA: WiFi
  if (category === 'wifi') {
    // El SSID (nombre de la red) es obligatorio
    if (!isRequired(formData.ssid)) {
      newErrors.ssid = ERROR_MESSAGES.required;
    }
  }

  // CATEGORÍA: vCard
  if (category === 'vcard') {
    // Nombre es obligatorio
    if (!isRequired(formData.firstName)) {
      newErrors.firstName = ERROR_MESSAGES.required;
    }

    // Teléfono es OPCIONAL pero si se rellena debe ser válido
    // Si el campo tiene valor, validar; si está vacío, no hay error
    if (formData.phoneNumber && !isValidPhone(formData.phoneNumber)) {
      newErrors.phone = ERROR_MESSAGES.invalidPhone;
    }

    // Email es OPCIONAL pero si se rellena debe ser válido
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.invalidEmail;
    }

    // Website es OPCIONAL pero si se rellena debe ser válido
    if (formData.website && !isValidURL(formData.website)) {
      newErrors.website = ERROR_MESSAGES.invalidURL;
    }
  }

  return newErrors;
};

export const useFormValidation = (category, formData) => {
  // 'touched' controla qué campos han sido tocados (blur)
  // Solo mostramos errores en campos que el usuario ha tocado
  // Estructura: { email: true, url: false, ... }
  const [touched, setTouched] = useState({});

  // Validamos cada vez que cambian 'category' o 'formData'
  // useMemo: solo recalcula si sus dependencias cambian
  const errors = useMemo(() => {
    return validateFormData(category, formData);
  }, [category, formData]);

  // isFormValid: true si NO hay errores
  const isFormValid = Object.keys(errors).length === 0;

  // Función que se ejecuta cuando el usuario hace blur en un campo
  // Marca ese campo como tocado para mostrar su error
  const handleBlur = (fieldName) => {
    setTouched({
      ...touched,
      [fieldName]: true,
    });
  };

  // Devolvemos todo lo que necesitamos
  return {
    errors,           // Objeto con los errores actuales
    isFormValid,      // Boolean: ¿el formulario es válido?
    touched,          // Objeto con qué campos han sido tocados
    handleBlur,       // Función para marcar un campo como tocado
  };
};