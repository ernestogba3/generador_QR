// VCardFields.jsx muestra los campos para generar un QR de contacto.
// Valida el teléfono, email y URL si se rellenan.

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { isValidEmail, isValidPhone, isValidURL, ERROR_MESSAGES } from '../../utils/validators';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const VCardFields = ({ formData, onFormChange }) => {

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  // Controlamos el foco de cada campo por separado
  const [touched, setTouched] = useState({
    firstName: false,
    phone: false,
    email: false,
    website: false,
  });

  // Validaciones
  const isPhoneValid = !formData.phoneNumber || isValidPhone(formData.phoneNumber);
  const isEmailValid = !formData.email || isValidEmail(formData.email);
  const isWebsiteValid = !formData.website || isValidURL(formData.website);

  // Errores - solo si el campo fue tocado y tiene valor inválido
  const showPhoneError = touched.phone && !isPhoneValid;
  const showEmailError = touched.email && !isEmailValid;
  const showWebsiteError = touched.website && !isWebsiteValid;
  const showFirstNameError = touched.firstName && !formData.firstName;

  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleCountryChange = (newCode) => {
    setCountryCode(newCode);
    onFormChange({
      ...formData,
      phone: `${newCode}${formData.phoneNumber || ''}`,
      countryCode: newCode,
    });
  };

  const handlePhoneChange = (e) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    onFormChange({
      ...formData,
      phoneNumber: onlyNumbers,
      phone: `${countryCode}${onlyNumbers}`,
    });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Nombre (obligatorio) */}
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
        {showFirstNameError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.required}
          </span>
        )}
      </div>

      {/* Apellido (opcional) */}
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

      {/* Teléfono con selector de país (opcional) */}
      <div className={styles.fieldGroup}>
        <label htmlFor="vcardPhone" className={styles.label}>
          Teléfono <span className={styles.optional}>(opcional)</span>
        </label>
        <div className={styles.phoneContainer}>
          <CountryCodeSelector
            value={countryCode}
            onChange={handleCountryChange}
          />
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
        {showPhoneError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidPhone}
          </span>
        )}
      </div>

      {/* Email (opcional) */}
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
        {showEmailError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidEmail}
          </span>
        )}
      </div>

      {/* Empresa (opcional) */}
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

      {/* Cargo (opcional) */}
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

      {/* Sitio web (opcional) */}
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
        {showWebsiteError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidURL}
          </span>
        )}
        <span className={styles.hint}>
          Solo el nombre es obligatorio, el resto de campos son opcionales
        </span>
      </div>

    </div>
  );
};