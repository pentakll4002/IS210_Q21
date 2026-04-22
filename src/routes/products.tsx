import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/products";
import { useState } from "react";
import { SlidersHorizontal, Grid3X3, LayoutList, Search } from "lucide-react";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const categories = [
    { id: "all", label: "Tất Cả" },
    { id: "hang-moi-ve", label: "Hàng Mới Về" },
    { id: "ban-chay", label: "Bán Chạy Nhất" },
    { id: "sneaker", label: "Giày Sneaker" },
    { id: "quan-ao", label: "Quần Áo" },
  ];

  let filtered = filter === "all" ? products : products.filter((p) => p.category === filter);
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar /><Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Tất Cả Sản Phẩm</h1>
              <p className="text-sm text-gray-500 mt-1">Tìm thấy {filtered.length} sản phẩm</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..."
                  className="h-10 pl-10 pr-4 w-48 rounded-full border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-gray-400 outline-none transition-all" />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="h-10 px-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-gray-400 outline-none transition-all appearance-none cursor-pointer">
                <option value="default">Sắp xếp theo</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setFilter(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat.id ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-display text-xl font-bold text-gray-900">Không tìm thấy sản phẩm</h3>
              <p className="mt-2 text-gray-500 text-sm">Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product, index) => (
                <Link key={product.id} to="/product/$id" params={{ id: String(product.id) }} className="block">
                  <ProductCard product={product} index={index} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
