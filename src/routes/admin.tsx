import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { adminService, type AdminStats, type AdminUser } from "@/services/admin";
import { formatVND } from "@/lib/priceFormatter";
import type { SanPham } from "@/services/products";
import type { DonHang } from "@/services/orders";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, ShoppingBag, Package, Users, LogOut, ChevronDown,
  Plus, Pencil, Trash2, Loader2, X, Search, TrendingUp, AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Tab = "dashboard" | "orders" | "products" | "users";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  CHOXULY: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
  DANGXULY: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
  DANGGIAO: { label: "Đang giao", color: "bg-purple-100 text-purple-800" },
  DAGIAO: { label: "Đã giao", color: "bg-green-100 text-green-800" },
  DAHUY: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
};

function AdminPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<DonHang[]>([]);
  const [products, setProducts] = useState<SanPham[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<SanPham | null>(null);
  const [cats, setCats] = useState<{maDanhMuc:string;tenDM:string}[]>([]);
  const [brands, setBrands] = useState<{maThuongHieu:string;tenTH:string}[]>([]);
  const [pForm, setPForm] = useState({ tenSP:"", maDanhMuc:"", maThuongHieu:"", gia:0, giaGoc:0, hinhAnh:"", soLuong:0, moTa:"" });
  const [saving, setSaving] = useState(false);

  // Pagination states
  const [productPage, setProductPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setProductPage(1);
    setOrderPage(1);
    setUserPage(1);
  }, [search, tab]);

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return (
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Trang <span className="font-medium text-gray-900">{currentPage}</span> / <span className="font-medium text-gray-900">{totalPages}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
          >
            Trước
          </button>
          {start > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${currentPage === 1 ? "bg-orange-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                1
              </button>
              {start > 2 && <span className="text-gray-400 px-1 text-xs">...</span>}
            </>
          )}
          {pages.map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${currentPage === p ? "bg-orange-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {p}
            </button>
          ))}
          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span className="text-gray-400 px-1 text-xs">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${currentPage === totalPages ? "bg-orange-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
          >
            Sau
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === "dashboard") {
        const s = await adminService.getStats();
        setStats(s);
      } else if (tab === "orders") {
        setOrders(await adminService.getAllOrders());
      } else if (tab === "products") {
        const [p, c, b] = await Promise.all([adminService.getAllProducts(), adminService.getCategories(), adminService.getBrands()]);
        setProducts(p); setCats(c); setBrands(b);
      } else if (tab === "users") {
        setUsers(await adminService.getAllUsers());
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminService.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.maDonHang === id ? { ...o, trangThai: status } : o));
    } catch { alert("Cập nhật thất bại!"); }
  };

  const openAdd = () => {
    setEditProduct(null);
    setPForm({ tenSP:"", maDanhMuc:cats[0]?.maDanhMuc||"", maThuongHieu:brands[0]?.maThuongHieu||"", gia:0, giaGoc:0, hinhAnh:"", soLuong:10, moTa:"" });
    setShowModal(true);
  };

  const openEdit = (p: SanPham) => {
    setEditProduct(p);
    setPForm({ tenSP:p.tenSP, maDanhMuc:p.maDanhMuc||"", maThuongHieu:p.maThuongHieu||"", gia:p.gia, giaGoc:p.giaGoc||0, hinhAnh:p.hinhAnh||"", soLuong:p.soLuong, moTa:p.moTa||"" });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editProduct) {
        await adminService.updateProduct(editProduct.maSanPham, { tenSP:pForm.tenSP, gia:pForm.gia, giaGoc:pForm.giaGoc||undefined, hinhAnh:pForm.hinhAnh||undefined, soLuong:pForm.soLuong });
      } else {
        await adminService.createProduct({ tenSP:pForm.tenSP, maDanhMuc:pForm.maDanhMuc||undefined, maThuongHieu:pForm.maThuongHieu||undefined, gia:pForm.gia, giaGoc:pForm.giaGoc||undefined, hinhAnh:pForm.hinhAnh||undefined, soLuong:pForm.soLuong, moTa:pForm.moTa||undefined });
      }
      setShowModal(false);
      loadData();
    } catch { alert("Lưu thất bại!"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    try { await adminService.deleteProduct(id); loadData(); } catch { alert("Xóa thất bại!"); }
  };

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  const sidebar = [
    { id: "dashboard" as Tab, icon: LayoutDashboard, label: "Tổng Quan" },
    { id: "orders" as Tab, icon: ShoppingBag, label: "Đơn Hàng" },
    { id: "products" as Tab, icon: Package, label: "Sản Phẩm" },
    { id: "users" as Tab, icon: Users, label: "Khách Hàng" },
  ];

  const filteredOrders = orders.filter(o => o.maDonHang.toLowerCase().includes(search.toLowerCase()) || o.tenNguoiNhan?.toLowerCase().includes(search.toLowerCase()));
  const filteredProducts = products.filter(p => p.tenSP.toLowerCase().includes(search.toLowerCase()));

  const totalProductPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((productPage - 1) * itemsPerPage, productPage * itemsPerPage);

  const totalOrderPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((orderPage - 1) * itemsPerPage, orderPage * itemsPerPage);

  const totalUserPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight">SNEAK<span className="text-orange-400">SURF</span></h1>
          <p className="text-xs text-gray-400 mt-1">Bảng Điều Khiển Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebar.map(s => (
            <button key={s.id} onClick={() => { setTab(s.id); setSearch(""); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === s.id ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <s.icon className="h-4.5 w-4.5" /> {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold">A</div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user?.name}</p><p className="text-xs text-gray-500 truncate">{user?.email}</p></div>
          </div>
          <button onClick={() => { logout(); navigate({ to: "/" }); }} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>
          ) : tab === "dashboard" && stats ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng Quan Hệ Thống</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label:"Doanh Thu", value:formatVND(stats.tongDoanhThu), icon:TrendingUp, color:"from-orange-500 to-amber-500" },
                  { label:"Đơn Hàng", value:stats.tongDonHang, icon:ShoppingBag, color:"from-blue-500 to-cyan-500" },
                  { label:"Sản Phẩm", value:stats.tongSanPham, icon:Package, color:"from-purple-500 to-pink-500" },
                  { label:"Khách Hàng", value:stats.tongKhachHang, icon:Users, color:"from-emerald-500 to-teal-500" },
                ].map((c,i) => (
                  <div key={i} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-lg`}>
                    <div className="flex items-center justify-between mb-3">
                      <c.icon className="h-5 w-5 opacity-80" />
                    </div>
                    <p className="text-2xl font-bold">{c.value}</p>
                    <p className="text-xs opacity-80 mt-1">{c.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label:"Chờ Xử Lý", value:stats.donChoXuLy, cls:"bg-yellow-50 text-yellow-700 border-yellow-200" },
                  { label:"Đang Xử Lý", value:stats.donDangXuLy, cls:"bg-blue-50 text-blue-700 border-blue-200" },
                  { label:"Đã Giao", value:stats.donDaGiao, cls:"bg-green-50 text-green-700 border-green-200" },
                  { label:"Sản Phẩm Hết Hàng", value:stats.spHetHang, cls:"bg-red-50 text-red-700 border-red-200" },
                ].map((c,i) => (
                  <div key={i} className={`${c.cls} border rounded-xl p-4`}>
                    <p className="text-2xl font-bold">{c.value}</p>
                    <p className="text-xs font-medium mt-1">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : tab === "orders" ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quản Lý Đơn Hàng ({orders.length})</h2>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm đơn hàng..." className="pl-9 pr-4 h-10 rounded-xl border border-gray-200 bg-white text-sm w-64 outline-none focus:border-orange-400" />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-5 py-3">Mã ĐH</th><th className="px-5 py-3">Người Nhận</th><th className="px-5 py-3">SĐT</th>
                      <th className="px-5 py-3">Tổng Cộng</th><th className="px-5 py-3">Ngày Đặt</th><th className="px-5 py-3">Trạng Thái</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginatedOrders.map(o => (
                        <tr key={o.maDonHang} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-bold text-gray-900">{o.maDonHang}</td>
                          <td className="px-5 py-3 text-gray-700">{o.tenNguoiNhan}</td>
                          <td className="px-5 py-3 text-gray-500">{o.sdtNguoiNhan || "—"}</td>
                          <td className="px-5 py-3 font-semibold text-orange-600">{formatVND(o.tongCong)}</td>
                          <td className="px-5 py-3 text-gray-500">{new Date(o.ngayDat).toLocaleDateString("vi-VN")}</td>
                          <td className="px-5 py-3">
                            <div className="relative">
                              <select value={o.trangThai} onChange={e => handleStatusChange(o.maDonHang, e.target.value)}
                                className={`appearance-none px-3 py-1.5 pr-7 rounded-lg text-xs font-bold border-0 cursor-pointer ${STATUS_MAP[o.trangThai]?.color || "bg-gray-100 text-gray-600"}`}>
                                {Object.entries(STATUS_MAP).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                              </select>
                              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none opacity-50" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredOrders.length === 0 && <p className="text-center text-gray-400 py-12 text-sm">Không có đơn hàng nào</p>}
                </div>
                {renderPagination(orderPage, totalOrderPages, setOrderPage)}
              </div>
            </div>
          ) : tab === "products" ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quản Lý Sản Phẩm ({products.length})</h2>
                <div className="flex items-center gap-3">
                  <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm sản phẩm..." className="pl-9 pr-4 h-10 rounded-xl border border-gray-200 bg-white text-sm w-56 outline-none focus:border-orange-400" />
                  </div>
                  <button onClick={openAdd} className="flex items-center gap-2 h-10 px-4 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                    <Plus className="h-4 w-4" /> Thêm SP
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-5 py-3">Sản Phẩm</th><th className="px-5 py-3">Mã SP</th><th className="px-5 py-3">Giá</th>
                      <th className="px-5 py-3">Tồn Kho</th><th className="px-5 py-3">Trạng Thái</th><th className="px-5 py-3 text-right">Thao Tác</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginatedProducts.map(p => (
                        <tr key={p.maSanPham} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                {p.hinhAnh && <img src={p.hinhAnh} alt="" className="h-full w-full object-cover" />}
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[200px]">{p.tenSP}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-500 font-mono text-xs">{p.maSanPham}</td>
                          <td className="px-5 py-3 font-semibold text-gray-900">{formatVND(p.gia)}</td>
                          <td className="px-5 py-3"><span className={`font-bold ${p.soLuong <= 0 ? "text-red-600" : p.soLuong < 5 ? "text-yellow-600" : "text-green-600"}`}>{p.soLuong}</span></td>
                          <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${p.trangThai === "CONHANG" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{p.trangThai === "CONHANG" ? "Còn hàng" : "Hết hàng"}</span></td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                              <button onClick={() => handleDelete(p.maSanPham)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredProducts.length === 0 && <p className="text-center text-gray-400 py-12 text-sm">Không có sản phẩm nào</p>}
                </div>
                {renderPagination(productPage, totalProductPages, setProductPage)}
              </div>
            </div>
          ) : tab === "users" ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quản Lý Người Dùng ({users.length})</h2>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3">Mã ND</th><th className="px-5 py-3">Họ Tên</th><th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">SĐT</th><th className="px-5 py-3">Vai Trò</th><th className="px-5 py-3">Ngày Tạo</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginatedUsers.map(u => (
                      <tr key={u.maNguoiDung} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">{u.maNguoiDung}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{u.tenND}</td>
                        <td className="px-5 py-3 text-gray-600">{u.email}</td>
                        <td className="px-5 py-3 text-gray-500">{u.soDienThoai || "—"}</td>
                        <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${u.vaiTro === "ADMIN" ? "bg-orange-50 text-orange-700" : "bg-gray-100 text-gray-600"}`}>{u.vaiTro}</span></td>
                        <td className="px-5 py-3 text-gray-500">{u.ngayTao ? new Date(u.ngayTao).toLocaleDateString("vi-VN") : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {renderPagination(userPage, totalUserPages, setUserPage)}
              </div>
            </div>
          ) : null}
        </div>
      </main>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">{editProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tên Sản Phẩm</label>
                <input value={pForm.tenSP} onChange={e=>setPForm(p=>({...p,tenSP:e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-orange-400" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Danh Mục</label>
                  <select value={pForm.maDanhMuc} onChange={e=>setPForm(p=>({...p,maDanhMuc:e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none">
                    <option value="">-- Chọn --</option>{cats.map(c=><option key={c.maDanhMuc} value={c.maDanhMuc}>{c.tenDM}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Thương Hiệu</label>
                  <select value={pForm.maThuongHieu} onChange={e=>setPForm(p=>({...p,maThuongHieu:e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none">
                    <option value="">-- Chọn --</option>{brands.map(b=><option key={b.maThuongHieu} value={b.maThuongHieu}>{b.tenTH}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Giá Bán (₫)</label>
                  <input type="number" value={pForm.gia} onChange={e=>setPForm(p=>({...p,gia:+e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Giá Gốc (₫)</label>
                  <input type="number" value={pForm.giaGoc} onChange={e=>setPForm(p=>({...p,giaGoc:+e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tồn Kho</label>
                  <input type="number" value={pForm.soLuong} onChange={e=>setPForm(p=>({...p,soLuong:+e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">URL Hình Ảnh</label>
                <input value={pForm.hinhAnh} onChange={e=>setPForm(p=>({...p,hinhAnh:e.target.value}))} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none" placeholder="https://..." /></div>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label>
                <textarea value={pForm.moTa} onChange={e=>setPForm(p=>({...p,moTa:e.target.value}))} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none resize-none" /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Hủy</button>
              <button onClick={handleSave} disabled={saving || !pForm.tenSP || !pForm.gia}
                className="flex-1 h-10 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...</> : editProduct ? "Cập Nhật" : "Thêm Mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
