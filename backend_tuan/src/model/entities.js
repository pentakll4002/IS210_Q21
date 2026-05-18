/* eslint-disable prettier/prettier */
const { EntitySchema } = require("typeorm");

const NguoiDung = new EntitySchema({
  name: "NGUOIDUNG",
  tableName: "NGUOIDUNG",
  columns: {
    Manguoidung: { type: "varchar", length: 10, primary: true },
    TenND: { type: "varchar", length: 100, nullable: false },
    Email: { type: "varchar", length: 100, nullable: false, unique: true },
    MatKhau: { type: "varchar", length: 255, nullable: false },
    SoDienThoai: { type: "varchar", length: 20, nullable: true },
    DiaChi: { type: "varchar", length: 255, nullable: true },
    VaiTro: { type: "varchar", length: 20, default: "KHACHHANG" },
    TrangThai: { type: "varchar", length: 20, default: "HOATDONG" },
    NgayTao: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    NgayCapNhat: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    gioHang: {
      type: "one-to-one",
      target: "GIOHANG",
      inverseSide: "nguoiDung",
      joinColumn: { name: "Manguoidung", referencedColumnName: "MaNguoiDung" },
      nullable: true,
    },
    donHang: {
      type: "one-to-many",
      target: "DONHANG",
      inverseSide: "nguoiDung",
    },
    danhGia: {
      type: "one-to-many",
      target: "DANHGIA",
      inverseSide: "nguoiDung",
    },
    voucherNguoiDung: {
      type: "one-to-many",
      target: "VOUCHER_NGUOIDUNG",
      inverseSide: "nguoiDung",
    },
    binhLuanTinTuc: {
      type: "one-to-many",
      target: "BINHLUAN_TINTUC",
      inverseSide: "nguoiDung",
    },
    lichSuTimKiem: {
      type: "one-to-many",
      target: "LICHSUTIMKIEM",
      inverseSide: "nguoiDung",
    },
    sanPhamYeuThich: {
      type: "one-to-many",
      target: "SANPHAM_YEUTHICH",
      inverseSide: "nguoiDung",
    },
    thongBao: {
      type: "one-to-many",
      target: "THONGBAO",
      inverseSide: "nguoiDung",
    },
    diaChiGiaoHang: {
      type: "one-to-many",
      target: "DIACHI_GIAOHANG",
      inverseSide: "nguoiDung",
    },
  },
});

const DanhMuc = new EntitySchema({
  name: "DANHMUC",
  tableName: "DANHMUC",
  columns: {
    Madanhmuc: { type: "varchar", length: 10, primary: true },
    TenDM: { type: "varchar", length: 100, nullable: false },
    MoTa: { type: "varchar", length: 500, nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "HOATDONG" },
  },
  relations: {
    sanPham: {
      type: "one-to-many",
      target: "SANPHAM",
      inverseSide: "danhmuc",
    },
  },
});

const ThuongHieu = new EntitySchema({
  name: "THUONGHIEU",
  tableName: "THUONGHIEU",
  columns: {
    Mathuonghieu: { type: "varchar", length: 10, primary: true },
    TenTH: { type: "varchar", length: 100, nullable: false },
    LogoUrl: { type: "varchar", length: 500, nullable: true },
    QuocGia: { type: "varchar", length: 50, nullable: true },
    MoTa: { type: "clob", nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "HOATDONG" },
  },
  relations: {
    sanPham: {
      type: "one-to-many",
      target: "SANPHAM",
      inverseSide: "thuonghieu",
    },
  },
});

