using System;

namespace QLHoDan.Models
{
	public class MovingOutForm
	{
		public int Id { set; get; } // id
        public string MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime MoveOutDate { set; get; } //  ngày chuyển đi
        public string MoveOutReason { set; get; } // lý do chuyển đi
        public Resident Resident { set; get; } //  người chuyển đi
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản hộ dân gửi 
        public int AccountScope { set; get; } // scope của tài khoản người gửi

    }

}
