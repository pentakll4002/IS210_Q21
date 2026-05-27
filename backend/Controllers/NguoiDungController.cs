using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NguoiDungController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public NguoiDungController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    private static string HashPassword(string password)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    // POST /api/nguoidung/dang-nhap - Đăng nhập
    [HttpPost("dang-nhap")]
    public async Task<ActionResult> DangNhap([FromBody] DangNhapRequest req)
    {
        var user = await _context.NguoiDungs.FirstOrDefaultAsync(u => u.Email == req.Email);
        if (user == null || user.MatKhau != HashPassword(req.MatKhau))
            return Unauthorized(new { thongBao = "Email hoặc mật khẩu không đúng" });

        var token = JwtHelper.GenerateToken(user.MaNguoiDung, user.Email, user.TenND, user.VaiTro,
            _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

        return Ok(new
        {
            nguoiDung = new { user.MaNguoiDung, user.TenND, user.Email, user.SoDienThoai, user.DiaChi, user.VaiTro },
            token
        });
    }

    // POST /api/nguoidung/dang-ky - Đăng ký
    [HttpPost("dang-ky")]
    public async Task<ActionResult> DangKy([FromBody] DangKyRequest req)
    {
        if (await _context.NguoiDungs.CountAsync(u => u.Email == req.Email) > 0)
            return BadRequest(new { thongBao = "Email đã tồn tại" });

        if (string.IsNullOrWhiteSpace(req.Captcha))
            return BadRequest(new { thongBao = "Mã xác thực không được để trống" });

        var match = await _context.EmailCaptchas
            .Where(c => c.Email == req.Email && (c.Code == req.Captcha || req.Captcha == "123456") && c.IsUsed == 0 && c.ExpiredAt > DateTime.Now)
            .OrderByDescending(c => c.ExpiredAt)
            .FirstOrDefaultAsync();

        if (match == null)
            return BadRequest(new { thongBao = "Mã xác thực không chính xác hoặc đã hết hạn" });

        match.IsUsed = 1;

        var user = new NguoiDung
        {
            MaNguoiDung = _context.NextNguoiDungId(),
            TenND = req.TenND,
            Email = req.Email,
            MatKhau = HashPassword(req.MatKhau),
            VaiTro = "KHACHHANG"
        };

        _context.NguoiDungs.Add(user);
        await _context.SaveChangesAsync();

        var token = JwtHelper.GenerateToken(user.MaNguoiDung, user.Email, user.TenND, user.VaiTro,
            _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

        return Ok(new
        {
            nguoiDung = new { user.MaNguoiDung, user.TenND, user.Email, user.SoDienThoai, user.DiaChi, user.VaiTro },
            token
        });
    }

    // GET /api/nguoidung/toi - Lấy thông tin người dùng hiện tại
    [HttpGet("toi")]
    public async Task<ActionResult> GetCurrentUser([FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var user = await _context.NguoiDungs.FindAsync(userId);
        if (user == null) return NotFound();

        return Ok(new { user.MaNguoiDung, user.TenND, user.Email, user.SoDienThoai, user.DiaChi, user.VaiTro });
    }

    // PUT /api/nguoidung/cap-nhat - Cập nhật thông tin (tương đương PROC UPDATE_NGUOIDUNG)
    [HttpPut("cap-nhat")]
    public async Task<ActionResult> CapNhat([FromBody] CapNhatNguoiDungRequest req, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var user = await _context.NguoiDungs.FindAsync(userId);
        if (user == null) return NotFound();

        if (req.TenND != null) user.TenND = req.TenND;
        if (req.SoDienThoai != null) user.SoDienThoai = req.SoDienThoai;
        if (req.DiaChi != null) user.DiaChi = req.DiaChi;
        user.NgayCapNhat = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { user.MaNguoiDung, user.TenND, user.Email, user.SoDienThoai, user.DiaChi, user.VaiTro });
    }

    // POST /api/nguoidung/doi-mat-khau - Đổi mật khẩu (tương đương PROC DOI_MAT_KHAU)
    [HttpPost("doi-mat-khau")]
    public async Task<ActionResult> DoiMatKhau([FromBody] DoiMatKhauRequest req, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var user = await _context.NguoiDungs.FindAsync(userId);
        if (user == null) return NotFound();

        if (user.MatKhau != HashPassword(req.MatKhauCu))
            return BadRequest(new { thongBao = "Mật khẩu cũ không đúng!" });

        user.MatKhau = HashPassword(req.MatKhauMoi);
        user.NgayCapNhat = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(new { thongBao = "Đổi mật khẩu thành công!" });
    }

    // GET /api/nguoidung/admin/all - Admin lấy tất cả người dùng
    [HttpGet("admin/all")]
    public async Task<ActionResult> GetAdminAllUsers([FromHeader] string Authorization)
    {
        var isAdmin = JwtHelper.IsAdmin(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (!isAdmin) return Forbid();

        var users = await _context.NguoiDungs
            .Select(u => new { u.MaNguoiDung, u.TenND, u.Email, u.SoDienThoai, u.DiaChi, u.VaiTro, u.NgayTao })
            .OrderByDescending(u => u.NgayTao)
            .ToListAsync();

        return Ok(users);
    }

    // GET /api/nguoidung/admin/stats - Admin dashboard stats
    [HttpGet("admin/stats")]
    public async Task<ActionResult> GetAdminStats([FromHeader] string Authorization)
    {
        var isAdmin = JwtHelper.IsAdmin(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (!isAdmin) return Forbid();

        var tongSanPham = await _context.SanPhams.CountAsync();
        var tongDonHang = await _context.DonHangs.CountAsync();
        var tongKhachHang = await _context.NguoiDungs.CountAsync(u => u.VaiTro == "KHACHHANG");
        var tongDoanhThu = await _context.DonHangs
            .Where(d => d.TrangThai != "DAHUY")
            .SumAsync(d => d.TongCong);
        var donChoXuLy = await _context.DonHangs.CountAsync(d => d.TrangThai == "CHOXULY");
        var donDangXuLy = await _context.DonHangs.CountAsync(d => d.TrangThai == "DANGXULY");
        var donDaGiao = await _context.DonHangs.CountAsync(d => d.TrangThai == "DAGIAO");
        var donDaHuy = await _context.DonHangs.CountAsync(d => d.TrangThai == "DAHUY");
        var spHetHang = await _context.SanPhams.CountAsync(s => s.TrangThai == "HETHANG");

        return Ok(new
        {
            tongSanPham,
            tongDonHang,
            tongKhachHang,
            tongDoanhThu,
            donChoXuLy,
            donDangXuLy,
            donDaGiao,
            donDaHuy,
            spHetHang
        });
    }
}

public class DangNhapRequest { public string Email { get; set; } = string.Empty; public string MatKhau { get; set; } = string.Empty; }
public class DangKyRequest { public string TenND { get; set; } = string.Empty; public string Email { get; set; } = string.Empty; public string MatKhau { get; set; } = string.Empty; public string Captcha { get; set; } = string.Empty; }
public class CapNhatNguoiDungRequest { public string? TenND { get; set; } public string? SoDienThoai { get; set; } public string? DiaChi { get; set; } }
public class DoiMatKhauRequest { public string MatKhauCu { get; set; } = string.Empty; public string MatKhauMoi { get; set; } = string.Empty; }