const SanPham = new EntitySchema({
  name: "SANPHAM",
  tableName: "SANPHAM",
  columns: {
    Masanpham: { type: "varchar", length: 10, primary: true },
    TenSP: { type: "varchar", length: 200, nullable: false },
    Madanhmuc: { type: "varchar", length: 10, nullable: true },
    Mathuonghieu: { type: "varchar", length: 10, nullable: true },
    Gia: { type: "number", precision: 19, scale: 4, nullable: false },
    GiaGoc: { type: "number", precision: 19, scale: 4, nullable: true },
    HinhAnh: { type: "varchar", length: 500, nullable: true },
    SoLuong: { type: "number", default: 0 },
    TrangThai: { type: "varchar", length: 20, default: "CONHANG" },
    MoTa: { type: "clob", nullable: true },
    NgayTao: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    NgayCapNhat: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    danhmuc: {
      type: "many-to-one",
      target: "DANHMUC",
      joinColumn: { name: "Madanhmuc" },
      nullable: true,
    },
    thuonghieu: {
      type: "many-to-one",
      target: "THUONGHIEU",
      joinColumn: { name: "Mathuonghieu" },
      nullable: true,
    },
    kichCoSanPham: {
      type: "one-to-many",
      target: "KICHCO_SANPHAM",
      inverseSide: "sanpham",
    },
    chiTietDonHang: {
      type: "one-to-many",
      target: "CHITIETDONHANG",
      inverseSide: "sanpham",
    },
    danhGia: {
      type: "one-to-many",
      target: "DANHGIA",
      inverseSide: "sanpham",
    },
    chiTietGioHang: {
      type: "one-to-many",
      target: "CHITIETGIOHANG",
      inverseSide: "sanpham",
    },
    sanPhamKhuyenMai: {
      type: "one-to-many",
      target: "SANPHAM_KHUYENMAI",
      inverseSide: "sanpham",
    },
    sanPhamYeuThich: {
      type: "one-to-many",
      target: "SANPHAM_YEUTHICH",
      inverseSide: "sanpham",
    },
    chiTietPhieuNhap: {
      type: "one-to-many",
      target: "CHITIETPHIEUNHAP",
      inverseSide: "sanpham",
    },
  },
});

const KichcoSanPham = new EntitySchema({
  name: "KICHCO_SANPHAM",
  tableName: "KICHCO_SANPHAM",
  columns: {
    MaKichCo: { type: "varchar", length: 10, primary: true },
    Masanpham: { type: "varchar", length: 10, nullable: true },
    TenKichCo: { type: "varchar", length: 20, nullable: false },
    SoLuong: { type: "number", default: 0 },
  },
  relations: {
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "Masanpham" },
      nullable: true,
    },
  },
});

const DonHang = new EntitySchema({
  name: "DONHANG",
  tableName: "DONHANG",
  columns: {
    Madonhang: { type: "varchar", length: 10, primary: true },
    Manguoidung: { type: "varchar", length: 10, nullable: true },
    TenNguoiNhan: { type: "varchar", length: 100, nullable: false },
    SdtNguoiNhan: { type: "varchar", length: 20, nullable: true },
    DiaChiGiao: { type: "varchar", length: 255, nullable: false },
    ThanhPho: { type: "varchar", length: 100, nullable: true },
    TongTien: { type: "number", precision: 19, scale: 4, default: 0 },
    PhiShip: { type: "number", precision: 19, scale: 4, default: 0 },
    Thue: { type: "number", precision: 19, scale: 4, default: 0 },
    TongCong: { type: "number", precision: 19, scale: 4, default: 0 },
    TrangThai: { type: "varchar", length: 20, default: "CHOXULY" },
    NgayDat: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    NgayCapNhat: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "Manguoidung" },
      nullable: true,
    },
    chiTietDonHang: {
      type: "one-to-many",
      target: "CHITIETDONHANG",
      inverseSide: "donHang",
    },
    thanhToan: {
      type: "one-to-one",
      target: "THANHTOAN",
      inverseSide: "donHang",
    },
  },
});

const ChiTietDonHang = new EntitySchema({
  name: "CHITIETDONHANG",
  tableName: "CHITIETDONHANG",
  columns: {
    Machitiet: { type: "varchar", length: 10, primary: true },
    Madonhang: { type: "varchar", length: 10, nullable: true },
    Masanpham: { type: "varchar", length: 10, nullable: true },
    KichCo: { type: "varchar", length: 10, default: "US 9" },
    SoLuong: { type: "number", nullable: false },
    DonGia: { type: "number", precision: 19, scale: 4, nullable: false },
    ThanhTien: { type: "number", precision: 19, scale: 4, nullable: true },
  },
  relations: {
    donHang: {
      type: "many-to-one",
      target: "DONHANG",
      joinColumn: { name: "Madonhang" },
      nullable: true,
    },
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "Masanpham" },
      nullable: true,
    },
  },
});

