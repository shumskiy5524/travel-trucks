'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Filters from '@/components/Filters';
import CamperCard from '@/components/CamperCard';
import { fetchCampers } from '@/lib/api';


const LIMIT = 4;

export default function CatalogPage() {
  const [filters, setFilters] = useState({
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
    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({
        page: pageParam,
        ...filters,
      }),

    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.length * LIMIT;
      return loaded < lastPage.total ? pages.length + 1 : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex gap-10">
        
    
        <Filters onSearch={(newFilters) => setFilters(newFilters)} />

        <div className="flex-1 flex flex-col gap-6">

          {isLoading && (
            <p className="text-center">Loading campers...</p>
          )}

          {isError && (
            <p className="text-center text-red-500">
              Something went wrong
            </p>
          )}

          {campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}

    
          {hasNextPage && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-3 border rounded-full"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}