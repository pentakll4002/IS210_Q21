using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Models;

namespace SneakerShop.API.Data;

public class AppDbContext : DbContext
{
    private static int _seqNguoiDung = 1010;
    private static int _seqDanhMuc = 5;
    private static int _seqThuongHieu = 5;
    private static int _seqSanPham = 1020;
    private static int _seqDonHang = 1005;
    private static int _seqChiTiet = 9;
    private static int _seqThanhToan = 5;
    private static int _seqDanhGia = 4;
    private static int _seqGioHang = 100;
    private static int _seqCTGH = 100;
    private static int _seqKhuyenMai = 10;
    private static int _seqSPKM = 10;
    private static int _seqVND = 10;
    private static int _seqTinTuc = 10;
    private static int _seqBLTT = 10;
    private static int _seqLienHe = 10;
    private static int _seqNCC = 10;
    private static int _seqPN = 10;
    private static int _seqCTPN = 10;
    private static int _seqLSTK = 10;
    private static int _seqSPYT = 10;
    private static int _seqTB = 10;
    private static int _seqDCGH = 10;
    private static int _seqKC = 10;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // 25 DbSets
    public DbSet<NguoiDung> NguoiDungs => Set<NguoiDung>();
    public DbSet<DanhMuc> DanhMucs => Set<DanhMuc>();
    public DbSet<ThuongHieu> ThuongHieus => Set<ThuongHieu>();
    public DbSet<SanPham> SanPhams => Set<SanPham>();
    public DbSet<KichCoSanPham> KichCoSanPhams => Set<KichCoSanPham>();
    public DbSet<DonHang> DonHangs => Set<DonHang>();
    public DbSet<ChiTietDonHang> ChiTietDonHangs => Set<ChiTietDonHang>();
    public DbSet<ThanhToan> ThanhToans => Set<ThanhToan>();
    public DbSet<DanhGia> DanhGias => Set<DanhGia>();
    public DbSet<GioHang> GioHangs => Set<GioHang>();
    public DbSet<ChiTietGioHang> ChiTietGioHangs => Set<ChiTietGioHang>();
    public DbSet<KhuyenMai> KhuyenMais => Set<KhuyenMai>();
    public DbSet<SanPhamKhuyenMai> SanPhamKhuyenMais => Set<SanPhamKhuyenMai>();
    public DbSet<Voucher> Vouchers => Set<Voucher>();
    public DbSet<VoucherNguoiDung> VoucherNguoiDungs => Set<VoucherNguoiDung>();
    public DbSet<TinTuc> TinTucs => Set<TinTuc>();
    public DbSet<BinhLuanTinTuc> BinhLuanTinTucs => Set<BinhLuanTinTuc>();
    public DbSet<LienHe> LienHes => Set<LienHe>();
    public DbSet<NhaCungCap> NhaCungCaps => Set<NhaCungCap>();
    public DbSet<PhieuNhap> PhieuNhaps => Set<PhieuNhap>();
    public DbSet<ChiTietPhieuNhap> ChiTietPhieuNhaps => Set<ChiTietPhieuNhap>();
    public DbSet<LichSuTimKiem> LichSuTimKiems => Set<LichSuTimKiem>();
    public DbSet<SanPhamYeuThich> SanPhamYeuThichs => Set<SanPhamYeuThich>();
    public DbSet<ThongBao> ThongBaos => Set<ThongBao>();
    public DbSet<DiaChiGiaoHang> DiaChiGiaoHangs => Set<DiaChiGiaoHang>();

