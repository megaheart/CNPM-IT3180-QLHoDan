using System.ComponentModel.DataAnnotations.Schema;

namespace QLHoDan.Models
{
	public class AchievementRewardPair
	{
		public int Id { get; set; }
		public RewardCeremony RewardCeremony { set;get;} //Đợt phát thưởng
		public int RewardCeremonyId { get; set; }

        public int AchievementType { set;get;} // Loại thành tích
		public string AchievementName{ set;get;} // Miêu tả loại thành tích
		public string RewardName{set;get;} // Miêu tả Phần thưởng (dạng text)
		public double RewardValue { set;get;} // Giá trị phần thưởng (số tiền)
    }

}
