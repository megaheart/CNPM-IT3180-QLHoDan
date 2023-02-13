using QLHoDan.Models.Api;

namespace QLHoDan.Models.Reward.AchievementEvidenceForm
{
    public class AcceptingAchievementEvidenceFormRequestModel : AcceptingFormRequestModel
    {
        public int? AchievementType { set; get; } = null; // Phân loại thành tích, bắt buộc phải có nếu như chấp nhận
    }
}
