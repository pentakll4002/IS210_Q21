using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SanPhamController : ControllerBase
{
    private readonly AppDbContext _context;

    public SanPhamController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/sanpham - Lấy danh sách sản phẩm (có lọc, tìm kiếm, phân trang)
    [HttpGet]
    public async Task<ActionResult> GetAll(
        [FromQuery] string? maDanhMuc,
        [FromQuery] string? maThuongHieu,
        [FromQuery] string? timKiem,
        [FromQuery] string? sapXep,
        [FromQuery] int trang = 1,
        [FromQuery] int soLuong = 20)
    {
        var query = _context.SanPhams
            .Include(sp => sp.DanhMuc)
            .Include(sp => sp.ThuongHieu)
            .AsQueryable();

        if (!string.IsNullOrEmpty(maDanhMuc))
            query = query.Where(sp => sp.MaDanhMuc == maDanhMuc);

        if (!string.IsNullOrEmpty(maThuongHieu))
            query = query.Where(sp => sp.MaThuongHieu == maThuongHieu);

        if (!string.IsNullOrEmpty(timKiem))
            query = query.Where(sp =>
                sp.TenSP.ToLower().Contains(timKiem.ToLower()) ||
                (sp.ThuongHieu != null && sp.ThuongHieu.TenTH.ToLower().Contains(timKiem.ToLower())));

        query = sapXep switch
        {
            "gia-asc" => query.OrderBy(sp => sp.Gia),
            "gia-desc" => query.OrderByDescending(sp => sp.Gia),
            "ten" => query.OrderBy(sp => sp.TenSP),
            _ => query.OrderBy(sp => sp.MaSanPham)
        };

        var tongSo = await query.CountAsync();
        var danhSach = await query
            .Skip((trang - 1) * soLuong)
            .Take(soLuong)
            .ToListAsync();

        return Ok(new { danhSach, tongSo, trang, soLuong });
    }

    // GET /api/sanpham/{id} - Lấy chi tiết sản phẩm
    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(string id)
    {
        var sp = await _context.SanPhams
            .Include(s => s.DanhMuc)
            .Include(s => s.ThuongHieu)
            .FirstOrDefaultAsync(s => s.MaSanPham == id);

        if (sp == null) return NotFound(new { thongBao = "Không tìm thấy sản phẩm" });

        var danhGias = await _context.DanhGias
            .Where(dg => dg.MaSanPham == id)
            .ToListAsync();

        return Ok(new { sanPham = sp, soDanhGia = danhGias.Count, diemTrungBinh = danhGias.Count > 0 ? danhGias.Average(dg => dg.SoSao) : 0 });
    }

    // POST /api/sanpham - Thêm sản phẩm (tương đương PROC INSERT_SANPHAM)
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateSanPhamRequest req)
    {
        var sp = new SanPham
        {
            MaSanPham = _context.NextSanPhamId(),
            TenSP = req.TenSP,
            MaDanhMuc = req.MaDanhMuc,
            MaThuongHieu = req.MaThuongHieu,
            Gia = req.Gia,
            GiaGoc = req.GiaGoc,
            HinhAnh = req.HinhAnh,
            SoLuong = req.SoLuong,
            MoTa = req.MoTa,
            TrangThai = req.SoLuong > 0 ? "CONHANG" : "HETHANG"
        };

        _context.SanPhams.Add(sp);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = sp.MaSanPham }, sp);
    }

    // PUT /api/sanpham/{id} - Cập nhật sản phẩm
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, [FromBody] UpdateSanPhamRequest req)
    {
        var sp = await _context.SanPhams.FindAsync(id);
        if (sp == null) return NotFound();

        if (req.TenSP != null) sp.TenSP = req.TenSP;
        if (req.Gia != null) sp.Gia = req.Gia.Value;
        if (req.GiaGoc != null) sp.GiaGoc = req.GiaGoc;
        if (req.HinhAnh != null) sp.HinhAnh = req.HinhAnh;
        if (req.SoLuong != null)
        {
            sp.SoLuong = req.SoLuong.Value;
            // Trigger logic: cập nhật trạng thái khi hết hàng
            sp.TrangThai = sp.SoLuong <= 0 ? "HETHANG" : "CONHANG";
        }
        sp.NgayCapNhat = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(sp);
    }

    // DELETE /api/sanpham/{id} - Xóa sản phẩm
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        var sp = await _context.SanPhams.FindAsync(id);
        if (sp == null) return NotFound();

        _context.SanPhams.Remove(sp);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class CreateSanPhamRequest
{
    public string TenSP { get; set; } = string.Empty;
    public string? MaDanhMuc { get; set; }
    public string? MaThuongHieu { get; set; }
    public decimal Gia { get; set; }
    public decimal? GiaGoc { get; set; }
    public string? HinhAnh { get; set; }
    public int SoLuong { get; set; }
    public string? MoTa { get; set; }
}

public class UpdateSanPhamRequest
{
    public string? TenSP { get; set; }
    public decimal? Gia { get; set; }
    public decimal? GiaGoc { get; set; }
    public string? HinhAnh { get; set; }
    public int? SoLuong { get; set; }
}
