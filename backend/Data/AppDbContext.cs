using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Models;
using System.Reflection;
using System.ComponentModel.DataAnnotations.Schema;

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
    private static int _seqEmailCaptcha = 1000;

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
    public DbSet<EmailCaptcha> EmailCaptchas => Set<EmailCaptcha>();

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
    public string NextEmailCaptchaId() => "CP" + Interlocked.Increment(ref _seqEmailCaptcha);

    public static void InitializeSequences(AppDbContext db)
    {
        // 1. Ensure EMAILCAPTCHA table exists in Oracle
        try
        {
            db.Database.ExecuteSqlRaw(@"
                DECLARE
                    cnt NUMBER;
                BEGIN
                    SELECT count(*) INTO cnt FROM user_tables WHERE table_name = 'EMAILCAPTCHA';
                    IF cnt = 0 THEN
                        EXECUTE IMMEDIATE 'CREATE TABLE EMAILCAPTCHA (
                            MACAPTCHA VARCHAR2(10) PRIMARY KEY,
                            EMAIL VARCHAR2(100) NOT NULL,
                            CODE VARCHAR2(10) NOT NULL,
                            EXPIREDAT TIMESTAMP NOT NULL,
                            ISUSED NUMBER(10) NOT NULL
                        )';
                    END IF;
                END;
            ");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Warning: EMAILCAPTCHA table check/creation failed: " + ex.Message);
        }

        // 2. Clear out demo/test users created during registration tests
        try
        {
            var demoUsers = db.NguoiDungs.Where(u => u.Email.EndsWith("@example.com") || u.TenND.Contains("Test") || u.TenND.Contains("test")).ToList();
            if (demoUsers.Any())
            {
                db.NguoiDungs.RemoveRange(demoUsers);
                db.SaveChanges();
                Console.WriteLine($"[AppDbContext] Cleared {demoUsers.Count} demo/test users.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Warning: Failed to delete demo users: " + ex.Message);
        }

        try
        {
            var userIds = db.NguoiDungs.Select(u => u.MaNguoiDung).AsNoTracking().ToList();
            if (userIds.Any())
            {
                var nums = userIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqNguoiDung = Math.Max(_seqNguoiDung, nums.Max());
            }

            var dmIds = db.DanhMucs.Select(d => d.MaDanhMuc).AsNoTracking().ToList();
            if (dmIds.Any())
            {
                var nums = dmIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqDanhMuc = Math.Max(_seqDanhMuc, nums.Max());
            }

            var thIds = db.ThuongHieus.Select(t => t.MaThuongHieu).AsNoTracking().ToList();
            if (thIds.Any())
            {
                var nums = thIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqThuongHieu = Math.Max(_seqThuongHieu, nums.Max());
            }

            var spIds = db.SanPhams.Select(s => s.MaSanPham).AsNoTracking().ToList();
            if (spIds.Any())
            {
                var nums = spIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqSanPham = Math.Max(_seqSanPham, nums.Max());
            }

            var dhIds = db.DonHangs.Select(d => d.MaDonHang).AsNoTracking().ToList();
            if (dhIds.Any())
            {
                var nums = dhIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqDonHang = Math.Max(_seqDonHang, nums.Max());
            }

            var ctIds = db.ChiTietDonHangs.Select(c => c.MaChiTiet).AsNoTracking().ToList();
            if (ctIds.Any())
            {
                var nums = ctIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqChiTiet = Math.Max(_seqChiTiet, nums.Max());
            }

            var ttIds = db.ThanhToans.Select(t => t.MaThanhToan).AsNoTracking().ToList();
            if (ttIds.Any())
            {
                var nums = ttIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqThanhToan = Math.Max(_seqThanhToan, nums.Max());
            }

            var dgIds = db.DanhGias.Select(d => d.MaDanhGia).AsNoTracking().ToList();
            if (dgIds.Any())
            {
                var nums = dgIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqDanhGia = Math.Max(_seqDanhGia, nums.Max());
            }

            var ghIds = db.GioHangs.Select(g => g.MaGioHang).AsNoTracking().ToList();
            if (ghIds.Any())
            {
                var nums = ghIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqGioHang = Math.Max(_seqGioHang, nums.Max());
            }

            var ctghIds = db.ChiTietGioHangs.Select(c => c.MaCTGH).AsNoTracking().ToList();
            if (ctghIds.Any())
            {
                var nums = ctghIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqCTGH = Math.Max(_seqCTGH, nums.Max());
            }

            var kmIds = db.KhuyenMais.Select(k => k.MaKhuyenMai).AsNoTracking().ToList();
            if (kmIds.Any())
            {
                var nums = kmIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqKhuyenMai = Math.Max(_seqKhuyenMai, nums.Max());
            }

            var spkmIds = db.SanPhamKhuyenMais.Select(s => s.MaSPKM).AsNoTracking().ToList();
            if (spkmIds.Any())
            {
                var nums = spkmIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqSPKM = Math.Max(_seqSPKM, nums.Max());
            }

            var vndIds = db.VoucherNguoiDungs.Select(v => v.MaVND).AsNoTracking().ToList();
            if (vndIds.Any())
            {
                var nums = vndIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqVND = Math.Max(_seqVND, nums.Max());
            }

            var tinTucIds = db.TinTucs.Select(t => t.MaTinTuc).AsNoTracking().ToList();
            if (tinTucIds.Any())
            {
                var nums = tinTucIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqTinTuc = Math.Max(_seqTinTuc, nums.Max());
            }

            var blIds = db.BinhLuanTinTucs.Select(b => b.MaBLTT).AsNoTracking().ToList();
            if (blIds.Any())
            {
                var nums = blIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqBLTT = Math.Max(_seqBLTT, nums.Max());
            }

            var lhIds = db.LienHes.Select(l => l.MaLienHe).AsNoTracking().ToList();
            if (lhIds.Any())
            {
                var nums = lhIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqLienHe = Math.Max(_seqLienHe, nums.Max());
            }

            var nccIds = db.NhaCungCaps.Select(n => n.MaNCC).AsNoTracking().ToList();
            if (nccIds.Any())
            {
                var nums = nccIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqNCC = Math.Max(_seqNCC, nums.Max());
            }

            var pnIds = db.PhieuNhaps.Select(p => p.MaPN).AsNoTracking().ToList();
            if (pnIds.Any())
            {
                var nums = pnIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqPN = Math.Max(_seqPN, nums.Max());
            }

            var ctpnIds = db.ChiTietPhieuNhaps.Select(c => c.MaCTPN).AsNoTracking().ToList();
            if (ctpnIds.Any())
            {
                var nums = ctpnIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqCTPN = Math.Max(_seqCTPN, nums.Max());
            }

            var lsIds = db.LichSuTimKiems.Select(l => l.MaLSTK).AsNoTracking().ToList();
            if (lsIds.Any())
            {
                var nums = lsIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqLSTK = Math.Max(_seqLSTK, nums.Max());
            }

            var ytIds = db.SanPhamYeuThichs.Select(s => s.MaSPYT).AsNoTracking().ToList();
            if (ytIds.Any())
            {
                var nums = ytIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqSPYT = Math.Max(_seqSPYT, nums.Max());
            }

            var tbIds = db.ThongBaos.Select(t => t.MaTB).AsNoTracking().ToList();
            if (tbIds.Any())
            {
                var nums = tbIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqTB = Math.Max(_seqTB, nums.Max());
            }

            var dcIds = db.DiaChiGiaoHangs.Select(d => d.MaDCGH).AsNoTracking().ToList();
            if (dcIds.Any())
            {
                var nums = dcIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqDCGH = Math.Max(_seqDCGH, nums.Max());
            }

            var kcIds = db.KichCoSanPhams.Select(k => k.MaKichCo).AsNoTracking().ToList();
            if (kcIds.Any())
            {
                var nums = kcIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                _seqKC = Math.Max(_seqKC, nums.Max());
            }

            try
            {
                var captchaIds = db.EmailCaptchas.Select(c => c.MaCaptcha).AsNoTracking().ToList();
                if (captchaIds.Any())
                {
                    var nums = captchaIds.Select(id => id.Length > 2 && int.TryParse(id.Substring(2), out var v) ? v : 0);
                    _seqEmailCaptcha = Math.Max(_seqEmailCaptcha, nums.Max());
                }
            }
            catch { /* If table just got created or not indexed yet */ }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[AppDbContext] Warning: Could not initialize sequences: {ex.Message}");
        }
    }

    public static void FixCategoryNames(AppDbContext db)
    {
        try
        {
            var dm1 = db.DanhMucs.Find("DM1");
            if (dm1 != null && (dm1.TenDM.Contains("HÃ") || dm1.TenDM.Contains("Mó") || dm1.TenDM.Contains("M\u009d")))
            {
                dm1.TenDM = "Hàng Mới Về";
                dm1.MoTa = "Sản phẩm mới cập nhật";
            }
            var dm2 = db.DanhMucs.Find("DM2");
            if (dm2 != null && (dm2.TenDM.Contains("BÃ") || dm2.TenDM.Contains("Ch\u00e1")))
            {
                dm2.TenDM = "Bán Chạy Nhất";
                dm2.MoTa = "Sản phẩm bán chạy";
            }
            var dm3 = db.DanhMucs.Find("DM3");
            if (dm3 != null && (dm3.TenDM.Contains("GiÃ") || dm3.TenDM.Contains("Sneaker")))
            {
                dm3.TenDM = "Giày Sneaker";
                dm3.MoTa = "Giày sneaker các loại";
            }
            var dm4 = db.DanhMucs.Find("DM4");
            if (dm4 != null && (dm4.TenDM.Contains("Quáº") || dm4.TenDM.Contains("Streetwear")))
            {
                dm4.TenDM = "Quần Áo Streetwear";
                dm4.MoTa = "Thời trang đường phố";
            }
            var dm5 = db.DanhMucs.Find("DM5");
            if (dm5 != null && (dm5.TenDM.Contains("Phá»") || dm5.TenDM.Contains("Ki\u00ea")))
            {
                dm5.TenDM = "Phụ Kiện";
                dm5.MoTa = "Túi, mũ, tất";
            }
            db.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[AppDbContext] Warning: Could not fix category names: {ex.Message}");
        }
    }

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
            new SanPham { MaSanPham = "SP1001", TenSP = "Nike Air Jordan 1 Retro High OG Chicago", MaDanhMuc = "DM1", MaThuongHieu = "TH2", Gia = 259, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4fde2cc9-99ff-469a-81b3-e74ffe5be20f/AIR+JORDAN+4+RETRO.png", SoLuong = 50 },
            new SanPham { MaSanPham = "SP1002", TenSP = "adidas Samba OG White Green", MaDanhMuc = "DM1", MaThuongHieu = "TH3", Gia = 159, GiaGoc = 189, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/94ae4c48-4647-4eae-8301-6bd0b50ba81a/TENNIS+CLASSIC+CS+STYLE.png", SoLuong = 35 },
            new SanPham { MaSanPham = "SP1003", TenSP = "New Balance 550 White Grey", MaDanhMuc = "DM1", MaThuongHieu = "TH4", Gia = 149, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8b837a52-4418-43b1-9ec3-b865042a409b/TENNIS+CLASSIC+CS+PRM+%28TERRY%29.png", SoLuong = 40 },
            new SanPham { MaSanPham = "SP1004", TenSP = "Nike Dunk Low Panda", MaDanhMuc = "DM1", MaThuongHieu = "TH1", Gia = 139, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/29ae8373-4463-48c7-9956-63300e6218c5/NIKE+DUNK+LOW.png", SoLuong = 60 },
            new SanPham { MaSanPham = "SP1005", TenSP = "Nike Air Max 90 Infrared", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 229, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ca9fcdc0-a84e-478e-b370-2d396d50e369/AIR+MAX+95+BIG+BUBBLE.png", SoLuong = 25 },
            new SanPham { MaSanPham = "SP1006", TenSP = "Asics GEL-KAYANO 14", MaDanhMuc = "DM2", MaThuongHieu = "TH3", Gia = 189, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0bf16e28-22e6-4c40-bf76-b38a14b184f9/G.T.+CUT+4+VW.png", SoLuong = 30 },
            new SanPham { MaSanPham = "SP1007", TenSP = "adidas Yeezy Boost 350 V2", MaDanhMuc = "DM2", MaThuongHieu = "TH3", Gia = 299, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/de772a38-6a2d-4a2d-a40f-9446a43a5f83/JA+3+KOOL+AID.png", SoLuong = 10 },
            new SanPham { MaSanPham = "SP1008", TenSP = "Nike Air Force 1 Triple White", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 119, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/857770a5-33de-4f3d-882d-8c2bc8234a79/AIR+FORCE+1+%2707.png", SoLuong = 80 },
            new SanPham { MaSanPham = "SP1009", TenSP = "Jordan 4 Retro Military Black", MaDanhMuc = "DM3", MaThuongHieu = "TH2", Gia = 249, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba9c1273-c857-431c-8ec7-f97aa861ed69/AIR+JORDAN+1+RETRO+LOW+OG.png", SoLuong = 20 },
            new SanPham { MaSanPham = "SP1010", TenSP = "Salomon XT-6 Black", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 269, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d6c5beef-1ed9-4b35-925f-6dc63b6ae69a/NIKE+ACG+ZEGAMA+TRAIL.png", SoLuong = 15 },
            new SanPham { MaSanPham = "SP1011", TenSP = "ON Cloudtilt Eclipse", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 189, GiaGoc = 229, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f9a1f279-7cb2-4934-a325-b62a68269fc4/NIKE+PEGASUS+PREMIUM.png", SoLuong = 22 },
            new SanPham { MaSanPham = "SP1012", TenSP = "Converse Chuck 70 High", MaDanhMuc = "DM3", MaThuongHieu = "TH5", Gia = 99, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d0e0df7b-e2a0-4e04-aaed-59dacae250d4/NIKE+VOMERO+PREMIUM.png", SoLuong = 45 },
            new SanPham { MaSanPham = "SP1013", TenSP = "Nike Tech Fleece Joggers", MaDanhMuc = "DM4", MaThuongHieu = "TH1", Gia = 119, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31313d8b-c313-4270-91d8-f03d8078f960/AIR+JORDAN+3+RETRO+OG.png", SoLuong = 55 },
            new SanPham { MaSanPham = "SP1014", TenSP = "Stussy Basic Tee Black", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 59, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c66c037-f50e-4de0-b7ae-39288003a0e0/NIKE+ACG+PEGASUS+TRAIL.png", SoLuong = 100 },
            new SanPham { MaSanPham = "SP1015", TenSP = "Essentials Hoodie Oatmeal", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 149, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2d8b3ec5-9e42-463f-86c4-f110ee6d7ac8/AIR+MAX+95+BB+TECH.png", SoLuong = 30 },
            new SanPham { MaSanPham = "SP1016", TenSP = "Carhartt Detroit Jacket", MaDanhMuc = "DM4", MaThuongHieu = "TH3", Gia = 199, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/37255fa7-9512-4e59-97fe-631af32c8056/NIKE+SHOX+R4+JEWEL+QS.png", SoLuong = 18 },
            new SanPham { MaSanPham = "SP1017", TenSP = "Jordan 4 Thunder", MaDanhMuc = "DM3", MaThuongHieu = "TH2", Gia = 279, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/70d4e6c1-9d72-453f-9996-4017791e1f88/PHANTOM+6+HIGH+ELITE+FG+LV8.png", SoLuong = 12 },
            new SanPham { MaSanPham = "SP1018", TenSP = "adidas Forum Low", MaDanhMuc = "DM3", MaThuongHieu = "TH3", Gia = 109, GiaGoc = 129, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/93a1bdf0-4400-4218-bc42-3a93389a4684/SABRINA+3++NRG.png", SoLuong = 40 },
            new SanPham { MaSanPham = "SP1019", TenSP = "Nike Blazer Mid 77", MaDanhMuc = "DM2", MaThuongHieu = "TH1", Gia = 109, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c7f7ef9-0f0b-4e1c-96bd-12f0859042e6/LEBRON+XXIII.png", SoLuong = 0, TrangThai = "HETHANG" },
            new SanPham { MaSanPham = "SP1020", TenSP = "New Balance 2002R", MaDanhMuc = "DM3", MaThuongHieu = "TH4", Gia = 179, GiaGoc = 199, HinhAnh = "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b596fa86-9e1f-4629-99a0-0f17b8b963d3/AIR+FORCE+1+%2707.png", SoLuong = 28 }
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

        // Explicit precision mapping for percentage columns
        modelBuilder.Entity<KhuyenMai>()
            .Property(k => k.PhanTramGiam)
            .HasPrecision(5, 2);

        modelBuilder.Entity<Voucher>()
            .Property(v => v.PhanTramGiam)
            .HasPrecision(5, 2);

        // Force singular uppercase table names and uppercase column names to match Oracle DB schema
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            var currentTableName = entity.GetTableName();
            var clrTypeName = entity.ClrType.Name;
            
            string finalTableName;
            if (!string.IsNullOrEmpty(currentTableName) && 
                (currentTableName == clrTypeName + "s" || currentTableName == entity.GetDefaultTableName()))
            {
                finalTableName = clrTypeName.ToUpper();
            }
            else if (!string.IsNullOrEmpty(currentTableName))
            {
                finalTableName = currentTableName.ToUpper();
            }
            else
            {
                finalTableName = clrTypeName.ToUpper();
            }

            entity.SetTableName(finalTableName);

            foreach (var property in entity.GetProperties())
            {
                var columnAttribute = property.PropertyInfo?.GetCustomAttributes(typeof(ColumnAttribute), true)
                    .FirstOrDefault() as ColumnAttribute;

                if (columnAttribute != null && !string.IsNullOrEmpty(columnAttribute.Name))
                {
                    property.SetColumnName(columnAttribute.Name.ToUpper());
                }
                else
                {
                    property.SetColumnName(property.Name.ToUpper());
                }
            }
        }
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // Global decimal configuration mapping to NUMBER(19,4) in Oracle database
        configurationBuilder.Properties<decimal>().HavePrecision(19, 4);
    }
}
