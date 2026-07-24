import { ColorPicker } from '../ColorPicker/ColorPicker';
import { StyleSelect } from '../StyleSelect/StyleSelect';
import { DOT_STYLE_OPTIONS } from '../../constants/dotStyleOptions';
import styles from './QRCustomizer.module.css';

// Panel de personalización visual del QR. Hoy solo controla los puntos
// (color + forma); en los siguientes pasos de esta sesión iremos
// añadiendo aquí el color de fondo, el tamaño y el margen, reutilizando
// ColorPicker tal cual y añadiendo nuevos StyleSelect o sliders.
export const QRCustomizer = ({ dotsColor, onDotsColorChange, dotsType, onDotsTypeChange }) => {
  return (
    <section className={styles.qrCustomizer} aria-label="Personalizar código QR">
      <h2 className={styles.title}>Personalizar</h2>

      <ColorPicker
        id="dots-color"
        label="Color de los puntos"
        color={dotsColor}
        onChange={onDotsColorChange}
      />

      <StyleSelect
        id="dots-style"
        label="Forma de los puntos"
        options={DOT_STYLE_OPTIONS}
        value={dotsType}
        onChange={onDotsTypeChange}
      />
    </section>
  );
};