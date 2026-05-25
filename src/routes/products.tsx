import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { productsService, type SanPham } from "@/services/products";
import {
  danhMucService,
  thuongHieuService,
  type DanhMuc,
  type ThuongHieu,
} from "@/services/cart";
import { useState, useEffect, Fragment } from "react";
import { Search, Loader2, Database } from "lucide-react";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const [products, setProducts] = useState<SanPham[]>([]);
  const [categories, setCategories] = useState<DanhMuc[]>([]);
  const [brands, setBrands] = useState<ThuongHieu[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDb, setFromDb] = useState(false);

  const [filter, setFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, brandFilter, search, sort]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          productsService.getAll({ soLuong: 500 }),
          danhMucService.getAll(),
          thuongHieuService.getAll(),
        ]);
        if (prodRes.danhSach?.length > 0) {
          setProducts(prodRes.danhSach);
          setFromDb(true);
        }
        if (catRes?.length > 0) setCategories(catRes);
        if (brandRes?.length > 0) setBrands(brandRes);
      } catch {
        // Fallback to static
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const allCategories =
    categories.length > 0
      ? [
          { id: "all", label: "Tất Cả" },
          ...categories.map((c) => ({ id: c.maDanhMuc, label: c.tenDM })),
        ]
      : [
          { id: "all", label: "Tất Cả" },
          { id: "hang-moi-ve", label: "Hàng Mới Về" },
          { id: "ban-chay", label: "Bán Chạy Nhất" },
          { id: "sneaker", label: "Giày Sneaker" },
          { id: "quan-ao", label: "Quần Áo" },
        ];

  let filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.maDanhMuc === filter);

  if (brandFilter !== "all") {
    filtered = filtered.filter((p) => p.thuongHieu?.tenTH === brandFilter);
  }

  if (search)
    filtered = filtered.filter(
      (p) =>
        p.tenSP.toLowerCase().includes(search.toLowerCase()) ||
        (p.thuongHieu?.tenTH || "")
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  if (sort === "price-asc")
    filtered = [...filtered].sort((a, b) => a.gia - b.gia);
  if (sort === "price-desc")
    filtered = [...filtered].sort((a, b) => b.gia - a.gia);
  if (sort === "name")
    filtered = [...filtered].sort((a, b) => a.tenSP.localeCompare(b.tenSP));

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
                Tất Cả Sản Phẩm
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">
                  Tìm thấy {filtered.length} sản phẩm
                </p>
                {fromDb && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    <Database className="h-3 w-3" /> Oracle DB
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="h-10 pl-10 pr-4 w-48 rounded-full border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-gray-400 outline-none transition-all"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 px-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-gray-400 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="default">Sắp xếp theo</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat.id ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Brand filters */}
          {brands.length > 0 && (
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">
                Thương hiệu:
              </span>
              <button
                onClick={() => setBrandFilter("all")}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${brandFilter === "all" ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100"}`}
              >
                Tất cả
              </button>
              {brands.map((b) => (
                <button
                  key={b.maThuongHieu}
                  onClick={() => setBrandFilter(b.tenTH)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${brandFilter === b.tenTH ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100"}`}
                >
                  {b.tenTH}
                </button>
              ))}
            </div>
          )}

          {/* Products grid */}
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Đang tải sản phẩm từ Oracle...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-display text-xl font-bold text-gray-900">
                Không tìm thấy sản phẩm
              </h3>
              <p className="mt-2 text-gray-500 text-sm">
                Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                {currentProducts.map((product, index) => (
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-100">
                  <p className="text-sm text-gray-500 font-medium">
                    Hiển thị <span className="font-semibold text-gray-900">{indexOfFirstProduct + 1}</span>–
                    <span className="font-semibold text-gray-900">{Math.min(indexOfLastProduct, filtered.length)}</span> trong tổng số{" "}
                    <span className="font-semibold text-gray-900">{filtered.length}</span> sản phẩm
                  </p>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`h-10 px-4 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-1 ${currentPage === 1 ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                    >
                      Trước
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, index, array) => {
                        const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                        return (
                          <Fragment key={page}>
                            {showEllipsisBefore && (
                              <span className="w-10 text-center text-gray-400 font-bold">...</span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`h-10 w-10 rounded-xl text-sm font-bold border transition-all ${currentPage === page ? "bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-900/20" : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                            >
                              {page}
                            </button>
                          </Fragment>
                        );
                      })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`h-10 px-4 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-1 ${currentPage === totalPages ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"}`}
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
