import { ArrowRight, Flame, Shirt, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";

const categories = [
  {
    title: "Sneaker",
    description: "Các mẫu mới nhất & kinh điển",
    icon: Flame,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=400&fit=crop",
    count: "320+ mẫu",
    gradient: "from-orange-500/80 to-red-500/80",
    link: "/products",
  },
  {
    title: "Quần Áo",
    description: "Đồ thời trang đường phố",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop",
    count: "180+ món",
    gradient: "from-blue-500/80 to-indigo-500/80",
    link: "/products",
  },
  {
    title: "Phiên Bản Giới Hạn",
    description: "Hàng hiếm & Độc quyền",
    icon: Trophy,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=400&fit=crop",
    count: "50+ độc quyền",
    gradient: "from-purple-500/80 to-pink-500/80",
    link: "/products",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Mua Sắm Theo Danh Mục
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-2">
                  <cat.icon className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    {cat.count}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
                <p className="text-sm text-white/80 mt-1">{cat.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  Mua Ngay <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
