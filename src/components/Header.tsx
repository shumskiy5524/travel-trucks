'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="h-[72px] border-b border-[#F2F4F7] bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-16">
        <Link
          href="/"
          className="text-[24px] font-bold tracking-tight"
        >
          Travel<span className="text-[#E44848]">Trucks</span>
        </Link>

        <nav className="flex items-center gap-10">
          <Link
            href="/"
            className={`text-[16px] font-medium transition-colors ${
              pathname === '/'
                ? 'text-[#E44848]'
                : 'text-[#101828] hover:text-[#E44848]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`text-[16px] font-medium transition-colors ${
              pathname.startsWith('/catalog')
                ? 'text-[#E44848]'
                : 'text-[#101828] hover:text-[#E44848]'
            }`}
          >
            Catalog
          </Link>
        </nav>

        <div className="w-[120px]" />
      </div>
    </header>
  );
}