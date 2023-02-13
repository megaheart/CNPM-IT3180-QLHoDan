namespace QLHoDan.Models
{
    public class AchievementRewardPair
    {
        public int Id { get; set; }
        public RewardCeremony RewardCeremony { set; get; } //Đợt phát thưởng
        public int RewardCeremonyId { set; get; } //Đợt phát thưởng
        public int AchievementType { set; get; } // Loại thành tích (bắt đầu từ 1)
        public string AchievementName { set; get; } // Miêu tả loại thành tích
        public string RewardName { set; get; } // Miêu tả Phần thưởng (dạng text)
        public double RewardValue { set; get; } // Giá trị phần thưởng (số tiền)
    }

}
