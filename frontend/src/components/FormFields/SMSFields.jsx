// SMSFields.jsx - REFACTORIZADO
// Ahora usa el custom hook useFormValidation para validar el teléfono
// El mensaje es opcional, no requiere validación

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { useFormValidation } from '../../hooks/useFormValidation';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const SMSFields = ({ formData, onFormChange }) => {

  // ✅ Mantenemos el estado local del código de país
  // Esto es específico de este componente
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  // ✅ Usamos el custom hook para gestionar validación del teléfono
  // El hook recibe:
  //   - 'sms': la categoría (valida el campo 'phoneNumber')
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores
  //   - touched: objeto con los campos tocados
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('sms', formData);

  // Helper: mostramos el error solo si el campo fue tocado Y hay error
  const showPhoneError = touched.phone && errors.phone;

  // Manejador para cambio de código de país
  // Actualiza el código y reconstruye el número completo
  const handleCountryChange = (newCode) => {
    setCountryCode(newCode);
    onFormChange({
      ...formData,
      phone: `${newCode}${formData.phoneNumber || ''}`,
      countryCode: newCode,
    });
  };

  // Manejador para cambio en el número de teléfono
  // Solo permite números (sin espacios ni caracteres especiales)
  const handlePhoneChange = (e) => {
    // Filtramos solo números
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    
    // Actualizamos el formData con:
    // - phoneNumber: solo el número (sin código de país)
    // - phone: el número completo (código + número)
    onFormChange({
      ...formData,
      phoneNumber: onlyNumbers,
      phone: `${countryCode}${onlyNumbers}`,
    });
  };

  // Manejador para cambio en el mensaje del SMS
  // El mensaje es opcional, no requiere validación especial
  const handleMessageChange = (e) => {
    onFormChange({
      ...formData,
      message: e.target.value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Campo teléfono con selector de país */}
      <div className={styles.fieldGroup}>
        <label htmlFor="smsPhone" className={styles.label}>
          Número de teléfono <span className={styles.required}>*</span>
        </label>

        <div className={styles.phoneContainer}>
          {/* Desplegable personalizado con buscador de código de país */}
          <CountryCodeSelector
            value={countryCode}
            onChange={handleCountryChange}
          />
          
          {/* Input del número de teléfono */}
          <input
            id="smsPhone"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur('phone')}
            placeholder="600 000 000"
            className={`${styles.input} ${showPhoneError ? styles.inputError : ''}`}
          />
        </div>

        {/* Muestra el número completo (con código de país) como ayuda */}
        {formData.phone && (
          <span className={styles.hint}>
            Número completo: {formData.phone}
          </span>
        )}

        {/* Mostrar error si existe */}
        {showPhoneError && (
          <span className={styles.error}>
            {errors.phone}
          </span>
        )}
      </div>

      {/* Campo mensaje (opcional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="smsMessage" className={styles.label}>
          Mensaje <span className={styles.optional}>(opcional)</span>
        </label>
        <textarea
          id="smsMessage"
          value={formData.message || ''}
          onChange={handleMessageChange}
          placeholder="Escribe aquí el mensaje..."
          className={styles.textarea}
          maxLength={160}
        />
        <span className={styles.hint}>
          {formData.message?.length || 0}/160 caracteres
        </span>
      </div>

    </div>
  );
};