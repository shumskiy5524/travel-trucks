'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Camper } from '@/types/camper';
import BookingForm from '@/components/BookingForm';
import Image from 'next/image';

const fetchCamperDetails = async (id: string) => {
  const response = await axios.get<Camper>(
    `https://campers-api.goit.study/campers/${id}`
  );
  return response.data;
};

export default function CamperDetailsPage() {
  const params = useParams();

  const camperId = useMemo(() => {
    const id = params?.camperId;
    if (Array.isArray(id)) return id[0];
    return id;
  }, [params]);

  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features'
  );

  const {
    data: camper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchCamperDetails(camperId as string),
    enabled: typeof camperId === 'string' && camperId.length > 0,
  });

  if (isLoading) {
    return (
      <div className="text-center py-24 text-lg font-medium">
        Loading camper details...
      </div>
    );
  }

  if (isError || !camper) {
    return (
      <div className="text-center py-24 text-[#E44848] font-medium">
        Failed to load camper details.
      </div>
    );
  }

  const safePrice =
    typeof camper.price === 'number'
      ? camper.price.toFixed(2)
      : Number(camper.price || 0).toFixed(2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold text-[#101828]">
        {camper.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#101828]">
        <div className="flex items-center gap-1">
          <FaStar className="text-[#FFC531] w-4 h-4" />
          <span className="underline">
            {camper.rating} ({camper.reviews?.length ?? 0} Reviews)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="w-4 h-4" />
          <span>{camper.location}</span>
        </div>
      </div>

      <div className="text-3xl font-semibold text-[#101828] mt-4">
        €{safePrice}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {camper.gallery?.map((img, idx) => (
          <div
            key={idx}
            className="h-[310px] overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src={camper.gallery[0]?.thumb || 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400'}
              alt={camper.name}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <p className="text-[#475467] text-base leading-relaxed mt-7 max-w-3xl">
        {camper.description}
      </p>

      <div className="flex gap-10 border-b border-[#E4E7EC] mt-12 mb-10">
        <button
          onClick={() => setActiveTab('features')}
          className={`pb-6 text-xl font-semibold transition-all relative ${
            activeTab === 'features'
              ? 'text-[#101828]'
              : 'text-[#475467]'
          }`}
        >
          Features
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-6 text-xl font-semibold transition-all relative ${
            activeTab === 'reviews'
              ? 'text-[#101828]'
              : 'text-[#475467]'
          }`}
        >
          Reviews
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-grow w-full">
          {activeTab === 'features' ? (
            <div className="bg-[#F7F9FC] p-7 rounded-2xl">
              <h3 className="text-xl font-semibold text-[#101828] border-b border-[#E4E7EC] pb-6 mb-6">
                Vehicle details
              </h3>

              <ul className="flex flex-col gap-4 text-base font-medium">
                <li className="flex justify-between">
                  <span className="text-[#475467]">Length</span>
                  <span>{camper.length}</span>
                </li>

                <li className="flex justify-between">
                  <span className="text-[#475467]">Width</span>
                  <span>{camper.width}</span>
                </li>

                <li className="flex justify-between">
                  <span className="text-[#475467]">Height</span>
                  <span>{camper.height}</span>
                </li>

                <li className="flex justify-between">
                  <span className="text-[#475467]">Tank</span>
                  <span>{camper.tank}</span>
                </li>

                <li className="flex justify-between">
                  <span className="text-[#475467]">Consumption</span>
                  <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {camper.reviews?.map((review, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#F2F4F7] flex items-center justify-center text-xl font-semibold text-[#E44848]">
                      {review.reviewer_name?.[0]}
                    </div>

                    <div>
                      <h4>{review.reviewer_name}</h4>

                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.reviewer_rating
                                ? 'text-[#FFC531]'
                                : 'text-[#E4E7EC]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#475467] text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {camperId && <BookingForm camperId={camper.id} />}
      </div>
    </div>
  );
}