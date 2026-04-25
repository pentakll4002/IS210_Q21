using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class ThuongHieu
{
    [Key]
    [MaxLength(10)]
    public string MaThuongHieu { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string TenTH { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? LogoUrl { get; set; }

    [MaxLength(50)]
    public string? QuocGia { get; set; }

    public string? MoTa { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "HOATDONG";
}
