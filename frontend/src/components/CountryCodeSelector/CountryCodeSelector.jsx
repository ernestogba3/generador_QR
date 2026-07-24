import { useState, useRef, useEffect } from 'react';
import { COUNTRY_CODES } from '../../constants/countryCodes';
import styles from './CountryCodeSelector.module.css';

export const CountryCodeSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const itemRefs = useRef([]);

  const selectedCountry = COUNTRY_CODES.find(c => c.code === value);

  const filteredCountries = COUNTRY_CODES.filter(country =>
    country.country.toLowerCase().includes(search.toLowerCase()) ||
    country.code.includes(search)
  );

  // Declarada ANTES del useEffect que la usa (antes estaba después)
  const closeDropdown = () => {
    setIsOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onChange(country.code);
    closeDropdown();
    triggerRef.current?.focus();
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setSearch('');
  };

  const handleBlur = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      closeDropdown();
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCountries.length > 0) {
        itemRefs.current[0]?.focus();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
      triggerRef.current?.focus();
    }
  };

  const handleItemKeyDown = (e, country, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(index + 1, filteredCountries.length - 1);
      itemRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        searchInputRef.current?.focus();
      } else {
        itemRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(country);
    } else if (e.key === 'Escape') {
      closeDropdown();
      triggerRef.current?.focus();
    }
  };

  return (
    <div className={styles.container} ref={containerRef} onBlur={handleBlur}>

      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Código de país, seleccionado ${selectedCountry?.country ?? ''} ${selectedCountry?.code ?? ''}`}
      >
        <span className={styles.triggerContent}>
          <span className={styles.flag} aria-hidden="true">{selectedCountry?.flag}</span>
          <span className={styles.code}>{selectedCountry?.code}</span>
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>

          <div className={styles.searchContainer}>
            <input
              type="text"
              ref={searchInputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar país o código..."
              aria-label="Buscar país o código"
              className={styles.searchInput}
              autoFocus
            />
          </div>

          <ul className={styles.list} role="listbox" aria-label="Lista de países">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={country.code}
                  ref={(el) => (itemRefs.current[index] = el)}
                  role="option"
                  aria-selected={country.code === value}
                  tabIndex={-1}
                  onClick={() => handleSelect(country)}
                  onKeyDown={(e) => handleItemKeyDown(e, country, index)}
                  className={`${styles.item} ${country.code === value ? styles.itemSelected : ''}`}
                >
                  <span className={styles.itemFlag} aria-hidden="true">{country.flag}</span>
                  <span className={styles.itemCountry}>{country.country}</span>
                  <span className={styles.itemCode}>{country.code}</span>
                </li>
              ))
            ) : (
              <li className={styles.noResults} role="presentation">
                No se encontraron resultados
              </li>
            )}
          </ul>

        </div>
      )}

    </div>
  );
};