const ThanhToan = new EntitySchema({
  name: "THANHTOAN",
  tableName: "THANHTOAN",
  columns: {
    Mathanhtoan: { type: "varchar", length: 10, primary: true },
    Madonhang: { type: "varchar", length: 10, nullable: true },
    PhuongThuc: { type: "varchar", length: 50, nullable: false },
    SoTien: { type: "number", precision: 19, scale: 4, nullable: false },
    TrangThai: { type: "varchar", length: 20, default: "CHOTHANHTOAN" },
    MaGiaoDich: { type: "varchar", length: 100, nullable: true },
    NgayThanhToan: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    donHang: {
      type: "many-to-one",
      target: "DONHANG",
      joinColumn: { name: "Madonhang" },
      nullable: true,
    },
  },
});

const DanhGia = new EntitySchema({
  name: "DANHGIA",
  tableName: "DANHGIA",
  columns: {
    Madanhgia: { type: "varchar", length: 10, primary: true },
    Masanpham: { type: "varchar", length: 10, nullable: true },
    Manguoidung: { type: "varchar", length: 10, nullable: true },
    SoSao: { type: "number", precision: 1, scale: 0, nullable: true },
    BinhLuan: { type: "clob", nullable: true },
    NgayDanhGia: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "Masanpham" },
      nullable: true,
    },
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "Manguoidung" },
      nullable: true,
    },
  },
});

const GioHang = new EntitySchema({
  name: "GIOHANG",
  tableName: "GIOHANG",
  columns: {
    MaGioHang: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true, unique: true },
    NgayTao: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
    chiTietGioHang: {
      type: "one-to-many",
      target: "CHITIETGIOHANG",
      inverseSide: "gioHang",
    },
  },
});

const ChiTietGioHang = new EntitySchema({
  name: "CHITIETGIOHANG",
  tableName: "CHITIETGIOHANG",
  columns: {
    MaCTGH: { type: "varchar", length: 10, primary: true },
    MaGioHang: { type: "varchar", length: 10, nullable: true },
    MaSanPham: { type: "varchar", length: 10, nullable: true },
    KichCo: { type: "varchar", length: 10, nullable: true },
    SoLuong: { type: "number", default: 1 },
  },
  relations: {
    gioHang: {
      type: "many-to-one",
      target: "GIOHANG",
      joinColumn: { name: "MaGioHang" },
      nullable: true,
    },
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "MaSanPham" },
      nullable: true,
    },
  },
});

const KhuyenMai = new EntitySchema({
  name: "KHUYENMAI",
  tableName: "KHUYENMAI",
  columns: {
    MaKhuyenMai: { type: "varchar", length: 10, primary: true },
    TenKM: { type: "varchar", length: 200, nullable: false },
    PhanTramGiam: { type: "number", precision: 5, scale: 2, nullable: true },
    NgayBatDau: { type: "timestamp", nullable: true },
    NgayKetThuc: { type: "timestamp", nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "DANGCHAY" },
  },
  relations: {
    sanPhamKhuyenMai: {
      type: "one-to-many",
      target: "SANPHAM_KHUYENMAI",
      inverseSide: "khuyenMai",
    },
  },
});

const SanPhamKhuyenMai = new EntitySchema({
  name: "SANPHAM_KHUYENMAI",
  tableName: "SANPHAM_KHUYENMAI",
  columns: {
    MaSPKM: { type: "varchar", length: 10, primary: true },
    MaKhuyenMai: { type: "varchar", length: 10, nullable: true },
    MaSanPham: { type: "varchar", length: 10, nullable: true },
  },
  relations: {
    khuyenMai: {
      type: "many-to-one",
      target: "KHUYENMAI",
      joinColumn: { name: "MaKhuyenMai" },
      nullable: true,
    },
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "MaSanPham" },
      nullable: true,
    },
  },
});

