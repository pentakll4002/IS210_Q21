import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { productsService, type SanPham } from "@/services/products";
import { danhGiaService, type DanhGia } from "@/services/cart";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { mapUsToEuSize } from "@/lib/sizeMapper";
import { formatVND } from "@/lib/priceFormatter";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Loader2,
  Database,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem, setDirectCheckoutItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("US 9");
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [apiProduct, setApiProduct] = useState<SanPham | null>(null);
  const [reviews, setReviews] = useState<DanhGia[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [related, setRelated] = useState<SanPham[]>([]);
  const [availableSizes, setAvailableSizes] = useState<
    { tenKichCo: string; soLuong: number }[]
  >([]);

  const formatPrice = formatVND;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const detailRes = await productsService.getById(id);
        if (detailRes && detailRes.sanPham) {
          setApiProduct(detailRes.sanPham);

          if (detailRes.kichCos && detailRes.kichCos.length > 0) {
            setAvailableSizes(detailRes.kichCos);
            const firstAvailable = detailRes.kichCos.find((k) => k.soLuong > 0);
            if (firstAvailable) {
              setSelectedSize(firstAvailable.tenKichCo);
            } else {
              setSelectedSize(detailRes.kichCos[0].tenKichCo);
            }
          } else {
            setAvailableSizes([]);
            setSelectedSize("");
          }

          try {
            const allRes = await productsService.getAll({ soLuong: 50 });
            if (allRes.danhSach?.length > 0) {
              const relProds = allRes.danhSach
                .filter(
                  (s) =>
                    s.maThuongHieu === detailRes.sanPham.maThuongHieu &&
                    s.maSanPham !== detailRes.sanPham.maSanPham,
                )
                .slice(0, 4);
              setRelated(relProds);
            }
          } catch {
            /* ignore related fetch error */
          }

          // Fetch reviews
          try {
            const revs = await danhGiaService.getBySanPham(
              detailRes.sanPham.maSanPham,
            );
            if (Array.isArray(revs.danhGias)) {
              setReviews(revs.danhGias);
              if (revs.danhGias.length > 0) {
                setAvgRating(
                  revs.danhGias.reduce(
                    (s: number, r: DanhGia) => s + r.soSao,
                    0,
                  ) / revs.danhGias.length,
                );
              }
            }
          } catch {
            /* no reviews */
          }
        }
      } catch {
        // Handle error
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 font-medium">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!apiProduct)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy sản phẩm</p>
      </div>
    );

  const product = apiProduct;

  const handleAdd = () => {
    addItem(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (product.trangThai === "HETHANG" || !selectedSize) return;
    setDirectCheckoutItem({ product, quantity: 1, size: selectedSize });
    navigate({ to: "/checkout" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Trang Chủ
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/products"
              className="hover:text-gray-600 transition-colors"
            >
              Sản Phẩm
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.tenSP}
            </span>
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
              <Database className="h-3 w-3" /> Oracle
            </span>
          </nav>
        </div>

        {/* Product */}
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src={product.hinhAnh || undefined}
                  alt={product.tenSP}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.trangThai === "HETHANG" && (
                <span className="absolute top-4 left-4 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-lg">
                  HẾT HÀNG
                </span>
              )}
              <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all hover:scale-110">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-gray-600">
                    Mã SP: {product.maSanPham}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${product.trangThai === "CONHANG" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                  >
                    {product.trangThai === "CONHANG"
                      ? `Còn ${product.soLuong} sp`
                      : "Hết hàng"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em]">
                {product.thuongHieu?.tenTH || "SNEAKER"}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                {product.tenSP}
              </h1>

              {avgRating > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(avgRating) ? "fill-orange-400 text-orange-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {avgRating.toFixed(1)} ({reviews.length} đánh giá)
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-6">
                <span className="font-display text-3xl font-bold text-gray-900">
                  {formatPrice(product.gia)}
                </span>
                {product.giaGoc && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.giaGoc)}
                  </span>
                )}
                {product.giaGoc && (
                  <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    -{Math.round((1 - product.gia / product.giaGoc) * 100)}%
                  </span>
                )}
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">
                    Chọn Size
                  </span>
                  <a
                    href="#"
                    className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors underline"
                  >
                    Bảng Size
                  </a>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {availableSizes.length > 0 ? (
                    availableSizes.map((s) => (
                      <button
                        key={s.tenKichCo}
                        onClick={() => setSelectedSize(s.tenKichCo)}
                        disabled={s.soLuong <= 0}
                        className={`h-11 rounded-xl text-sm font-medium transition-all duration-200 ${selectedSize === s.tenKichCo ? "bg-gray-900 text-white shadow-lg" : s.soLuong <= 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed border-dashed" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"}`}
                      >
                        {mapUsToEuSize(s.tenKichCo)}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-sm text-gray-500 py-2">
                      Không có dữ liệu kích cỡ
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <span className="text-sm font-semibold text-gray-900 mb-3 block">
                  Số Lượng
                </span>
                <div className="inline-flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-semibold w-8 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={handleBuyNow}
                  disabled={product.trangThai === "HETHANG" || !selectedSize}
                  className={`w-full h-14 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${product.trangThai === "HETHANG" || !selectedSize ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/20"}`}
                >
                  Mua Ngay (Chỉ 1 Sản Phẩm) — {formatPrice(product.gia)}
                </button>

                <button
                  onClick={handleAdd}
                  disabled={product.trangThai === "HETHANG" || !selectedSize}
                  className={`w-full h-14 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 border ${added ? "bg-green-600 text-white border-green-600 shadow-green-600/20" : product.trangThai === "HETHANG" || !selectedSize ? "bg-gray-100 text-gray-400 cursor-not-allowed border-none shadow-none" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400"}`}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" /> Đã Thêm Vào Giỏ!
                    </>
                  ) : product.trangThai === "HETHANG" ? (
                    "Hết Hàng"
                  ) : !selectedSize ? (
                    "Chọn Kích Cỡ"
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" /> Thêm Vào Giỏ —{" "}
                      {formatPrice(product.gia * qty)}
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Truck,
                    t: "Giao Hàng Miễn Phí",
                    s: "Đơn từ 500.000₫",
                  },
                  {
                    icon: RefreshCw,
                    t: "Đổi Trả Miễn Phí",
                    s: "Trong 30 ngày",
                  },
                  { icon: Shield, t: "Chính Hãng", s: "100% Xác Thực" },
                ].map(({ icon: Icon, t, s }) => (
                  <div
                    key={t}
                    className="text-center p-3 rounded-xl bg-gray-50"
                  >
                    <Icon className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-900">{t}</p>
                    <p className="text-[10px] text-gray-500">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6" /> Đánh Giá Từ Khách Hàng (
                {reviews.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {reviews.map((r) => (
                  <div
                    key={r.maDanhGia}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < r.soSao ? "fill-orange-400 text-orange-400" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {r.tenND || r.maNguoiDung}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {r.binhLuan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
                Có Thể Bạn Sẽ Thích
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.maSanPham}
                    to="/product/$id"
                    params={{ id: p.maSanPham }}
                    className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={p.hinhAnh || undefined}
                        alt={p.tenSP}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                        {p.thuongHieu?.tenTH}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1">
                        {p.tenSP}
                      </h3>
                      <p className="text-base font-bold text-gray-900 mt-2">
                        {formatPrice(p.gia)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
