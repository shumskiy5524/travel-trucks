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
        limit: LIMIT,
        ...filters,
      }),
    
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers || []) || [];

  const handleClearFilters = () => {
    setFilters({ location: '', form: '', transmission: '', engine: '' });
  };

  return (
    <main className="mx-auto max-w-[1440px] px-16 py-12 relative">
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-3xl max-w-sm text-center shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#E44848] border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-xl font-semibold text-[#101828]">Loading trucks...</h3>
            <p className="text-sm text-[#475467]">Please wait while we fetch the best travel trucks for you</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-16">
        
        <aside className="shrink-0">
          <Filters onSearch={(newFilters) => setFilters(newFilters)} />
        </aside>

        <section className="flex-1 flex flex-col gap-8">
          {isError && (
            <p className="text-center text-red-500 font-medium">Something went wrong. Please try again later.</p>
          )}

          {!isLoading && campers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-32 h-32 text-[#829181] mb-6 text-6xl">🔍</div>
              <h3 className="text-xl font-semibold text-[#101828] mb-2">No campers found</h3>
              <p className="text-[#475467] max-w-sm mb-6">
                We couldn&apos;t find any campers that match your filters. Try adjusting your search or clearing some filters.
              </p>
              <div className="flex gap-4">
                <button onClick={handleClearFilters} className="px-6 h-12 rounded-full border border-[#DADDE1] font-medium text-[#101828] hover:bg-gray-50">
                  Clear filters
                </button>
                <button onClick={handleClearFilters} className="px-6 h-12 rounded-full bg-[#829181] font-medium text-white hover:bg-[#6d7b6c]">
                  View all campers
                </button>
              </div>
            </div>
          )}

          {campers.map((camper) => camper && (
            <CamperCard key={camper.id} camper={camper} />
          ))}

          {hasNextPage && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-[145px] h-[56px] rounded-full border border-[#DADDE1] bg-white text-[#101828] font-medium transition hover:border-[#E44848] disabled:opacity-50"
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