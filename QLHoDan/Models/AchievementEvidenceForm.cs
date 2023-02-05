using System;

namespace QLHoDan.Models
{
	public class AchievementEvidenceForm
	{
		public int Id { set; get; } // id
        public Resident Resident { set; get; } // ID của các cháu (vì các cháu chưa có CMND)
        public string AchievementName { set; get; } // Tiêu đề thành tích
        public int? AchievementType { set; get; } // Phân loại thành tích
        public List<string> ImageLinks { set; get; } = new List<string>();// Ảnh giấy khai sinh (Đường dẫn đến địa chỉ của ảnh là được)
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên

        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)



    }

}
