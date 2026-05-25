import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/common/ProductCard";
import type { SanPham } from "@/services/products";
import { ArrowRight } from "lucide-react";

interface ProductSectionProps {
  id: string;
  title: string;
  products: SanPham[];
}

export function ProductSection({ id, title, products }: ProductSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
          </div>
          <Link
            to="/products"
            className="group hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-300"
          >
            Xem Tất Cả{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <Link
              key={product.maSanPham}
              to="/product/$id"
              params={{ id: product.maSanPham }}
              className="block"
            >
              <ProductCard product={product} index={index} />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex sm:hidden justify-center">
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Xem Tất Cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
