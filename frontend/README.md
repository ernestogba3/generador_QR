# ToolsBox - Generador de Códigos QR Profesional 📱

Un generador de códigos QR profesional y completamente personalizable construido con **React + Vite**. Permite generar QR para URLs, textos, emails, teléfonos, SMS, WiFi y vCards con validación en tiempo real y descarga en múltiples formatos.

## ✨ Características

- ✅ **7 tipos de QR soportados:**
  - URL
  - Texto libre
  - Email (con asunto y mensaje)
  - Teléfono (con selector de país)
  - SMS (con mensaje)
  - WiFi (con contraseña y seguridad)
  - vCard (contacto con múltiples campos)

- ✅ **Validación de formularios en tiempo real**
  - Errores mostrados al hacer blur
  - Botón Descargar deshabilitado si hay errores
  - Mensajes de error claros y específicos

- ✅ **Personalización completa del QR:**
  - Cambiar color de los puntos
  - Cambiar color de fondo
  - Ajustar tamaño del QR
  - Modificar margen
  - Cambiar estilos de puntos (cuadrado, redondeado, extra redondeado)

- ✅ **Descarga en múltiples formatos:**
  - PNG
  - SVG
  - JPG

- ✅ **Responsive Design**
  - Optimizado para móvil, tablet y desktop
  - Panel de vista previa fijo en desktop
  - Interfaz intuitiva y accesible

- ✅ **Limpieza rápida de formulario**
  - Botón para limpiar todos los datos
  - Reset de personalizaciones

- ✅ **Componentes reutilizables**
  - ColorPicker: Selector de color personalizado
  - RangeSlider: Control deslizante para tamaño y margen
  - StyleSelect: Selector de estilos de puntos

## 🚀 Instalación

### Requisitos previos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos

