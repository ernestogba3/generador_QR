// InfoSection.jsx muestra información sobre la herramienta.
// Tiene tres secciones: características, cómo funciona y FAQ.
// Es un componente puramente visual, no maneja ningún estado.

import styles from './InfoSection.module.css';

// Datos de las características
const FEATURES = [
  {
    icon: '⚡',
    title: 'Generación instantánea',
    description: 'El código QR se genera automáticamente mientras escribes, sin necesidad de pulsar ningún botón.',
  },
  {
    icon: '🎨',
    title: 'Múltiples categorías',
    description: 'Genera QR para URLs, emails, teléfonos, SMS, WiFi y contactos vCard.',
  },
  {
    icon: '📥',
    title: 'Descarga en varios formatos',
    description: 'Descarga tu QR en PNG, SVG o JPG según tus necesidades.',
  },
  {
    icon: '📱',
    title: 'Diseño responsive',
    description: 'Funciona perfectamente en móvil, tablet y escritorio.',
  },
  {
    icon: '🔒',
    title: 'Privacidad garantizada',
    description: 'Todo se procesa en tu navegador. Tus datos nunca se envían a ningún servidor.',
  },
  {
    icon: '🆓',
    title: '100% gratuito',
    description: 'Sin límites, sin registro, sin marcas de agua. Completamente gratis.',
  },
];

// Pasos de cómo funciona
const STEPS = [
  {
    number: '01',
    title: 'Elige el tipo de QR',
    description: 'Selecciona la categoría que necesitas en el desplegable.',
  },
  {
    number: '02',
    title: 'Rellena los datos',
    description: 'Introduce la información que quieres codificar en el QR.',
  },
  {
    number: '03',
    title: 'Descarga tu QR',
    description: 'Elige el formato y descarga tu código QR listo para usar.',
  },
];

// Preguntas frecuentes
const FAQS = [
  {
    question: '¿Los códigos QR generados tienen fecha de caducidad?',
    answer: 'No. Los códigos QR estáticos no caducan nunca. Una vez generados y descargados son tuyos para siempre.',
  },
  {
    question: '¿Puedo usar los QR generados comercialmente?',
    answer: 'Sí. No hay ninguna restricción de uso. Puedes usar los códigos QR generados para cualquier propósito.',
  },
  {
    question: '¿Qué formato debo elegir para imprimir?',
    answer: 'SVG es el formato recomendado para imprimir porque es vectorial y no pierde calidad al ampliar.',
  },
  {
    question: '¿Cuántos caracteres puede contener un código QR?',
    answer: 'Depende del tipo de datos. Para texto puede contener hasta 4.296 caracteres alfanuméricos. Cuanto más texto, más denso y difícil de escanear será el QR.',
  },
  {
    question: '¿Mis datos son privados?',
    answer: 'Sí. Todo el procesamiento ocurre en tu navegador. No enviamos ningún dato a servidores externos.',
  },
];

export const InfoSection = () => {
  return (
    <div className={styles.infoSection}>

      {/* Sección de características */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Características</h2>
          <p className={styles.sectionSubtitle}>
            Todo lo que necesitas para crear códigos QR profesionales
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {FEATURES.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de cómo funciona */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>¿Cómo funciona?</h2>
          <p className={styles.sectionSubtitle}>
            Genera tu código QR en tres sencillos pasos
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de FAQ */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Preguntas frecuentes</h2>
          <p className={styles.sectionSubtitle}>
            Resolvemos tus dudas más comunes
          </p>
        </div>

        <div className={styles.faqContainer}>
          {FAQS.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};