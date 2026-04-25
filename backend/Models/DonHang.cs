using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class DonHang
{
    [Key]
    [MaxLength(10)]
    public string MaDonHang { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [Required]
    [MaxLength(100)]
    public string TenNguoiNhan { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? SdtNguoiNhan { get; set; }

    [Required]
    [MaxLength(255)]
    public string DiaChiGiao { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? ThanhPho { get; set; }

    public decimal TongTien { get; set; } = 0;
    public decimal PhiShip { get; set; } = 0;
    public decimal Thue { get; set; } = 0;
    public decimal TongCong { get; set; } = 0;

    [MaxLength(20)]
    public string TrangThai { get; set; } = "CHOXULY";

    public DateTime NgayDat { get; set; } = DateTime.UtcNow;
    public DateTime NgayCapNhat { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }

    public List<ChiTietDonHang> ChiTietDonHangs { get; set; } = new();
}
