import { ColorPicker } from '../ColorPicker/ColorPicker';
import { StyleSelect } from '../StyleSelect/StyleSelect';
import {
  DOT_STYLE_OPTIONS,
  CORNER_SQUARE_STYLE_OPTIONS,
  CORNER_DOT_STYLE_OPTIONS,
} from '../../constants/qrShapeOptions';
import styles from './QRCustomizer.module.css';

export const QRCustomizer = ({
  dotsColor, onDotsColorChange, dotsType, onDotsTypeChange,
  cornersSquareColor, onCornersSquareColorChange, cornersSquareType, onCornersSquareTypeChange,
  cornersDotColor, onCornersDotColorChange, cornersDotType, onCornersDotTypeChange,
}) => {
  return (
    <section className={styles.qrCustomizer} aria-label="Personalizar código QR">
      <h2 className={styles.title}>Personalizar</h2>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Puntos</h3>
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
          compact
        />
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Marco de esquina</h3>
        <ColorPicker
          id="corners-square-color"
          label="Color del marco de esquina"
          color={cornersSquareColor}
          onChange={onCornersSquareColorChange}
        />
        <StyleSelect
          id="corners-square-style"
          label="Forma del marco de esquina"
          options={CORNER_SQUARE_STYLE_OPTIONS}
          value={cornersSquareType}
          onChange={onCornersSquareTypeChange}
          compact
        />
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Punto de esquina</h3>
        <ColorPicker
          id="corners-dot-color"
          label="Color del punto de esquina"
          color={cornersDotColor}
          onChange={onCornersDotColorChange}
        />
        <StyleSelect
          id="corners-dot-style"
          label="Forma del punto de esquina"
          options={CORNER_DOT_STYLE_OPTIONS}
          value={cornersDotType}
          onChange={onCornersDotTypeChange}
          compact
        />
      </div>
    </section>
  );
};