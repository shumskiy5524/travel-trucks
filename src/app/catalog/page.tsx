'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCards/CamperCard';
import { fetchCampers } from '@/lib/api';
import styles from './catalog.module.css';

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
    <main className={styles.catalogMain}>
    
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingCard}>
            <div className={styles.spinner}></div>
            <h3 className={styles.loadingTitle}>Loading trucks...</h3>
            <p className={styles.loadingText}>Please wait while we fetch the best travel trucks for you</p>
          </div>
        </div>
      )}

      <div className={styles.catalogGrid}>
        
      
        <aside className={styles.filterAside}>
          <Filters onSearch={(newFilters) => setFilters(newFilters)} />
        </aside>

        
        <section className={styles.campersSection}>
          {isError && (
            <p className={styles.errorText}>Something went wrong. Please try again later.</p>
          )}

          
          {!isLoading && campers.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No campers found</h3>
              <p className={styles.emptyDescription}>
                We couldn&apos;t find any campers that match your filters. Try adjusting your search or clearing some filters.
              </p>
              <div className={styles.buttonGroup}>
                <button onClick={handleClearFilters} className={styles.btnSecondary}>
                  Clear filters
                </button>
                <button onClick={handleClearFilters} className={styles.btnPrimary}>
                  View all campers
                </button>
              </div>
            </div>
          )}

      
          {campers.map((camper) => camper && (
            <CamperCard key={camper.id} camper={camper} />
          ))}

         
          {hasNextPage && (
            <div className={styles.loadMoreWrapper}>
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={styles.loadMoreButton}
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