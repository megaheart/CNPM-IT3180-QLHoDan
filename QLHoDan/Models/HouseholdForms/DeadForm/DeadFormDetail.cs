using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;

namespace QLHoDan.Models.HouseholdForms.DeadForm
{
    public class DeadFormDetail
    {
        public int Id { set; get; } // id
        public ResidentBriefInfo Resident { set; get; } //  người chuyển đi
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
         public List<string> ImageLinks { set; get; } = new List<string>();  // Minh chứng (đường đẫn đến ảnh của giấy chứng tử)
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản hộ dân gửi
    }
}
