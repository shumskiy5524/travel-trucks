'use client';

import { useState } from 'react';
import styles from './Filters.module.css';

type FiltersState = {
  location: string;
  form: string;
  transmission: string;
  engine: string;
};

type Props = {
  onSearch: (filters: FiltersState) => void;
};

export default function Filters({ onSearch }: Props) {
  const [filters, setFilters] = useState<FiltersState>({
    location: '',
    form: '',
    transmission: '',
    engine: '',
  });

  const update = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const reset = () => {
    const empty = {
      location: '',
      form: '',
      transmission: '',
      engine: '',
    };
    setFilters(empty);
    onSearch(empty);
  };

  return (
    <aside className={styles.aside}>
      
  
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Location
        </label>
        <div className={styles.inputWrapper}>
          <svg
            className={styles.mapIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <input
            value={filters.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="Kyiv"
            className={styles.input}
          />
        </div>
      </div>

      <h2 className={styles.mainSectionTitle}>
        Filters
      </h2>

      
      <div className={styles.filterBlock}>
        <h3 className={styles.blockTitle}>
          Camper form
        </h3>
        <div className={styles.optionsList}>
          {[
            ['alcove', 'Alcove'],
            ['panel_van', 'Panel Van'],
            ['integrated', 'Integrated'],
            ['semi_integrated', 'Semi Integrated'],
          ].map(([value, label]) => (
            <label key={value} className={styles.optionLabel}>
              <input
                type="radio"
                name="form"
                className={styles.radioInput}
                checked={filters.form === value}
                onChange={() => update('form', value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

   
      <div className={styles.filterBlock}>
        <h3 className={styles.blockTitle}>
          Engine
        </h3>
        <div className={styles.optionsList}>
          {[
            ['diesel', 'Diesel'],
            ['petrol', 'Petrol'],
            ['hybrid', 'Hybrid'],
            ['electric', 'Electric'],
          ].map(([value, label]) => (
            <label key={value} className={styles.optionLabel}>
              <input
                type="radio"
                name="engine"
                className={styles.radioInput}
                checked={filters.engine === value}
                onChange={() => update('engine', value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

  
      <div className={styles.fieldGroup}>
        <h3 className={styles.blockTitle}>
          Transmission
        </h3>
        <div className={styles.optionsList}>
          {[
            ['automatic', 'Automatic'],
            ['manual', 'Manual'],
          ].map(([value, label]) => (
            <label key={value} className={styles.optionLabel}>
              <input
                type="radio"
                name="transmission"
                className={styles.radioInput}
                checked={filters.transmission === value}
                onChange={() => update('transmission', value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

  
      <div className={styles.actionsBlock}>
        <button onClick={() => onSearch(filters)} className={styles.searchButton}>
          Search
        </button>
        <button onClick={reset} className={styles.clearButton}>
          ✕ Clear filters
        </button>
      </div>

    </aside>
  );
}