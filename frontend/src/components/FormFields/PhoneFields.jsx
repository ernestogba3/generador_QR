// PhoneFields.jsx - REFACTORIZADO
// Ahora usa el custom hook useFormValidation para la validación
// Mantiene el estado local del código de país (eso es específico del componente)

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { useFormValidation } from '../../hooks/useFormValidation';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const PhoneFields = ({ formData, onFormChange }) => {

  // ✅ Mantenemos el estado local del código de país
  // Esto es específico de este componente, no necesita estar en el hook
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  // ✅ Usamos el custom hook para gestionar validación del teléfono
  // El hook recibe:
  //   - 'phone': la categoría (valida el campo 'phoneNumber')
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores
  //   - touched: objeto con los campos tocados
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('phone', formData);

  // Helper: mostramos el error solo si el campo fue tocado Y hay error
  // El hook valida 'phone' pero nosotros mostramos errores en 'phoneNumber'
  const showError = touched.phone && errors.phone;

  // Manejador para cambio de código de país
  // Cuando el usuario selecciona un país diferente, actualizamos:
  // 1. El estado local del código
  // 2. El formData con el número completo (código + número)
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
    // - countryCode: el código de país actual
    onFormChange({
      ...formData,
      phoneNumber: onlyNumbers,
      phone: `${countryCode}${onlyNumbers}`,
      countryCode: countryCode,
    });
  };

  return (
    <div className={styles.fieldsContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor="phoneNumber" className={styles.label}>
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
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur('phone')}
            placeholder="600 000 000"
            className={`${styles.input} ${showError ? styles.inputError : ''}`}
          />

        </div>

        {/* Muestra el número completo (con código de país) como ayuda */}
        {formData.phone && (
          <span className={styles.hint}>
            Número completo: {formData.phone}
          </span>
        )}

        {/* Mostrar error si existe */}
        {showError && (
          <span className={styles.error}>
            {errors.phone}
          </span>
        )}

      </div>
    </div>
  );
};