using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.Reward.RewardCeremonies;

namespace QLHoDan.Models.Reward.AchievementEvidenceForm
{
    public class AchievementEvidenceFormDetail
    {
        public int Id { set; get; } // id
        public ResidentBriefInfo Resident { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public RewardCeremonyBriefInfo RewardCeremony { set; get; } // Dịp thưởng muốn nộp minh chứng đến
        public string AchievementName { set; get; } // Tiêu đề thành tích
        public int? AchievementType { set; get; } // Phân loại thành tích
        public List<string> ImageLinks { set; get; } = new List<string>();// Ảnh giấy khai sinh (Đường dẫn đến địa chỉ của ảnh là được)
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên

        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Lý do không duyệt
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
    }
}
