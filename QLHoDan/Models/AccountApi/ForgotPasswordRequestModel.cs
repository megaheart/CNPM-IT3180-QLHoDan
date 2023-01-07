using System.ComponentModel.DataAnnotations;

namespace QLHoDan.Models.AccountApi
{
    public class ForgotPasswordRequestModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
