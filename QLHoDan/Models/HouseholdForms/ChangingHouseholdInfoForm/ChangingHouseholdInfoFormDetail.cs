using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;

namespace QLHoDan.Models.HouseholdForms.ChangingHouseholdInfoForm
{
    public class ChangingHouseholdInfoFormDetail
    {
        public int Id { set; get; } // id
        public HouseholdBriefInfo Household { set; get; } // Số hộ khẩu
        public string? Address { set; get; } // địa chỉ Thường trú mới
        public ResidentBriefInfo? Owner { set; get; }//Chủ hộ mới
        public int? Scope { set; get; } // Tổ Phụ Trách mới
        public string Reason { set; get; } //Lý do thay đổi
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa

        public string Account { set; get; } // Username tài khoản hộ dân gửi 
    }
}
