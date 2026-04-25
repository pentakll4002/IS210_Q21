using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class KhuyenMai
{
    [Key]
    [MaxLength(10)]
    public string MaKhuyenMai { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string TenKM { get; set; } = string.Empty;

    public decimal? PhanTramGiam { get; set; }

    public DateTime? NgayBatDau { get; set; }
    public DateTime? NgayKetThuc { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "DANGCHAY";
}

public class SanPhamKhuyenMai
{
    [Key]
    [MaxLength(10)]
    [Column("MASPKM")]
    public string MaSPKM { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaKhuyenMai { get; set; }

    [MaxLength(10)]
    public string? MaSanPham { get; set; }

    [ForeignKey(nameof(MaKhuyenMai))]
    public KhuyenMai? KhuyenMai { get; set; }

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }
}
