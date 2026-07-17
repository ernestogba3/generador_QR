// CategorySelector.jsx es el desplegable de categorías.
// Lee las categorías de qrCategories.js y las muestra como opciones.
// Cuando el usuario selecciona una, avisa al componente padre mediante onCategoryChange.

import styles from './CategorySelector.module.css';
import { QR_CATEGORIES } from '../../constants/qrCategories';

export const CategorySelector = ({ category, onCategoryChange }) => {

  // Buscamos la categoría seleccionada para mostrar su descripción
  const selectedCategory = QR_CATEGORIES.find(cat => cat.id === category);

  // Cuando el usuario cambia el desplegable, llamamos a onCategoryChange
  // con el nuevo valor para que App.jsx actualice el estado
  const handleChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className={styles.categorySelector}>

      <label htmlFor="category" className={styles.label}>
        Tipo de código QR
      </label>

      {/* Desplegable con todas las categorías */}
      <select
        id="category"
        value={category}
        onChange={handleChange}
        className={styles.select}
      >
        {QR_CATEGORIES.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>

      {/* Descripción de la categoría seleccionada */}
      {selectedCategory && (
        <p className={styles.description}>
          {selectedCategory.icon} {selectedCategory.description}
        </p>
      )}

    </div>
  );
};