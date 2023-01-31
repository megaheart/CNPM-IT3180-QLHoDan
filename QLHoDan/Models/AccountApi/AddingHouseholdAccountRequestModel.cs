using System.ComponentModel.DataAnnotations;

namespace QLHoDan.Models.AccountApi
{
    public class AddingHouseholdAccountRequestModel
    {
        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
        [Display(Name = "Username")]
        public string UserName { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        //Mã số phạm vi công tác, VD: scope = 1 là người kia thuộc tổ 1,
        //nếu là tổ trưởng thì tổ trưởng quản lý tổ 1
        [Required]
        public int Scope { get; set; }
        public string? Note { get; set; }
    }
}
