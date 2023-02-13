using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;

namespace QLHoDan.Models.HouseholdForms.SplittingHouseholdForm
{
    public class SplittingHouseholdFormDetail
    {
        public int Id { set; get; } // id
        public string Address { set; get; }
        public ResidentBriefInfo Owner { set; get; } // CMND/CCCD của người sẽ trở thành chủ hộ
        public int Scope { set; get; } // Tổ phụ trách
        public string Account { set; get; } // Username tài khoản người gửi (chính là số CMND luôn)
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa
    }
}
