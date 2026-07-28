// WiFiFields.jsx - REFACTORIZADO
// Ahora usa el custom hook useFormValidation para validar el SSID (nombre de la red)
// El SSID es obligatorio, contraseña y seguridad son opcionales

import { useFormValidation } from '../../hooks/useFormValidation';
import styles from './FormFields.module.css';

export const WiFiFields = ({ formData, onFormChange }) => {

  // ✅ Usamos el custom hook para gestionar validación del SSID
  // El hook recibe:
  //   - 'wifi': la categoría (valida el campo 'ssid')
  //   - formData: los datos del formulario actual
  // El hook devuelve:
  //   - errors: objeto con los errores
  //   - touched: objeto con los campos tocados
  //   - handleBlur: función que marca un campo como tocado
  const { errors, touched, handleBlur } = useFormValidation('wifi', formData);

  // Helper: mostramos el error solo si el campo fue tocado Y hay error
  const showSSIDError = touched.ssid && errors.ssid;

  // Manejador genérico de cambio
  // Actualiza cualquier campo en el formData
  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Nombre de la red WiFi (SSID) - OBLIGATORIO */}
      <div className={styles.fieldGroup}>
        <label htmlFor="ssid" className={styles.label}>
          Nombre de la red (SSID) <span className={styles.required}>*</span>
        </label>
        <input
          id="ssid"
          type="text"
          value={formData.ssid || ''}
          onChange={(e) => handleChange('ssid', e.target.value)}
          onBlur={() => handleBlur('ssid')}
          placeholder="MiRedWiFi"
          className={`${styles.input} ${showSSIDError ? styles.inputError : ''}`}
        />
        
        {/* Mostrar error si existe */}
        {showSSIDError && (
          <span className={styles.error}>
            {errors.ssid}
          </span>
        )}
        
        {/* Ayuda al usuario */}
        <span className={styles.hint}>
          Escribe exactamente como aparece el nombre de tu red WiFi
        </span>
      </div>

      {/* Contraseña - OPCIONAL */}
      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="password"
          type="password"
          value={formData.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Contraseña de la red"
          className={styles.input}
        />
        <span className={styles.hint}>
          Deja vacío si la red no tiene contraseña
        </span>
      </div>

      {/* Tipo de seguridad - OPCIONAL */}
      <div className={styles.fieldGroup}>
        <label htmlFor="security" className={styles.label}>
          Tipo de seguridad <span className={styles.optional}>(opcional)</span>
        </label>
        <select
          id="security"
          value={formData.security || 'WPA'}
          onChange={(e) => handleChange('security', e.target.value)}
          className={styles.input}
        >
          <option value="WPA">WPA/WPA2 (recomendado)</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Sin contraseña</option>
        </select>
        <span className={styles.hint}>
          La mayoría de redes modernas usan WPA/WPA2
        </span>
      </div>

    </div>
  );
};