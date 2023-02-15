namespace QLHoDan.Models.Api
{
    public class FormBriefInfo
    {
        public int Id { set; get; } // id của form (cùng loại form thì id luôn khác nhau, nhưng khác loại form thì id có thể trùng)
        public string FormType { set; get; } //loại form
        public string Title { set; get; } //tiêu đề của form
        public DateTime CreatedTime { set; get; } // Giờ phút ngày tháng năm form được gửi lên

        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Lý do không duyệt
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
    }
}
