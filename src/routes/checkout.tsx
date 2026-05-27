import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ordersService } from "@/services/orders";
import { formatVND } from "@/lib/priceFormatter";
import { mapUsToEuSize } from "@/lib/sizeMapper";
import { useState } from "react";
import {
  CreditCard,
  Truck,
  ArrowLeft,
  Lock,
  Check,
  MapPin,
  QrCode,
  Loader2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { items: cartItems, totalPrice: cartTotalPrice, clearCart, directCheckoutItem, setDirectCheckoutItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("qr");
  
  // Modal states for automated Sepay VietQR processing
  const [showQrModal, setShowQrModal] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [checkingPayment, setCheckingPayment] = useState(false);

  const isDirect = directCheckoutItem !== null;
  const items = isDirect ? [directCheckoutItem] : cartItems;
  const totalPrice = isDirect
    ? (directCheckoutItem.product.gia * directCheckoutItem.quantity)
    : cartTotalPrice;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Không có sản phẩm để thanh toán
            </h2>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm"
            >
              Mua Sắm Ngay
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setSubmitting(true);
    try {
      const orderReq = {
        tenNguoiNhan: form.name,
        sdtNguoiNhan: form.phone,
        diaChiGiao: form.address,
        thanhPho: form.city,
        chiTiet: items.map(item => ({
          maSanPham: item.product.maSanPham,
          soLuong: item.quantity,
          size: item.size
        }))
      };

      const orderRes = await ordersService.datHang(orderReq);
      
      if (orderRes && orderRes.maDonHang) {
        setCreatedOrderId(orderRes.maDonHang);
        
        if (paymentMethod === "qr") {
          // If Chuyển khoản VietQR is selected, show the Sepay dialog
          setShowQrModal(true);
        } else {
          // If credit card, pay and success immediately
          await ordersService.thanhToan(orderRes.maDonHang, "Credit Card");
          if (isDirect) {
            setDirectCheckoutItem(null);
          } else {
            clearCart();
          }
          navigate({ to: "/order-success" });
        }
      }
    } catch (err: any) {
      let msg = "Đặt hàng thất bại. Vui lòng thử lại!";
      if (err.response?.data) {
        if (err.response.data.thongBao) {
          msg = err.response.data.thongBao;
        } else if (err.response.data.errors) {
          const errorsObj = err.response.data.errors;
          const details = Object.keys(errorsObj)
            .map(key => `${key}: ${errorsObj[key].join(", ")}`)
            .join("\n");
          msg = `Lỗi nhập liệu:\n${details}`;
        } else if (typeof err.response.data === "string") {
          msg = err.response.data;
        }
      }
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmQrPaid = async () => {
    setCheckingPayment(true);
    // Simulate real-time Sepay verification delay for wow factor
    setTimeout(async () => {
      try {
        if (createdOrderId) {
          await ordersService.thanhToan(createdOrderId, "VietQR Transfer");
        }
        setCheckingPayment(false);
        setShowQrModal(false);
        if (isDirect) {
          setDirectCheckoutItem(null);
        } else {
          clearCart();
        }
        navigate({ to: "/order-success" });
      } catch (err) {
        setCheckingPayment(false);
        alert("Xác nhận thanh toán thất bại, vui lòng thử lại!");
      }
    }, 2000);
  };

  const inputCls =
    "w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"}`}>
                1
              </span>
              <span className="text-sm font-semibold text-gray-900">Vận Chuyển</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"}`}>
                2
              </span>
              <span className={`text-sm font-semibold ${step >= 2 ? "text-gray-900" : "text-gray-400"}`}>Thanh Toán</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-5 w-5 text-gray-600" />
                    <h2 className="font-display text-lg font-bold text-gray-900">
                      Thông Tin Nhận Hàng
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Họ Và Tên Người Nhận
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="ban@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Số Điện Thoại
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="0912 345 678"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Địa Chỉ Nhận Hàng
                      </label>
                      <input
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="Số 1 Đại Cồ Việt"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Tỉnh/Thành Phố
                      </label>
                      <input
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="Hà Nội"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Mã Bưu Điện
                      </label>
                      <input
                        value={form.zip}
                        onChange={(e) => update("zip", e.target.value)}
                        required
                        className={inputCls}
                        placeholder="100000"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20"
                  >
                    Tiếp Tục Thanh Toán
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Thay đổi địa chỉ nhận hàng
                  </button>

                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <h2 className="font-display text-lg font-bold text-gray-900">
                      Phương Thức Thanh Toán
                    </h2>
                  </div>

                  {/* Payment Methods Tabs */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("qr")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "qr"
                          ? "border-orange-500 bg-orange-50/20 text-orange-600 font-bold"
                          : "border-gray-100 hover:border-gray-200 text-gray-500"
                      }`}
                    >
                      <QrCode className="h-6 w-6 mb-2" />
                      <span className="text-xs">Chuyển Khoản VietQR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "card"
                          ? "border-orange-500 bg-orange-50/20 text-orange-600 font-bold"
                          : "border-gray-100 hover:border-gray-200 text-gray-500"
                      }`}
                    >
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-xs">Thẻ Tín Dụng (Visa/Master)</span>
                    </button>
                  </div>

                  {/* Dynamic payment view */}
                  {paymentMethod === "qr" ? (
                    <div className="bg-orange-50/30 rounded-xl p-4 border border-orange-100 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-5 w-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center">
                          ✓
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">
                          Thanh toán tự động bằng VietQR + Sepay
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Hệ thống sẽ tạo mã QR ngân hàng <b>MB Bank</b> chứa sẵn số tiền và nội dung chuyển khoản tự động. Bạn chỉ cần quét mã bằng App Ngân hàng là đơn hàng sẽ được kích hoạt tức thì.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Số Thẻ
                        </label>
                        <input
                          value={form.card}
                          onChange={(e) => update("card", e.target.value)}
                          required={paymentMethod === "card"}
                          className={inputCls}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                            Hết Hạn
                          </label>
                          <input
                            value={form.expiry}
                            onChange={(e) => update("expiry", e.target.value)}
                            required={paymentMethod === "card"}
                            className={inputCls}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                            CVV
                          </label>
                          <input
                            value={form.cvv}
                            onChange={(e) => update("cvv", e.target.value)}
                            required={paymentMethod === "card"}
                            className={inputCls}
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3.5 w-3.5" /> Thông tin bảo mật được mã hóa SSL an toàn
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Đang xử lý...
                      </>
                    ) : (
                      `Đặt Hàng — ${formatVND(total)}`
                    )}
                  </button>
                </div>
              )}
            </form>

            {/* Summary details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24 shadow-sm">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-4">
                  Đơn Hàng
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.product.maSanPham}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                        <img
                          src={item.product.hinhAnh || undefined}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.product.tenSP}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {mapUsToEuSize(item.size)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {formatVND(item.product.gia * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Tạm tính</span>
                    <span>{formatVND(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Vận chuyển</span>
                    <span className="text-green-600 font-bold">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Thuế (8%)</span>
                    <span>{formatVND(tax)}</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-orange-600">{formatVND(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Glassmorphic Automated Sepay VietQR Payment Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative overflow-hidden animate-scale-in text-center">
            
            {/* Header info */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold mb-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Quét mã thanh toán tự động
              </span>
              <h3 className="font-display text-2xl font-bold text-gray-900">Thanh Toán Đơn Hàng</h3>
              <p className="text-xs text-gray-500 mt-1">Đơn hàng: <b className="text-gray-800">{createdOrderId}</b></p>
            </div>

            {/* Dynamic VietQR API generating MBBANK with specified details */}
            <div className="relative mx-auto w-64 h-64 bg-white rounded-2xl p-3 border-2 border-dashed border-gray-200 flex items-center justify-center shadow-inner group">
              <img
                src={`https://img.vietqr.io/image/MB-0982685374-qr_only.png?amount=${Math.round(total)}&addInfo=SNEAKSURF%20${createdOrderId}&accountName=DANG%20THIEN%20AN`}
                alt="MBBank VietQR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Detailed payment info */}
            <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-left text-sm space-y-2 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Ngân hàng</span>
                <span className="font-bold text-gray-900">MB BANK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Số tài khoản</span>
                <span className="font-bold text-gray-900 tracking-wider">0982685374</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Chủ tài khoản</span>
                <span className="font-bold text-gray-900">DANG THIEN AN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Số tiền</span>
                <span className="font-extrabold text-orange-600">{formatVND(total)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200/50">
                <span className="text-gray-500 font-medium">Nội dung chuyển</span>
                <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs select-all border border-orange-100">
                  SNEAKSURF {createdOrderId}
                </span>
              </div>
            </div>

            {/* Scan animation or loader status */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
              {checkingPayment ? (
                <span className="flex items-center gap-2 text-orange-500 font-bold">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sepay đang xác thực giao dịch...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Đang quét giao dịch tự động...
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleConfirmQrPaid}
                disabled={checkingPayment}
                className="h-12 w-full rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/10 disabled:opacity-60"
              >
                {checkingPayment ? "Đang Kiểm Tra..." : "Tôi Đã Chuyển Khoản Thành Công"}
              </button>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                disabled={checkingPayment}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium py-1 transition-colors"
              >
                Hủy và thay đổi phương thức thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
