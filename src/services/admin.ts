import api from "./api";
import type { SanPham } from "./products";
import type { DonHang } from "./orders";

export interface AdminStats {
  tongSanPham: number;
  tongDonHang: number;
  tongKhachHang: number;
  tongDoanhThu: number;
  donChoXuLy: number;
  donDangXuLy: number;
  donDaGiao: number;
  donDaHuy: number;
  spHetHang: number;
}

export interface AdminUser {
  maNguoiDung: string;
  tenND: string;
  email: string;
  soDienThoai: string | null;
  diaChi: string | null;
  vaiTro: string;
  ngayTao: string;
}

export const adminService = {
  getStats: async () => {
    const res = await api.get<AdminStats>("/nguoidung/admin/stats");
    return res.data;
  },

  getAllUsers: async () => {
    const res = await api.get<AdminUser[]>("/nguoidung/admin/all");
    return res.data;
  },

  getAllOrders: async () => {
    const res = await api.get<DonHang[]>("/donhang/admin/all");
    return res.data;
  },

  updateOrderStatus: async (id: string, trangThai: string) => {
    const res = await api.put(`/donhang/admin/${id}/status`, { trangThai });
    return res.data;
  },

  getAllProducts: async () => {
    const res = await api.get<{ danhSach: SanPham[]; tongSo: number }>("/sanpham", {
      params: { soLuong: 1000 },
    });
    return res.data.danhSach;
  },

  createProduct: async (data: {
    tenSP: string;
    maDanhMuc?: string;
    maThuongHieu?: string;
    gia: number;
    giaGoc?: number;
    hinhAnh?: string;
    soLuong: number;
    moTa?: string;
  }) => {
    const res = await api.post<SanPham>("/sanpham", data);
    return res.data;
  },

  updateProduct: async (
    id: string,
    data: { tenSP?: string; gia?: number; giaGoc?: number; hinhAnh?: string; soLuong?: number },
  ) => {
    const res = await api.put<SanPham>(`/sanpham/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id: string) => {
    await api.delete(`/sanpham/${id}`);
  },

  getCategories: async () => {
    const res = await api.get<{ maDanhMuc: string; tenDM: string }[]>("/danhmuc");
    return res.data;
  },

  getBrands: async () => {
    const res = await api.get<{ maThuongHieu: string; tenTH: string }[]>("/thuonghieu");
    return res.data;
  },
};
