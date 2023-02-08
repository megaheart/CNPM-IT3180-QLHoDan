namespace QLHoDan.Models.Reward
{
    public class AcceptRewardCeremonyRequestModel
    {
        //Tin nhắn gửi đến các tài khoản đặc biệt
        public string? MessageToSpecialAccount { get; set; }
        //Tin nhắn gửi đến các tài khoản hộ dân
        public string? MessageToHousehold { get; set; }
    }
}
