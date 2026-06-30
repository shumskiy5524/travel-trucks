import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative h-[calc(100vh-64px)] bg-[url('https://images.unsplash.com/photo-1513026705753-bc31cd47e565?q=80&w=1920')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto max-w-7xl h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-5xl md:text-[64px] font-bold max-w-2xl leading-tight tracking-tight">
          Campers of your dreams
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-xl text-[#F7F9FC] font-medium">
          You can find everything you want in our catalog
        </p>
        <div className="mt-10">
          <Link 
            href="/catalog" 
            className="inline-flex justify-center items-center px-12 py-5 bg-[#E44848] text-white text-lg font-semibold rounded-full hover:bg-[#cf3e3e] transition-colors shadow-lg"
          >
            View Now
          </Link>
        </div>
      </div>
    </div>
  );
}