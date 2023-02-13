using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;

namespace QLHoDan.Models.HouseholdForms.ChangingHouseholdForm
{
    public class ChangingHouseholdFormDetail
    {
        public int Id { set; get; } // id
        public ResidentBriefInfo Resident { set; get; }
        public HouseholdBriefInfo NewHousehold { set; get; }
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản hộ dân gửi 
    }
}
