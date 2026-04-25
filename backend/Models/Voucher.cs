using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SneakerShop.API.Models;

public class Voucher
{
    [Key]
    [MaxLength(20)]
    public string MaVoucher { get; set; } = string.Empty;

    public decimal? PhanTramGiam { get; set; }
    public decimal? SoTienGiam { get; set; }
    public decimal? DonHangToiThieu { get; set; }
    public int SoLuong { get; set; } = 100;
    public DateTime? NgayHetHan { get; set; }
}

public class VoucherNguoiDung
{
    [Key]
    [MaxLength(10)]
    [Column("MAVND")]
    public string MaVND { get; set; } = string.Empty;

    [MaxLength(10)]
    public string? MaNguoiDung { get; set; }

    [MaxLength(20)]
    public string? MaVoucher { get; set; }

    [MaxLength(20)]
    public string TrangThai { get; set; } = "CHUA_SU_DUNG";

    [ForeignKey(nameof(MaNguoiDung))]
    public NguoiDung? NguoiDung { get; set; }

    [ForeignKey(nameof(MaVoucher))]
    public Voucher? VoucherRef { get; set; }
}
