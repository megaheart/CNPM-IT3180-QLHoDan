using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.Reward.RewardCeremonies;

namespace QLHoDan.Models.Reward.ChoosingPresentsForm
{
    public class ChoosingPresentsFormDetail
    {
        public int Id { set; get; } // id
        public ResidentBriefInfo Resident { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public RewardCeremonyBriefInfo RewardCeremony { set; get; } // Dịp thưởng muốn nộp minh chứng đến
        public string PresentsName { set; get; } // Tên của loại phần quà cháu muốn nhận nhân dịp đặc biệt
        public int PresentsType { set; get; } // Loại phần quà cháu muốn nhận nhân dịp đặc biệt
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
    }
}
