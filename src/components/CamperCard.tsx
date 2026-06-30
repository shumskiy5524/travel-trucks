import Link from 'next/link';
import { FaStar, FaHeart, FaMapMarkerAlt, FaGasPump, FaWind } from 'react-icons/fa';
import { MdOutlineElectricalServices, MdKitchen } from 'react-icons/md';
import { Camper } from '@/types/camper';
import Image from 'next/image';


interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border border-[#E4E7EC] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full md:w-[290px] h-[228px] overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
       
<Image
  src={camper.gallery[0]?.thumb || 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400'}
  alt={camper.name}
  width={400}
  height={300}
  className="w-full h-full object-cover"
/>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-2xl font-semibold text-[#101828] truncate">{camper.name}</h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold text-[#101828]">€{camper.price.toFixed(2)}</span>
            <button className="text-[#101828] hover:text-[#E44848] transition-colors p-1">
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-[#101828]">
          <div className="flex items-center gap-1">
            <FaStar className="text-[#FFC531] w-4 h-4" />
            <span className="underline">{camper.rating} ({camper.reviews.length} Reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-4 h-4 text-[#101828]" />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className="mt-6 text-[#475467] text-sm line-clamp-1 max-w-[525px]">
          {camper.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FC] text-sm font-medium text-[#101828] rounded-full capitalize">
            <FaGasPump className="w-4 h-4" />
            {camper.engine}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FC] text-sm font-medium text-[#101828] rounded-full capitalize">
            <MdOutlineElectricalServices className="w-4 h-4" />
            {camper.transmission}
          </span>
          {camper.AC && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FC] text-sm font-medium text-[#101828] rounded-full">
              <FaWind className="w-4 h-4" /> AC
            </span>
          )}
          {camper.kitchen && (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F9FC] text-sm font-medium text-[#101828] rounded-full">
              <MdKitchen className="w-4 h-4" /> Kitchen
            </span>
          )}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={'/catalog/${camper.id'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-10 py-3 bg-[#E44848] text-white text-base font-semibold rounded-full hover:bg-[#cf3e3e] transition-colors"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}