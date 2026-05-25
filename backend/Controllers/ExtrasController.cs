using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class YeuThichController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public YeuThichController(AppDbContext context, IConfiguration config) { _context = context; _config = config; }

    private string? GetUserId(string auth) =>
        JwtHelper.GetUserIdFromToken(auth, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

    [HttpGet]
    public async Task<ActionResult> GetAll([FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        var list = await _context.SanPhamYeuThichs.Include(s => s.SanPham).Where(s => s.MaNguoiDung == userId).ToListAsync();
        return Ok(list.Select(s => new { s.MaSPYT, s.MaSanPham, s.NgayThem, sanPham = s.SanPham == null ? null : new { s.SanPham.MaSanPham, s.SanPham.TenSP, s.SanPham.Gia, s.SanPham.GiaGoc, s.SanPham.HinhAnh } }));
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddYeuThichReq req, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        if (await _context.SanPhamYeuThichs.CountAsync(s => s.MaNguoiDung == userId && s.MaSanPham == req.MaSanPham) > 0)
            return BadRequest(new { thongBao = "Đã có trong danh sách yêu thích" });
        _context.SanPhamYeuThichs.Add(new SanPhamYeuThich { MaSPYT = _context.NextSPYTId(), MaNguoiDung = userId, MaSanPham = req.MaSanPham });
        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã thêm vào yêu thích" });
    }

    [HttpDelete("{maSanPham}")]
    public async Task<ActionResult> Remove(string maSanPham, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        var item = await _context.SanPhamYeuThichs.FirstOrDefaultAsync(s => s.MaNguoiDung == userId && s.MaSanPham == maSanPham);
        if (item == null) return NotFound();
        _context.SanPhamYeuThichs.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã xóa khỏi yêu thích" });
    }
}

public class AddYeuThichReq { public string MaSanPham { get; set; } = string.Empty; }

// ===== THONGBAO CONTROLLER =====
[ApiController]
[Route("api/[controller]")]
public class ThongBaoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public ThongBaoController(AppDbContext context, IConfiguration config) { _context = context; _config = config; }

    private string? GetUserId(string auth) =>
        JwtHelper.GetUserIdFromToken(auth, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

    [HttpGet]
    public async Task<ActionResult> GetAll([FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        var list = await _context.ThongBaos.Where(t => t.MaNguoiDung == userId).OrderByDescending(t => t.NgayTB).ToListAsync();
        return Ok(list);
    }

    [HttpPut("{id}/doc")]
    public async Task<ActionResult> MarkRead(string id, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        var tb = await _context.ThongBaos.FirstOrDefaultAsync(t => t.MaTB == id && t.MaNguoiDung == userId);
        if (tb == null) return NotFound();
        tb.DaDoc = 1;
        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã đánh dấu đọc" });
    }
}

// ===== DIACHI CONTROLLER =====
[ApiController]
[Route("api/[controller]")]
public class DiaChiController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public DiaChiController(AppDbContext context, IConfiguration config) { _context = context; _config = config; }

    private string? GetUserId(string auth) =>
        JwtHelper.GetUserIdFromToken(auth, _config["Jwt:Key"] ?? "SneakerShopSecretKey2024MinLength32Chars!");

    [HttpGet]
    public async Task<ActionResult> GetAll([FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        return Ok(await _context.DiaChiGiaoHangs.Where(d => d.MaNguoiDung == userId).ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] DiaChiGiaoHang req, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        req.MaDCGH = _context.NextDCGHId();
        req.MaNguoiDung = userId;
        _context.DiaChiGiaoHangs.Add(req);
        await _context.SaveChangesAsync();
        return Ok(req);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id, [FromHeader] string Authorization)
    {
        var userId = GetUserId(Authorization);
        if (userId == null) return Unauthorized();
        var dc = await _context.DiaChiGiaoHangs.FirstOrDefaultAsync(d => d.MaDCGH == id && d.MaNguoiDung == userId);
        if (dc == null) return NotFound();
        _context.DiaChiGiaoHangs.Remove(dc);
        await _context.SaveChangesAsync();
        return Ok(new { thongBao = "Đã xóa" });
    }
}

// ===== KHUYENMAI CONTROLLER =====
[ApiController]
[Route("api/[controller]")]
public class KhuyenMaiController : ControllerBase
{
    private readonly AppDbContext _context;
    public KhuyenMaiController(AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var list = await _context.KhuyenMais.Where(k => k.TrangThai == "DANGCHAY").ToListAsync();
        return Ok(list);
    }
}

// ===== VOUCHER CONTROLLER =====
[ApiController]
[Route("api/[controller]")]
public class VoucherController : ControllerBase
{
    private readonly AppDbContext _context;
    public VoucherController(AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<ActionResult> GetAll() => Ok(await _context.Vouchers.ToListAsync());

    [HttpGet("check/{maVoucher}")]
    public async Task<ActionResult> Check(string maVoucher)
    {
        var v = await _context.Vouchers.FindAsync(maVoucher);
        if (v == null) return NotFound(new { thongBao = "Voucher không tồn tại" });
        if (v.NgayHetHan < DateTime.UtcNow) return BadRequest(new { thongBao = "Voucher đã hết hạn" });
        if (v.SoLuong <= 0) return BadRequest(new { thongBao = "Voucher đã hết" });
        return Ok(v);
    }
}
