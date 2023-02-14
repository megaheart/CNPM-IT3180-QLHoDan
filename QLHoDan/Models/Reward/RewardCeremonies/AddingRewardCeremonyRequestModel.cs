﻿namespace QLHoDan.Models.Reward.RewardCeremonies
{
    public class AddingRewardCeremonyRequestModel
    {
        //Tên đợt thưởng
        public string Title { get; set; }
        //Miêu tả đợt phát thưởng (1 đoạn text có format)
        public string Description { get; set; }
        //Loại phát thưởng (TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu)
        public string Type { get; set; }
        //-	Ngày đóng nhận form minh chứng
        public DateTime ClosingFormDate { set; get; }
        //-	Thời gian nhận thưởng
        public DateTime RewardDate { set; get; }
        //Tin nhắn gửi đến các tài khoản đặc biệt
        public string? MessageToSpecialAccount { get; set; }
    }
}
