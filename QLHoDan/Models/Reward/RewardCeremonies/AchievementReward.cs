namespace QLHoDan.Models.Reward.RewardCeremonies
{
    public class AchievementReward
    {
        public int AchievementType { set; get; } // Loại thành tích
        public string AchievementName { set; get; } // Miêu tả loại thành tích
        public string RewardName { set; get; } // Miêu tả Phần thưởng (dạng text)
        public double RewardValue { set; get; } // Giá trị phần thưởng (số tiền)
    }
}
