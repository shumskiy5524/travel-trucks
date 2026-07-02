'use client';

import { useState } from 'react';

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

  const radioOption =
    'flex items-center gap-3 cursor-pointer text-[#101828]';

  const circle =
    'w-5 h-5 rounded-full border border-[#6C717B] flex items-center justify-center';

  return (
    <aside className="w-[360px] shrink-0">

      

    <div className="mb-8">
  <p className="text-sm text-[#6C717B] mb-2">Location</p>

  <div className="relative">
    <svg
      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C717B]"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="3" />
    </svg>

    <input
      value={filters.location}
      onChange={(e) => update('location', e.target.value)}
      placeholder="City"
      className="w-full h-14 rounded-xl bg-[#F7F7F7] pl-12 pr-5 outline-none"
    />
  </div>
</div>

      

      <h2 className="text-xl font-semibold text-[#101828] mb-6">
        Filters
      </h2>

      

      <div className="mb-8">

        <p className="text-sm text-[#6C717B] mb-4">
          Camper form
        </p>

        <div className="flex flex-col gap-3">

          {[
            ['alcove', 'Alcove'],
            ['panelTruck', 'Panel Van'],
            ['fullyIntegrated', 'Integrated'],
            ['semiIntegrated', 'Semi Integrated'],
          ].map(([value, label]) => (
            <label key={value} className={radioOption}>
              <input
                type="radio"
                name="form"
                className="hidden"
                checked={filters.form === value}
                onChange={() => update('form', value)}
              />

              <div className={circle}>
                {filters.form === value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#829181]" />
                )}
              </div>

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      

      <div className="mb-8">

        <p className="text-sm text-[#6C717B] mb-4">
          Engine
        </p>

        <div className="flex flex-col gap-3">

          {[
            ['diesel', 'Diesel'],
            ['petrol', 'Petrol'],
            ['hybrid', 'Hybrid'],
            ['electric', 'Electric'],
          ].map(([value, label]) => (
            <label key={value} className={radioOption}>
              <input
                type="radio"
                name="engine"
                className="hidden"
                checked={filters.engine === value}
                onChange={() => update('engine', value)}
              />

              <div className={circle}>
                {filters.engine === value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#829181]" />
                )}
              </div>

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      

      <div className="mb-10">

        <p className="text-sm text-[#6C717B] mb-4">
          Transmission
        </p>

        <div className="flex flex-col gap-3">

          {[
            ['automatic', 'Automatic'],
            ['manual', 'Manual'],
          ].map(([value, label]) => (
            <label key={value} className={radioOption}>
              <input
                type="radio"
                name="transmission"
                className="hidden"
                checked={filters.transmission === value}
                onChange={() => update('transmission', value)}
              />

              <div className={circle}>
                {filters.transmission === value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#829181]" />
                )}
              </div>

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

   

      <div className="flex flex-col gap-4">

        <button
          onClick={() => onSearch(filters)}
          className="h-14 rounded-full bg-[#829181] text-white font-medium transition hover:bg-[#6d7b6c]"
        >
          Search
        </button>

        <button
          onClick={reset}
          className="h-14 rounded-full border border-[#DADDE1] bg-white text-[#101828] transition hover:bg-[#F7F7F7]"
        >
          Clear filters
        </button>

      </div>

    </aside>
  );
}