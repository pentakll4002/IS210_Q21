using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class ThanhToan
{
    [Key]
    [MaxLength(10)]
    public string MaThanhToan { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string MaDonHang { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string PhuongThuc { get; set; } = string.Empty;

    public decimal SoTien { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "CHOTHANHTOAN";

    [MaxLength(100)]
    public string? MaGiaoDich { get; set; }

    public DateTime NgayThanhToan { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaDonHang))]
    public DonHang? DonHang { get; set; }
}
