import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Star, ShoppingBag, Heart, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/product/$id")({ component: ProductDetailPage });

function ProductDetailPage() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("US 9");
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="min-h-screen flex items-center justify-center"><p>Không tìm thấy sản phẩm</p></div>;

  const sizes = ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"];
  const related = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-gray-600 transition-colors">Trang Chủ</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="hover:text-gray-600 transition-colors cursor-pointer">{product.category === 'quan-ao' ? 'Quần Áo' : 'Sneaker'}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.tag && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-lg">{product.tag}</span>
              )}
              <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all hover:scale-110">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em]">{product.brand}</p>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 leading-tight">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}`} />)}</div>
                  <span className="text-sm font-medium text-gray-600">{product.rating} (128 đánh giá)</span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-6">
                <span className="font-display text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>}
                {product.originalPrice && <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
              </div>

              {/* Size */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Chọn Size</span>
                  <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors underline">Bảng Size</a>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className={`h-11 rounded-xl text-sm font-medium transition-all duration-200 ${selectedSize === s ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <span className="text-sm font-semibold text-gray-900 mb-3 block">Số Lượng</span>
                <div className="inline-flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><Minus className="h-3 w-3" /></button>
                  <span className="text-sm font-semibold w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-10 w-10 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"><Plus className="h-3 w-3" /></button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <button onClick={handleAdd} disabled={product.soldOut}
                  className={`flex-1 h-14 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${added ? 'bg-green-600 text-white shadow-green-600/20' : product.soldOut ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20'}`}>
                  {added ? <><Check className="h-5 w-5" /> Đã Thêm Vào Giỏ!</> : product.soldOut ? 'Hết Hàng' : <><ShoppingBag className="h-5 w-5" /> Thêm Vào Giỏ — ${product.price * qty}</>}
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[{ icon: Truck, t: "Giao Hàng Miễn Phí", s: "Đơn từ $150" }, { icon: RefreshCw, t: "Đổi Trả Miễn Phí", s: "Trong 30 ngày" }, { icon: Shield, t: "Chính Hãng", s: "100% Xác Thực" }].map(({ icon: Icon, t, s }) => (
                  <div key={t} className="text-center p-3 rounded-xl bg-gray-50">
                    <Icon className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-gray-900">{t}</p>
                    <p className="text-[10px] text-gray-500">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Có Thể Bạn Sẽ Thích</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link key={p.id} to="/product/$id" params={{ id: String(p.id) }} className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square bg-gray-100 overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                    <div className="p-4"><p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">{p.brand}</p><h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1">{p.name}</h3><p className="text-base font-bold text-gray-900 mt-2">${p.price}</p></div>
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
