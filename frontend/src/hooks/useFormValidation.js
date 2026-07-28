// useFormValidation.js - REFACTORIZADO
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

// ============================================
// HELPER: Validar campos de teléfono
// ============================================

// Helper que valida campos de teléfono (phone y sms comparten lógica)
// Evita duplicación de código entre categorías phone y sms
const validatePhoneField = (errors, formData, fieldName = 'phone') => {
  // El teléfono es obligatorio
  if (!isRequired(formData[fieldName])) {
    errors[fieldName] = ERROR_MESSAGES.required;
  }
  // Si tiene contenido, validar que sea un teléfono válido
  else if (!isValidPhone(formData[fieldName])) {
    errors[fieldName] = ERROR_MESSAGES.invalidPhone;
  }
};

// ============================================
// FUNCIÓN PRINCIPAL: Validar según categoría
// ============================================

// Esta función valida según el tipo de categoría
// Cada categoría tiene sus propias reglas
const validateFormData = (category, formData) => {
  // Objeto que guardará los errores
  // Estructura: { email: 'error', url: 'error', ... }
  const newErrors = {};

  // CATEGORÍA: URL
  if (category === 'url') {
    if (!isRequired(formData.url)) {
      newErrors.url = ERROR_MESSAGES.required;
    } else if (!isValidURL(formData.url)) {
      newErrors.url = ERROR_MESSAGES.invalidURL;
    }
  }

  // CATEGORÍA: TEXTO
  if (category === 'text') {
    if (!isRequired(formData.text)) {
      newErrors.text = ERROR_MESSAGES.required;
    }
  }

  // CATEGORÍA: EMAIL
  if (category === 'email') {
    if (!isRequired(formData.email)) {
      newErrors.email = ERROR_MESSAGES.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.invalidEmail;
    }
  }

  // ✅ REFACTORIZADO: CATEGORÍAS PHONE y SMS
  // Ambas validan exactamente lo mismo: el campo 'phone'
  // Usamos el helper para evitar duplicación
  if (category === 'phone' || category === 'sms') {
    validatePhoneField(newErrors, formData, 'phone');
  }

  // CATEGORÍA: WiFi
  if (category === 'wifi') {
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

// ============================================
// CUSTOM HOOK: useFormValidation
// ============================================

export const useFormValidation = (category, formData) => {
  // 'touched' controla qué campos han sido tocados (blur)
  // Solo mostramos errores en campos que el usuario ha tocado
  // Estructura: { email: true, url: false, ... }
  const [touched, setTouched] = useState({});

  // Validamos cada vez que cambian 'category' o 'formData'
  // useMemo: solo recalcula si sus dependencias cambian
  // Optimización: evita re-validar en cada render
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