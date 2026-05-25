import api from "./api";
import type { SanPham } from "./products";

// ===== GIỎ HÀNG (Server-side) =====
export interface CartItemServer {
  maCTGH: string;
  maSanPham: string;
  kichCo: string;
  soLuong: number;
  sanPham?: {
    maSanPham: string;
    tenSP: string;
    gia: number;
    giaGoc: number | null;
    hinhAnh: string | null;
    soLuong: number;
  };
}

export const gioHangService = {
  getCart: async () => {
    const res = await api.get<{ maGioHang?: string; items: CartItemServer[] }>(
      "/giohang",
    );
    return res.data;
  },
  addToCart: async (
    maSanPham: string,
    kichCo: string = "US 9",
    soLuong: number = 1,
  ) => {
    const res = await api.post("/giohang/them", { maSanPham, kichCo, soLuong });
    return res.data;
  },
  updateItem: async (maCTGH: string, soLuong: number) => {
    const res = await api.put(`/giohang/${maCTGH}`, { soLuong });
    return res.data;
  },
  removeItem: async (maCTGH: string) => {
    const res = await api.delete(`/giohang/${maCTGH}`);
    return res.data;
  },
  clearCart: async () => {
    const res = await api.delete("/giohang");
    return res.data;
  },
};

// ===== DANH MỤC =====
export interface DanhMuc {
  maDanhMuc: string;
  tenDM: string;
  moTa: string | null;
  trangThai: string;
}

export const danhMucService = {
  getAll: async () => {
    const res = await api.get<DanhMuc[]>("/danhmuc");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<DanhMuc>(`/danhmuc/${id}`);
    return res.data;
  },
};

// ===== THƯƠNG HIỆU =====
export interface ThuongHieu {
  maThuongHieu: string;
  tenTH: string;
  logoUrl: string | null;
  quocGia: string | null;
  moTa: string | null;
  trangThai: string;
}

export const thuongHieuService = {
  getAll: async () => {
    const res = await api.get<ThuongHieu[]>("/thuonghieu");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await api.get<ThuongHieu>(`/thuonghieu/${id}`);
    return res.data;
  },
};

// ===== ĐÁNH GIÁ =====
export interface DanhGia {
  maDanhGia: string;
  maSanPham: string;
  maNguoiDung: string;
  soSao: number;
  binhLuan: string | null;
  ngayDanhGia: string;
  tenND?: string;
}

export const danhGiaService = {
  getBySanPham: async (maSanPham: string) => {
    const res = await api.get("/danhgia", { params: { maSanPham } });
    return res.data;
  },
  themDanhGia: async (data: {
    maSanPham: string;
    soSao: number;
    binhLuan?: string;
  }) => {
    const res = await api.post("/danhgia", data);
    return res.data;
  },
};

// ===== YÊU THÍCH (Wishlist) =====
export interface SanPhamYeuThich {
  maSPYT: string;
  maSanPham: string;
  ngayThem: string;
  sanPham?: {
    maSanPham: string;
    tenSP: string;
    gia: number;
    giaGoc: number | null;
    hinhAnh: string | null;
  };
}

export const yeuThichService = {
  getAll: async () => {
    const res = await api.get<SanPhamYeuThich[]>("/yeuthich");
    return res.data;
  },
  add: async (maSanPham: string) => {
    const res = await api.post("/yeuthich", { maSanPham });
    return res.data;
  },
  remove: async (maSanPham: string) => {
    const res = await api.delete(`/yeuthich/${maSanPham}`);
    return res.data;
  },
};

// ===== THÔNG BÁO =====
export interface ThongBao {
  maTB: string;
  tieuDe: string;
  noiDung: string;
  daDoc: number;
  ngayTB: string;
}

export const thongBaoService = {
  getAll: async () => {
    const res = await api.get<ThongBao[]>("/thongbao");
    return res.data;
  },
  markRead: async (id: string) => {
    const res = await api.put(`/thongbao/${id}/doc`);
    return res.data;
  },
};

// ===== ĐỊA CHỈ GIAO HÀNG =====
export interface DiaChiGiaoHang {
  maDCGH: string;
  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  diaChiChiTiet: string;
  macDinh: number;
}

export const diaChiService = {
  getAll: async () => {
    const res = await api.get<DiaChiGiaoHang[]>("/diachi");
    return res.data;
  },
  add: async (data: Omit<DiaChiGiaoHang, "maDCGH">) => {
    const res = await api.post("/diachi", data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await api.delete(`/diachi/${id}`);
    return res.data;
  },
};

// ===== KHUYẾN MÃI =====
export interface KhuyenMai {
  maKhuyenMai: string;
  tenKM: string;
  phanTramGiam: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  trangThai: string;
}

export const khuyenMaiService = {
  getAll: async () => {
    const res = await api.get<KhuyenMai[]>("/khuyenmai");
    return res.data;
  },
};

// ===== VOUCHER =====
export interface VoucherInfo {
  maVoucher: string;
  phanTramGiam: number | null;
  soTienGiam: number | null;
  donHangToiThieu: number | null;
  soLuong: number;
  ngayHetHan: string;
}

export const voucherService = {
  getAll: async () => {
    const res = await api.get<VoucherInfo[]>("/voucher");
    return res.data;
  },
  check: async (maVoucher: string) => {
    const res = await api.get<VoucherInfo>(`/voucher/check/${maVoucher}`);
    return res.data;
  },
};
