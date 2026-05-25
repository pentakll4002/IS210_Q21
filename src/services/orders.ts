import api from "./api";
import type { SanPham } from "./products";

export interface ChiTietDonHang {
  maChiTiet: string;
  maDonHang: string;
  maSanPham: string;
  size: string;
  soLuong: number;
  donGia: number;
  thanhTien: number;
  sanPham?: SanPham;
}

export interface DonHang {
  maDonHang: string;
  maNguoiDung: string | null;
  tenNguoiNhan: string;
  sdtNguoiNhan: string | null;
  diaChiGiao: string;
  thanhPho: string | null;
  tongTien: number;
  thue: number;
  tongCong: number;
  trangThai: string;
  ngayDat: string;
  chiTietDonHangs?: ChiTietDonHang[];
}

export interface DatHangRequest {
  tenNguoiNhan: string;
  sdtNguoiNhan?: string;
  diaChiGiao: string;
  thanhPho?: string;
  chiTiet: { maSanPham: string; soLuong: number; size?: string }[];
}

export const ordersService = {
  getOrders: async () => {
    const response = await api.get<DonHang[]>("/donhang");
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await api.get<DonHang>(`/donhang/${id}`);
    return response.data;
  },

  datHang: async (data: DatHangRequest) => {
    const response = await api.post("/donhang/dat-hang", data);
    return response.data;
  },

  huyDonHang: async (id: string) => {
    const response = await api.put(`/donhang/${id}/huy`);
    return response.data;
  },

  thanhToan: async (id: string, phuongThuc: string = "COD") => {
    const response = await api.post(`/donhang/${id}/thanh-toan`, {
      phuongThuc,
    });
    return response.data;
  },
};
