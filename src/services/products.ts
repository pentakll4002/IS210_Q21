import api from './api';

export interface SanPham {
  maSanPham: string;
  tenSP: string;
  maDanhMuc: string | null;
  maThuongHieu: string | null;
  gia: number;
  giaGoc: number | null;
  hinhAnh: string | null;
  soLuong: number;
  trangThai: string;
  moTa: string | null;
  ngayTao: string;
  ngayCapNhat: string;
  danhMuc?: { maDanhMuc: string; tenDM: string };
  thuongHieu?: { maThuongHieu: string; tenTH: string };
}

export interface SanPhamDetailResponse {
  sanPham: SanPham;
  soDanhGia: number;
  diemTrungBinh: number;
}

export interface SanPhamListResponse {
  danhSach: SanPham[];
  tongSo: number;
  trang: number;
  soLuong: number;
}

export const productsService = {
  getAll: async (params?: { maDanhMuc?: string; maThuongHieu?: string; timKiem?: string; sapXep?: string; trang?: number; soLuong?: number }) => {
    const response = await api.get<SanPhamListResponse>('/sanpham', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<SanPhamDetailResponse>(`/sanpham/${id}`);
    return response.data;
  },

  create: async (data: { tenSP: string; maDanhMuc?: string; maThuongHieu?: string; gia: number; giaGoc?: number; hinhAnh?: string; soLuong: number; moTa?: string }) => {
    const response = await api.post<SanPham>('/sanpham', data);
    return response.data;
  },

  update: async (id: string, data: { tenSP?: string; gia?: number; giaGoc?: number; hinhAnh?: string; soLuong?: number }) => {
    const response = await api.put<SanPham>(`/sanpham/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/sanpham/${id}`);
  },
};
