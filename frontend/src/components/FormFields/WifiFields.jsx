// WiFiFields.jsx muestra los campos para generar un QR de WiFi.
// Al escanear el QR el móvil se conectará automáticamente a la red
// sin necesidad de introducir la contraseña manualmente.

import styles from './FormFields.module.css';

export const WiFiFields = ({ formData, onFormChange }) => {

  const handleChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className={styles.fieldsContainer}>

      {/* Nombre de la red WiFi */}
      <div className={styles.fieldGroup}>
        <label htmlFor="ssid" className={styles.label}>
          Nombre de la red (SSID)
        </label>
        <input
          id="ssid"
          type="text"
          value={formData.ssid || ''}
          onChange={(e) => handleChange('ssid', e.target.value)}
          placeholder="MiRedWiFi"
          className={styles.input}
        />
        <span className={styles.hint}>
          Escribe exactamente como aparece el nombre de tu red WiFi
        </span>
      </div>

      {/* Contraseña */}
      <div className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña
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

      {/* Tipo de seguridad */}
      <div className={styles.fieldGroup}>
        <label htmlFor="security" className={styles.label}>
          Tipo de seguridad
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