import Link from 'next/link';

export default function HomePage() {
  return (
    <section
      className="relative h-[calc(100vh-72px)] bg-cover bg-center"
      style={{
       backgroundImage: "url('/images/hero.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-16">
        <h1 className="max-w-[640px] text-[64px] font-bold leading-[72px] text-white">
          Campers of your dreams
        </h1>

        <p className="mt-4 text-2xl text-white">
          You can find everything you want in our catalog
        </p>

        <Link
          href="/catalog"
          className="mt-10 flex h-[56px] w-[173px] items-center justify-center rounded-full bg-[#E44848] text-[16px] font-semibold text-white transition hover:bg-[#D84343]"
        >
          View Now
        </Link>
      </div>
    </section>
  );
}