using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.Reward.RewardCeremonies;

namespace QLHoDan.Models.Reward.RewardRecord
{
    public class RewardRecordInfo
    {
        public int Id { get; set; }
        // ID đợt phát thưởng
        public RewardCeremonyBriefInfo RewardCeremony { set; get; }
        // Cháu nhận thưởng
        public ResidentBriefInfo Resident { set; get; }
        // Loại thành tích
        public int AchievementType { set; get; }
        // Tên thành tích - Miêu tả loại thành tích
        public string? AchievementName { set; get; }
        // Tên phần thưởng - Miêu tả Phần thưởng (dạng text)
        public string RewardName { set; get; }
        // Giá trị phần thưởng (số tiền)
        public double RewardValue { set; get; }
    }
}
