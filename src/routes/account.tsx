import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { User, Mail, Phone, MapPin, LogOut, Package, Heart, Settings, ArrowLeft, Save } from "lucide-react";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", address: user?.address || "" });

  if (!isAuthenticated) { navigate({ to: "/login" }); return null; }

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleSave = () => { updateProfile(form); setEditing(false); };
  const handleLogout = () => { logout(); navigate({ to: "/" }); };

  const tabs = [
    { id: "profile", label: "Hồ Sơ", icon: User },
    { id: "orders", label: "Đơn Hàng", icon: Package },
    { id: "wishlist", label: "Yêu Thích", icon: Heart },
    { id: "settings", label: "Cài Đặt", icon: Settings },
  ];

  const inputCls = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all outline-none text-sm disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar /><Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
            <h1 className="font-display text-3xl font-bold text-gray-900">Tài Khoản</h1>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-lg shadow-orange-500/20">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <nav className="space-y-1">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setTab(id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === id ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <Icon className="h-4 w-4" />{label}
                    </button>
                  ))}
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4">
                    <LogOut className="h-4 w-4" />Đăng Xuất
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {tab === "profile" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-bold text-gray-900">Thông Tin Cá Nhân</h2>
                    {!editing ? (
                      <button onClick={() => setEditing(true)} className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors">Chỉnh sửa</button>
                    ) : (
                      <button onClick={handleSave} className="flex items-center gap-1.5 text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"><Save className="h-3.5 w-3.5" />Lưu</button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><User className="h-3 w-3" />Họ Tên</label><input value={form.name} onChange={(e) => update("name", e.target.value)} disabled={!editing} className={inputCls} /></div>
                    <div><label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><Mail className="h-3 w-3" />Email</label><input value={form.email} disabled className={inputCls} /></div>
                    <div><label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><Phone className="h-3 w-3" />Điện Thoại</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} disabled={!editing} className={inputCls} placeholder="Chưa thiết lập" /></div>
                    <div><label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"><MapPin className="h-3 w-3" />Địa Chỉ</label><input value={form.address} onChange={(e) => update("address", e.target.value)} disabled={!editing} className={inputCls} placeholder="Chưa thiết lập" /></div>
                  </div>
                </div>
              )}
              {tab === "orders" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 text-center py-16">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-gray-900">Chưa có đơn hàng nào</h3>
                  <p className="mt-2 text-gray-500 text-sm">Bắt đầu mua sắm để xem đơn hàng của bạn tại đây.</p>
                  <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all">Mua Sắm Ngay</Link>
                </div>
              )}
              {tab === "wishlist" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 text-center py-16">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-gray-900">Danh sách yêu thích trống</h3>
                  <p className="mt-2 text-gray-500 text-sm">Lưu lại những đôi giày bạn yêu thích để xem sau.</p>
                  <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all">Khám Phá Sản Phẩm</Link>
                </div>
              )}
              {tab === "settings" && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <h2 className="font-display text-lg font-bold text-gray-900 mb-6">Cài Đặt</h2>
                  <div className="space-y-4">
                    {["Thông báo qua Email", "Thông báo qua SMS", "Email Marketing"].map((s) => (
                      <label key={s} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">{s}</span>
                        <input type="checkbox" defaultChecked className="h-5 w-5 rounded accent-gray-900" />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
