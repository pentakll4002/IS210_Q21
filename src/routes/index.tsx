import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { HeroBanner } from "@/components/common/HeroBanner";
import { BrandMarquee } from "@/components/common/BrandMarquee";
import { FeaturedCategories } from "@/components/common/FeaturedCategories";
import { ProductSection } from "@/components/common/ProductSection";
import { Newsletter } from "@/components/common/Newsletter";
import { Footer } from "@/components/common/Footer";
import { productsService, type SanPham } from "@/services/products";
import { useEffect, useState } from "react";
import { Database, Server, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [apiProducts, setApiProducts] = useState<SanPham[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsService.getAll({ soLuong: 500 });
        if (res.danhSach && res.danhSach.length > 0) {
          setApiProducts(res.danhSach);
          setDbConnected(true);
        } else {
          setDbConnected(false);
        }
      } catch {
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const products = apiProducts;

  const newArrivals = products.filter((p) => p.maDanhMuc === "DM1");
  let bestSellers = products.filter((p) => p.maDanhMuc === "DM2");
  if (bestSellers.length === 0 && products.length > 0) {
    bestSellers = products.slice(4, 12); // Fallback to select a few products
  }
  const sneakers = products.filter((p) => p.maDanhMuc === "DM3");
  const apparel = products.filter(
    (p) => p.maDanhMuc === "DM4" || p.maDanhMuc === "DM5",
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BrandMarquee />

        {/* Oracle Connection Status Badge */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div
            className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium transition-all duration-500 ${
              loading
                ? "bg-gray-50 border-gray-200 text-gray-500"
                : dbConnected
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100"
                  : "bg-amber-50 border-amber-200 text-amber-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Đang kết nối Oracle
                Database...
              </>
            ) : dbConnected ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Database className="h-4 w-4" />
                  <span className="font-bold">Oracle DB</span>
                </div>
                <div className="w-px h-4 bg-emerald-300" />
                <div className="flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5" />
                  <span>localhost:1521/orcl2</span>
                </div>
                <div className="w-px h-4 bg-emerald-300" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{apiProducts.length} sản phẩm từ DB</span>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>Dùng dữ liệu tĩnh (Backend chưa kết nối)</span>
              </>
            )}
          </div>
        </div>

        <ProductSection
          id="hang-moi-ve"
          title="Hàng Mới Về"
          products={newArrivals}
        />
        <FeaturedCategories />
        <ProductSection
          id="ban-chay"
          title="Bán Chạy Nhất"
          products={bestSellers}
        />
        <ProductSection id="sneaker" title="Giày Sneaker" products={sneakers} />
        <ProductSection
          id="quan-ao"
          title="Quần Áo & Streetwear"
          products={apparel}
        />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
