using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonHangController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public DonHangController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    // GET /api/donhang - Lấy danh sách đơn hàng của người dùng
    [HttpGet]
    public async Task<ActionResult> GetAll([FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var donHangs = await _context.DonHangs
            .Include(dh => dh.ChiTietDonHangs)
                .ThenInclude(ct => ct.SanPham)
            .Where(dh => dh.MaNguoiDung == userId)
            .OrderByDescending(dh => dh.NgayDat)
            .ToListAsync();

        return Ok(donHangs);
    }

    // GET /api/donhang/{id} - Lấy chi tiết đơn hàng
    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(string id, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var donHang = await _context.DonHangs
            .Include(dh => dh.ChiTietDonHangs)
                .ThenInclude(ct => ct.SanPham)
            .FirstOrDefaultAsync(dh => dh.MaDonHang == id && dh.MaNguoiDung == userId);

        if (donHang == null) return NotFound();
        return Ok(donHang);
    }

    // POST /api/donhang/dat-hang - Đặt hàng (tương đương PROC DAT_HANG)
    [HttpPost("dat-hang")]
    public async Task<ActionResult> DatHang([FromBody] DatHangRequest req, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        // Kiểm tra tồn kho cho tất cả sản phẩm
        foreach (var item in req.ChiTiet)
        {
            var sp = await _context.SanPhams.FindAsync(item.MaSanPham);
            if (sp == null) return BadRequest(new { thongBao = $"Sản phẩm {item.MaSanPham} không tồn tại" });
            if (sp.TrangThai == "HETHANG" || sp.SoLuong < item.SoLuong)
                return BadRequest(new { thongBao = $"Sản phẩm '{sp.TenSP}' không đủ số lượng! Tồn kho: {sp.SoLuong}" });
        }

        // Tạo đơn hàng
        var donHang = new DonHang
        {
            MaDonHang = _context.NextDonHangId(),
            MaNguoiDung = userId,
            TenNguoiNhan = req.TenNguoiNhan,
            SdtNguoiNhan = req.SdtNguoiNhan,
            DiaChiGiao = req.DiaChiGiao,
            ThanhPho = req.ThanhPho,
            TrangThai = "CHOXULY"
        };

        _context.DonHangs.Add(donHang);

        // Tạo chi tiết đơn hàng + trigger logic (trừ tồn kho, tính thành tiền)
        decimal tongTien = 0;
        foreach (var item in req.ChiTiet)
        {
            var sp = await _context.SanPhams.FindAsync(item.MaSanPham);
            var thanhTien = item.SoLuong * sp!.Gia;

            var chiTiet = new ChiTietDonHang
            {
                MaChiTiet = _context.NextChiTietId(),
                MaDonHang = donHang.MaDonHang,
                MaSanPham = item.MaSanPham,
                Size = item.Size ?? "US 9",
                SoLuong = item.SoLuong,
                DonGia = sp.Gia,
                ThanhTien = thanhTien
            };

            // Trigger: TRG_TRU_TONKHO - Trừ tồn kho
            sp.SoLuong -= item.SoLuong;
            // Trigger: TRG_CAPNHAT_TRANGTHAI_SP - Cập nhật trạng thái
            sp.TrangThai = sp.SoLuong <= 0 ? "HETHANG" : "CONHANG";
            sp.NgayCapNhat = DateTime.UtcNow;

            tongTien += thanhTien;
            _context.ChiTietDonHangs.Add(chiTiet);
        }

        // Trigger: TRG_CAPNHAT_TONGTIEN_DH - Tính tổng tiền
        donHang.TongTien = tongTien;
        donHang.Thue = tongTien * 0.08m;
        donHang.TongCong = donHang.TongTien + donHang.Thue;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            donHang.MaDonHang,
            donHang.TongTien,
            donHang.Thue,
            donHang.TongCong,
            donHang.TrangThai,
            thongBao = "Đặt hàng thành công!"
        });
    }

    // PUT /api/donhang/{id}/huy - Hủy đơn hàng (tương đương PROC HUY_DONHANG)
    [HttpPut("{id}/huy")]
    public async Task<ActionResult> HuyDonHang(string id, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var donHang = await _context.DonHangs
            .Include(dh => dh.ChiTietDonHangs)
            .FirstOrDefaultAsync(dh => dh.MaDonHang == id && dh.MaNguoiDung == userId);

        if (donHang == null) return NotFound();
        if (donHang.TrangThai == "DAGIAO" || donHang.TrangThai == "DAHUY")
            return BadRequest(new { thongBao = "Không thể hủy đơn hàng này" });

        // Trigger: TRG_CONG_LAI_TONKHO - Cộng lại tồn kho
        foreach (var ct in donHang.ChiTietDonHangs)
        {
            var sp = await _context.SanPhams.FindAsync(ct.MaSanPham);
            if (sp != null)
            {
                sp.SoLuong += ct.SoLuong;
                sp.TrangThai = "CONHANG";
                sp.NgayCapNhat = DateTime.UtcNow;
            }
        }

        donHang.TrangThai = "DAHUY";
        donHang.NgayCapNhat = DateTime.UtcNow;

        // Xóa thanh toán liên quan
        var thanhToans = await _context.ThanhToans.Where(tt => tt.MaDonHang == id).ToListAsync();
        _context.ThanhToans.RemoveRange(thanhToans);

        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã hủy đơn hàng thành công" });
    }

    // POST /api/donhang/{id}/thanh-toan - Thanh toán (tương đương PROC THANH_TOAN_DONHANG)
    [HttpPost("{id}/thanh-toan")]
    public async Task<ActionResult> ThanhToan(string id, [FromBody] ThanhToanRequest req, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var donHang = await _context.DonHangs.FirstOrDefaultAsync(dh => dh.MaDonHang == id && dh.MaNguoiDung == userId);
        if (donHang == null) return NotFound();

        var thanhToan = new ThanhToan
        {
            MaThanhToan = _context.NextThanhToanId(),
            MaDonHang = id,
            PhuongThuc = req.PhuongThuc,
            SoTien = donHang.TongCong,
            TrangThai = "DATHANHTOAN",
            MaGiaoDich = "TXN" + DateTime.UtcNow.ToString("yyyyMMddHHmmss")
        };

        donHang.TrangThai = "DANGXULY";
        donHang.NgayCapNhat = DateTime.UtcNow;

        _context.ThanhToans.Add(thanhToan);
        await _context.SaveChangesAsync();

        return Ok(new { thanhToan.MaThanhToan, thanhToan.PhuongThuc, thanhToan.SoTien, thanhToan.TrangThai, thongBao = "Thanh toán thành công!" });
    }

    // GET /api/donhang/admin/all - Admin lấy tất cả đơn hàng hệ thống
    [HttpGet("admin/all")]
    public async Task<ActionResult> GetAdminAll([FromHeader] string Authorization)
    {
        var is_admin = JwtHelper.IsAdmin(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (!is_admin) return Forbid();

        var donHangs = await _context.DonHangs
            .Include(dh => dh.ChiTietDonHangs)
                .ThenInclude(ct => ct.SanPham)
            .OrderByDescending(dh => dh.NgayDat)
            .ToListAsync();

        return Ok(donHangs);
    }

    // PUT /api/donhang/admin/{id}/status - Admin cập nhật trạng thái đơn hàng bất kỳ
    [HttpPut("admin/{id}/status")]
    public async Task<ActionResult> UpdateOrderStatus(string id, [FromBody] UpdateOrderStatusRequest req, [FromHeader] string Authorization)
    {
        var is_admin = JwtHelper.IsAdmin(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (!is_admin) return Forbid();

        var donHang = await _context.DonHangs.FindAsync(id);
        if (donHang == null) return NotFound();

        donHang.TrangThai = req.TrangThai;
        donHang.NgayCapNhat = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Cập nhật trạng thái đơn hàng thành công", donHang });
    }
}

public class UpdateOrderStatusRequest
{
    public string TrangThai { get; set; } = "DANGXULY";
}

public class DatHangRequest
{
    public string TenNguoiNhan { get; set; } = string.Empty;
    public string? SdtNguoiNhan { get; set; }
    public string DiaChiGiao { get; set; } = string.Empty;
    public string? ThanhPho { get; set; }
    public List<DatHangChiTiet> ChiTiet { get; set; } = new();
}

public class DatHangChiTiet
{
    public string MaSanPham { get; set; } = string.Empty;
    public int SoLuong { get; set; }
    public string? Size { get; set; }
}

public class ThanhToanRequest
{
    public string PhuongThuc { get; set; } = "COD";
}
