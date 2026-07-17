import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import { isValidPhone, ERROR_MESSAGES } from '../../utils/validators';
import { CountryCodeSelector } from '../CountryCodeSelector/CountryCodeSelector';
import styles from './FormFields.module.css';

export const PhoneFields = ({ formData, onFormChange }) => {

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [touched, setTouched] = useState(false);

  const isValid = isValidPhone(formData.phoneNumber || '');
  const showError = touched && !isValid && formData.phoneNumber;

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
      countryCode: countryCode,
    });
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className={styles.fieldsContainer}>
      <div className={styles.fieldGroup}>
        <label htmlFor="phoneNumber" className={styles.label}>
          Número de teléfono
        </label>

        <div className={styles.phoneContainer}>

          {/* Desplegable personalizado con buscador */}
          <CountryCodeSelector
            value={countryCode}
            onChange={handleCountryChange}
          />

          <input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ''}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="600 000 000"
            className={`${styles.input} ${showError ? styles.inputError : ''}`}
          />

        </div>

        {formData.phone && (
          <span className={styles.hint}>
            Número completo: {formData.phone}
          </span>
        )}

        {showError && (
          <span className={styles.error}>
            {ERROR_MESSAGES.invalidPhone}
          </span>
        )}

      </div>
    </div>
  );
};