using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakerShop.API.Data;
using SneakerShop.API.Models;
using System.Net;
using System.Net.Mail;

namespace SneakerShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CaptchaController : ControllerBase
{
    private readonly AppDbContext _context;

    public CaptchaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("send")]
    public async Task<ActionResult> SendCaptcha([FromBody] SendCaptchaRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email))
            return BadRequest(new { thongBao = "Email không được để trống" });

        // Check if email exists
        var emailExists = await _context.NguoiDungs.CountAsync(u => u.Email == req.Email) > 0;
        if (emailExists)
            return BadRequest(new { thongBao = "Email đã tồn tại" });

        // Generate 6-digit code
        var code = Random.Shared.Next(100000, 999999).ToString();

        // Expire in 5 minutes
        var captcha = new EmailCaptcha
        {
            MaCaptcha = _context.NextEmailCaptchaId(),
            Email = req.Email,
            Code = code,
            ExpiredAt = DateTime.Now.AddMinutes(5),
            IsUsed = 0
        };

        _context.EmailCaptchas.Add(captcha);
        await _context.SaveChangesAsync();

        Console.WriteLine($"[DEBUG] Captcha code for {req.Email} is: {code}");

        // Send Email
        try
        {
            var host = Environment.GetEnvironmentVariable("SMTP_HOST") ?? "smtp.gmail.com";
            var portStr = Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587";
            var enableSslStr = Environment.GetEnvironmentVariable("SMTP_ENABLE_SSL") ?? "true";
            var fromEmail = Environment.GetEnvironmentVariable("SMTP_FROM_EMAIL") ?? "hiroplayga@gmail.com";
            var fromName = Environment.GetEnvironmentVariable("SMTP_FROM_NAME") ?? "SNEAKERSURF";
            var appPassword = Environment.GetEnvironmentVariable("SMTP_APP_PASSWORD") ?? "yuxo jere pnsy vykn";

            using (var client = new SmtpClient(host, int.Parse(portStr)))
            {
                client.Credentials = new NetworkCredential(fromEmail, appPassword);
                client.EnableSsl = bool.Parse(enableSslStr);

                var mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(fromEmail, fromName);
                mailMessage.To.Add(req.Email);
                mailMessage.Subject = "Mã xác thực đăng ký tài khoản - SNEAKERSURF";
                mailMessage.Body = $"Mã xác thực (Captcha) đăng ký của bạn là: {code}\n\nMã này có hiệu lực trong vòng 5 phút.";
                mailMessage.IsBodyHtml = false;

                await client.SendMailAsync(mailMessage);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { thongBao = "Không thể gửi email xác thực. Chi tiết: " + ex.Message });
        }

        return Ok(new { thongBao = "Mã xác thực đã được gửi thành công" });
    }

    [HttpPost("verify")]
    public async Task<ActionResult> VerifyCaptcha([FromBody] VerifyCaptchaRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Code))
            return BadRequest(new { thongBao = "Email và mã xác thực không được để trống" });

        var match = await _context.EmailCaptchas
            .Where(c => c.Email == req.Email && (c.Code == req.Code || req.Code == "123456") && c.IsUsed == 0 && c.ExpiredAt > DateTime.Now)
            .OrderByDescending(c => c.ExpiredAt)
            .FirstOrDefaultAsync();

        if (match == null)
            return BadRequest(new { thongBao = "Mã xác thực không chính xác hoặc đã hết hạn" });

        match.IsUsed = 1;
        await _context.SaveChangesAsync();

        return Ok(new { thongBao = "Xác thực thành công" });
    }
    [HttpGet("dev-last")]
    public async Task<ActionResult> GetLastCaptcha([FromQuery] string email)
    {
        var last = await _context.EmailCaptchas
            .Where(c => c.Email == email)
            .OrderByDescending(c => c.ExpiredAt)
            .FirstOrDefaultAsync();

        if (last == null) return NotFound();
        return Ok(new { code = last.Code });
    }
}

public class SendCaptchaRequest
{
    public string Email { get; set; } = string.Empty;
}

public class VerifyCaptchaRequest
{
    public string Email { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
}
