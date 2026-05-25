using System.ComponentModel.DataAnnotations;

namespace SneakerShop.API.Models;

public class EmailCaptcha
{
    [Key]
    [MaxLength(10)]
    public string MaCaptcha { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string Code { get; set; } = string.Empty;

    public DateTime ExpiredAt { get; set; } = DateTime.UtcNow.AddMinutes(5);

    public int IsUsed { get; set; } = 0; // 0: Unused, 1: Used
}
