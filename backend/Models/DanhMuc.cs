using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class DanhMuc
{
    [Key]
    [MaxLength(10)]
    public string MaDanhMuc { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string TenDM { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? MoTa { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "HOATDONG";
}
