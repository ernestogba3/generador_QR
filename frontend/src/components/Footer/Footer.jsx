// Footer.jsx es el pie de página de la aplicación.
// Es un componente puramente visual, no maneja ningún estado.
// Muestra enlaces, información legal y créditos.

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        {/* Columna 1: Nombre y descripción */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerBrand}>ToolsBox</h3>
          <p className={styles.footerDescription}>
            Herramientas profesionales y gratuitas para desarrolladores y diseñadores.
          </p>
        </div>

        {/* Columna 2: Enlaces */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Enlaces</h4>
          <ul className={styles.footerList}>
            <li><a href="#" className={styles.footerLink}>Inicio</a></li>
            <li><a href="#" className={styles.footerLink}>Herramientas</a></li>
            <li><a href="#" className={styles.footerLink}>Acerca de</a></li>
            <li><a href="#" className={styles.footerLink}>Contacto</a></li>
          </ul>
        </div>

        {/* Columna 3: Legal */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Legal</h4>
          <ul className={styles.footerList}>
            <li><a href="#" className={styles.footerLink}>Privacidad</a></li>
            <li><a href="#" className={styles.footerLink}>Términos de uso</a></li>
            <li><a href="#" className={styles.footerLink}>Cookies</a></li>
          </ul>
        </div>

      </div>

      {/* Línea inferior con copyright */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          © 2026 ToolsBox · Todos los derechos reservados
        </p>
      </div>

    </footer>
  );
};