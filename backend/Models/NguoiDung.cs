using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class NguoiDung
{
    [Key]
    [MaxLength(10)]
    public string MaNguoiDung { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string TenND { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string MatKhau { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? SoDienThoai { get; set; }

    [MaxLength(255)]
    public string? DiaChi { get; set; }

    [MaxLength(20)]
    public string VaiTro { get; set; } = "KHACHHANG";

    [MaxLength(20)]
    public string TrangThai { get; set; } = "HOATDONG";

    public DateTime NgayTao { get; set; } = DateTime.UtcNow;
    public DateTime NgayCapNhat { get; set; } = DateTime.UtcNow;
}
