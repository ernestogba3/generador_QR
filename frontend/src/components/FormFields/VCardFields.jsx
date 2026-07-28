// VCardFields.jsx - REFACTORIZADO
// Ahora usa el custom hook useFormValidation para validar campos
// El nombre es obligatorio, el resto son opcionales (pero deben ser válidos si se rellenan)

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { useFormValidation } from '../../hooks/useFormValidation';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const VCardFields = ({ formData, onFormChange }) => {

  // ✅ Mantenemos el estado local del código de país
  // Esto es específico de este componente
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  // ✅ Usamos el custom hook para gestionar validación de vCard
  // El hook recibe:
  //   - 'vcard': la categoría
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores (firstName, phone, email, website)
  //   - touched: objeto con los campos tocados
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('vcard', formData);

  // Helpers para mostrar errores de campos específicos
  const showFirstNameError = touched.firstName && errors.firstName;
  const showPhoneError = touched.phone && errors.phone;
  const showEmailError = touched.email && errors.email;
  const showWebsiteError = touched.website && errors.website;

  // Manejador genérico de cambio
  // Actualiza cualquier campo en el formData
  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

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

  return (
    <div className={styles.fieldsContainer}>

      {/* Nombre (OBLIGATORIO) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="firstName" className={styles.label}>
          Nombre <span className={styles.required}>*</span>
        </label>
        <input
          id="firstName"
          type="text"
          value={formData.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          onBlur={() => handleBlur('firstName')}
          placeholder="Juan"
          className={`${styles.input} ${showFirstNameError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showFirstNameError && (
          <span className={styles.error}>
            {errors.firstName}
          </span>
        )}
      </div>

      {/* Apellido (OPCIONAL) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="lastName" className={styles.label}>
          Apellido <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="lastName"
          type="text"
          value={formData.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="García"
          className={styles.input}
        />
      </div>

      {/* Teléfono con selector de país (OPCIONAL pero debe ser válido si se rellena) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="vcardPhone" className={styles.label}>
          Teléfono <span className={styles.optional}>(opcional)</span>
        </label>
        <div className={styles.phoneContainer}>
          {/* Desplegable personalizado con buscador de código de país */}
          <CountryCodeSelector
            value={countryCode}
            onChange={handleCountryChange}
          />
          
          {/* Input del número de teléfono */}
          <input
            id="vcardPhone"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur('phone')}
            placeholder="600 000 000"
            className={`${styles.input} ${showPhoneError ? styles.inputError : ''}`}
          />
        </div>
        
        {/* Mostrar error si existe */}
        {showPhoneError && (
          <span className={styles.error}>
            {errors.phone}
          </span>
        )}
      </div>

      {/* Email (OPCIONAL pero debe ser válido si se rellena) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="vcardEmail" className={styles.label}>
          Email <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="vcardEmail"
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="juan@ejemplo.com"
          className={`${styles.input} ${showEmailError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showEmailError && (
          <span className={styles.error}>
            {errors.email}
          </span>
        )}
      </div>

      {/* Empresa (OPCIONAL, sin validación) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="company" className={styles.label}>
          Empresa <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="company"
          type="text"
          value={formData.company || ''}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="Nombre de la empresa"
          className={styles.input}
        />
      </div>

      {/* Cargo (OPCIONAL, sin validación) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="jobTitle" className={styles.label}>
          Cargo <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          value={formData.jobTitle || ''}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          placeholder="Desarrollador Web"
          className={styles.input}
        />
      </div>

      {/* Sitio web (OPCIONAL pero debe ser válido si se rellena) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="website" className={styles.label}>
          Sitio web <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="website"
          type="url"
          value={formData.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          onBlur={() => handleBlur('website')}
          placeholder="https://ejemplo.com"
          className={`${styles.input} ${showWebsiteError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showWebsiteError && (
          <span className={styles.error}>
            {errors.website}
          </span>
        )}
        
        {/* Ayuda al usuario */}
        <span className={styles.hint}>
          Solo el nombre es obligatorio, el resto de campos son opcionales
        </span>
      </div>

    </div>
  );
};