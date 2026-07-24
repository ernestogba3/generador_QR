// Header.jsx es la barra superior de la aplicación.
// Es un componente puramente visual, no maneja ningún estado.
// Solo muestra el logo y el título de la herramienta.

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        {/* Logo y nombre de la plataforma */}
        <div className={styles.brand}>
          <span className={styles.brandName}>ToolsBox</span>
          <span className={styles.brandSeparator}>/</span>
         <h1 className={styles.toolName}>Generador de QR</h1>
        </div>

        {/* Descripción corta de la herramienta */}
        <p className={styles.tagline}>
          Crea códigos QR profesionales de forma gratuita
        </p>

      </div>
    </header>
  );
};