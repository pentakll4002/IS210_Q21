using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanhGiaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public DanhGiaController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    // GET /api/danhgia?maSanPham=SP1001 - Lấy đánh giá theo sản phẩm
    [HttpGet]
    public async Task<ActionResult> GetBySanPham([FromQuery] string maSanPham)
    {
        var danhGias = await _context.DanhGias
            .Include(dg => dg.NguoiDung)
            .Where(dg => dg.MaSanPham == maSanPham)
            .OrderByDescending(dg => dg.NgayDanhGia)
            .ToListAsync();

        return Ok(new
        {
            danhGias = danhGias.Select(dg => new
            {
                dg.MaDanhGia,
                dg.MaSanPham,
                dg.MaNguoiDung,
                TenND = dg.NguoiDung?.TenND,
                dg.SoSao,
                dg.BinhLuan,
                dg.NgayDanhGia
            }),
            soLuong = danhGias.Count,
            diemTrungBinh = danhGias.Count > 0 ? danhGias.Average(dg => dg.SoSao) : 0
        });
    }

    // POST /api/danhgia - Thêm đánh giá (tương đương PROC THEM_DANHGIA)
    [HttpPost]
    public async Task<ActionResult> ThemDanhGia([FromBody] ThemDanhGiaRequest req, [FromHeader] string Authorization)
    {
        var userId = JwtHelper.GetUserIdFromToken(Authorization, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");
        if (userId == null) return Unauthorized();

        var dg = new DanhGia
        {
            MaDanhGia = _context.NextDanhGiaId(),
            MaSanPham = req.MaSanPham,
            MaNguoiDung = userId,
            SoSao = req.SoSao,
            BinhLuan = req.BinhLuan
        };

        _context.DanhGias.Add(dg);
        await _context.SaveChangesAsync();

        return Ok(new { dg.MaDanhGia, thongBao = "Đã thêm đánh giá thành công" });
    }
}

public class ThemDanhGiaRequest
{
    public string MaSanPham { get; set; } = string.Empty;
    public int SoSao { get; set; }
    public string? BinhLuan { get; set; }
}
