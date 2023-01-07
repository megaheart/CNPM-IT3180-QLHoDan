using System;
using System.Collections.Generic;

namespace QLHoDan.Models
{
	public class HouseholdForm
	{
		public int Id{ set; get; } // ID
		public string HouseholdId{ set; get; } // Số hộ khẩu
		public string Address  { set; get; } // địa chỉ thường trú
		public List<ResidentForm> Members{ set; get; } // Danh sách NhanKhauForm của tất cả các thành viên
		public int Scope{ set; get; } // Tổ Phụ Trách
		public DateTime CreatedTime{ set; get; }
		public List<string> ImageLinks{ set; get; } // Ảnh minh chứng (mảng danh sách các địa chỉ dẫn đến hình ảnh đó)
		public bool IsAccepted{ set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason{ set; get; } // Đã duyệt chưa
        //public string CMND{ set; get; } // Username tài khoản người gửi (Phải là Tài Khoản được chủ hộ sử dụng)
    }
}
