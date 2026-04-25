using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class ChiTietDonHang
{
    [Key]
    [MaxLength(10)]
    public string MaChiTiet { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string MaDonHang { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string MaSanPham { get; set; } = string.Empty;

    [Column("KICHCO")]
    [MaxLength(10)]
    public string Size { get; set; } = "US 9";

    public int SoLuong { get; set; }

    public decimal DonGia { get; set; }
    public decimal ThanhTien { get; set; }

    [ForeignKey(nameof(MaDonHang))]
    public DonHang? DonHang { get; set; }

    [ForeignKey(nameof(MaSanPham))]
    public SanPham? SanPham { get; set; }
}
