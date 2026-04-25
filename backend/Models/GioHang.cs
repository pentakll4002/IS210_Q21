using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class GioHang
{
    [Key]
    [MaxLength(10)]
    public string MaGioHang { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    public DateTime NgayTao { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }

    public List<ChiTietGioHang> ChiTietGioHangs { get; set; } = new();
}

public class ChiTietGioHang
{
    [Key]
    [MaxLength(10)]
    [Column("MACTGH")]
    public string MaCTGH { get; set; } = string.Empty;

    [MaxLength(10)]
    public string MaGioHang { get; set; } = string.Empty;

    [MaxLength(10)]
    public string MaSanPham { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? KichCo { get; set; }

    public int SoLuong { get; set; } = 1;

    [ForeignKey(nameof(MaGioHang))]
    public GioHang? GioHang { get; set; }

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }
}
