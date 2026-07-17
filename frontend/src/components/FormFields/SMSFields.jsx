// SMSFields.jsx muestra los campos para generar un QR de SMS.
// Valida el teléfono y tiene el selector de país personalizado.

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { isValidPhone, ERROR_MESSAGES } from '../../utils/validators';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const SMSFields = ({ formData, onFormChange }) => {

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [touched, setTouched] = useState({ phone: false });

  const isPhoneValid = isValidPhone(formData.phoneNumber || '');
  const showPhoneError = touched.phone && !isPhoneValid && formData.phoneNumber;

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

  const handleMessageChange = (e) => {
    onFormChange({
      ...formData,
      message: e.target.value
    });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Campo teléfono con selector de país */}
      <div className={styles.fieldGroup}>
        <label htmlFor="smsPhone" className={styles.label}>
          Número de teléfono <span className={styles.required}>*</span>
        </label>

        <div className={styles.phoneContainer}>
          <CountryCodeSelector
            value={countryCode}
            onChange={handleCountryChange}
          />
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

        {formData.phone && (
          <span className={styles.hint}>
            Número completo: {formData.phone}
          </span>
        )}

        {showPhoneError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidPhone}
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