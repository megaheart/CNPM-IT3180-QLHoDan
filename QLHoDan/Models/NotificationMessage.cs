using System;

namespace QLHoDan.Models
{
	public class NotificationMessage
	{
		public int Id{set;get;} // id
		//public Account Sender{set;get;} // Username Tài khoản gửi
		//public Account Receiver{set;get;} // Username Tài khoản nhận
		public DateTime Time{set;get;} // Ngày giờ phút giây gửi
		public string Content{set;get;} // Nội dung thông báo
		public bool IsRead{set;get;} // Đã đọc hay chưa
	}

}
