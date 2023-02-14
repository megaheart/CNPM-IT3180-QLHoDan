﻿namespace QLHoDan.Models
{
	public class DeadForm
	{
        public int Id { set; get; } // id
        public Resident Resident { set; get; } // người tử vong
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa

        public List<string> ImageLinks { set; get; } = new List<string>();  // Minh chứng (đường đẫn đến ảnh của giấy chứng tử)
        public string Account { set; get; } // Username tài khoản hộ dân gửi 
        public int AccountScope { set; get; } // scope của tài khoản người gửi

    }

}
