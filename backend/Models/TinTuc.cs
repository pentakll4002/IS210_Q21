using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class TinTuc
{
    [Key]
    [MaxLength(10)]
    public string MaTinTuc { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string TieuDe { get; set; } = string.Empty;

    [Required]
    public string NoiDung { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? HinhAnh { get; set; }

    public DateTime NgayDang { get; set; } = DateTime.UtcNow;
}

public class BinhLuanTinTuc
{
    [Key]
    [MaxLength(10)]
    [Column("MABLTT")]
    public string MaBLTT { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaTinTuc { get; set; }

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [Required]
    public string BinhLuan { get; set; } = string.Empty;

    public DateTime NgayBL { get; set; } = DateTime.UtcNow;

    [ForeignKey(nameof(MaTinTuc))]
    public TinTuc? TinTucRef { get; set; }

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }
}
