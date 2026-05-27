import { Button } from "@/components/common/Button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { productsService, type SanPham } from "@/services/products";
import { useEffect, useState } from "react";

export function HeroBanner() {
  const [products, setProducts] = useState<SanPham[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadHeroProducts = async () => {
      try {
        const res = await productsService.getAll({ soLuong: 50 });
        if (res.danhSach && res.danhSach.length > 0) {
          // Select only products that have valid image URLs
          const withImages = res.danhSach.filter((p) => p.hinhAnh && p.hinhAnh.startsWith("http"));
          setProducts(withImages.length > 0 ? withImages : res.danhSach);
        }
      } catch (err) {
        console.error("Failed to load hero products", err);
      }
    };
    loadHeroProducts();
  }, []);

  // Cycle through products every 5 seconds
  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  const fallbackProduct: SanPham = {
    maSanPham: "SP2000",
    tenSP: "Jordan 1 High OG Chicago",
    gia: 180,
    giaGoc: 220,
    hinhAnh: "https://images.unsplash.com/photo-1556906781-9a412961c42c?w=700&h=700&fit=crop",
    maDanhMuc: "DM1",
    maThuongHieu: "TH1",
    soLuong: 10,
    trangThai: "CONHANG",
    ngayTao: "",
    ngayCapNhat: "",
    moTa: "Phiên bản Jordan kinh điển.",
    thuongHieu: { maThuongHieu: "TH1", tenTH: "Nike" },
  };

  const currentProduct = products[currentIndex] || fallbackProduct;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 min-h-[85vh] flex items-center">
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="container mx-auto px-4 lg:px-8 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium slide-up">
              <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
              <span>Bộ Sưu Tập Xuân 2025</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-gray-900 slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              BƯỚC VÀO
              <br />
              THẾ GIỚI
              <br />
              <span className="text-gradient">PHONG CÁCH</span>
            </h1>
            <p
              className="text-gray-500 text-lg leading-relaxed max-w-md slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Khám phá những mẫu giày mới nhất từ các thương hiệu đình đám.
              Phiên bản giới hạn, phối màu độc quyền và những thiết kế kinh
              điển.
            </p>
            <div
              className="flex flex-wrap gap-4 pt-2 slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-full h-14 px-8 text-base font-semibold shadow-xl shadow-gray-900/20 transition-all duration-300 group"
                >
                  Mua Ngay Hàng Mới
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                >
                  Bán Chạy Nhất
                </Button>
              </Link>
            </div>
            <div
              className="flex items-center gap-8 pt-4 slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div>
                <p className="font-display text-3xl font-bold text-gray-900">
                  500+
                </p>
                <p className="text-sm text-gray-500">Mẫu Độc Quyền</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="font-display text-3xl font-bold text-gray-900">
                  50k+
                </p>
                <p className="text-sm text-gray-500">Khách Hàng</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="font-display text-3xl font-bold text-gray-900">
                  100%
                </p>
                <p className="text-sm text-gray-500">Chính Hãng</p>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div
                className="absolute inset-[-10%] rounded-full border-2 border-dashed border-gray-200/60 animate-spin"
                style={{ animationDuration: "30s" }}
              />
              <Link to="/product/$id" params={{ id: currentProduct.maSanPham }}>
                <div className="relative z-10 rounded-full overflow-hidden shadow-2xl shadow-gray-900/10 bg-white border border-gray-100 aspect-square flex items-center justify-center float-animation hover:scale-105 transition-transform duration-500 cursor-pointer">
                  <img
                    src={currentProduct.hinhAnh || undefined}
                    alt={currentProduct.tenSP}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </Link>
              <Link to="/product/$id" params={{ id: currentProduct.maSanPham }}>
                <div
                  className="absolute -bottom-4 -left-8 z-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 slide-up cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg">
                    🔥
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Thịnh Hành</p>
                    <p className="text-xs text-gray-500 max-w-[150px] truncate">
                      {currentProduct.tenSP}
                    </p>
                  </div>
                </div>
              </Link>
              <div
                className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl shadow-xl px-5 py-3 slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">50k+ Đánh Giá</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