const Voucher = new EntitySchema({
  name: "VOUCHER",
  tableName: "VOUCHER",
  columns: {
    MaVoucher: { type: "varchar", length: 20, primary: true },
    PhanTramGiam: { type: "number", precision: 5, scale: 2, nullable: true },
    SoTienGiam: { type: "number", precision: 19, scale: 4, nullable: true },
    DonHangToiThieu: {
      type: "number",
      precision: 19,
      scale: 4,
      nullable: true,
    },
    SoLuong: { type: "number", default: 100 },
    NgayHetHan: { type: "timestamp", nullable: true },
  },
  relations: {
    voucherNguoiDung: {
      type: "one-to-many",
      target: "VOUCHER_NGUOIDUNG",
      inverseSide: "voucher",
    },
  },
});

const VoucherNguoiDung = new EntitySchema({
  name: "VOUCHER_NGUOIDUNG",
  tableName: "VOUCHER_NGUOIDUNG",
  columns: {
    MaVND: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    MaVoucher: { type: "varchar", length: 20, nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "CHUA_SU_DUNG" },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
    voucher: {
      type: "many-to-one",
      target: "VOUCHER",
      joinColumn: { name: "MaVoucher" },
      nullable: true,
    },
  },
});

const TinTuc = new EntitySchema({
  name: "TINTUC",
  tableName: "TINTUC",
  columns: {
    MaTinTuc: { type: "varchar", length: 10, primary: true },
    TieuDe: { type: "varchar", length: 500, nullable: false },
    NoiDung: { type: "clob", nullable: false },
    HinhAnh: { type: "varchar", length: 500, nullable: true },
    NgayDang: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    binhLuanTinTuc: {
      type: "one-to-many",
      target: "BINHLUAN_TINTUC",
      inverseSide: "tinTuc",
    },
  },
});

const BinhLuanTinTuc = new EntitySchema({
  name: "BINHLUAN_TINTUC",
  tableName: "BINHLUAN_TINTUC",
  columns: {
    MaBLTT: { type: "varchar", length: 10, primary: true },
    MaTinTuc: { type: "varchar", length: 10, nullable: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    BinhLuan: { type: "clob", nullable: false },
    NgayBL: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    tinTuc: {
      type: "many-to-one",
      target: "TINTUC",
      joinColumn: { name: "MaTinTuc" },
      nullable: true,
    },
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
  },
});

const LienHe = new EntitySchema({
  name: "LIENHE",
  tableName: "LIENHE",
  columns: {
    MaLienHe: { type: "varchar", length: 10, primary: true },
    TenNguoiLienHe: { type: "varchar", length: 100, nullable: true },
    Email: { type: "varchar", length: 100, nullable: true },
    TieuDe: { type: "varchar", length: 200, nullable: true },
    NoiDung: { type: "clob", nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "CHUA_XU_LY" },
  },
});

const NhaCungCap = new EntitySchema({
  name: "NHACUNGCAP",
  tableName: "NHACUNGCAP",
  columns: {
    MaNCC: { type: "varchar", length: 10, primary: true },
    TenNCC: { type: "varchar", length: 200, nullable: false },
    SoDienThoai: { type: "varchar", length: 20, nullable: true },
    DiaChi: { type: "varchar", length: 500, nullable: true },
    TrangThai: { type: "varchar", length: 20, default: "HOATDONG" },
  },
  relations: {
    phieuNhap: {
      type: "one-to-many",
      target: "PHIEUNHAP",
      inverseSide: "nhaCungCap",
    },
  },
});

const PhieuNhap = new EntitySchema({
  name: "PHIEUNHAP",
  tableName: "PHIEUNHAP",
  columns: {
    MaPN: { type: "varchar", length: 10, primary: true },
    MaNCC: { type: "varchar", length: 10, nullable: true },
    NgayNhap: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    TongTien: { type: "number", precision: 19, scale: 4, default: 0 },
  },
  relations: {
    nhaCungCap: {
      type: "many-to-one",
      target: "NHACUNGCAP",
      joinColumn: { name: "MaNCC" },
      nullable: true,
    },
    chiTietPhieuNhap: {
      type: "one-to-many",
      target: "CHITIETPHIEUNHAP",
      inverseSide: "phieuNhap",
    },
  },
});

const ChiTietPhieuNhap = new EntitySchema({
  name: "CHITIETPHIEUNHAP",
  tableName: "CHITIETPHIEUNHAP",
  columns: {
    MaCTPN: { type: "varchar", length: 10, primary: true },
    MaPN: { type: "varchar", length: 10, nullable: true },
    MaSanPham: { type: "varchar", length: 10, nullable: true },
    SoLuong: { type: "number", nullable: false },
    DonGiaNhap: { type: "number", precision: 19, scale: 4, nullable: false },
    ThanhTien: { type: "number", precision: 19, scale: 4, nullable: true },
  },
  relations: {
    phieuNhap: {
      type: "many-to-one",
      target: "PHIEUNHAP",
      joinColumn: { name: "MaPN" },
      nullable: true,
    },
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "MaSanPham" },
      nullable: true,
    },
  },
});

