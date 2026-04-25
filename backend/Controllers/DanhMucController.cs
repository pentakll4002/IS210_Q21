using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DanhMucController : ControllerBase
{
    private readonly AppDbContext _context;

    public DanhMucController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var danhMucs = await _context.DanhMucs.ToListAsync();
        return Ok(danhMucs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(string id)
    {
        var dm = await _context.DanhMucs.FindAsync(id);
        if (dm == null) return NotFound();
        return Ok(dm);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateDanhMucRequest req)
    {
        var dm = new DanhMuc
        {
            MaDanhMuc = _context.NextDanhMucId(),
            TenDM = req.TenDM,
            MoTa = req.MoTa
        };
        _context.DanhMucs.Add(dm);
        await _context.SaveChangesAsync();
        return Ok(dm);
    }
}

public class CreateDanhMucRequest
{
    public string TenDM { get; set; } = string.Empty;
    public string? MoTa { get; set; }
}
