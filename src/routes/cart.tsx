import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { mapUsToEuSize } from "@/lib/sizeMapper";
import { formatVND } from "@/lib/priceFormatter";
import {  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { useEffect } from "react";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, setDirectCheckoutItem } =
    useCart();

  useEffect(() => {
    setDirectCheckoutItem(null);
  }, [setDirectCheckoutItem]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-display text-3xl font-bold text-gray-900">
              Giỏ Hàng
            </h1>
            <span className="bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {totalItems}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="mt-2 text-gray-500">
                Có vẻ như bạn chưa thêm đôi sneaker nào.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg"
              >
                Tiếp Tục Mua Sắm <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.maSanPham}-${item.size}`}
                    className="flex gap-4 sm:gap-6 bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.hinhAnh || undefined}
                        alt={item.product.tenSP}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                            {item.product.thuongHieu?.tenTH || "SNEAKER"}
                          </p>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mt-1">
                            {item.product.tenSP}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Size: {mapUsToEuSize(item.size)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.maSanPham)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.maSanPham,
                                item.quantity - 1,
                              )
                            }
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.maSanPham,
                                item.quantity + 1,
                              )
                            }
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">
                          {formatVND(item.product.gia * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-6">
                    Tóm Tắt Đơn Hàng
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính ({totalItems} sp)</span>
                      <span>{formatVND(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Vận chuyển</span>
                      <span className="text-green-600 font-medium">
                        Miễn phí
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Thuế (8%)</span>
                      <span>{formatVND(totalPrice * 0.08)}</span>
                    </div>
                    <div className="h-px bg-gray-100 my-4" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Tổng cộng</span>
                      <span>{formatVND(totalPrice * 1.08)}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 group"
                  >
                    Tiến Hành Thanh Toán{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/"
                    className="mt-3 w-full h-10 rounded-xl text-gray-600 font-medium text-sm hover:text-gray-900 transition-colors flex items-center justify-center"
                  >
                    Tiếp Tục Mua Sắm
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
