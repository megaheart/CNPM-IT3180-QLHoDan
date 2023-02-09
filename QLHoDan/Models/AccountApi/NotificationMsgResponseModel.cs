namespace QLHoDan.Models.AccountApi
{
    public class NotificationMsgResponseModel
    {
        public int Id { set; get; } // id
        public string Sender { set; get; } // Username Tài khoản gửi
        public string SenderFullname { set; get; } // Username Tài khoản gửi
        public DateTime Time { set; get; } // Ngày giờ phút giây gửi
        public string Content { set; get; } // Nội dung thông báo
        public bool IsRead { set; get; } // Đã đọc hay chưa
    }
}