1. **Clonar el repositorio:**
```bash
git clone <URL-del-repositorio>
cd generador_qr
cd frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

4. **Compilar para producción:**
```bash
npm run build
```

## 📦 Dependencias principales

### Librerías QR
- **qrcode.react** (^1.0.1) - Generación rápida de QR para preview en tiempo real
- **qr-code-styling** (^3.0.0) - QR avanzado con personalización y estilos

### Herramientas
- **React** (^18.3.1) - Framework frontend
- **Vite** (^5.4.1) - Build tool y dev server
- **ESLint** - Linter de código

## 🏗️ Estructura del Proyecto

generador_qr/
├── backend/ # Backend (vacío - para futuras expansiones)
│
└── frontend/
├── node_modules/ # Dependencias instaladas
├── public/ # Archivos públicos estáticos
│
├── src/
│ ├── assets/ # Imágenes y archivos estáticos
│ │
│ ├── components/ # Componentes React (reutilizables y específicos)
│ │ │
│ │ ├── CategorySelector/
│ │ │ ├── CategorySelector.jsx
│ │ │ └── CategorySelector.module.css
│ │ │
│ │ ├── ColorPicker/ # Componente reutilizable
│ │ │ ├── ColorPicker.jsx
│ │ │ └── ColorPicker.module.css
│ │ │
│ │ ├── CountryCodeSelector/
│ │ │ ├── CountryCodeSelector.jsx
│ │ │ └── CountryCodeSelector.module.css
│ │ │
│ │ ├── Footer/
│ │ │ ├── Footer.jsx
│ │ │ └── Footer.module.css
│ │ │
│ │ ├── FormatSelector/
│ │ │ ├── FormatSelector.jsx
│ │ │ └── FormatSelector.module.css
│ │ │
│ │ ├── FormFields/ # Campos del formulario dinámicos
│ │ │ ├── EmailFields.jsx
│ │ │ ├── FormFields.jsx # Router de campos
│ │ │ ├── FormFields.module.css
│ │ │ ├── PhoneFields.jsx
│ │ │ ├── SMSFields.jsx
│ │ │ ├── TextFields.jsx
│ │ │ ├── URLFields.jsx
│ │ │ ├── VCardFields.jsx
│ │ │ └── WiFiFields.jsx
│ │ │
│ │ ├── Header/
│ │ │ ├── Header.jsx
│ │ │ └── Header.module.css
│ │ │
│ │ ├── InfoSection/
│ │ │ ├── InfoSection.jsx
│ │ │ └── InfoSection.module.css
│ │ │
│ │ ├── MiniQRPreview/
│ │ │ ├── MiniQRPreview.jsx
│ │ │ └── MiniQRPreview.module.css
│ │ │
│ │ ├── QRCustomizer/
│ │ │ ├── QRCustomizer.jsx
│ │ │ └── QRCustomizer.module.css
│ │ │
│ │ ├── QRForm/ # Contenedor del formulario
│ │ │ ├── QRForm.jsx
│ │ │ └── QRForm.module.css
│ │ │
│ │ ├── QRPreview/ # Vista previa + Botón Descargar
│ │ │ ├── QRPreview.jsx
│ │ │ └── QRPreview.module.css
│ │ │
│ │ ├── QRSection/ # Sección principal (orquesta todo)
│ │ │ ├── QRSection.jsx
│ │ │ └── QRSection.module.css
│ │ │
│ │ ├── RangeSlider/ # Componente reutilizable
│ │ │ ├── RangeSlider.jsx
│ │ │ └── RangeSlider.module.css
│ │ │
│ │ ├── ScannabilityBadge/
│ │ │ ├── ScannabilityBadge.jsx
│ │ │ └── ScannabilityBadge.module.css
│ │ │
│ │ └── StyleSelect/ # Componente reutilizable
│ │ ├── StyleSelect.jsx
│ │ └── StyleSelect.module.css
│ │
│ ├── constants/ # Constantes y configuración
│ │ ├── countryCodes.js # Códigos de país (20 países)
│ │ ├── qrCategories.js # Definición de categorías de QR
│ │ └── qrShapeOptions.jsx # Opciones de estilos de puntos
│ │
│ ├── hooks/ # Custom Hooks
│ │ ├── useFormValidation.js # Validación centralizada de formularios
│ │ └── useQRCustomization.js # Gestión de personalización del QR
│ │
│ ├── pages/ # Páginas (vacío - para futuras rutas)
│ │
│ ├── styles/
│ │ └── index.css # Estilos globales
│ │
│ ├── utils/ # Utilidades y funciones helpers
│ │ ├── colorContrast.js # Función para validar contraste de colores
│ │ ├── downloadFile.js # Lógica de descarga de archivos
│ │ ├── qrGenerator.js # Generadores de strings QR por tipo
│ │ ├── qrStyleOptions.js # Opciones de estilo compartidas
│ │ └── validators.js # Funciones de validación de campos
│ │
│ ├── App.css # Estilos de componente App
│ ├── App.jsx # Componente raíz
│ └── main.jsx # Entry point de React
│
├── .gitignore # Archivos ignorados por Git
├── eslint.config.js # Configuración de ESLint
├── index.html # Archivo HTML principal
├── package.json # Dependencias y scripts
├── package-lock.json # Lock file de npm
└── vite.config.js # Configuración de Vite


## 🧩 Componentes principales

### Componentes Contenedores

**`QRSection`** - `src/components/QRSection/`
- Orquesta toda la aplicación
- Usa `useFormValidation` para validar formulario
- Pasa `isFormValid` a QRPreview
- Gestiona estado global de categoría y formData

**`QRForm`** - `src/components/QRForm/`
- Contenedor del formulario
- Agrupa CategorySelector y FormFields
- Botón Limpiar

### Componentes de Formulario

**`CategorySelector`** - `src/components/CategorySelector/`
- Selector de tipo de QR
- 7 opciones: URL, Texto, Email, Teléfono, SMS, WiFi, vCard

**`FormFields`** - `src/components/FormFields/`
- Router que carga el componente correcto según categoría
- Subcomponentes:
  - `URLFields.jsx` - Campo para URL
  - `TextFields.jsx` - Campo para texto libre
  - `EmailFields.jsx` - Campos para email
  - `PhoneFields.jsx` - Campos para teléfono
  - `SMSFields.jsx` - Campos para SMS
  - `WiFiFields.jsx` - Campos para WiFi
  - `VCardFields.jsx` - Campos para vCard
- Cada uno con validación específica usando `useFormValidation`

**`CountryCodeSelector`** - `src/components/CountryCodeSelector/`
- Selector personalizado de códigos de país
- Buscador integrado
- 20 países disponibles

### Componentes de Vista Previa y Descarga

**`QRPreview`** - `src/components/QRPreview/`
- Muestra QR grande en tiempo real
- Habilita/deshabilita botón Descargar según validación
- Gestiona descarga en múltiples formatos
- Recibe `isFormValid` como prop

**`MiniQRPreview`** - `src/components/MiniQRPreview/`
- Preview pequeño complementario

**`FormatSelector`** - `src/components/FormatSelector/`
- Selector de formato (PNG, SVG, JPG)
- Botón Descargar
- Se deshabilita si hay errores de validación

### Componentes de Personalización

**`QRCustomizer`** - `src/components/QRCustomizer/`
- Panel de personalización del QR
- Agrupa ColorPicker, RangeSlider y StyleSelect
- Botón Reset

**`ColorPicker`** - `src/components/ColorPicker/` (Reutilizable)
- Selector de color hexadecimal
- Input de tipo color
- Usado en QRCustomizer

**`RangeSlider`** - `src/components/RangeSlider/` (Reutilizable)
- Control deslizante
- Usado para tamaño y margen del QR
- Devuelve valores numéricos

**`StyleSelect`** - `src/components/StyleSelect/` (Reutilizable)
- Selector de estilos de puntos
- Opciones: Cuadrado, Redondeado, Extra Redondeado
- Usado en QRCustomizer

**`ScannabilityBadge`** - `src/components/ScannabilityBadge/`
- Indicador visual de escanabilidad del QR
- Muestra estado del QR generado

### Componentes Estructura

**`Header`** - `src/components/Header/`
- Encabezado de la aplicación

**`Footer`** - `src/components/Footer/`
- Pie de página

**`InfoSection`** - `src/components/InfoSection/`
- Sección de información adicional

## 🎣 Custom Hooks

### `useFormValidation(category, formData)`
**Ubicación:** `src/hooks/useFormValidation.js`

Hook centralizado que:
- Valida campos según categoría
- Maneja estado de "campos tocados"
- Devuelve: `{ errors, isFormValid, touched, handleBlur }`

**Uso:**
```javascript
const { errors, isFormValid, touched, handleBlur } = useFormValidation('email', formData);
```

**Validaciones por categoría:**
- `url`: Valida formato URL
- `text`: Valida que no esté vacío
- `email`: Valida formato email
- `phone`: Valida teléfono (6-12 dígitos)
- `sms`: Valida teléfono (6-12 dígitos)
- `wifi`: Valida SSID (no vacío)
- `vcard`: Valida nombre (obligatorio); email/teléfono/web (opcionales pero válidos si se rellenan)

### `useQRCustomization()`
**Ubicación:** `src/hooks/useQRCustomization.js`

Hook que gestiona:
- Personalización del QR (colores, tamaño, estilos)
- Reset a valores por defecto
- Devuelve: `{ customization, updateCustomization, resetCustomization, isDefaultCustomization }`

## 📁 Utilidades

**Ubicación:** `src/utils/`

- **`validators.js`** - Funciones de validación (isRequired, isValidEmail, isValidURL, isValidPhone)
- **`qrGenerator.js`** - Generadores de strings QR por tipo (generateURL, generateEmail, generatePhone, etc.)
- **`downloadFile.js`** - Lógica de descarga en PNG, SVG, JPG
- **`qrStyleOptions.js`** - Opciones de estilo compartidas entre preview y descarga
- **`colorContrast.js`** - Función para validar contraste de colores

## 📌 Constantes

**Ubicación:** `src/constants/`

- **`countryCodes.js`** - Array de 20 códigos de país con banderas
- **`qrCategories.js`** - Definición de categorías disponibles
- **`qrShapeOptions.jsx`** - Opciones de estilos de puntos

## 🔍 Validaciones

Las validaciones se aplican según el tipo de QR:

| Tipo | Campos obligatorios | Validaciones |
|------|---|---|
| **URL** | URL | Formato URL válido (https://...) |
| **Texto** | Texto | No vacío |
| **Email** | Email | Formato email válido |
| **Teléfono** | Teléfono | 6-12 dígitos numéricos |
| **SMS** | Teléfono | 6-12 dígitos numéricos |
| **WiFi** | SSID | No vacío |
| **vCard** | Nombre | No vacío; Email/Teléfono/Web opcionales pero válidos |

### Comportamiento de validación
1. El usuario escribe en un campo
2. Al hacer **blur** (perder el foco), se marca como "tocado"
3. Si hay error, se muestra el mensaje
4. El botón Descargar se deshabilita si hay errores
5. Una vez corregidos los errores, el botón se habilita

## 💻 Cómo usar

### Generar un QR

1. **Selecciona el tipo** en el selector de categoría
2. **Rellena los campos obligatorios** (marcados con *)
3. **Mira la vista previa** en tiempo real
4. **Personaliza** los colores, tamaño y estilos si lo deseas
5. **Selecciona el formato** (PNG, SVG, JPG)
6. **Haz clic en Descargar** para obtener tu QR

### Ejemplos por tipo

**URL:**

URL: https://ejemplo.com
→ QR que abre la URL al escanear


**Email:**

Email: usuario@correo.com
Asunto: Consulta
Mensaje: Hola, quisiera información...
→ QR que abre el cliente de email con datos pre-rellenados


**WiFi:**

SSID: MiRedWiFi
Contraseña: abc123456
Seguridad: WPA/WPA2
→ QR que conecta automáticamente al WiFi


**vCard:**

Nombre: Juan García
Email: juan@ejemplo.com
Teléfono: +34 600 000 000
Empresa: TechCorp
→ QR que agrega contacto automáticamente al escanear


## 🛠️ Tecnologías

- **React 18** - Librería frontend
- **Vite** - Build tool y dev server ultrarrápido
- **CSS Modules** - Estilos encapsulados por componente
- **qrcode.react** - Generación rápida de QR
- **qr-code-styling** - QR avanzado con personalización
- **ESLint** - Calidad de código

## 📝 Decisiones técnicas

### ¿Por qué dos librerías QR?

- **qrcode.react**: Rápida para preview en tiempo real (sin lag)
- **qr-code-styling**: Permite personalización avanzada (colores, estilos, márgenes) en las descargas

### ¿Por qué CSS Modules?

- Evita conflictos de nombres de clases
- Estilos encapsulados por componente
- Mejor mantenibilidad en proyectos grandes

### ¿Por qué useFormValidation hook?

- Centraliza toda la lógica de validación
- Evita código duplicado en cada FormFields
- Una única fuente de verdad
- Botón Descargar solo habilitado si formulario es válido

### ¿Por qué componentes pequeños y reutilizables?

- ColorPicker, RangeSlider, StyleSelect se usan en QRCustomizer
- Cada componente tiene una responsabilidad única
- Facilita mantenimiento y testing

## 🚀 Deploy

### Build para producción
```bash
npm run build
```

Genera la carpeta `dist/` lista para deployar.

### Opciones de hosting
- **Vercel** (recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 📸 Screenshots

(Aquí puedes agregar screenshots de tu aplicación)

## 🔄 Roadmap futuro

- [ ] Exportar a PDF
- [ ] Agregar logo al QR
- [ ] Historial de QR generados
- [ ] Compartir QR por URL
- [ ] Temas claro/oscuro
- [ ] Más estilos de puntos

## 🐛 Bug fixes en Sesión 4

- ✅ **Botón Descargar deshabilitado si formulario es inválido**
  - Problema: Se podía descargar QR con datos incorrectos
  - Solución: Validación centralizada con `useFormValidation`
  - Resultado: Solo se descarga si `hasValue && isFormValid`

## 📄 Licencia

Este proyecto es parte del curso de desarrollo FullStack de **notodoescodigo.com**

## 👨‍💻 Autor

**Ernesto** 
- Proyecto: ToolsBox - Generador de QR Profesional
- Tecnologías: React + Vite + JavaScript
- Metodología: Desarrollo profesional con IA como herramienta de apoyo
- Fecha: Julio 2026
- Repositorio: [Link del repositorio]

---

**Hecho con ❤️ y mucha validación de formularios** 🚀