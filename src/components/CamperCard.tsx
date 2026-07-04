'use client';

import Image from 'next/image';
import RatingStars from '@/components/RatingStars';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  gallery?: {
  id: string;
  thumb: string;
  original: string;
  order: number;
}[];
};

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {

  const openDetails = () => {
    window.open(`/catalog/${camper.id}`, '_blank');
  };

  return (
    <div className="border rounded-xl p-4 flex gap-4 hover:shadow-lg transition">

      <Image
  src={camper.gallery?.[0]?.thumb || '/images/placeholder.jpg'}
  alt={camper.name}
  width={200}
  height={140}
  className="rounded-lg object-cover"
/>

     
      <div className="flex flex-col flex-1 gap-2">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {camper.name}
          </h2>

          <span className="font-bold text-red-500">
            €{camper.price}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          📍 {camper.location}
        </p>

       
        <div className="flex items-center gap-2">
          <RatingStars rating={camper.rating} />
        </div>

       
        <p className="text-sm text-gray-600 line-clamp-2">
          {camper.description}
        </p>

       
        <div className="mt-auto">
          <button
            onClick={openDetails}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Show more
          </button>
        </div>

      </div>
    </div>
  );
}