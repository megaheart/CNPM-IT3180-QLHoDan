namespace QLHoDan.Models.Reward
{
    public class AddingAchievementEvidenceFormRequestModel
    {
        public string ResidentIdCode { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public int RewardCeremonyId { set; get; } // ID của dịp thưởng muốn nộp minh chứng đến
        public string AchievementName { set; get; } // Tiêu đề thành tích
        public IFormFileCollection Images { set; get; }// danh sách Ảnh minh chứng
    }
}
