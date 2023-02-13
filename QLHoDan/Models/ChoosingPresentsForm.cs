namespace QLHoDan.Models
{
    public class ChoosingPresentsForm
    {
        public int Id { set; get; } // id
        public Resident Resident { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public RewardCeremony RewardCeremony { set; get; } // Dịp thưởng muốn nộp minh chứng đến
        public int RewardCeremonyId { set; get; } // ID của dịp thưởng muốn nộp minh chứng đến
        public int PresentsType { set; get; } // Loại phần quà cháu muốn nhận nhân dịp đặc biệt
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
        public int AccountScope { set; get; } // scope của tài khoản người gửi
    }
}
