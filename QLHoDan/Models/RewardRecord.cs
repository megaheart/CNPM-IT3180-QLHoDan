namespace QLHoDan.Models
{
    public class RewardRecord
    {
        // ID
        public int Id{set;get;}
        // ID đợt phát thưởng
        public RewardCeremony RewardCeremony{set;get;}
        // Cháu nhận thưởng
        public Resident Resident { set;get;}
        // Loại thành tích
        public int AchievementType { set; get; }
        // Tên thành tích - Miêu tả loại thành tích
        public string? AchievementName { set; get; }
        // Tên phần thưởng - Miêu tả Phần thưởng (dạng text)
        public string RewardName { set; get; }
        // Giá trị phần thưởng (số tiền)
        public double RewardValue { set; get; }
        // ID của dịp thưởng muốn nộp minh chứng đến
        public int RewardCeremonyId { set; get; }
        // ID của các cháu (vì các cháu chưa có CMND)
        public string ResidentIdentityCode { set; get; } 

    }
}
