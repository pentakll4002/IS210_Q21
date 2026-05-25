import { brands } from "@/data/products";

export function BrandMarquee() {
  const allBrands = [...brands, ...brands];

  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
          Được tin tưởng bởi các sneakerhead trên toàn cầu
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50/80 to-transparent z-10" />
        <div className="flex items-center marquee">
          {allBrands.map((brand, i) => (
            <div key={`${brand}-${i}`} className="flex-shrink-0 px-8 md:px-12">
              <span className="font-display text-xl md:text-2xl font-bold text-gray-300 whitespace-nowrap hover:text-gray-900 transition-colors duration-500 cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
