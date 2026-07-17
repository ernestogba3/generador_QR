// CountryCodeSelector.jsx es un desplegable personalizado para seleccionar
// el código de país. Incluye un buscador para filtrar países fácilmente.

import { useState, useRef, useEffect } from 'react';
import { COUNTRY_CODES } from '../../constants/countryCodes';
import styles from './CountryCodeSelector.module.css';

export const CountryCodeSelector = ({ value, onChange }) => {

  // Controla si el desplegable está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  // Texto del buscador
  const [search, setSearch] = useState('');

  // Referencia al contenedor para detectar clicks fuera
  const containerRef = useRef(null);

  // País seleccionado actualmente
  const selectedCountry = COUNTRY_CODES.find(c => c.code === value);

  // Filtra países según el texto del buscador
  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.country.toLowerCase().includes(search.toLowerCase()) ||
    country.code.includes(search)
  );

  // Cierra el desplegable al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearch('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearch('');
  };

  return (
    <div className={styles.container} ref={containerRef}>

      {/* Botón que muestra el país seleccionado */}
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
      >
        <span className={styles.triggerContent}>
          <span className={styles.flag}>{selectedCountry?.flag}</span>
          <span className={styles.code}>{selectedCountry?.code}</span>
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          ▼
        </span>
      </button>

      {/* Desplegable con buscador y lista de países */}
      {isOpen && (
        <div className={styles.dropdown}>

          {/* Buscador */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Buscar país o código..."
              className={styles.searchInput}
              autoFocus
            />
          </div>

          {/* Lista de países */}
          <ul className={styles.list}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <li
                  key={country.code}
                  className={`${styles.item} ${country.code === value ? styles.itemSelected : ''}`}
                  onClick={() => handleSelect(country)}
                >
                  <span className={styles.itemFlag}>{country.flag}</span>
                  <span className={styles.itemCountry}>{country.country}</span>
                  <span className={styles.itemCode}>{country.code}</span>
                </li>
              ))
            ) : (
              <li className={styles.noResults}>
                No se encontraron resultados
              </li>
            )}
          </ul>

        </div>
      )}

    </div>
  );
};