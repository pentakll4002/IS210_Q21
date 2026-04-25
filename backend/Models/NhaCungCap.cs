using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class NhaCungCap
{
    [Key]
    [MaxLength(10)]
    public string MaNCC { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string TenNCC { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? SoDienThoai { get; set; }

    [MaxLength(500)]
    public string? DiaChi { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "HOATDONG";
}

public class PhieuNhap
{
    [Key]
    [MaxLength(10)]
    public string MaPN { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNCC { get; set; }

    public DateTime NgayNhap { get; set; } = DateTime.UtcNow;
    public decimal TongTien { get; set; } = 0;

    [ForeignKey(nameof(MaNCC))]
    public NhaCungCap? NhaCungCap { get; set; }

    public List<ChiTietPhieuNhap> ChiTietPhieuNhaps { get; set; } = new();
}

public class ChiTietPhieuNhap
{
    [Key]
    [MaxLength(10)]
    [Column("MACTPN")]
    public string MaCTPN { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaPN { get; set; }

    [MaxLength(10)]
    public string? MaSanPham { get; set; }

    public int SoLuong { get; set; }
    public decimal DonGiaNhap { get; set; }
    public decimal ThanhTien { get; set; }

    [ForeignKey(nameof(MaPN))]
    public PhieuNhap? PhieuNhap { get; set; }

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }
}
