using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

// B5. KICHCO_SANPHAM
public class KichCoSanPham
{
    [Key]
    [MaxLength(10)]
    public string MaKichCo { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? Masanpham { get; set; }

    [Required]
    [MaxLength(20)]
    public string TenKichCo { get; set; } = string.Empty;

    public int SoLuong { get; set; } = 0;

    [ForeignKey(nameof(Masanpham))]
    public SanPham? SanPham { get; set; }
}

// B18. LIENHE
public class LienHe
{
    [Key]
    [MaxLength(10)]
    public string MaLienHe { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? TenNguoiLienHe { get; set; }

    [MaxLength(100)]
    public string? Email { get; set; }

    [MaxLength(200)]
    public string? TieuDe { get; set; }

    public string? NoiDung { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "CHUA_XU_LY";
}

// B22. LICHSUTIMKIEM
public class LichSuTimKiem
{
    [Key]
    [MaxLength(10)]
    [Column("MALSTK")]
    public string MaLSTK { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [MaxLength(200)]
    public string? TuKhoa { get; set; }

    public DateTime NgayTimKiem { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }
}

// B23. SANPHAM_YEUTHICH
public class SanPhamYeuThich
{
    [Key]
    [MaxLength(10)]
    [Column("MASPYT")]
    public string MaSPYT { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [MaxLength(10)]
    public string? MaSanPham { get; set; }

    public DateTime NgayThem { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }
}

// B24. THONGBAO
public class ThongBao
{
    [Key]
    [MaxLength(10)]
    public string MaTB { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [MaxLength(200)]
    public string? TieuDe { get; set; }

    public string? NoiDung { get; set; }

    public int DaDoc { get; set; } = 0;

    public DateTime NgayTB { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }
}

// B25. DIACHI_GIAOHANG
public class DiaChiGiaoHang
{
    [Key]
    [MaxLength(10)]
    [Column("MADCGH")]
    public string MaDCGH { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [MaxLength(100)]
    public string? TenNguoiNhan { get; set; }

    [MaxLength(20)]
    public string? SdtNguoiNhan { get; set; }

    [MaxLength(500)]
    public string? DiaChiChiTiet { get; set; }

    public int MacDinh { get; set; } = 0;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }
}
