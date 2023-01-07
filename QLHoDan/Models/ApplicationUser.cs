using Microsoft.AspNetCore.Identity;

namespace QLHoDan.Models;

public class ApplicationUser : IdentityUser
{
    public int Role { get; set; }
    public string FullName { get; set; }
    //Mã số phạm vi công tác, VD: scope = 1 là người kia thuộc tổ 1,
    //nếu là tổ trưởng thì tổ trưởng quản lý tổ 1
    public int Scope { get; set; }
    public string Note { get; set; }
}
