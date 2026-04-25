using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GioHangController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public GioHangController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    private string? GetUserId(string auth) =>
        JwtHelper.GetUserIdFromToken(auth, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

    // GET /api/giohang
    [HttpGet]
    public async Task<ActionResult> GetCart([FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();

        var gh = await _context.GioHangs
            .Include(g => g.ChiTietGioHangs).ThenInclude(ct => ct.SanPham)
            .FirstOrDefaultAsync(g => g.MaNguoiDung == userId);

        if (gh == null) return Ok(new { items = Array.Empty<object>() });

        return Ok(new
        {
            maGioHang = gh.MaGioHang,
            items = gh.ChiTietGioHangs.Select(ct => new
            {
                ct.MaCTGH, ct.MaSanPham, ct.KichCo, ct.SoLuong,
                sanPham = ct.SanPham == null ? null : new { ct.SanPham.MaSanPham, ct.SanPham.TenSP, ct.SanPham.Gia, ct.SanPham.GiaGoc, ct.SanPham.HinhAnh, ct.SanPham.SoLuong }
            })
        });
    }

    // POST /api/giohang/them
    [HttpPost("them")]
    public async Task<ActionResult> AddToCart([FromBody] ThemGioHangRequest req, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();

        var gh = await _context.GioHangs.Include(g => g.ChiTietGioHangs)
            .FirstOrDefaultAsync(g => g.MaNguoiDung == userId);

        if (gh == null)
        {
            gh = new GioHang { MaGioHang = _context.NextGioHangId(), MaNguoiDung = userId };
            _context.GioHangs.Add(gh);
        }

        var existing = gh.ChiTietGioHangs.FirstOrDefault(ct => ct.MaSanPham == req.MaSanPham && ct.KichCo == req.KichCo);
        if (existing != null)
        {
            existing.SoLuong += req.SoLuong;
        }
        else
        {
            gh.ChiTietGioHangs.Add(new ChiTietGioHang
            {
                MaCTGH = _context.NextCTGHId(),
                MaGioHang = gh.MaGioHang,
                MaSanPham = req.MaSanPham,
                KichCo = req.KichCo ?? "US 9",
                SoLuong = req.SoLuong
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã thêm vào giỏ hàng" });
    }

    // PUT /api/giohang/{maCTGH}
    [HttpPut("{maCTGH}")]
    public async Task<ActionResult> UpdateItem(string maCTGH, [FromBody] UpdateGHRequest req, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();

        var ct = await _context.ChiTietGioHangs
            .Include(c => c.GioHang)
            .FirstOrDefaultAsync(c => c.MaCTGH == maCTGH && c.GioHang!.MaNguoiDung == userId);

        if (ct == null) return NotFound();

        if (req.SoLuong <= 0)
        {
            _context.ChiTietGioHangs.Remove(ct);
        }
        else
        {
            ct.SoLuong = req.SoLuong;
        }

        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã cập nhật" });
    }

    // DELETE /api/giohang/{maCTGH}
    [HttpDelete("{maCTGH}")]
    public async Task<ActionResult> RemoveItem(string maCTGH, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();

        var ct = await _context.ChiTietGioHangs
            .Include(c => c.GioHang)
            .FirstOrDefaultAsync(c => c.MaCTGH == maCTGH && c.GioHang!.MaNguoiDung == userId);

        if (ct == null) return NotFound();

        _context.ChiTietGioHangs.Remove(ct);
        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã xóa khỏi giỏ" });
    }

    // DELETE /api/giohang
    [HttpDelete]
    public async Task<ActionResult> ClearCart([FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();

        var gh = await _context.GioHangs.Include(g => g.ChiTietGioHangs)
            .FirstOrDefaultAsync(g => g.MaNguoiDung == userId);

        if (gh != null)
        {
            _context.ChiTietGioHangs.RemoveRange(gh.ChiTietGioHangs);
            await _context.SaveChangesAsync();
        }

        return Ok(new { thongBao = "Đã xóa giỏ hàng" });
    }
}

public class ThemGioHangRequest
{
    public string MaSanPham { get; set; } = string.Empty;
    public string? KichCo { get; set; }
    public int SoLuong { get; set; } = 1;
}

public class UpdateGHRequest
{
    public int SoLuong { get; set; }
}
