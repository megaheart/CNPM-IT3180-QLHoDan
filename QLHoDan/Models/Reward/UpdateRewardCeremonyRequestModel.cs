namespace QLHoDan.Models.Reward
{
    public class UpdateRewardCeremonyRequestModel
    {
        public int Id { get; set; }
        //Tên đợt thưởng
        public string? Title { get; set; }
        //Loại phát thưởng (TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu)
        public string? Type { get; set; }
        //-	Ngày đóng nhận form minh chứng
        public DateTime? ClosingFormDate { set; get; }
        //-	Thời gian nhận thưởng
        public DateTime? RewardDate { set; get; }
        //Tên đợt thưởng
        public string? MessageToHousehold { get; set; }
        //Tin nhắn gửi đến các tài khoản đặc biệt
        public string? MessageToSpecialAccount { get; set; }
    }
}