    // ID generators
    public string NextNguoiDungId() => "ND" + Interlocked.Increment(ref _seqNguoiDung);
    public string NextDanhMucId() => "DM" + Interlocked.Increment(ref _seqDanhMuc);
    public string NextThuongHieuId() => "TH" + Interlocked.Increment(ref _seqThuongHieu);
    public string NextSanPhamId() => "SP" + Interlocked.Increment(ref _seqSanPham);
    public string NextDonHangId() => "DH" + Interlocked.Increment(ref _seqDonHang);
    public string NextChiTietId() => "CT" + Interlocked.Increment(ref _seqChiTiet);
    public string NextThanhToanId() => "TT" + Interlocked.Increment(ref _seqThanhToan);
    public string NextDanhGiaId() => "DG" + Interlocked.Increment(ref _seqDanhGia);
    public string NextGioHangId() => "GH" + Interlocked.Increment(ref _seqGioHang);
    public string NextCTGHId() => "CG" + Interlocked.Increment(ref _seqCTGH);
    public string NextKhuyenMaiId() => "KM" + Interlocked.Increment(ref _seqKhuyenMai);
    public string NextSPKMId() => "SK" + Interlocked.Increment(ref _seqSPKM);
    public string NextVNDId() => "VN" + Interlocked.Increment(ref _seqVND);
    public string NextTinTucId() => "TN" + Interlocked.Increment(ref _seqTinTuc);
    public string NextBLTTId() => "BL" + Interlocked.Increment(ref _seqBLTT);
    public string NextLienHeId() => "LH" + Interlocked.Increment(ref _seqLienHe);
    public string NextNCCId() => "NC" + Interlocked.Increment(ref _seqNCC);
    public string NextPNId() => "PN" + Interlocked.Increment(ref _seqPN);
    public string NextCTPNId() => "CP" + Interlocked.Increment(ref _seqCTPN);
    public string NextLSTKId() => "LS" + Interlocked.Increment(ref _seqLSTK);
    public string NextSPYTId() => "YT" + Interlocked.Increment(ref _seqSPYT);
    public string NextTBId() => "TB" + Interlocked.Increment(ref _seqTB);
    public string NextDCGHId() => "DC" + Interlocked.Increment(ref _seqDCGH);
    public string NextKCId() => "KC" + Interlocked.Increment(ref _seqKC);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Table name mappings
        modelBuilder.Entity<KichCoSanPham>().ToTable("KICHCO_SANPHAM");
        modelBuilder.Entity<ChiTietGioHang>().ToTable("CHITIETGIOHANG");
        modelBuilder.Entity<SanPhamKhuyenMai>().ToTable("SANPHAM_KHUYENMAI");
        modelBuilder.Entity<VoucherNguoiDung>().ToTable("VOUCHER_NGUOIDUNG");
        modelBuilder.Entity<BinhLuanTinTuc>().ToTable("BINHLUAN_TINTUC");
        modelBuilder.Entity<ChiTietPhieuNhap>().ToTable("CHITIETPHIEUNHAP");
        modelBuilder.Entity<LichSuTimKiem>().ToTable("LICHSUTIMKIEM");
        modelBuilder.Entity<SanPhamYeuThich>().ToTable("SANPHAM_YEUTHICH");
        modelBuilder.Entity<DiaChiGiaoHang>().ToTable("DIACHI_GIAOHANG");

        // Relationships
        modelBuilder.Entity<ChiTietDonHang>()
            .HasOne(c => c.DonHang).WithMany(d => d.ChiTietDonHangs)
            .HasForeignKey(c => c.MaDonHang).OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ChiTietDonHang>()
            .HasOne(c => c.SanPham).WithMany()
            .HasForeignKey(c => c.MaSanPham).OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ChiTietGioHang>()
            .HasOne(c => c.GioHang).WithMany(g => g.ChiTietGioHangs)
            .HasForeignKey(c => c.MaGioHang).OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ChiTietPhieuNhap>()
            .HasOne(c => c.PhieuNhap).WithMany(p => p.ChiTietPhieuNhaps)
            .HasForeignKey(c => c.MaPN).OnDelete(DeleteBehavior.Cascade);

        // Seed: DanhMuc
        modelBuilder.Entity<DanhMuc>().HasData(
            new DanhMuc { MaDanhMuc = "DM1", TenDM = "Hàng Mới Về", MoTa = "Sản phẩm mới cập nhật" },
            new DanhMuc { MaDanhMuc = "DM2", TenDM = "Bán Chạy Nhất", MoTa = "Sản phẩm bán chạy" },
            new DanhMuc { MaDanhMuc = "DM3", TenDM = "Giày Sneaker", MoTa = "Giày sneaker các loại" },
            new DanhMuc { MaDanhMuc = "DM4", TenDM = "Quần Áo Streetwear", MoTa = "Thời trang đường phố" },
            new DanhMuc { MaDanhMuc = "DM5", TenDM = "Phụ Kiện", MoTa = "Túi, mũ, tất" }
        );

