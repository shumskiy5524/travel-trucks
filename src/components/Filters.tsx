'use client';

import { useState } from 'react';

type FiltersState = {
  location: string;
  form: string;
  transmission: string;
  engine: string;
  AC: boolean;
  kitchen: boolean;
  TV: boolean;
  bathroom: boolean;
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
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
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

  const toggle = (key: keyof FiltersState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setFilters({
      location: '',
      form: '',
      transmission: '',
      engine: '',
      AC: false,
      kitchen: false,
      TV: false,
      bathroom: false,
    });
  };

  const radioOption = 'flex items-center gap-3 cursor-pointer';
  const circle = 'w-5 h-5 rounded-full border flex items-center justify-center';

  return (
    <div className="w-[320px] flex flex-col gap-6">

      {/* LOCATION */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Location</p>
        <input
          value={filters.location}
          onChange={(e) => update('location', e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="City"
        />
      </div>

      {/* BODY TYPE (RADIO) */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Body type</p>

        <div className="flex flex-col gap-3">
          {['van', 'alcove', 'fullyIntegrated', 'panelTruck'].map((item) => (
            <label key={item} className={radioOption}>
              <input
                type="radio"
                name="form"
                className="hidden"
                checked={filters.form === item}
                onChange={() => update('form', item)}
              />

              <div
                className={`${circle} ${
                  filters.form === item ? 'border-red-500' : 'border-gray-400'
                }`}
              >
                {filters.form === item && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </div>

              <span className="text-sm capitalize">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* TRANSMISSION (RADIO) */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Transmission</p>

        <div className="flex flex-col gap-3">
          {['automatic', 'manual'].map((item) => (
            <label key={item} className={radioOption}>
              <input
                type="radio"
                name="transmission"
                className="hidden"
                checked={filters.transmission === item}
                onChange={() => update('transmission', item)}
              />

              <div
                className={`${circle} ${
                  filters.transmission === item
                    ? 'border-red-500'
                    : 'border-gray-400'
                }`}
              >
                {filters.transmission === item && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </div>

              <span className="text-sm capitalize">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ENGINE (RADIO) */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Engine</p>

        <div className="flex flex-col gap-3">
          {['diesel', 'petrol', 'hybrid'].map((item) => (
            <label key={item} className={radioOption}>
              <input
                type="radio"
                name="engine"
                className="hidden"
                checked={filters.engine === item}
                onChange={() => update('engine', item)}
              />

              <div
                className={`${circle} ${
                  filters.engine === item ? 'border-red-500' : 'border-gray-400'
                }`}
              >
                {filters.engine === item && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </div>

              <span className="text-sm capitalize">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* FEATURES (CHECKBOX) */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Features</p>

        <div className="flex flex-col gap-3">
          {[
            { key: 'AC', label: 'AC' },
            { key: 'kitchen', label: 'Kitchen' },
            { key: 'TV', label: 'TV' },
            { key: 'bathroom', label: 'Bathroom' },
          ].map((item) => (
            <label key={item.key} className={radioOption}>
              <input
                type="checkbox"
                className="hidden"
                checked={filters[item.key as keyof FiltersState] as boolean}
                onChange={() => toggle(item.key as keyof FiltersState)}
              />

              <div
                className={`w-5 h-5 border rounded-md flex items-center justify-center ${
                  filters[item.key as keyof FiltersState]
                    ? 'bg-red-500 border-red-500'
                    : 'border-gray-400'
                }`}
              >
                {filters[item.key as keyof FiltersState] && (
                  <div className="w-2 h-2 bg-white rounded-sm" />
                )}
              </div>

              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={reset}
          className="px-5 py-2 border rounded-lg text-sm"
        >
          Reset
        </button>

        <button
          onClick={() => onSearch(filters)}
          className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
}