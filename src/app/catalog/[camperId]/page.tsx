'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Camper } from '@/types/camper';
import BookingForm from '@/components/BookingForm';

const fetchCamperDetails = async (id: string) => {
  const response = await axios.get<Camper>(
    `https://campers-api.goit.study/campers/${id}`
  );
  return response.data;
};

export default function CamperDetailsPage() {
  const params = useParams();
  const camperId = Array.isArray(params.camperId)
    ? params.camperId[0]
    : params.camperId;

  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  const {
    data: camper,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchCamperDetails(camperId as string),
    enabled: !!camperId,
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
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
        €{camper.price?.toFixed(2)}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {camper.gallery?.map((img, idx) => (
          <div
            key={idx}
            className="h-[310px] overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src={img.original}
              alt={`${camper.name} gallery ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="text-[#475467] text-base leading-relaxed mt-7 max-w-3xl">
        {camper.description}
      </p>

      {/* Tabs */}
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
          {activeTab === 'features' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E44848]" />
          )}
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
          {activeTab === 'reviews' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E44848]" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-grow w-full">
          {activeTab === 'features' ? (
            <div className="bg-[#F7F9FC] p-7 rounded-2xl">
              <h3 className="text-xl font-semibold text-[#101828] border-b border-[#E4E7EC] pb-6 mb-6">
                Vehicle details
              </h3>

              <ul className="flex flex-col gap-4 text-base font-medium">
                <li className="flex justify-between border-b border-[#E4E7EC]/50 pb-2">
                  <span className="text-[#475467]">Length</span>
                  <span className="text-[#101828]">{camper.length}</span>
                </li>

                <li className="flex justify-between border-b border-[#E4E7EC]/50 pb-2">
                  <span className="text-[#475467]">Width</span>
                  <span className="text-[#101828]">{camper.width}</span>
                </li>

                <li className="flex justify-between border-b border-[#E4E7EC]/50 pb-2">
                  <span className="text-[#475467]">Height</span>
                  <span className="text-[#101828]">{camper.height}</span>
                </li>

                <li className="flex justify-between border-b border-[#E4E7EC]/50 pb-2">
                  <span className="text-[#475467]">Tank</span>
                  <span className="text-[#101828]">{camper.tank}</span>
                </li>

                <li className="flex justify-between pb-2">
                  <span className="text-[#475467]">Consumption</span>
                  <span className="text-[#101828]">
                    {camper.consumption}
                  </span>
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
                      <h4 className="text-base font-semibold text-[#101828]">
                        {review.reviewer_name}
                      </h4>

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

                  <p className="text-[#475467] text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <BookingForm camperId={camper.id} />
      </div>
    </div>
  );
}