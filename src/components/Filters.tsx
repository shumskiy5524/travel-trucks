'use client';

import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaWind,
  FaTv,
  FaCog,
} from 'react-icons/fa';
import {
  MdKitchen,
  MdShower,
} from 'react-icons/md';
import { TbGridDots } from 'react-icons/tb';

import { FilterState } from '@/types/camper';

interface FiltersProps {
  onSearch: (filters: FilterState) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [transmission, setTransmission] = useState('');

  const [AC, setAC] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [tv, setTv] = useState(false);
  const [bathroom, setBathroom] = useState(false);

  const buttonClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-2 p-4 border rounded-xl h-24 transition-all ${
      active
        ? 'border-[#E44848] bg-white'
        : 'border-[#E4E7EC] hover:border-[#E44848]'
    }`;

  const handleSearch = () => {
    onSearch({
      location,
      form,
      transmission,
      engine: '',
      AC,
      kitchen,
      tv,
      bathroom,
    });
  };

  return (
    <aside className="w-full max-w-[360px]">

      <div className="mb-8">
        <label className="block text-sm font-medium text-[#475467] mb-2">
          Location
        </label>

        <div className="relative">

          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#101828]" />

          <input
            type="text"
            placeholder="Kyiv, Ukraine"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl bg-[#F7F7F7] py-4 pl-11 pr-4 outline-none border border-transparent focus:border-[#E44848]"
          />

        </div>

      </div>

      <p className="text-[#475467] text-sm mb-8">
        Filters
      </p>

      <div className="mb-8">

        <h3 className="text-xl font-semibold border-b border-[#DADDE1] pb-6 mb-6">
          Vehicle equipment
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() => setAC(!AC)}
            className={buttonClass(AC)}
          >
            <FaWind size={24} />
            <span>AC</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setTransmission(
                transmission === 'automatic'
                  ? ''
                  : 'automatic'
              )
            }
            className={buttonClass(
              transmission === 'automatic'
            )}
          >
            <FaCog size={24} />
            <span>Automatic</span>
          </button>

          <button
            type="button"
            onClick={() => setKitchen(!kitchen)}
            className={buttonClass(kitchen)}
          >
            <MdKitchen size={24} />
            <span>Kitchen</span>
          </button>

          <button
            type="button"
            onClick={() => setTv(!tv)}
            className={buttonClass(tv)}
          >
            <FaTv size={24} />
            <span>TV</span>
          </button>

          <button
            type="button"
            onClick={() => setBathroom(!bathroom)}
            className={buttonClass(bathroom)}
          >
            <MdShower size={24} />
            <span>Bathroom</span>
          </button>
            </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold border-b border-[#DADDE1] pb-6 mb-6">
          Vehicle type
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: 'panelTruck',
              label: 'Van',
            },
            {
              id: 'fullyIntegrated',
              label: 'Fully Integrated',
            },
            {
              id: 'alcove',
              label: 'Alcove',
            },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                setForm(form === type.id ? '' : type.id)
              }
              className={buttonClass(form === type.id)}
            >
              <TbGridDots size={24} />

              <span className="text-center text-sm font-medium">
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="w-full rounded-full bg-[#E44848] py-4 font-semibold text-white transition hover:bg-[#D84343]"
      >
        Search
      </button>

    </aside>
  );
}