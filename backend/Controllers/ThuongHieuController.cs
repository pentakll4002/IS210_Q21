using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ThuongHieuController : ControllerBase
{
    private readonly AppDbContext _context;

    public ThuongHieuController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var thuongHieus = await _context.ThuongHieus.ToListAsync();
        return Ok(thuongHieus);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(string id)
    {
        var th = await _context.ThuongHieus.FindAsync(id);
        if (th == null) return NotFound();
        return Ok(th);
    }
}
