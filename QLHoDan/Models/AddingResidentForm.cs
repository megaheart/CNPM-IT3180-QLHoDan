using System;

namespace QLHoDan.Models
{
	public class AddingResidentForm
	{
		public int Id{ set; get; } // id
		public string HouseholdId { set; get; }//Hộ khẩu sẽ nhập vào
        public ResidentForm NewResident{ set; get; } // Tham chiếu đến một NhanKhauForm lưu trữ Thông tin về nhân khẩu mới cũng như thông tin hộ muốn chuyển vào
		public List<string> ImageLinks{ set; get; } = new List<string>();// Ảnh giấy khai sinh (Đường dẫn đến địa chỉ của ảnh là được)
        public DateTime CreatedTime{ set; get; } // Giờ phút ngày tháng năm form được gửi lên

        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public string? NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
        public int AccountScope { set; get; } // scope của tài khoản người gửi
    }

}
