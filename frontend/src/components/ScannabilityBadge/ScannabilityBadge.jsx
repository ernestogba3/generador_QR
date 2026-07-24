import { getQRScannabilityStatus } from '../../utils/colorContrast';
import styles from './ScannabilityBadge.module.css';

const STATUS_TEXT = {
  safe: 'Buen contraste — se leerá bien',
  risky: 'Contraste ajustado — pruébalo antes de imprimir en cantidad',
  unsafe: 'Contraste insuficiente — puede no leerse',
};

// Aviso en vivo, no bloqueante: informa del riesgo de lectura pero no
// impide elegir cualquier color -- la decisión final es del usuario.
export const ScannabilityBadge = ({ customization }) => {
  const { level, ratio } = getQRScannabilityStatus(customization);

  return (
    <div className={`${styles.badge} ${styles[level]}`} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <span>{STATUS_TEXT[level]} ({ratio.toFixed(1)}:1)</span>
    </div>
  );
};