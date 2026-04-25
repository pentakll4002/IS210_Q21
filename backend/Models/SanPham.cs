using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class SanPham
{
    [Key]
    [MaxLength(10)]
    public string MaSanPham { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string TenSP { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaDanhMuc { get; set; }

    [MaxLength(10)]
    public string? MaThuongHieu { get; set; }

    [Required]
    public decimal Gia { get; set; }

    public decimal? GiaGoc { get; set; }

    [MaxLength(500)]
    public string? HinhAnh { get; set; }

    public int SoLuong { get; set; } = 0;

    [MaxLength(20)]
    public string TrangThai { get; set; } = "CONHANG";

    public string? MoTa { get; set; }

    public DateTime NgayTao { get; set; } = DateTime.UtcNow;
    public DateTime NgayCapNhat { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaDanhMuc))]
    public DanhMuc? DanhMuc { get; set; }

    [ForeignKey(nameof(MaThuongHieu))]
    public ThuongHieu? ThuongHieu { get; set; }
}
