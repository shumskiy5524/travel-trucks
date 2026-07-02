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
    <main className="mx-auto max-w-[1440px] px-16 py-12">
      <div className="flex items-start gap-16">

       
        <aside className="w-[360px] shrink-0">
          <Filters onSearch={(newFilters) => setFilters(newFilters)} />
        </aside>

        
        <section className="flex-1 flex flex-col gap-8">

          {isLoading && (
            <p className="text-center text-[#475467]">
              Loading campers...
            </p>
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
            <div className="flex justify-center pt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="
                  w-[145px]
                  h-[56px]
                  rounded-full
                  border
                  border-[#DADDE1]
                  bg-white
                  text-[#101828]
                  font-medium
                  transition
                  hover:border-[#E44848]
                "
              >
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}