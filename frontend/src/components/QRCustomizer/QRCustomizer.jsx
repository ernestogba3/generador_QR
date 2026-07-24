import { ColorPicker } from '../ColorPicker/ColorPicker';
import { StyleSelect } from '../StyleSelect/StyleSelect';
import { RangeSlider } from '../RangeSlider/RangeSlider';
import { ScannabilityBadge } from '../ScannabilityBadge/ScannabilityBadge';
import {
  DOT_STYLE_OPTIONS,
  CORNER_SQUARE_STYLE_OPTIONS,
  CORNER_DOT_STYLE_OPTIONS,
} from '../../constants/qrShapeOptions';
import styles from './QRCustomizer.module.css';

export const QRCustomizer = ({ customization, onCustomizationChange, onReset, showReset }) => {
  const {
    dotsColor, dotsType,
    cornersSquareColor, cornersSquareType,
    cornersDotColor, cornersDotType,
    backgroundColor, size, margin,
  } = customization;

  return (
    <section className={styles.qrCustomizer} aria-label="Personalizar código QR">
      <div className={styles.header}>
        <h2 className={styles.title}>Personalizar</h2>
        {showReset && (
          <button
            className={styles.resetButton}
            onClick={onReset}
            type="button"
          >
            Restablecer estilo
          </button>
        )}
      </div>

      <ScannabilityBadge customization={customization} />

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>General</h3>
        <ColorPicker
          id="background-color"
          label="Color de fondo"
          color={backgroundColor}
          onChange={(value) => onCustomizationChange({ backgroundColor: value })}
        />
        <RangeSlider
          id="qr-size"
          label="Tamaño"
          min={200}
          max={400}
          step={10}
          value={size}
          unit="px"
          onChange={(value) => onCustomizationChange({ size: value })}
        />
        <RangeSlider
          id="qr-margin"
          label="Margen"
          min={0}
          max={40}
          step={2}
          value={margin}
          unit="px"
          onChange={(value) => onCustomizationChange({ margin: value })}
        />
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Puntos</h3>
        <ColorPicker
          id="dots-color"
          label="Color de los puntos"
          color={dotsColor}
          onChange={(value) => onCustomizationChange({ dotsColor: value })}
        />
        <StyleSelect
          id="dots-style"
          label="Forma de los puntos"
          options={DOT_STYLE_OPTIONS}
          value={dotsType}
          onChange={(value) => onCustomizationChange({ dotsType: value })}
          compact
        />
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Marco de esquina</h3>
        <ColorPicker
          id="corners-square-color"
          label="Color del marco de esquina"
          color={cornersSquareColor}
          onChange={(value) => onCustomizationChange({ cornersSquareColor: value })}
        />
        <StyleSelect
          id="corners-square-style"
          label="Forma del marco de esquina"
          options={CORNER_SQUARE_STYLE_OPTIONS}
          value={cornersSquareType}
          onChange={(value) => onCustomizationChange({ cornersSquareType: value })}
          compact
        />
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Punto de esquina</h3>
        <ColorPicker
          id="corners-dot-color"
          label="Color del punto de esquina"
          color={cornersDotColor}
          onChange={(value) => onCustomizationChange({ cornersDotColor: value })}
        />
        <StyleSelect
          id="corners-dot-style"
          label="Forma del punto de esquina"
          options={CORNER_DOT_STYLE_OPTIONS}
          value={cornersDotType}
          onChange={(value) => onCustomizationChange({ cornersDotType: value })}
          compact
        />
      </div>
    </section>
  );
};