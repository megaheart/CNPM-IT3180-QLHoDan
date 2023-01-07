using System;

namespace QLHoDan.Models
{
    //Đơn xin thay đổi thông tin hộ khẩu
    public class ChangingHouseholdInfoForm
	{
        public int Id { set; get; } // ID
        public Household Household { set; get; } // Số hộ khẩu
        public string? Address { set; get; } // địa chỉ Thường trú mới
        public Resident? Owner { set; get; }//Chủ hộ mới
        public int? Scope { set; get; } // Tổ Phụ Trách mới
        public string Reason { set; get; } //Lý do thay đổi
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason { set; get; } // Đã duyệt chưa

        public string Account { set; get; } // Username tài khoản hộ dân gửi 
    }

}