        // Seed: ThuongHieu
        modelBuilder.Entity<ThuongHieu>().HasData(
            new ThuongHieu { MaThuongHieu = "TH1", TenTH = "Nike", QuocGia = "Mỹ", MoTa = "Thương hiệu thể thao hàng đầu" },
            new ThuongHieu { MaThuongHieu = "TH2", TenTH = "Jordan", QuocGia = "Mỹ", MoTa = "Dòng giày huyền thoại" },
            new ThuongHieu { MaThuongHieu = "TH3", TenTH = "adidas", QuocGia = "Đức", MoTa = "Thương hiệu thể thao từ Đức" },
            new ThuongHieu { MaThuongHieu = "TH4", TenTH = "New Balance", QuocGia = "Mỹ", MoTa = "Giày chất lượng cao" },
            new ThuongHieu { MaThuongHieu = "TH5", TenTH = "Converse", QuocGia = "Mỹ", MoTa = "Giày canvas cổ điển" }
        );

        // Seed: NguoiDung
        var pwd = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
        modelBuilder.Entity<NguoiDung>().HasData(
            new NguoiDung { MaNguoiDung = "ND1001", TenND = "Nguyễn Văn An", Email = "an.nguyen@email.com", MatKhau = pwd, SoDienThoai = "0901234567", DiaChi = "123 Nguyễn Huệ, Q1, TP.HCM", VaiTro = "KHACHHANG" },
            new NguoiDung { MaNguoiDung = "ND1002", TenND = "Trần Thị Bích", Email = "bich.tran@email.com", MatKhau = pwd, SoDienThoai = "0902345678", DiaChi = "456 Lê Lợi, Q1, TP.HCM", VaiTro = "KHACHHANG" },
            new NguoiDung { MaNguoiDung = "ND1003", TenND = "Lê Hoàng Cường", Email = "cuong.le@email.com", MatKhau = pwd, SoDienThoai = "0903456789", DiaChi = "789 THĐ, Q5, TP.HCM", VaiTro = "KHACHHANG" },
            new NguoiDung { MaNguoiDung = "ND1004", TenND = "Phạm Minh Đức", Email = "duc.pham@email.com", MatKhau = pwd, SoDienThoai = "0904567890", DiaChi = "321 HBT, Q3, TP.HCM", VaiTro = "KHACHHANG" },
            new NguoiDung { MaNguoiDung = "ND1005", TenND = "Hoàng Thị Lan", Email = "lan.hoang@email.com", MatKhau = pwd, SoDienThoai = "0905678901", DiaChi = "654 CMT8, Q10, TP.HCM", VaiTro = "KHACHHANG" },
            new NguoiDung { MaNguoiDung = "ND1010", TenND = "Admin", Email = "admin@sneakershop.com", MatKhau = pwd, SoDienThoai = "0910000000", DiaChi = "1 ĐCV, HN", VaiTro = "ADMIN" }
        );

