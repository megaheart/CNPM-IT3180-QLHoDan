using System;

namespace QLHoDan.Models
{
	public class AchievementEvidenceForm
	{
		public int Id { set; get; } // id
        public Resident Resident { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public RewardCeremony RewardCeremony { set; get; } // Dịp thưởng muốn nộp minh chứng đến
        public int RewardCeremonyId { set; get; } // ID của dịp thưởng muốn nộp minh chứng đến
        // ID của các cháu (vì các cháu chưa có CMND)
        public string ResidentIdentityCode { set; get; }
        public string AchievementName { set; get; } // Tiêu đề thành tích
        public int? AchievementType { set; get; } // Phân loại thành tích
        public List<string> ImageLinks { set; get; } = new List<string>();// đường dẫn đến Ảnh minh chứng
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên

        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Lý do không duyệt
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
        public int AccountScope { set; get; } // scope của tài khoản người gửi
    }
}