const LichSuTimKiem = new EntitySchema({
  name: "LICHSUTIMKIEM",
  tableName: "LICHSUTIMKIEM",
  columns: {
    MaLSTK: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    TuKhoa: { type: "varchar", length: 200, nullable: true },
    NgayTimKiem: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
  },
});

const SanPhamYeuThich = new EntitySchema({
  name: "SANPHAM_YEUTHICH",
  tableName: "SANPHAM_YEUTHICH",
  columns: {
    MaSPYT: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    MaSanPham: { type: "varchar", length: 10, nullable: true },
    NgayThem: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
    sanpham: {
      type: "many-to-one",
      target: "SANPHAM",
      joinColumn: { name: "MaSanPham" },
      nullable: true,
    },
  },
});

const ThongBao = new EntitySchema({
  name: "THONGBAO",
  tableName: "THONGBAO",
  columns: {
    MaTB: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    TieuDe: { type: "varchar", length: 200, nullable: true },
    NoiDung: { type: "clob", nullable: true },
    DaDoc: { type: "number", precision: 1, scale: 0, default: 0 },
    NgayTB: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
  },
});

const DiaChiGiaoHang = new EntitySchema({
  name: "DIACHI_GIAOHANG",
  tableName: "DIACHI_GIAOHANG",
  columns: {
    MaDCGH: { type: "varchar", length: 10, primary: true },
    MaNguoiDung: { type: "varchar", length: 10, nullable: true },
    TenNguoiNhan: { type: "varchar", length: 100, nullable: true },
    SdtNguoiNhan: { type: "varchar", length: 20, nullable: true },
    DiaChiChiTiet: { type: "varchar", length: 500, nullable: true },
    MacDinh: { type: "number", precision: 1, scale: 0, default: 0 },
  },
  relations: {
    nguoiDung: {
      type: "many-to-one",
      target: "NGUOIDUNG",
      joinColumn: { name: "MaNguoiDung" },
      nullable: true,
    },
  },
});

module.exports = {
  NguoiDung,
  DanhMuc,
  ThuongHieu,
  SanPham,
  KichcoSanPham,
  DonHang,
  ChiTietDonHang,
  ThanhToan,
  DanhGia,
  GioHang,
  ChiTietGioHang,
  KhuyenMai,
  SanPhamKhuyenMai,
  Voucher,
  VoucherNguoiDung,
  TinTuc,
  BinhLuanTinTuc,
  LienHe,
  NhaCungCap,
  PhieuNhap,
  ChiTietPhieuNhap,
  LichSuTimKiem,
  SanPhamYeuThich,
  ThongBao,
  DiaChiGiaoHang,
};
