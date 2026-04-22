import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { CreditCard, Truck, ArrowLeft, Lock, Check, MapPin } from "lucide-react";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col bg-white"><AnnouncementBar /><Header />
      <div className="flex-1 flex items-center justify-center"><div className="text-center"><h2 className="font-display text-2xl font-bold text-gray-900">Không có sản phẩm để thanh toán</h2><Link to="/" className="mt-6 inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm">Mua Sắm Ngay</Link></div></div>
    <Footer /></div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    clearCart();
    navigate({ to: "/order-success" });
  };

  const inputCls = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar /><Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate({ to: "/cart" })} className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowLeft className="h-5 w-5" /></button>
            <h1 className="font-display text-3xl font-bold text-gray-900">Thanh Toán</h1>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-10">
            {[{ n: 1, l: "Giao Hàng" }, { n: 2, l: "Thanh Toán" }].map(({ n, l }) => (
              <div key={n} className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= n ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > n ? <Check className="h-4 w-4" /> : n}
                </div>
                <span className={`text-sm font-medium ${step >= n ? 'text-gray-900' : 'text-gray-400'}`}>{l}</span>
                {n < 2 && <div className={`w-16 h-0.5 ${step > 1 ? 'bg-gray-900' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3">
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6"><Truck className="h-5 w-5 text-gray-600" /><h2 className="font-display text-lg font-bold text-gray-900">Thông Tin Giao Hàng</h2></div>
                  
                  {/* Map Integration without API Key */}
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 h-[250px] relative bg-gray-100">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight={0} 
                      marginWidth={0} 
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ha%20Noi,%20Vietnam+(Sneaksurf)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      className="w-full h-full object-cover"
                    ></iframe>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <MapPin className="h-3 w-3 text-orange-500" />
                      Hà Nội, Việt Nam
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Họ và Tên</label><input value={form.name} onChange={(e) => update("name", e.target.value)} required className={inputCls} placeholder="Nguyễn Văn A" /></div>
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className={inputCls} placeholder="ban@example.com" /></div>
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Số Điện Thoại</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} required className={inputCls} placeholder="0912 345 678" /></div>
                    <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1.5">Địa Chỉ Nhận Hàng</label><input value={form.address} onChange={(e) => update("address", e.target.value)} required className={inputCls} placeholder="Số 1 Đại Cồ Việt" /></div>
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Tỉnh/Thành Phố</label><input value={form.city} onChange={(e) => update("city", e.target.value)} required className={inputCls} placeholder="Hà Nội" /></div>
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Mã Bưu Điện</label><input value={form.zip} onChange={(e) => update("zip", e.target.value)} required className={inputCls} placeholder="100000" /></div>
                  </div>
                  <button type="submit" className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">Tiếp Tục Thanh Toán</button>
                </div>
              )}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6"><CreditCard className="h-5 w-5 text-gray-600" /><h2 className="font-display text-lg font-bold text-gray-900">Chi Tiết Thanh Toán</h2></div>
                  <div className="space-y-4">
                    <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Số Thẻ</label><input value={form.card} onChange={(e) => update("card", e.target.value)} required className={inputCls} placeholder="4242 4242 4242 4242" maxLength={19} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">Hết Hạn</label><input value={form.expiry} onChange={(e) => update("expiry", e.target.value)} required className={inputCls} placeholder="MM/YY" maxLength={5} /></div>
                      <div><label className="block text-xs font-semibold text-gray-600 mb-1.5">CVV</label><input value={form.cvv} onChange={(e) => update("cvv", e.target.value)} required className={inputCls} placeholder="123" maxLength={4} /></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500"><Lock className="h-3.5 w-3.5" /> Thông tin thanh toán của bạn được mã hóa an toàn</div>
                  <button type="submit" className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">Đặt Hàng — ${total.toFixed(2)}</button>
                </div>
              )}
            </form>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Đơn Hàng</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0"><img src={item.product.image} alt="" className="w-full h-full object-cover" /></div>
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p><p className="text-xs text-gray-500">{item.size} × {item.quantity}</p></div>
                      <span className="text-sm font-semibold">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-gray-100 my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Tạm tính</span><span>${totalPrice}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Vận chuyển</span><span className="text-green-600 font-medium">Miễn phí</span></div>
                  <div className="flex justify-between text-gray-600"><span>Thuế (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="flex justify-between text-lg font-bold text-gray-900"><span>Tổng cộng</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
