using System.ComponentModel.DataAnnotations;

namespace QLHoDan.Models.Reward.ChoosingPresentsForm
{
    public class AddingChoosingPresentsFormRequestModel
    {
        public string ResidentIdCode { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public int RewardCeremonyId { set; get; } // ID của dịp thưởng muốn nộp minh chứng đến
        [Range(1, int.MaxValue)]
        public int PresentsType { set; get; } // Loại phần quà muốn nhận
    }
}