        // Seed: SanPham
        modelBuilder.Entity<SanPham>().HasData(
            new SanPham { MaSanPham = "SP1001", TenSP = "Nike Air Jordan 1 Retro High OG Chicago", MaDanhMuc = "DM1", MaThuongHieu = "TH2", Gia = 259, HinhAnh = "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop", SoLuong = 50 },
            new SanPham { MaSanPham = "SP1002", TenSP = "adidas Samba OG White Green", MaDanhMuc = "DM1", MaThuongHieu = "TH3", Gia = 159, GiaGoc = 189, HinhAnh = "https://images.unsplash.com/photo-1608231387042-66d6306a5933?w=600&h=600&fit=crop", SoLuong = 35 },
            new SanPham { MaSanPham = "SP1003", TenSP = "New Balance 550 White Grey", MaDanhMuc = "DM1", MaThuongHieu = "TH4", Gia = 149, HinhAnh = "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop", SoLuong = 40 },
            new SanPham { MaSanPham = "SP1004", TenSP = "Nike Dunk Low Panda", MaDanhMuc = "DM1", MaThuongHieu = "TH1", Gia = 139, HinhAnh = "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop", SoLuong = 60 },
            new SanPham { MaSanPham = "SP1005", TenSP = "Nike Air Max 90 Infrared", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 229, HinhAnh = "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop", SoLuong = 25 },
            new SanPham { MaSanPham = "SP1006", TenSP = "Asics GEL-KAYANO 14", MaDanhMuc = "DM2", MaThuongHieu = "TH3", Gia = 189, HinhAnh = "https://images.unsplash.com/photo-1600185365926-3e5931e4e271?w=600&h=600&fit=crop", SoLuong = 30 },
            new SanPham { MaSanPham = "SP1007", TenSP = "adidas Yeezy Boost 350 V2", MaDanhMuc = "DM2", MaThuongHieu = "TH3", Gia = 299, HinhAnh = "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop", SoLuong = 10 },
            new SanPham { MaSanPham = "SP1008", TenSP = "Nike Air Force 1 Triple White", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 119, HinhAnh = "https://images.unsplash.com/photo-1549298916-b41d502d2e28?w=600&h=600&fit=crop", SoLuong = 80 },
            new SanPham { MaSanPham = "SP1009", TenSP = "Jordan 4 Retro Military Black", MaDanhMuc = "DM3", MaThuongHieu = "TH2", Gia = 249, HinhAnh = "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&h=600&fit=crop", SoLuong = 20 },
            new SanPham { MaSanPham = "SP1010", TenSP = "Salomon XT-6 Black", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 269, HinhAnh = "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop", SoLuong = 15 },
            new SanPham { MaSanPham = "SP1011", TenSP = "ON Cloudtilt Eclipse", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 189, GiaGoc = 229, HinhAnh = "https://images.unsplash.com/photo-1542291026-7eec264fd278?w=600&h=600&fit=crop", SoLuong = 22 },
            new SanPham { MaSanPham = "SP1012", TenSP = "Converse Chuck 70 High", MaDanhMuc = "DM3", MaThuongHieu = "TH5", Gia = 99, HinhAnh = "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=600&fit=crop", SoLuong = 45 },
            new SanPham { MaSanPham = "SP1013", TenSP = "Nike Tech Fleece Joggers", MaDanhMuc = "DM4", MaThuongHieu = "TH1", Gia = 119, HinhAnh = "https://images.unsplash.com/photo-1556906781-9a412961c42c?w=600&h=600&fit=crop", SoLuong = 55 },
            new SanPham { MaSanPham = "SP1014", TenSP = "Stussy Basic Tee Black", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 59, HinhAnh = "https://images.unsplash.com/photo-1521572163474-6864f9cf9ab1?w=600&h=600&fit=crop", SoLuong = 100 },
            new SanPham { MaSanPham = "SP1015", TenSP = "Essentials Hoodie Oatmeal", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 149, HinhAnh = "https://images.unsplash.com/photo-1578768079470-0a4536cc5e21?w=600&h=600&fit=crop", SoLuong = 30 },
            new SanPham { MaSanPham = "SP1016", TenSP = "Carhartt Detroit Jacket", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 199, HinhAnh = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop", SoLuong = 18 },
            new SanPham { MaSanPham = "SP1017", TenSP = "Jordan 4 Thunder", MaDanhMuc = "DM3", MaThuongHieu = "TH2", Gia = 279, HinhAnh = "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop", SoLuong = 12 },
            new SanPham { MaSanPham = "SP1018", TenSP = "adidas Forum Low", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 109, GiaGoc = 129, HinhAnh = "https://images.unsplash.com/photo-1608231387042-66d6306a5933?w=600&h=600&fit=crop", SoLuong = 40 },
            new SanPham { MaSanPham = "SP1019", TenSP = "Nike Blazer Mid 77", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 109, HinhAnh = "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop", SoLuong = 0, TrangThai = "HETHANG" },
            new SanPham { MaSanPham = "SP1020", TenSP = "New Balance 2002R", MaDanhMuc = "DM3", MaThuongHieu = "TH4", Gia = 179, GiaGoc = 199, HinhAnh = "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop", SoLuong = 28 }
        );

        // Seed: DonHang
        modelBuilder.Entity<DonHang>().HasData(
            new DonHang { MaDonHang = "DH1001", MaNguoiDung = "ND1001", TenNguoiNhan = "Nguyễn Văn An", SdtNguoiNhan = "0901234567", DiaChiGiao = "123 Nguyễn Huệ, Q1", ThanhPho = "TP.HCM", TongTien = 259, Thue = 20.72m, TongCong = 279.72m, TrangThai = "DAGIAO" },
            new DonHang { MaDonHang = "DH1002", MaNguoiDung = "ND1002", TenNguoiNhan = "Trần Thị Bích", SdtNguoiNhan = "0902345678", DiaChiGiao = "456 Lê Lợi, Q1", ThanhPho = "TP.HCM", TongTien = 298, Thue = 23.84m, TongCong = 321.84m, TrangThai = "DAGIAO" },
            new DonHang { MaDonHang = "DH1003", MaNguoiDung = "ND1003", TenNguoiNhan = "Lê Hoàng Cường", SdtNguoiNhan = "0903456789", DiaChiGiao = "789 THĐ, Q5", ThanhPho = "TP.HCM", TongTien = 448, Thue = 35.84m, TongCong = 483.84m, TrangThai = "DANGIAO" }
        );

        // Seed: ChiTietDonHang
        modelBuilder.Entity<ChiTietDonHang>().HasData(
            new ChiTietDonHang { MaChiTiet = "CT1", MaDonHang = "DH1001", MaSanPham = "SP1001", Size = "US 9", SoLuong = 1, DonGia = 259, ThanhTien = 259 },
            new ChiTietDonHang { MaChiTiet = "CT2", MaDonHang = "DH1002", MaSanPham = "SP1002", Size = "US 8", SoLuong = 1, DonGia = 159, ThanhTien = 159 },
            new ChiTietDonHang { MaChiTiet = "CT3", MaDonHang = "DH1002", MaSanPham = "SP1004", Size = "US 9.5", SoLuong = 1, DonGia = 139, ThanhTien = 139 },
            new ChiTietDonHang { MaChiTiet = "CT4", MaDonHang = "DH1003", MaSanPham = "SP1009", Size = "US 10", SoLuong = 1, DonGia = 249, ThanhTien = 249 },
            new ChiTietDonHang { MaChiTiet = "CT5", MaDonHang = "DH1003", MaSanPham = "SP1012", Size = "US 8", SoLuong = 2, DonGia = 99, ThanhTien = 198 }
        );

        // Seed: ThanhToan
        modelBuilder.Entity<ThanhToan>().HasData(
            new ThanhToan { MaThanhToan = "TT1", MaDonHang = "DH1001", PhuongThuc = "VNPAY", SoTien = 279.72m, TrangThai = "DATHANHTOAN", MaGiaoDich = "TXN20260401120001" },
            new ThanhToan { MaThanhToan = "TT2", MaDonHang = "DH1002", PhuongThuc = "MOMO", SoTien = 321.84m, TrangThai = "DATHANHTOAN", MaGiaoDich = "TXN20260401130002" },
            new ThanhToan { MaThanhToan = "TT3", MaDonHang = "DH1003", PhuongThuc = "COD", SoTien = 483.84m, TrangThai = "DATHANHTOAN" }
        );

        // Seed: DanhGia
        modelBuilder.Entity<DanhGia>().HasData(
            new DanhGia { MaDanhGia = "DG1", MaSanPham = "SP1001", MaNguoiDung = "ND1001", SoSao = 5, BinhLuan = "Giày rất đẹp!" },
            new DanhGia { MaDanhGia = "DG2", MaSanPham = "SP1002", MaNguoiDung = "ND1002", SoSao = 4, BinhLuan = "Samba OG classic." },
            new DanhGia { MaDanhGia = "DG3", MaSanPham = "SP1005", MaNguoiDung = "ND1004", SoSao = 5, BinhLuan = "Air Max 90 huyền thoại!" }
        );
    }
}
