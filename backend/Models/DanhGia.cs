using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class DanhGia
{
    [Key]
    [MaxLength(10)]
    public string MaDanhGia { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string MaSanPham { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string MaNguoiDung { get; set; } = string.Empty;

    public int SoSao { get; set; }

    public string? BinhLuan { get; set; }

    public DateTime NgayDanhGia { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }
}
