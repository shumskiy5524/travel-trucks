'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Filters from '@/components/Filters';
import CamperCard from '@/components/CamperCard';
import { CampersResponse, FilterState } from '@/types/camper';
import { QueryFunctionContext } from '@tanstack/react-query';

const LIMIT = 4;

const fetchCampers = async ({
  pageParam,
  queryKey,
}: QueryFunctionContext<[string, FilterState], number>) => {
  const [, filters] = queryKey;

const params: Record<string, unknown> = {
  page: pageParam,
  limit: LIMIT,
};

  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.AC) params.AC = filters.AC;
  if (filters.kitchen) params.kitchen = filters.kitchen;
  if (filters.tv) params.tv = filters.tv;
  if (filters.bathroom) params.bathroom = filters.bathroom;

  const response = await axios.get<CampersResponse>('https://campers-api.goit.study/campers', { params });
  return response.data;
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    form: '',
    transmission: '',
    engine: '',
    AC: false,
    kitchen: false,
    tv: false,
    bathroom: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: fetchCampers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCampersCount = allPages.length * LIMIT;
      return loadedCampersCount < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <Filters onSearch={(newFilters) => setFilters(newFilters)} />

        <div className="flex-grow w-full flex flex-col gap-6">
          {isLoading && (
            <div className="flex justify-center py-12 text-lg font-medium text-[#475467]">
              Loading amazing campers...
            </div>
          )}

          {isError && (
            <div className="text-center py-12 text-[#E44848] font-medium">
              Opps! Something went wrong while fetching data.
            </div>
          )}

          <div className="flex flex-col gap-6">
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-8 py-4 border border-[#E4E7EC] text-[#101828] text-base font-semibold rounded-full hover:border-[#E44848] transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}